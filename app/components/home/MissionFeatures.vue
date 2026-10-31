<script setup lang="ts">
const { tr, lang } = useLocalized()
const localePath = useLocalePath()

const features = [
  {
    en: ['Biodiversity Research', 'Comprehensive flora and fauna surveys documenting the rich mangrove ecosystems of Bintuni Bay.'],
    id: ['Penelitian Keanekaragaman Hayati', 'Survei flora dan fauna komprehensif yang mendokumentasikan ekosistem mangrove yang kaya di Teluk Bintuni.'],
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    en: ['Community Stewardship', 'Partnering with indigenous Teluk Bintuni tribes to co-manage and protect forest resources.'],
    id: ['Pengelolaan Masyarakat', 'Bermitra dengan suku adat Teluk Bintuni untuk mengelola dan melindungi sumber daya hutan secara bersama.'],
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    en: ['Carbon & Climate', 'Quantifying blue carbon stocks and developing climate resilience frameworks for coastal communities.'],
    id: ['Karbon & Iklim', 'Mengukur stok karbon biru dan mengembangkan kerangka ketahanan iklim untuk masyarakat pesisir.'],
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    en: ['Knowledge Exchange', 'Open-access research repository and international collaboration platform for mangrove science.'],
    id: ['Pertukaran Pengetahuan', 'Repositori penelitian akses terbuka dan platform kolaborasi internasional untuk ilmu mangrove.'],
    icon: 'M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4',
  },
] as const
</script>

<template>
  <section class="wmc-section surface-dark relative overflow-x-hidden">
    <div
      class="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full blur-3xl"
      style="background: radial-gradient(circle, rgba(38, 162, 0, 0.25), transparent 70%)"
    />
    <div class="wmc-container relative">
      <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-5">
          <span class="section-eyebrow mb-5">
            <svg class="h-4 w-4 text-electric-sprout" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            {{ tr('Our Mission', 'Misi Kami') }}
          </span>
          <h2 class="t-display mb-5 text-[40px] !leading-[1.05] text-pure-white">{{ tr('Our Mission', 'Misi Kami') }}</h2>
          <p class="mb-8 text-subheading text-pale-fern">
            {{
              tr(
                'The World Mangrove Center (Hub Bintuni) advances the science and practice of mangrove ecosystem restoration through interdisciplinary research, indigenous knowledge integration, and community-led conservation models.',
                'World Mangrove Center (Hub Bintuni) memajukan ilmu pengetahuan dan praktik restorasi ekosistem mangrove melalui penelitian interdisipliner, integrasi pengetahuan adat, dan model konservasi yang dipimpin masyarakat.',
              )
            }}
          </p>
          <NuxtLink
            :to="localePath('/team')"
            class="inline-flex items-center gap-2 border-b-2 border-deep-verdant pb-0.5 font-medium text-pure-white transition-colors duration-fast hover:border-electric-sprout hover:text-electric-sprout"
          >
            {{ tr('Meet the experts behind our work', 'Temui para ahli di balik pekerjaan kami') }}
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-6">
          <div v-for="(f, i) in features" :key="i" class="feature-card" :class="{ 'sm:translate-y-6': i % 2 === 1 }">
            <div class="feature-icon-wrap">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" :d="f.icon" /></svg>
            </div>
            <h3 class="mb-2 text-heading-sm font-semibold text-pure-white">{{ f[lang][0] }}</h3>
            <p>{{ f[lang][1] }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
