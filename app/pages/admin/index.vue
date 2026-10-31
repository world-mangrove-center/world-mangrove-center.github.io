<script setup lang="ts">
import { fmtDateTime } from '~/utils/admin'

definePageMeta({ layout: 'admin', i18n: false, middleware: 'admin' })
useHead({ title: 'Dashboard' })

const { user } = useUserSession()
const { data, error } = await useFetch<any>('/api/admin/overview', { server: false })

const cards = computed(() => [
  { label: 'Pesan baru', value: data.value?.counts.newMessages, to: '/admin/messages', accent: true },
  { label: 'Permintaan data menunggu', value: data.value?.counts.pendingRequests, to: '/admin/data-requests', accent: true },
  { label: 'Anggota tim', value: data.value?.counts.team, to: '/admin/team' },
  { label: 'Publikasi', value: data.value?.counts.publications, to: '/admin/publications' },
])
</script>

<template>
  <div>
    <h1 class="text-heading-lg font-bold text-carbon">Halo, {{ user?.name }} 👋</h1>
    <p class="mb-8 text-body text-moss-shadow">Ringkasan konten dan pesan masuk World Mangrove Center.</p>

    <p v-if="error" class="alert-error mb-6">Gagal memuat ringkasan: {{ error.statusMessage }}</p>

    <div class="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <NuxtLink v-for="c in cards" :key="c.label" :to="c.to" class="admin-card transition-colors hover:border-deep-verdant" :class="{ '!bg-sprout-wash': c.accent && c.value }">
        <p class="font-ozik text-display font-bold text-carbon">{{ c.value ?? '–' }}</p>
        <p class="text-body text-moss-shadow">{{ c.label }}</p>
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="admin-card">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="font-semibold">Pesan terbaru</h2>
          <NuxtLink to="/admin/messages" class="text-body text-deep-verdant hover:underline">Semua →</NuxtLink>
        </div>
        <p v-if="!data?.latestMessages?.length" class="py-6 text-center text-body text-lichen-sage">Belum ada pesan.</p>
        <ul class="divide-y divide-bone-white">
          <li v-for="m in data?.latestMessages" :key="m.id" class="py-3">
            <div class="flex items-center justify-between gap-2">
              <p class="truncate font-medium">{{ m.name }} <span class="font-normal text-lichen-sage">· {{ m.email }}</span></p>
              <span v-if="m.status === 'new'" class="chip border-transparent bg-electric-sprout text-carbon">baru</span>
            </div>
            <p class="line-clamp-1 text-body text-moss-shadow">{{ m.message }}</p>
            <p class="text-caption text-lichen-sage">{{ fmtDateTime(m.createdAt) }}</p>
          </li>
        </ul>
      </div>
      <div class="admin-card">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="font-semibold">Permintaan data terbaru</h2>
          <NuxtLink to="/admin/data-requests" class="text-body text-deep-verdant hover:underline">Semua →</NuxtLink>
        </div>
        <p v-if="!data?.latestRequests?.length" class="py-6 text-center text-body text-lichen-sage">Belum ada permintaan.</p>
        <ul class="divide-y divide-bone-white">
          <li v-for="r in data?.latestRequests" :key="r.id" class="py-3">
            <div class="flex items-center justify-between gap-2">
              <p class="truncate font-medium">{{ r.name }} <span class="font-normal text-lichen-sage">· {{ r.institution }}</span></p>
              <span class="chip border-mist-green">{{ r.status }}</span>
            </div>
            <p class="line-clamp-1 text-body text-moss-shadow">{{ r.purpose }}</p>
            <p class="text-caption text-lichen-sage">{{ fmtDateTime(r.createdAt) }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
