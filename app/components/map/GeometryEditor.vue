<script setup lang="ts">
/**
 * Minimal geometry editor for the admin panel.
 * - Point: click the map, drag the marker, or type latitude / longitude
 * - Line / Polygon: click to add vertices, drag to move, right-click a vertex to delete
 * - Any geometry (incl. MultiPolygon / holes) can be pasted as GeoJSON
 */
import 'leaflet/dist/leaflet.css'
import type * as Leaflet from 'leaflet'
import type { GeoJsonGeometry } from '~~/shared/types/api'
import { BINTUNI_CENTER, BINTUNI_ZOOM, createBasemaps, featureStyle, pointMarker } from '~/utils/basemaps'

type Mode = 'Point' | 'LineString' | 'Polygon'
type LonLat = [number, number]

const props = defineProps<{
  modelValue: GeoJsonGeometry | string | null | undefined
  color?: string
  reference?: { geometry: GeoJsonGeometry; color: string; name: string }[]
}>()
const emit = defineEmits<{ 'update:modelValue': [GeoJsonGeometry | null] }>()

const config = useRuntimeConfig()
const el = ref<HTMLDivElement>()
let L: typeof Leaflet
let map: Leaflet.Map | undefined
let drawLayer: Leaflet.LayerGroup | undefined
let shapeLayer: Leaflet.Layer | undefined

const round = (n: number) => Math.round(n * 1e6) / 1e6

function parse(v: typeof props.modelValue): GeoJsonGeometry | null {
  if (!v) return null
  if (typeof v === 'string') {
    try {
      const p = JSON.parse(v)
      return p?.type === 'Feature' ? p.geometry : p
    } catch {
      return null
    }
  }
  return v
}

const initial = parse(props.modelValue)
const complex = ref(initial?.type === 'MultiPolygon' || (initial?.type === 'Polygon' && initial.coordinates.length > 1))
const mode = ref<Mode>(initial && initial.type !== 'MultiPolygon' ? (initial.type as Mode) : 'Point')
const coords = ref<LonLat[]>(toCoords(initial))
const jsonText = ref(initial ? JSON.stringify(initial) : '')
const jsonError = ref('')
const color = computed(() => props.color || '#68ef3f')

function toCoords(g: GeoJsonGeometry | null): LonLat[] {
  if (!g) return []
  if (g.type === 'Point') return [g.coordinates]
  if (g.type === 'LineString') return g.coordinates.map((c) => [c[0], c[1]])
  if (g.type === 'Polygon') return g.coordinates[0]!.slice(0, -1).map((c) => [c[0], c[1]])
  return []
}

const geometry = computed<GeoJsonGeometry | null>(() => {
  if (complex.value) return parse(jsonText.value)
  const c = coords.value
  if (mode.value === 'Point') return c[0] ? { type: 'Point', coordinates: c[0] } : null
  if (mode.value === 'LineString') return c.length >= 2 ? { type: 'LineString', coordinates: c } : null
  return c.length >= 3 ? { type: 'Polygon', coordinates: [[...c, c[0]!]] } : null
})

const hint = computed(() => {
  if (complex.value) return 'Geometri kompleks (MultiPolygon / berlubang): ubah lewat GeoJSON di bawah.'
  if (mode.value === 'Point') return 'Klik peta untuk menaruh titik, lalu geser bila perlu.'
  const need = mode.value === 'LineString' ? 2 : 3
  const left = Math.max(0, need - coords.value.length)
  return `Klik peta untuk menambah titik sudut${left ? ` (butuh ${left} lagi)` : ''}. Geser untuk memindah, klik kanan untuk menghapus.`
})

watch(geometry, (g) => {
  emit('update:modelValue', g)
  if (!complex.value) jsonText.value = g ? JSON.stringify(g) : ''
  render()
})

watch(coords, () => render(), { deep: true })

function setMode(m: Mode) {
  if (m === mode.value) return
  if (coords.value.length > 1 && !window.confirm('Ganti jenis geometri? Titik yang sudah dibuat tetap dipakai sebisanya.')) return
  mode.value = m
  if (m === 'Point') coords.value = coords.value.slice(0, 1)
}
function undo() {
  coords.value = coords.value.slice(0, -1)
}
function clearAll() {
  coords.value = []
  if (complex.value) {
    complex.value = false
    jsonText.value = ''
  }
}

// Point lat/lon inputs
const latInput = computed({
  get: () => (mode.value === 'Point' && coords.value[0] ? coords.value[0][1] : ''),
  set: (v) => setPointPart(1, v),
})
const lonInput = computed({
  get: () => (mode.value === 'Point' && coords.value[0] ? coords.value[0][0] : ''),
  set: (v) => setPointPart(0, v),
})
function setPointPart(i: 0 | 1, v: string | number) {
  const n = Number(v)
  if (v === '' || !Number.isFinite(n)) return
  const cur: LonLat = coords.value[0] ? [...coords.value[0]] : [BINTUNI_CENTER[1], BINTUNI_CENTER[0]]
  cur[i] = round(n)
  coords.value = [cur]
  if (map) map.panTo([cur[1], cur[0]])
}

function applyJson() {
  jsonError.value = ''
  const g = parse(jsonText.value)
  if (!g || !['Point', 'LineString', 'Polygon', 'MultiPolygon'].includes(g.type)) {
    jsonError.value = 'GeoJSON tidak valid. Contoh: {"type":"Point","coordinates":[133.53,-2.11]}'
    return
  }
  if (g.type === 'MultiPolygon' || (g.type === 'Polygon' && g.coordinates.length > 1)) {
    complex.value = true
    emit('update:modelValue', g)
    render()
  } else {
    complex.value = false
    mode.value = g.type as Mode
    coords.value = toCoords(g)
  }
  fit()
}

function vertexIcon(i: number) {
  return L.divIcon({
    className: '',
    html: `<div style="width:14px;height:14px;border-radius:999px;background:#fff;border:3px solid ${color.value};box-shadow:0 1px 4px rgba(0,0,0,.4)" title="Titik ${i + 1}"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })
}

function render() {
  if (!map || !drawLayer) return
  drawLayer.clearLayers()
  shapeLayer = undefined
  const g = geometry.value
  if (g && g.type !== 'Point') {
    shapeLayer = L.geoJSON(g as any, { style: () => featureStyle(color.value, g.type), interactive: false }).addTo(drawLayer)
  } else if (complex.value && g) {
    shapeLayer = L.geoJSON(g as any, { pointToLayer: (_f, ll) => pointMarker(L, ll, color.value) }).addTo(drawLayer)
  }
  if (complex.value) return
  // Draft line while drawing a polygon / line with too few points
  if (!g && coords.value.length > 1) {
    L.polyline(coords.value.map(([x, y]) => [y, x] as [number, number]), { color: color.value, dashArray: '4 6', weight: 2 }).addTo(drawLayer)
  }
  coords.value.forEach(([x, y], i) => {
    const m = L.marker([y, x], { draggable: true, icon: vertexIcon(i), autoPan: true }).addTo(drawLayer!)
    m.on('dragend', () => {
      const ll = m.getLatLng()
      const next = [...coords.value]
      next[i] = [round(ll.lng), round(ll.lat)]
      coords.value = next
    })
    m.on('contextmenu', () => {
      if (mode.value === 'Point') return
      coords.value = coords.value.filter((_, j) => j !== i)
    })
  })
}

function fit() {
  if (!map) return
  const b = drawLayer && L.featureGroup(drawLayer.getLayers()).getBounds()
  if (b && b.isValid()) map.fitBounds(b, { padding: [30, 30], maxZoom: 15 })
}

onMounted(async () => {
  L = (await import('leaflet')).default
  map = L.map(el.value!, { zoomControl: true }).setView(BINTUNI_CENTER, BINTUNI_ZOOM)
  const basemaps = await createBasemaps(L, { googleApiKey: config.public.googleMapsApiKey as string, lang: 'id' })
  basemaps.defaultLayer.addTo(map)
  L.control.layers(basemaps.layers, undefined, { position: 'topright' }).addTo(map)
  L.control.scale({ imperial: false }).addTo(map)

  // Other features, for spatial reference only
  if (props.reference?.length) {
    const ref = L.featureGroup().addTo(map)
    for (const r of props.reference) {
      L.geoJSON(r.geometry as any, {
        style: () => ({ ...featureStyle(r.color, r.geometry.type), opacity: 0.45, fillOpacity: 0.08 }),
        pointToLayer: (_f, ll) => L.circleMarker(ll, { radius: 4, color: r.color, weight: 1, fillOpacity: 0.5 }),
        interactive: true,
      })
        .bindTooltip(r.name)
        .addTo(ref)
    }
  }

  drawLayer = L.layerGroup().addTo(map)
  map.on('click', (e: Leaflet.LeafletMouseEvent) => {
    if (complex.value) return
    const p: LonLat = [round(e.latlng.lng), round(e.latlng.lat)]
    coords.value = mode.value === 'Point' ? [p] : [...coords.value, p]
  })
  render()
  if (geometry.value) fit()
  // Container may have been hidden/animated in a slide-over
  setTimeout(() => map?.invalidateSize(), 250)
})

onBeforeUnmount(() => {
  map?.remove()
  map = undefined
})
</script>

<template>
  <div class="rounded-xl border border-mist-green p-3">
    <div class="mb-2 flex flex-wrap items-center gap-1.5">
      <template v-if="!complex">
        <button v-for="m in (['Point', 'LineString', 'Polygon'] as const)" :key="m" type="button" class="btn-admin !px-2.5 !py-1 !text-caption" :class="{ '!border-onyx-olive !bg-onyx-olive !text-pure-white': mode === m }" @click="setMode(m)">
          {{ { Point: 'Titik', LineString: 'Garis', Polygon: 'Poligon' }[m] }}
        </button>
        <span class="mx-1 h-5 w-px bg-mist-green" />
        <button type="button" class="btn-admin !px-2.5 !py-1 !text-caption" :disabled="!coords.length || mode === 'Point'" @click="undo">Urungkan</button>
      </template>
      <button type="button" class="btn-admin !px-2.5 !py-1 !text-caption" :disabled="!coords.length && !complex" @click="clearAll">Hapus semua</button>
      <button type="button" class="btn-admin ml-auto !px-2.5 !py-1 !text-caption" @click="fit">Pusatkan</button>
    </div>
    <p class="mb-2 text-caption text-lichen-sage">{{ hint }}</p>
    <div ref="el" class="isolate h-80 w-full overflow-hidden rounded-lg bg-mist-green" />

    <div v-if="mode === 'Point' && !complex" class="mt-3 grid grid-cols-2 gap-3">
      <label class="text-caption text-moss-shadow">Lintang (lat)
        <input v-model.lazy="latInput" type="number" step="0.000001" min="-90" max="90" class="field-input mt-1 !rounded-lg !py-1.5 !text-body" placeholder="-2.1097" />
      </label>
      <label class="text-caption text-moss-shadow">Bujur (lon)
        <input v-model.lazy="lonInput" type="number" step="0.000001" min="-180" max="180" class="field-input mt-1 !rounded-lg !py-1.5 !text-body" placeholder="133.5246" />
      </label>
    </div>

    <details class="mt-3" :open="complex">
      <summary class="cursor-pointer text-caption font-medium text-moss-shadow">GeoJSON (lanjutan: tempel dari QGIS / geojson.io)</summary>
      <textarea v-model="jsonText" rows="4" class="field-input mt-2 !min-h-0 !rounded-lg font-mono !text-caption" spellcheck="false" />
      <div class="mt-1.5 flex items-center gap-3">
        <button type="button" class="btn-admin !px-2.5 !py-1 !text-caption" @click="applyJson">Terapkan GeoJSON</button>
        <p v-if="jsonError" class="text-caption text-red-700">{{ jsonError }}</p>
      </div>
    </details>
  </div>
</template>
