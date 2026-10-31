<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import type * as Leaflet from 'leaflet'
import type { PublicMapData, PublicMapFeature } from '~~/shared/types/api'
import { BINTUNI_CENTER, BINTUNI_ZOOM, createBasemaps, escapeHtml, featureStyle, pointMarker } from '~/utils/basemaps'

const props = defineProps<{ data: PublicMapData }>()
const { tr, pick, lang } = useLocalized()
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const el = ref<HTMLDivElement>()
let L: typeof Leaflet
let map: Leaflet.Map | undefined
const groups = new Map<number | 'none', Leaflet.FeatureGroup>()
const layerById = new Map<number, Leaflet.Layer & { getBounds?: () => Leaflet.LatLngBounds; getLatLng?: () => Leaflet.LatLng }>()

const categoryById = computed(() => new Map(props.data.categories.map((c) => [c.id, c])))
const visible = reactive<Record<string, boolean>>({})
for (const c of props.data.categories) visible[c.id] = c.visibleByDefault
visible.none = true

const query = ref('')
const activeId = ref<number | null>(null)

const features = computed(() => props.data.features.features)
const countFor = (id: number) => features.value.filter((f) => f.properties.categoryId === id).length
const listed = computed(() => {
  const q = query.value.trim().toLowerCase()
  return features.value.filter((f) => {
    if (!visible[f.properties.categoryId ?? 'none']) return false
    if (!q) return true
    return `${f.properties.nameEn} ${f.properties.nameId}`.toLowerCase().includes(q)
  })
})

function colorOf(f: PublicMapFeature) {
  return (f.properties.categoryId && categoryById.value.get(f.properties.categoryId)?.color) || '#b7bda5'
}
function categoryName(f: PublicMapFeature) {
  const c = f.properties.categoryId ? categoryById.value.get(f.properties.categoryId) : undefined
  return c ? pick(c, 'name') : tr('Uncategorised', 'Tanpa kategori')
}
function formatArea(ha: number | null) {
  if (ha == null) return ''
  return `${ha.toLocaleString(lang.value === 'id' ? 'id-ID' : 'en-US', { maximumFractionDigits: 1 })} ha`
}
function geomLabel(type: string) {
  return { Point: tr('Point', 'Titik'), LineString: tr('Route', 'Jalur'), Polygon: tr('Area', 'Area'), MultiPolygon: tr('Area', 'Area') }[type] ?? type
}

function popupHtml(f: PublicMapFeature) {
  const p = f.properties
  const meta = [p.areaHa != null && p.areaHa >= 1 ? formatArea(p.areaHa) : '', p.year ? `${tr('Since', 'Sejak')} ${p.year}` : '']
    .filter(Boolean)
    .join(' · ')
  return `<div class="wmc-popup">
    ${p.imageUrl ? `<img src="${escapeHtml(p.imageUrl)}" alt="" />` : ''}
    <span class="wmc-popup-cat" style="--c:${escapeHtml(colorOf(f))}">${escapeHtml(categoryName(f))}</span>
    <h3>${escapeHtml(pick(p, 'name'))}</h3>
    ${pick(p, 'description') ? `<p>${escapeHtml(pick(p, 'description'))}</p>` : ''}
    ${meta ? `<p class="wmc-popup-meta">${escapeHtml(meta)}</p>` : ''}
  </div>`
}

function buildLayers() {
  if (!map) return
  for (const g of groups.values()) g.remove()
  groups.clear()
  layerById.clear()
  for (const f of features.value) {
    const key = f.properties.categoryId ?? 'none'
    if (!groups.has(key)) groups.set(key, L.featureGroup())
    const color = colorOf(f)
    const layer = L.geoJSON(f as any, {
      style: () => featureStyle(color, f.geometry.type),
      pointToLayer: (_feat, latlng) => pointMarker(L, latlng, color),
    })
    layer.bindPopup(popupHtml(f), { maxWidth: 300, className: 'wmc-leaflet-popup' })
    layer.bindTooltip(escapeHtml(pick(f.properties, 'name')), { direction: 'top', className: 'wmc-leaflet-tooltip' })
    layer.on('click', () => selectFeature(f.id, false))
    layer.on('popupclose', () => {
      if (activeId.value === f.id) setActive(null)
    })
    groups.get(key)!.addLayer(layer)
    layerById.set(f.id, layer as any)
  }
  syncVisibility()
}

function syncVisibility() {
  if (!map) return
  for (const [key, g] of groups) {
    if (visible[key]) g.addTo(map)
    else g.remove()
  }
}
watch(visible, syncVisibility)

function fitAll() {
  if (!map) return
  const all = L.featureGroup([...groups.values()].filter((g) => map!.hasLayer(g)))
  const b = all.getBounds()
  if (b.isValid()) map.fitBounds(b, { padding: [24, 24], maxZoom: 13 })
  else map.setView(BINTUNI_CENTER, BINTUNI_ZOOM)
}

function setActive(id: number | null) {
  activeId.value = id
  const slug = id ? features.value.find((f) => f.id === id)?.properties.slug : undefined
  router.replace({ query: { ...route.query, f: slug || undefined } })
}

function selectFeature(id: number, fly = true) {
  const f = features.value.find((x) => x.id === id)
  const layer = layerById.get(id) as Leaflet.GeoJSON | undefined
  if (!f || !layer || !map) return
  visible[f.properties.categoryId ?? 'none'] = true
  setActive(id)
  if (fly) {
    const b = layer.getBounds()
    if (f.geometry.type === 'Point') map.flyTo(b.getCenter(), Math.max(map.getZoom(), 13), { duration: 0.8 })
    else map.flyToBounds(b, { padding: [40, 40], maxZoom: 14, duration: 0.8 })
    map.once('moveend', () => layer.openPopup(b.getCenter()))
  }
}

onMounted(async () => {
  L = (await import('leaflet')).default
  map = L.map(el.value!, { zoomControl: false, attributionControl: true, worldCopyJump: true }).setView(BINTUNI_CENTER, BINTUNI_ZOOM)
  L.control.zoom({ position: 'topright' }).addTo(map)
  L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map)
  const basemaps = await createBasemaps(L, { googleApiKey: config.public.googleMapsApiKey as string, lang: lang.value })
  basemaps.defaultLayer.addTo(map)
  L.control.layers(basemaps.layers, undefined, { position: 'topright', collapsed: window.innerWidth < 768 }).addTo(map)

  buildLayers()
  fitAll()

  const slug = route.query.f
  if (typeof slug === 'string') {
    const f = features.value.find((x) => x.properties.slug === slug)
    if (f) setTimeout(() => selectFeature(f.id), 300)
  }
})

watch(() => props.data, buildLayers)
watch(lang, buildLayers)

onBeforeUnmount(() => {
  map?.remove()
  map = undefined
})
</script>

<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-12">
    <div class="relative isolate order-1 overflow-hidden rounded-card border border-onyx-olive lg:order-2 lg:col-span-8">
      <div ref="el" class="wmc-map h-[62vh] min-h-[420px] w-full bg-moss-shadow lg:h-[72vh]" role="region" :aria-label="tr('Interactive map of Bintuni Bay', 'Peta interaktif Teluk Bintuni')" />
      <button type="button" class="absolute bottom-8 right-3 z-[500] rounded-pill border border-onyx-olive bg-forest-depths/90 px-3 py-1.5 text-caption font-medium text-pure-white backdrop-blur hover:border-electric-sprout" @click="fitAll">
        {{ tr('Show all', 'Tampilkan semua') }}
      </button>
    </div>

    <aside class="order-2 flex flex-col gap-4 lg:order-1 lg:col-span-4 lg:max-h-[72vh]">
      <div class="rounded-card border border-onyx-olive bg-forest-depths p-4">
        <p class="mb-3 font-serif text-body-md italic text-lichen-sage">{{ tr('Legend', 'Legenda') }}</p>
        <ul class="space-y-1">
          <li v-for="c in data.categories" :key="c.id">
            <label class="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-body hover:bg-moss-shadow/60">
              <input v-model="visible[c.id]" type="checkbox" class="h-4 w-4 accent-electric-sprout" />
              <span class="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-pure-white/80" :style="{ background: c.color }" />
              <span class="flex-1 text-pure-white">{{ pick(c, 'name') }}</span>
              <span class="text-caption text-lichen-sage">{{ countFor(c.id) }}</span>
            </label>
          </li>
        </ul>
      </div>

      <div class="flex min-h-0 flex-1 flex-col rounded-card border border-onyx-olive bg-forest-depths p-4">
        <input v-model="query" type="search" class="mb-3 w-full rounded-pill border border-onyx-olive bg-moss-shadow/40 px-4 py-2 text-body text-pure-white outline-none placeholder:text-lichen-sage focus:border-electric-sprout" :placeholder="tr('Search locations…', 'Cari lokasi…')" />
        <ul class="-mx-1 min-h-0 flex-1 space-y-1 overflow-y-auto px-1 max-lg:max-h-80">
          <li v-for="f in listed" :key="f.id">
            <button
              type="button"
              class="flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-moss-shadow/60"
              :class="{ '!bg-moss-shadow': activeId === f.id }"
              @click="selectFeature(f.id)"
            >
              <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" :style="{ background: colorOf(f) }" />
              <span class="min-w-0 flex-1">
                <span class="block truncate text-body font-medium text-pure-white">{{ pick(f.properties, 'name') }}</span>
                <span class="block text-caption text-lichen-sage">
                  {{ categoryName(f) }} · {{ geomLabel(f.geometry.type) }}<template v-if="f.properties.areaHa && f.properties.areaHa >= 1"> · {{ formatArea(f.properties.areaHa) }}</template>
                </span>
              </span>
            </button>
          </li>
          <li v-if="!listed.length" class="py-6 text-center text-body text-lichen-sage">{{ tr('No locations match.', 'Tidak ada lokasi yang cocok.') }}</li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<style>
/* Leaflet theming (global: Leaflet renders outside Vue's scoped tree) */
.wmc-map {
  font-family: inherit;
}
.wmc-map .leaflet-control-layers,
.wmc-map .leaflet-bar a {
  background: rgba(18, 35, 20, 0.92);
  color: #fff;
  border-color: #30322a;
}
.wmc-map .leaflet-bar {
  border: 1px solid #30322a;
  border-radius: 12px;
  overflow: hidden;
}
.wmc-map .leaflet-bar a:hover {
  background: #273f2b;
  color: #68ef3f;
}
.wmc-map .leaflet-control-layers {
  border: 1px solid #30322a !important;
  border-radius: 14px;
  padding: 6px 10px;
  font-size: 13px;
}
.wmc-map .leaflet-control-layers label {
  margin: 2px 0;
}
.wmc-map .leaflet-control-layers input {
  accent-color: #68ef3f;
}
.wmc-map .leaflet-control-attribution {
  background: rgba(18, 35, 20, 0.75);
  color: #b7bda5;
  font-size: 10px;
}
.wmc-map .leaflet-control-attribution a {
  color: #d9deca;
}
.wmc-map .leaflet-control-scale-line {
  background: rgba(18, 35, 20, 0.75);
  color: #fff;
  border-color: #b7bda5;
}
.wmc-leaflet-popup .leaflet-popup-content-wrapper {
  border-radius: 16px;
  padding: 0;
  overflow: hidden;
}
.wmc-leaflet-popup .leaflet-popup-content {
  margin: 0;
  width: 280px !important;
}
.wmc-popup {
  padding: 14px 16px 12px;
  color: #30322a;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}
.wmc-popup img {
  display: block;
  width: calc(100% + 32px);
  margin: -14px -16px 12px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.wmc-popup h3 {
  margin: 6px 0 4px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  color: #222;
}
.wmc-popup p {
  margin: 0 0 6px !important;
  font-size: 13px;
  line-height: 1.45;
}
.wmc-popup .wmc-popup-meta {
  color: #26a200;
  font-weight: 500;
}
.wmc-popup-cat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #273f2b;
}
.wmc-popup-cat::before {
  content: '';
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--c);
}
.wmc-leaflet-tooltip {
  border-radius: 8px;
  border: none;
  background: #122314;
  color: #fff;
  font-size: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
}
.wmc-leaflet-tooltip::before {
  border-top-color: #122314 !important;
}
</style>
