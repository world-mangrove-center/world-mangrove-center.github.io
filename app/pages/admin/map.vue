<script setup lang="ts">
import type { ColumnDef, FieldDef } from '~/utils/admin'

definePageMeta({ layout: 'admin', i18n: false, middleware: 'admin' })
useHead({ title: 'Peta — Lokasi' })

const { data: categories } = await useFetch<any[]>('/api/admin/map-categories', { default: () => [], server: false })
const { data: allFeatures, refresh: refreshRef } = await useFetch<any[]>('/api/admin/map-features', { default: () => [], server: false, key: 'map-ref' })

const catById = computed(() => new Map(categories.value.map((c) => [c.id, c])))
const colorFor = (row: Record<string, any>) => catById.value.get(Number(row.categoryId))?.color ?? '#68ef3f'
const geomLabel: Record<string, string> = { Point: 'Titik', LineString: 'Garis', Polygon: 'Poligon', MultiPolygon: 'Multipoligon' }

const fields = computed<FieldDef[]>(() => [
  { key: 'nameId', label: 'Nama (ID)', required: true },
  { key: 'nameEn', label: 'Nama (EN)', required: true },
  { key: 'slug', label: 'Slug', required: true, help: 'huruf kecil & tanda hubung; dipakai di tautan ?f=slug' },
  {
    key: 'categoryId',
    label: 'Kategori',
    type: 'select',
    options: [{ value: '', label: '— Tanpa kategori —' }, ...categories.value.map((c) => ({ value: c.id, label: c.nameId }))],
  },
  {
    key: 'geometry',
    label: 'Lokasi / geometri',
    type: 'geometry',
    required: true,
    geometryColor: colorFor,
    geometryReference: (row) =>
      allFeatures.value
        .filter((f) => f.id !== row.id)
        .map((f) => ({ geometry: f.geometry, color: catById.value.get(f.categoryId)?.color ?? '#7e8371', name: f.nameId })),
  },
  { key: 'descriptionId', label: 'Deskripsi (ID)', type: 'textarea', rows: 3 },
  { key: 'descriptionEn', label: 'Deskripsi (EN)', type: 'textarea', rows: 3 },
  { key: 'areaHa', label: 'Luas (ha)', type: 'number', help: 'opsional' },
  { key: 'year', label: 'Tahun mulai', type: 'number', help: 'opsional, mis. 2021' },
  { key: 'imageUrl', label: 'URL foto', type: 'url', full: true },
  { key: 'sortOrder', label: 'Urutan', type: 'number' },
  { key: 'published', label: 'Tampilkan di peta publik', type: 'checkbox' },
])

const columns = computed<ColumnDef[]>(() => [
  { key: 'nameId', label: 'Nama' },
  { key: 'categoryId', label: 'Kategori', format: (r) => catById.value.get(r.categoryId)?.nameId ?? '—' },
  { key: 'geometry', label: 'Jenis', format: (r) => geomLabel[r.geometry?.type] ?? '?' },
  { key: 'areaHa', label: 'Luas', format: (r) => (r.areaHa != null ? `${Number(r.areaHa).toLocaleString('id-ID')} ha` : '') },
  { key: 'published', label: 'Status', format: (r) => (r.published ? 'Tayang' : 'Draf') },
])

const defaults = {
  nameId: '', nameEn: '', slug: '', categoryId: '', geometry: null, descriptionId: '', descriptionEn: '',
  areaHa: '', year: '', imageUrl: '', sortOrder: 100, published: true,
}
</script>

<template>
  <div>
    <div class="mb-4 flex flex-wrap items-center gap-2 text-body">
      <NuxtLink to="/admin/map" class="btn-admin-primary">Lokasi</NuxtLink>
      <NuxtLink to="/admin/map-categories" class="btn-admin">Kategori & warna</NuxtLink>
      <a href="/map" target="_blank" class="ml-auto text-deep-verdant hover:underline">Lihat peta publik ↗</a>
    </div>
    <AdminResource
      title="Peta — Lokasi"
      description="Titik, garis, dan area di halaman Peta. Gambar langsung di peta, isi koordinat, atau tempel GeoJSON dari QGIS/geojson.io."
      endpoint="/api/admin/map-features"
      :fields="fields"
      :columns="columns"
      :defaults="defaults"
      :search-keys="['nameId', 'nameEn', 'slug']"
      @saved="refreshRef"
    />
  </div>
</template>
