<script setup lang="ts">
import type { ColumnDef, FieldDef } from '~/utils/admin'

definePageMeta({ layout: 'admin', i18n: false, middleware: 'admin' })
useHead({ title: 'Angka Dampak' })

const groupOptions = [
  { value: 'impact', label: 'Dampak & Skala (beranda)' },
  { value: 'partners', label: 'Statistik mitra (bagian ajakan)' },
]
const fields: FieldDef[] = [
  { key: 'key', label: 'Kunci', required: true, help: 'huruf kecil & garis bawah, mis. hectares_restored' },
  { key: 'group', label: 'Kelompok', type: 'select', options: groupOptions },
  { key: 'valueEn', label: 'Nilai (EN)', required: true, help: 'mis. 12,500+' },
  { key: 'valueId', label: 'Nilai (ID)', required: true, help: 'mis. 12.500+' },
  { key: 'labelEn', label: 'Label (EN)', required: true },
  { key: 'labelId', label: 'Label (ID)', required: true },
  { key: 'icon', label: 'Ikon (SVG path, opsional)', type: 'textarea', rows: 2 },
  { key: 'sortOrder', label: 'Urutan', type: 'number' },
]
const columns: ColumnDef[] = [
  { key: 'group', label: 'Kelompok', format: (r) => (r.group === 'impact' ? 'Dampak' : 'Mitra') },
  { key: 'valueId', label: 'Nilai' },
  { key: 'labelId', label: 'Label' },
  { key: 'sortOrder', label: 'Urut' },
]
const defaults = { key: '', group: 'impact', valueEn: '', valueId: '', labelEn: '', labelId: '', icon: '', sortOrder: 100 }
</script>

<template>
  <AdminResource
    title="Angka Dampak"
    description="Angka di bagian 'Impact & Scale' beranda dan statistik mitra di bagian ajakan kerja sama."
    endpoint="/api/admin/metrics"
    :fields="fields"
    :columns="columns"
    :defaults="defaults"
  />
</template>
