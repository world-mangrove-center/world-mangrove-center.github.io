<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; description: string; image?: string; highlights?: string[] }>()
const { tr } = useLocalized()
const localePath = useLocalePath()
</script>

<template>
  <div>
    <PageHero :eyebrow="eyebrow" :title="title" :subtitle="description" />
    <section class="wmc-section surface-bone !pt-14">
      <div class="wmc-container grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <span class="chip mb-5 border-transparent bg-electric-sprout text-carbon">{{ tr('Coming Soon', 'Segera Hadir') }}</span>
          <h2 class="mb-4 text-heading-lg font-semibold text-carbon">{{ tr('This section is being built with our field teams', 'Bagian ini sedang disusun bersama tim lapangan kami') }}</h2>
          <p class="mb-6 max-w-xl text-body-md text-onyx-olive">
            {{ tr('Field data, species keys and multimedia stories are being curated and will be published here progressively.', 'Data lapangan, kunci identifikasi spesies, dan cerita multimedia sedang dikurasi dan akan diterbitkan bertahap di sini.') }}
          </p>
          <ul v-if="highlights?.length" class="mb-8 space-y-2">
            <li v-for="h in highlights" :key="h" class="flex items-start gap-3 text-body-md text-moss-shadow">
              <svg class="mt-1 h-4 w-4 shrink-0 text-deep-verdant" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7" /></svg>
              {{ h }}
            </li>
          </ul>
          <div class="flex flex-wrap items-center gap-3">
            <NuxtLink :to="localePath('/research-insights')" class="btn-ghost-dark !bg-onyx-olive !text-pure-white">{{ tr('Browse research', 'Lihat riset') }}</NuxtLink>
            <NuxtLink :to="localePath('/contact')" class="btn-ghost-dark">{{ tr('Contribute data', 'Kontribusikan data') }}</NuxtLink>
          </div>
        </div>
        <div class="lg:col-span-5">
          <div class="overflow-hidden rounded-card border border-mist-green bg-mist-green shadow-float-card">
            <img v-if="image" :src="image" :alt="title" class="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
