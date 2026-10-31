<script setup lang="ts">
import type { PublicMetric } from '~~/shared/types/api'

defineProps<{ metrics: PublicMetric[] }>()
const { tr, pick } = useLocalized()
const fallbackIcon = 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
</script>

<template>
  <section class="wmc-section surface-light relative">
    <div class="wmc-container">
      <div class="mx-auto mb-12 max-w-2xl text-center">
        <span class="section-eyebrow mb-5">
          <svg class="h-4 w-4 text-electric-sprout" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          {{ tr('Impact & Scale', 'Dampak & Skala') }}
        </span>
        <h2 class="t-display mb-4 text-[40px] !leading-[1.15] text-carbon">{{ tr('Impact & Scale', 'Dampak & Skala') }}</h2>
        <p class="text-subheading text-moss-shadow">
          {{ tr('Measuring our commitment to mangrove restoration and community resilience.', 'Mengukur komitmen kami terhadap restorasi mangrove dan ketahanan komunitas.') }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <div v-for="m in metrics" :key="m.key" class="metric">
          <div class="icon-wrap">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" :d="m.icon || fallbackIcon" /></svg>
          </div>
          <p class="value">{{ pick(m, 'value') }}</p>
          <p class="label">{{ pick(m, 'label') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
