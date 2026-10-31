<script setup lang="ts">
import { fmtDateTime } from '~/utils/admin'

definePageMeta({ layout: 'admin', i18n: false, middleware: 'admin' })
useHead({ title: 'Permintaan Data' })

type Status = 'pending' | 'approved' | 'rejected'
const statusLabel: Record<Status, string> = { pending: 'Menunggu', approved: 'Disetujui', rejected: 'Ditolak' }
const statusClass: Record<Status, string> = {
  pending: 'border-transparent bg-electric-sprout text-carbon',
  approved: 'border-deep-verdant bg-sprout-wash text-moss-shadow',
  rejected: 'border-red-200 bg-red-50 text-red-800',
}

const { data: rows, refresh, error } = await useFetch<any[]>('/api/admin/data-requests', { default: () => [], server: false })
const filter = ref<Status | 'all'>('pending')
const filtered = computed(() => rows.value.filter((r) => filter.value === 'all' || r.status === filter.value))
const notes = reactive<Record<number, string>>({})

watch(rows, (v) => v.forEach((r) => (notes[r.id] ??= r.adminNotes ?? '')), { immediate: true })

async function update(id: number, body: Record<string, any>) {
  await $fetch(`/api/admin/data-requests/${id}`, { method: 'PATCH', body })
  await refresh()
}
async function remove(id: number) {
  if (!window.confirm('Hapus permintaan ini?')) return
  await $fetch(`/api/admin/data-requests/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-heading-lg font-bold text-carbon">Permintaan Akses Data</h1>
        <p class="text-body text-moss-shadow">Dari tombol "Request access" di halaman Research.</p>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <button v-for="f in (['pending', 'approved', 'rejected', 'all'] as const)" :key="f" type="button" class="btn-admin" :class="{ '!border-onyx-olive !bg-onyx-olive !text-pure-white': filter === f }" @click="filter = f">
          {{ f === 'all' ? 'Semua' : statusLabel[f] }}
        </button>
      </div>
    </div>
    <p v-if="error" class="alert-error mb-4">Gagal memuat: {{ error.statusMessage }}</p>
    <p v-if="!filtered.length" class="admin-card py-12 text-center text-body text-lichen-sage">Tidak ada permintaan.</p>

    <div class="space-y-4">
      <article v-for="r in filtered" :key="r.id" class="admin-card">
        <div class="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 class="font-semibold">{{ r.name }} <span class="font-normal text-lichen-sage">· {{ r.institution }}</span></h2>
            <a :href="`mailto:${r.email}`" class="text-body text-deep-verdant hover:underline">{{ r.email }}</a>
          </div>
          <div class="text-right">
            <span class="chip" :class="statusClass[r.status as Status]">{{ statusLabel[r.status as Status] }}</span>
            <p class="mt-1 text-caption text-lichen-sage">{{ fmtDateTime(r.createdAt) }}</p>
          </div>
        </div>
        <p class="mb-1 text-caption font-semibold uppercase tracking-wider text-lichen-sage">Dataset</p>
        <p class="mb-3 text-body">{{ r.publicationTitle ?? 'Seluruh repositori data' }}</p>
        <p class="mb-1 text-caption font-semibold uppercase tracking-wider text-lichen-sage">Tujuan penggunaan</p>
        <p class="mb-4 whitespace-pre-line text-body">{{ r.purpose }}</p>
        <label class="field-label" :for="`n-${r.id}`">Catatan internal</label>
        <textarea :id="`n-${r.id}`" v-model="notes[r.id]" rows="2" class="field-input mb-3 !min-h-0 !rounded-xl !text-body" />
        <div class="flex flex-wrap gap-2">
          <button type="button" class="btn-admin" @click="update(r.id, { adminNotes: notes[r.id] })">Simpan catatan</button>
          <button v-if="r.status !== 'approved'" type="button" class="btn-admin-primary" @click="update(r.id, { status: 'approved', adminNotes: notes[r.id] })">Setujui</button>
          <button v-if="r.status !== 'rejected'" type="button" class="btn-admin" @click="update(r.id, { status: 'rejected', adminNotes: notes[r.id] })">Tolak</button>
          <button v-if="r.status !== 'pending'" type="button" class="btn-admin" @click="update(r.id, { status: 'pending' })">Kembalikan ke menunggu</button>
          <button type="button" class="btn-admin-danger ml-auto" @click="remove(r.id)">Hapus</button>
        </div>
      </article>
    </div>
  </div>
</template>
