<script setup lang="ts">
const { user, clear } = useUserSession()
const route = useRoute()
const open = ref(false)
watch(() => route.fullPath, () => (open.value = false))

const links = [
  { to: '/admin', label: 'Dashboard', icon: 'M3 12l9-9 9 9M5 10v10h14V10' },
  { to: '/admin/team', label: 'Tim & Pakar', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { to: '/admin/publications', label: 'Publikasi', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { to: '/admin/metrics', label: 'Angka Dampak', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { to: '/admin/messages', label: 'Pesan Masuk', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { to: '/admin/data-requests', label: 'Permintaan Data', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' },
]

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/admin/login')
}
useHead({ titleTemplate: (t) => (t ? `${t} · Admin WMC` : 'Admin WMC') })
</script>

<template>
  <div class="min-h-screen bg-bone-white text-onyx-olive">
    <aside
      class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-forest-depths text-pure-white transition-transform lg:translate-x-0"
      :class="open ? 'translate-x-0' : '-translate-x-full'"
    >
      <NuxtLink to="/admin" class="flex items-center gap-3 border-b border-onyx-olive px-5 py-5">
        <img src="/favicon.svg" alt="" class="h-9 w-9 rounded-lg" />
        <div>
          <p class="text-body font-semibold leading-tight">World Mangrove Center</p>
          <p class="font-serif text-caption italic text-lichen-sage">Admin panel</p>
        </div>
      </NuxtLink>
      <nav class="flex-1 space-y-1 p-3">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-body text-pale-fern transition-colors hover:bg-moss-shadow hover:text-pure-white"
          :class="{ '!bg-moss-shadow !text-electric-sprout': route.path === l.to }"
        >
          <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" :d="l.icon" /></svg>
          {{ l.label }}
        </NuxtLink>
      </nav>
      <div class="border-t border-onyx-olive p-4 text-body">
        <p class="truncate font-medium">{{ user?.name }}</p>
        <p class="mb-3 truncate text-caption text-lichen-sage">{{ user?.email }}</p>
        <div class="flex gap-2">
          <a href="/" target="_blank" class="flex-1 rounded-lg border border-onyx-olive px-3 py-1.5 text-center text-caption hover:border-electric-sprout">Lihat situs ↗</a>
          <button type="button" class="flex-1 rounded-lg border border-onyx-olive px-3 py-1.5 text-caption hover:border-red-400 hover:text-red-300" @click="logout">Keluar</button>
        </div>
      </div>
    </aside>
    <div v-if="open" class="fixed inset-0 z-30 bg-black/40 lg:hidden" @click="open = false" />

    <div class="lg:pl-64">
      <header class="sticky top-0 z-20 flex items-center gap-3 border-b border-mist-green bg-bone-white/90 px-5 py-3 backdrop-blur lg:hidden">
        <button type="button" class="rounded-lg p-1.5 hover:bg-mist-green" aria-label="Menu" @click="open = true">
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
        <span class="font-semibold">Admin WMC</span>
      </header>
      <main class="mx-auto max-w-6xl p-5 md:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
