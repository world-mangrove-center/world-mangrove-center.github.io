import type * as Leaflet from 'leaflet'

/** Bintuni Bay, West Papua — default view when there is nothing to fit. */
export const BINTUNI_CENTER: [number, number] = [-2.3, 133.5]
export const BINTUNI_ZOOM = 9

type L = typeof Leaflet

interface GoogleSession {
  session: string
  expiry: number // epoch seconds
  key: string
  lang: string
}

/**
 * Official Google Map Tiles API: create a session token, then fetch
 * https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}?session=…&key=…
 * Session tokens are cached in sessionStorage until shortly before they expire.
 */
async function getGoogleSatelliteSession(apiKey: string, lang: 'en' | 'id'): Promise<GoogleSession | null> {
  const cacheKey = 'wmc:gmaps-session'
  try {
    const cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null') as GoogleSession | null
    if (cached && cached.key === apiKey && cached.lang === lang && cached.expiry * 1000 > Date.now() + 5 * 60_000) {
      return cached
    }
  } catch {}
  try {
    const res = await fetch(`https://tile.googleapis.com/v1/createSession?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mapType: 'satellite',
        language: lang === 'id' ? 'id-ID' : 'en-US',
        region: 'ID',
        layerTypes: ['layerRoadmap'], // labels/roads on top of imagery (hybrid)
      }),
    })
    if (!res.ok) throw new Error(`createSession ${res.status}`)
    const data = (await res.json()) as { session: string; expiry: string }
    const session: GoogleSession = { session: data.session, expiry: Number(data.expiry), key: apiKey, lang }
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(session))
    } catch {}
    return session
  } catch (err) {
    console.warn('[map] Google Map Tiles session failed, using Esri imagery instead', err)
    return null
  }
}

export interface Basemaps {
  layers: Record<string, Leaflet.TileLayer>
  defaultLayer: Leaflet.TileLayer
}

export async function createBasemaps(
  L: L,
  opts: { googleApiKey?: string; lang: 'en' | 'id'; default?: 'osm' | 'satellite' },
): Promise<Basemaps> {
  const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
  })

  let satellite: Leaflet.TileLayer
  let satelliteLabel: string
  const google = opts.googleApiKey ? await getGoogleSatelliteSession(opts.googleApiKey, opts.lang) : null
  if (google) {
    satellite = L.tileLayer(
      `https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}?session=${google.session}&key=${encodeURIComponent(google.key)}`,
      { maxZoom: 21, attribution: 'Imagery &copy; Google' },
    )
    satelliteLabel = 'Google Satellite'
  } else {
    satellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        attribution: 'Imagery &copy; Esri, Maxar, Earthstar Geographics',
      },
    )
    satelliteLabel = opts.lang === 'id' ? 'Satelit (Esri)' : 'Satellite (Esri)'
  }

  const layers: Record<string, Leaflet.TileLayer> = {
    [satelliteLabel]: satellite,
    OpenStreetMap: osm,
  }
  return { layers, defaultLayer: opts.default === 'osm' ? osm : satellite }
}

/** Leaflet style for a feature of the given category colour. */
export function featureStyle(color: string, type: string): Leaflet.PathOptions {
  if (type === 'LineString') return { color, weight: 3, dashArray: '6 6', opacity: 0.95 }
  return { color, weight: 2, fillColor: color, fillOpacity: 0.22, opacity: 0.95 }
}

export function pointMarker(L: L, latlng: Leaflet.LatLngExpression, color: string) {
  return L.circleMarker(latlng, {
    radius: 7,
    color: '#ffffff',
    weight: 2,
    fillColor: color,
    fillOpacity: 1,
  })
}

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}
