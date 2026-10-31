<script setup lang="ts">
import { fmtDateTime } from '~/utils/admin'

definePageMeta({ layout: 'admin', i18n: false, middleware: 'admin' })
useHead({ title: 'Pesan Masuk' })

type Status = 'new' | 'read' | 'replied' | 'archived'
const statusLabel: Record<Status, string> = { new: 'Baru', read: 'Dibaca', replied: 'Dibalas', archived: 'Arsip' }
const topicLabel: Record<string, string> = {
  general: 'Umum', research: 'Kolaborasi riset', partnership: 'Pendanaan & kemitraan', media: 'Media', volunteer: 'Karier & relawan',
}

const { data: rows, refresh, error } = await useFetch<any[]>('/api/admin/messages', { default: () => [], server: false })
const filter = ref<Status | 'all' | 'open'>('open')
const filtered = computed(() =>
  rows.value.filter((r) => (filter.value === 'all' ? true : filter.value === 'open' ? r.status !== 'archived' : r.status === filter.value)),
)
const selectedId = ref<number | null>(null)
const selected = computed(() => rows.value.find((r) => r.id === selectedId.value) ?? null)

async function setStatus(id: number, status: Status) {
  await $fetch(`/api/admin/messages/${id}`, { method: 'PATCH', body: { status } })
  await refresh()
}
async function select(r: any) {
  selectedId.value = r.id
  if (r.status === 'new') await setStatus(r.id, 'read')
}
async function remove(id: number) {
  if (!window.confirm('Hapus pesan ini secara permanen?')) return
  await $fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
  selectedId.value = null
  await refresh()
}
function replyHref(r: any) {
  const subject = encodeURIComponent(`Re: ${topicLabel[r.topic] ?? 'Pesan'} — World Mangrove Center`)
  return `mailto:${r.email}?subject=${subject}`
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-heading-lg font-bold text-carbon">Pesan Masuk</h1>
        <p class="text-body text-moss-shadow">Kiriman dari formulir kontak situs.</p>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <button v-for="f in (['open', 'new', 'read', 'replied', 'archived', 'all'] as const)" :key="f" type="button" class="btn-admin" :class="{ '!border-onyx-olive !bg-onyx-olive !text-pure-white': filter === f }" @click="filter = f">
          {{ f === 'open' ? 'Aktif' : f === 'all' ? 'Semua' : statusLabel[f] }}
        </button>
      </div>
    </div>
    <p v-if="error" class="alert-error mb-4">Gagal memuat: {{ error.statusMessage }}</p>

    <div class="grid grid-cols-1 gap-5 lg:grid-cols-5">
      <ul class="admin-card divide-y divide-bone-white !p-0 lg:col-span-2">
        <li v-if="!filtered.length" class="p-8 text-center text-body text-lichen-sage">Tidak ada pesan.</li>
        <li v-for="r in filtered" :key="r.id">
          <button type="button" class="block w-full px-4 py-3 text-left hover:bg-bone-white" :class="{ '!bg-sprout-wash': selectedId === r.id }" @click="select(r)">
            <div class="flex items-center justify-between gap-2">
              <p class="truncate" :class="r.status === 'new' ? 'font-semibold' : 'font-medium'">{{ r.name }}</p>
              <span class="shrink-0 text-caption text-lichen-sage">{{ fmtDateTime(r.createdAt) }}</span>
            </div>
            <p class="truncate text-caption text-deep-verdant">{{ topicLabel[r.topic] ?? r.topic }} · {{ statusLabel[r.status as Status] }}</p>
            <p class="line-clamp-1 text-body text-moss-shadow">{{ r.message }}</p>
          </button>
        </li>
      </ul>

      <div class="admin-card lg:col-span-3">
        <p v-if="!selected" class="py-16 text-center text-body text-lichen-sage">Pilih pesan untuk membaca.</p>
        <template v-else>
          <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 class="text-heading-sm font-semibold">{{ selected.name }}</h2>
              <a :href="`mailto:${selected.email}`" class="text-body text-deep-verdant hover:underline">{{ selected.email }}</a>
              <p v-if="selected.organization" class="text-body text-moss-shadow">{{ selected.organization }}</p>
            </div>
            <div class="text-right text-caption text-lichen-sage">
              <p>{{ fmtDateTime(selected.createdAt) }}</p>
              <p>{{ topicLabel[selected.topic] }} · bahasa {{ selected.locale.toUpperCase() }}</p>
            </div>
          </div>
          <p class="mb-6 whitespace-pre-line rounded-xl bg-bone-white p-4 text-body-md">{{ selected.message }}</p>
          <div class="flex flex-wrap gap-2">
            <a :href="replyHref(selected)" class="btn-admin-primary" @click="setStatus(selected.id, 'replied')">Balas via email</a>
            <button v-if="selected.status !== 'archived'" type="button" class="btn-admin" @click="setStatus(selected.id, 'archived')">Arsipkan</button>
            <button v-else type="button" class="btn-admin" @click="setStatus(selected.id, 'read')">Keluarkan dari arsip</button>
            <button type="button" class="btn-admin" @click="setStatus(selected.id, 'new')">Tandai belum dibaca</button>
            <button type="button" class="btn-admin-danger ml-auto" @click="remove(selected.id)">Hapus</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
