<script setup lang="ts">
import { teamCategoryOptions, type ColumnDef, type FieldDef } from '~/utils/admin'

definePageMeta({ layout: 'admin', i18n: false, middleware: 'admin' })
useHead({ title: 'Tim & Pakar' })

const catLabel = Object.fromEntries(teamCategoryOptions.map((o) => [o.value, o.label]))

const fields: FieldDef[] = [
  { key: 'name', label: 'Nama', required: true },
  { key: 'slug', label: 'Slug (URL)', required: true, help: 'huruf kecil & tanda hubung, mis. dr-siti-nurhalimah' },
  { key: 'roleEn', label: 'Jabatan (EN)', required: true },
  { key: 'roleId', label: 'Jabatan (ID)', required: true },
  { key: 'categories', label: 'Kategori', type: 'multiselect', options: teamCategoryOptions },
  { key: 'imageUrl', label: 'URL foto', type: 'url', full: true },
  { key: 'shortBioEn', label: 'Bio singkat (EN)', type: 'textarea', rows: 2 },
  { key: 'shortBioId', label: 'Bio singkat (ID)', type: 'textarea', rows: 2 },
  { key: 'bioEn', label: 'Bio lengkap (EN)', type: 'textarea', rows: 5 },
  { key: 'bioId', label: 'Bio lengkap (ID)', type: 'textarea', rows: 5 },
  { key: 'expertise', label: 'Keahlian', type: 'tags', full: true, help: 'pisahkan dengan koma' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'linkedinUrl', label: 'URL LinkedIn', type: 'url' },
  { key: 'publicationsUrl', label: 'URL Publikasi (Scholar/ORCID)', type: 'url' },
  { key: 'sortOrder', label: 'Urutan', type: 'number', help: 'angka kecil tampil lebih dulu' },
  { key: 'published', label: 'Tampilkan di situs', type: 'checkbox' },
]
const columns: ColumnDef[] = [
  { key: 'imageUrl', label: '', image: true },
  { key: 'name', label: 'Nama' },
  { key: 'roleId', label: 'Jabatan' },
  { key: 'categories', label: 'Kategori', format: (r) => r.categories.map((c: string) => catLabel[c]).join(', ') },
  { key: 'sortOrder', label: 'Urut' },
  { key: 'published', label: 'Status', format: (r) => (r.published ? 'Tayang' : 'Draf') },
]
const defaults = {
  name: '', slug: '', roleEn: '', roleId: '', categories: [], imageUrl: '', shortBioEn: '', shortBioId: '',
  bioEn: '', bioId: '', expertise: '', email: '', linkedinUrl: '', publicationsUrl: '', sortOrder: 100, published: true,
}
</script>

<template>
  <AdminResource
    title="Tim & Pakar"
    description="Profil yang tampil di halaman Our Team / Tim Kami. Isi versi Inggris (EN) dan Indonesia (ID)."
    endpoint="/api/admin/team"
    :fields="fields"
    :columns="columns"
    :defaults="defaults"
    :search-keys="['name', 'roleEn', 'roleId', 'email']"
  />
</template>
