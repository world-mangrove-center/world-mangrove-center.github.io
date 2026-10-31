<script setup lang="ts">
import { images } from '~/utils/images'

const { tr, lang } = useLocalized()
const localePath = useLocalePath()

const cards = computed(() =>
  [
    { to: '/biology/flora-ecosystem', img: images.flora, cat: ['Biology', 'Biologi'], title: ['Flora & Ecosystem', 'Flora & Ekosistem'], desc: ['Mangrove zonation patterns, species breakdown, and carbon stock assessments across Bintuni Bay.', 'Pola zonasi mangrove, analisis spesies, dan penilaian stok karbon di Teluk Bintuni.'], link: ['Explore Flora', 'Jelajahi Flora'] },
    { to: '/biology/fauna-aquatic', img: images.fauna, cat: ['Biology', 'Biologi'], title: ['Fauna & Aquatic Life', 'Fauna & Kehidupan Akuatik'], desc: ['Benthic fauna, fish species, migratory birds, and endangered species within the mangrove ecosystem.', 'Fauna bentik, spesies ikan, burung migran, dan spesies terancam di ekosistem mangrove.'], link: ['Discover Fauna', 'Temukan Fauna'] },
    { to: '/ntfp-ecotourism', img: images.ntfp, cat: ['NTFP', 'HHBK'], title: ['NTFP & Ecotourism', 'HHBK & Ekowisata'], desc: ['Sustainable non-timber forest products and community-managed eco-travel initiatives.', 'Produk hutan bukan kayu berkelanjutan dan inisiatif ekowisata yang dikelola masyarakat.'], link: ['Sustainable Products', 'Produk Berkelanjutan'] },
    { to: '/socio-economics/culture', img: images.culture, cat: ['Culture', 'Budaya'], title: ['Culture & Heritage', 'Budaya & Warisan'], desc: ['Indigenous Teluk Bintuni tribes, traditional conservation practices, and cultural wisdom.', 'Suku adat Teluk Bintuni, praktik konservasi tradisional, dan kearifan budaya.'], link: ['Learn Culture', 'Pelajari Budaya'] },
    { to: '/socio-economics/livelihood', img: images.livelihood, cat: ['Economics', 'Ekonomi'], title: ['Sustainable Livelihoods', 'Mata Pencaharian Berkelanjutan'], desc: ['Community-based economic models and sustainable fisheries management frameworks.', 'Model ekonomi berbasis masyarakat dan kerangka pengelolaan perikanan berkelanjutan.'], link: ['Livelihood Models', 'Model Mata Pencaharian'] },
    { to: '/research-insights', img: images.research, cat: ['Research', 'Riset'], title: ['Research Repository', 'Repositori Penelitian'], desc: ['Download publications, data logs, and research insights from our collaborative studies.', 'Unduh publikasi, catatan data, dan wawasan penelitian dari studi kolaboratif kami.'], link: ['Access Research', 'Akses Riset'] },
  ].map((c) => {
    const i = lang.value === 'id' ? 1 : 0
    return { to: localePath(c.to), img: c.img, cat: c.cat[i], title: c.title[i], desc: c.desc[i], link: c.link[i] }
  }),
)
</script>

<template>
  <section class="wmc-section surface-bone relative">
    <div class="wmc-container">
      <div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="max-w-2xl">
          <span class="section-eyebrow mb-5">
            <svg class="h-4 w-4 text-electric-sprout" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            {{ tr('Knowledge Hub', 'Pusat Pengetahuan') }}
          </span>
          <h2 class="t-display mb-4 text-[40px] !leading-[1.05] text-carbon">{{ tr('Explore Our Hub', 'Jelajahi Pusat Kami') }}</h2>
          <p class="text-subheading text-moss-shadow">{{ tr('Dive into the interdisciplinary dimensions of mangrove conservation.', 'Selami dimensi interdisipliner konservasi mangrove.') }}</p>
        </div>
        <NuxtLink :to="localePath('/research-insights')" class="btn-ghost-dark shrink-0 self-start md:self-auto">
          {{ tr('View All', 'Lihat Semua') }}
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <NuxtLink v-for="c in cards" :key="c.to" :to="c.to" class="explore-card">
          <div class="cover relative">
            <img :src="c.img" :alt="c.title" loading="lazy" />
            <div class="absolute left-4 top-4"><span class="tag !mb-0">{{ c.cat }}</span></div>
          </div>
          <div class="body">
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
            <span class="link-row !text-deep-verdant">
              {{ c.link }}
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
