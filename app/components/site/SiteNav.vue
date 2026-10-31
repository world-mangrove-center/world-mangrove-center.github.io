<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const otherLocale = computed(() => (locale.value === 'id' ? 'en' : 'id'))
const otherLabel = computed(() => (locale.value === 'id' ? 'English' : 'Indonesia'))

type NavItem = { label: string; to?: string; children?: { label: string; to: string }[] }
const items = computed<NavItem[]>(() => [
  {
    label: t('nav.biology'),
    children: [
      { label: t('nav.flora'), to: localePath('/biology/flora-ecosystem') },
      { label: t('nav.fauna'), to: localePath('/biology/fauna-aquatic') },
    ],
  },
  { label: t('nav.ntfp'), to: localePath('/ntfp-ecotourism') },
  {
    label: t('nav.socio'),
    children: [
      { label: t('nav.culture'), to: localePath('/socio-economics/culture') },
      { label: t('nav.livelihood'), to: localePath('/socio-economics/livelihood') },
    ],
  },
  { label: t('nav.ethnobiology'), to: localePath('/ethnobiology') },
  { label: t('nav.map'), to: localePath('/map') },
  { label: t('nav.research'), to: localePath('/research-insights') },
  { label: t('nav.team'), to: localePath('/team') },
])

const openMenu = ref<number | null>(null)
const mobileOpen = ref(false)
watch(() => route.fullPath, () => {
  openMenu.value = null
  mobileOpen.value = false
})

const isGroupActive = (item: NavItem) => item.children?.some((c) => route.path === c.to)
</script>

<template>
  <header class="site-nav">
    <nav class="site-nav-pill" aria-label="Main">
      <NuxtLink :to="localePath('/')" class="flex shrink-0 items-center gap-2.5 pr-2 text-pure-white">
        <img src="/favicon.svg" alt="" class="h-8 w-8 rounded-lg" />
        <span class="leading-tight">
          <span class="block whitespace-nowrap text-body font-semibold">World Mangrove Center</span>
          <span class="block font-serif text-caption italic text-lichen-sage">Hub Bintuni</span>
        </span>
      </NuxtLink>

      <ul class="ml-auto hidden items-center gap-0.5 min-[1360px]:flex">
        <li
          v-for="(item, i) in items"
          :key="item.label"
          class="relative"
          @mouseenter="item.children && (openMenu = i)"
          @mouseleave="openMenu = null"
        >
          <NuxtLink v-if="item.to" :to="item.to" class="nav-link">{{ item.label }}</NuxtLink>
          <template v-else>
            <button
              type="button"
              class="nav-link"
              :class="{ 'is-active': isGroupActive(item) }"
              :aria-expanded="openMenu === i"
              @click="openMenu = openMenu === i ? null : i"
            >
              {{ item.label }}
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div v-show="openMenu === i" class="nav-menu">
              <NuxtLink v-for="c in item.children" :key="c.to" :to="c.to">{{ c.label }}</NuxtLink>
            </div>
          </template>
        </li>
      </ul>

      <div class="ml-auto flex items-center gap-2 min-[1360px]:ml-2">
        <NuxtLink :to="switchLocalePath(otherLocale)" class="locale-btn" :title="t('nav.switchTo')">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
          <span class="hidden sm:inline">{{ otherLabel }}</span>
          <span class="sm:hidden uppercase">{{ otherLocale }}</span>
        </NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="btn-sprout-sm hidden md:inline-flex">{{ t('nav.contact') }}</NuxtLink>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full text-pure-white hover:text-electric-sprout min-[1360px]:hidden"
          :aria-label="t('nav.menu')"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </nav>

    <!-- Mobile drawer -->
    <div
      v-show="mobileOpen"
      class="mx-auto mt-2 max-w-[1320px] rounded-card border border-onyx-olive bg-forest-depths p-4 shadow-pill-nav min-[1360px]:hidden"
    >
      <template v-for="item in items" :key="item.label">
        <NuxtLink v-if="item.to" :to="item.to" class="nav-menu-mobile">{{ item.label }}</NuxtLink>
        <div v-else class="py-1">
          <p class="px-3 pt-2 font-serif text-body-md italic text-lichen-sage">{{ item.label }}</p>
          <NuxtLink v-for="c in item.children" :key="c.to" :to="c.to" class="nav-menu-mobile pl-6">{{ c.label }}</NuxtLink>
        </div>
      </template>
      <NuxtLink :to="localePath('/contact')" class="btn-sprout mt-3 w-full">{{ t('nav.contact') }}</NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.nav-menu-mobile {
  @apply block rounded-xl px-3 py-2.5 text-body-md text-pure-white hover:bg-moss-shadow hover:text-electric-sprout;
}
.nav-menu-mobile.router-link-active {
  @apply text-electric-sprout;
}
</style>
