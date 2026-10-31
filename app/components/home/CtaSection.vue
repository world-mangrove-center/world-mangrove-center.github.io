<script setup lang="ts">
import type { PublicMetric } from '~~/shared/types/api'

defineProps<{ stats: PublicMetric[] }>()
const { tr, pick } = useLocalized()
const localePath = useLocalePath()
</script>

<template>
  <section class="wmc-section cta-sprout relative overflow-x-hidden">
    <div
      class="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full blur-3xl"
      style="background: radial-gradient(circle, rgba(38, 162, 0, 0.5), transparent 70%)"
    />
    <div class="wmc-container relative">
      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-7">
          <h2 class="mb-5">
            {{ tr('Partner with us in advancing mangrove science and community stewardship.', 'Bermitra dengan kami dalam memajukan ilmu mangrove dan pengelolaan masyarakat.') }}
          </h2>
          <p class="mb-8 max-w-[620px]">
            {{
              tr(
                "Whether through research collaboration, funding support, or community partnership — your engagement fuels meaningful conservation outcomes in one of Earth's most vital coastal ecosystems.",
                'Baik melalui kolaborasi penelitian, dukungan pendanaan, atau kemitraan masyarakat — keterlibatan Anda mendorong hasil konservasi yang berarti di salah satu ekosistem pesisir paling vital di Bumi.',
              )
            }}
          </p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink :to="localePath('/contact')" class="btn-ghost-dark">{{ tr('Contact Us', 'Hubungi Kami') }}</NuxtLink>
            <NuxtLink :to="localePath('/research-insights')" class="btn-ghost-dark !bg-carbon !text-pure-white">
              {{ tr('Download Research', 'Unduh Hasil Riset') }}
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </NuxtLink>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 lg:col-span-5 lg:gap-6">
          <div v-for="s in stats" :key="s.key" class="stat-dark">
            <p class="n">{{ pick(s, 'value') }}</p>
            <p class="l">{{ pick(s, 'label') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
