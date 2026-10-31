<script setup lang="ts">
import type { ColumnDef, FieldDef } from '~/utils/admin'

definePageMeta({ layout: 'admin', i18n: false, middleware: 'admin' })
useHead({ title: 'Publikasi' })

const typeOptions = [
  { value: 'paper', label: 'Makalah penelitian' },
  { value: 'report', label: 'Laporan teknis' },
  { value: 'data', label: 'Data / dataset' },
]
const typeLabel = Object.fromEntries(typeOptions.map((o) => [o.value, o.label]))

const fields: FieldDef[] = [
  { key: 'titleEn', label: 'Judul (EN)', type: 'textarea', rows: 2, required: true },
  { key: 'titleId', label: 'Judul (ID)', type: 'textarea', rows: 2, required: true },
  { key: 'slug', label: 'Slug', required: true },
  { key: 'type', label: 'Jenis', type: 'select', options: typeOptions },
  { key: 'authors', label: 'Penulis', full: true },
  { key: 'abstractEn', label: 'Abstrak (EN)', type: 'textarea', rows: 5 },
  { key: 'abstractId', label: 'Abstrak (ID)', type: 'textarea', rows: 5 },
  { key: 'publishedOn', label: 'Tanggal terbit', type: 'date' },
  { key: 'doi', label: 'DOI' },
  { key: 'fileSize', label: 'Ukuran file', help: 'mis. 4.2 MB' },
  { key: 'pages', label: 'Halaman', help: 'mis. 38 pp.' },
  { key: 'fileUrl', label: 'URL file / unduhan', type: 'url', full: true, help: 'Kosongkan bila akses harus diminta (tombol "Minta akses" akan tampil).' },
  { key: 'imageUrl', label: 'URL gambar sampul', type: 'url', full: true },
  { key: 'tags', label: 'Tag', type: 'tags', full: true, help: 'pisahkan dengan koma' },
  { key: 'sortOrder', label: 'Urutan', type: 'number' },
  { key: 'published', label: 'Tampilkan di situs', type: 'checkbox' },
]
const columns: ColumnDef[] = [
  { key: 'titleId', label: 'Judul' },
  { key: 'type', label: 'Jenis', format: (r) => typeLabel[r.type] ?? r.type },
  { key: 'publishedOn', label: 'Terbit' },
  { key: 'fileUrl', label: 'File', format: (r) => (r.fileUrl ? 'Ada' : 'Atas permintaan') },
  { key: 'published', label: 'Status', format: (r) => (r.published ? 'Tayang' : 'Draf') },
]
const defaults = {
  titleEn: '', titleId: '', slug: '', type: 'paper', authors: '', abstractEn: '', abstractId: '', publishedOn: '',
  doi: '', fileSize: '', pages: '', fileUrl: '', imageUrl: '', tags: '', sortOrder: 100, published: true,
}
</script>

<template>
  <AdminResource
    title="Publikasi & Data"
    description="Daftar di halaman Research & Insights. Publikasi tanpa URL file akan menampilkan tombol permintaan akses."
    endpoint="/api/admin/publications"
    :fields="fields"
    :columns="columns"
    :defaults="defaults"
    :search-keys="['titleEn', 'titleId', 'authors', 'slug']"
  />
</template>
