<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout: VPLayout } = DefaultTheme
const route = useRoute()
const { frontmatter, site, theme } = useData()

const isHomePage = computed(
  () =>
    route.path === '/' ||
    route.path === '/id/' ||
    frontmatter.value.layout === 'home',
)

const isTeamPage = computed(
  () => route.path.includes('/team/'),
)

const isResearchPage = computed(
  () => route.path.includes('/research-insights/'),
)

const isWideLayout = computed(
  () =>
    isHomePage.value ||
    isTeamPage.value ||
    isResearchPage.value ||
    frontmatter.value.wide === true,
)

const isIndonesian = computed(() => route.path.startsWith('/id/'))

const switcherLabel = computed(() => (isIndonesian.value ? 'Indonesia' : 'English'))

const oppositeHref = computed(() => {
  const p = route.path
  const base = site.value.base || '/'
  const cleaned = base && base !== '/' && p.startsWith(base) ? p.slice(base.length) : p
  if (isIndonesian.value) {
    return base + cleaned.replace(/^\/id/, '') || base + '/'
  } else {
    const noSlash = cleaned.replace(/^\//, '')
    return base + '/id/' + noSlash
  }
})
</script>

<template>
  <VPLayout :class="{ 'wide-layout': isWideLayout }">
    <template #nav-bar-content-after>
      <div class="wmc-locale-switcher" aria-label="Language switcher">
        <a
          :href="oppositeHref"
          class="wmc-locale-btn"
          :title="isIndonesian ? 'Switch to English' : 'Beralih ke Bahasa Indonesia'"
        >
          <svg class="wmc-locale-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M2 12h20"></path>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span class="wmc-locale-txt">{{ switcherLabel }}</span>
          <svg class="wmc-locale-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </a>
      </div>
    </template>
    <template #doc-footer-before>
      <slot />
    </template>
  </VPLayout>
</template>
