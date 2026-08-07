<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout: VPLayout } = DefaultTheme
const route = useRoute()
const { frontmatter } = useData()

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
</script>

<template>
  <VPLayout :class="{ 'wide-layout': isWideLayout }">
    <template #doc-footer-before>
      <slot />
    </template>
  </VPLayout>
</template>
