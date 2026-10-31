<script setup lang="ts">
import { images } from '~/utils/images'

const { tr } = useLocalized()
const localePath = useLocalePath()
const trustBadges = ['KEMENTERIAN LHK', 'BRIN', 'UNIPA', 'WWF-ID', 'Ramsar', 'GCF']
</script>

<template>
  <section class="hero-shell !pt-36 md:!pt-44">
    <div class="hero-orb hero-orb-1" />
    <div class="hero-orb hero-orb-2" />

    <div class="wmc-container relative">
      <div class="mb-8 flex justify-start">
        <div class="chip-event-pill">
          <svg class="h-4 w-4 text-electric-sprout" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <span>Hub Bintuni • Papua, Indonesia</span>
          <span class="t-accent">· {{ tr('Q4 2026 Ramsar Nomination', 'Nominasi Ramsar Q4 2026') }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="order-2 lg:order-1 lg:col-span-7">
          <h1 class="hero-heading mb-6">
            {{ tr('Restoring Mangroves,', 'Restorasi Mangrove,') }}<br />
            <span class="t-accent">{{ tr('Sustaining Life', 'Kehidupan Berkelanjutan') }}</span>
          </h1>
          <p class="hero-copy mb-8">
            {{
              tr(
                'An international portal and knowledge hub for mangrove forest biodiversity restoration. Leading research, conservation, and community empowerment in Bintuni Bay.',
                'Portal internasional dan pusat pengetahuan untuk restorasi keanekaragaman hayati hutan mangrove. Memimpin penelitian, konservasi, dan pemberdayaan masyarakat di Teluk Bintuni.',
              )
            }}
          </p>
          <div class="mb-12 flex flex-wrap items-center gap-4">
            <NuxtLink :to="localePath('/research-insights')" class="btn-sprout">
              {{ tr('Explore Our Work', 'Jelajahi Pekerjaan Kami') }}
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </NuxtLink>
            <NuxtLink :to="localePath('/team')" class="btn-ghost-white">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {{ tr('Meet the Team', 'Temui Tim Kami') }}
            </NuxtLink>
          </div>

          <p class="trust-caption mb-2 !text-left">{{ tr('Working alongside government, research and conservation partners', 'Bekerja bersama mitra pemerintah, riset, dan konservasi') }}</p>
          <div class="trust-logos !justify-start">
            <div v-for="b in trustBadges" :key="b" class="logo flex items-center font-serif text-lg italic tracking-wide">{{ b }}</div>
          </div>
        </div>

        <div class="order-1 lg:order-2 lg:col-span-5">
          <div class="mockup-stack">
            <div class="card-floating back">
              <img :src="images.heroBack" alt="" class="aspect-[4/3] h-full w-full object-cover" />
            </div>
            <div class="card-floating front">
              <img :src="images.heroFront" :alt="tr('Mangrove forest of Bintuni Bay', 'Hutan mangrove Teluk Bintuni')" class="aspect-[4/3] h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
