<script setup lang="ts">
import type { ColumnDef, FieldDef } from '~/utils/admin'

definePageMeta({ layout: 'admin', i18n: false, middleware: 'admin' })
useHead({ title: 'Peta — Kategori' })

const fields: FieldDef[] = [
  { key: 'nameId', label: 'Nama (ID)', required: true },
  { key: 'nameEn', label: 'Nama (EN)', required: true },
  { key: 'key', label: 'Kunci', required: true, help: 'huruf kecil & garis bawah, mis. restoration_site' },
  { key: 'color', label: 'Warna', type: 'color', required: true },
  { key: 'sortOrder', label: 'Urutan di legenda', type: 'number' },
  { key: 'visibleByDefault', label: 'Langsung tampil saat peta dibuka', type: 'checkbox' },
]
const columns: ColumnDef[] = [
  { key: 'color', label: '', swatch: true },
  { key: 'nameId', label: 'Nama' },
  { key: 'nameEn', label: 'Name (EN)' },
  { key: 'key', label: 'Kunci' },
  { key: 'sortOrder', label: 'Urut' },
  { key: 'visibleByDefault', label: 'Default', format: (r) => (r.visibleByDefault ? 'Tampil' : 'Disembunyikan') },
]
const defaults = { nameId: '', nameEn: '', key: '', color: '#68ef3f', sortOrder: 100, visibleByDefault: true }
</script>

<template>
  <div>
    <div class="mb-4 flex flex-wrap items-center gap-2 text-body">
      <NuxtLink to="/admin/map" class="btn-admin">Lokasi</NuxtLink>
      <NuxtLink to="/admin/map-categories" class="btn-admin-primary">Kategori & warna</NuxtLink>
    </div>
    <AdminResource
      title="Peta — Kategori"
      description="Kategori menentukan warna dan legenda di peta. Menghapus kategori tidak menghapus lokasinya (lokasi menjadi tanpa kategori)."
      endpoint="/api/admin/map-categories"
      :fields="fields"
      :columns="columns"
      :defaults="defaults"
    />
  </div>
</template>
