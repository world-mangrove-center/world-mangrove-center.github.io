<script setup lang="ts">
const { tr } = useLocalized()
const { data: metrics } = await useFetch('/api/metrics', {
  default: () => ({ impact: [], partners: [] }),
})

useSeoMeta({
  title: '',
  description: () =>
    tr(
      'International portal and knowledge hub for mangrove forest biodiversity restoration in Bintuni, Papua, Indonesia.',
      'Portal internasional dan pusat pengetahuan untuk restorasi keanekaragaman hayati hutan mangrove di Bintuni, Papua, Indonesia.',
    ),
  ogTitle: 'World Mangrove Center | Hub Bintuni',
})
</script>

<template>
  <div>
    <HeroSection />
    <ImpactMetrics v-if="metrics.impact.length" :metrics="metrics.impact" />
    <MissionFeatures />
    <ExploreCards />
    <CtaSection :stats="metrics.partners" />
  </div>
</template>
