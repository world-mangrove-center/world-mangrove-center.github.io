<script setup lang="ts">
import { computed } from 'vue'
import { useWithBase } from '../composables/useWithBase'

interface Props {
  title?: string
  subtitle?: string
  viewAllLink?: string
  viewAllLabel?: string
  eyebrow?: string
  lang?: 'en' | 'id'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Explore Our Hub',
  subtitle:
    'Dive into the interdisciplinary dimensions of mangrove conservation.',
  viewAllLink: '/research-insights/',
  viewAllLabel: 'View All',
  eyebrow: 'Knowledge Hub',
  lang: 'en',
})

const { withBase } = useWithBase()

const viewAllHref = computed(() => withBase(props.viewAllLink))
const cardsWithBase = computed(() =>
  defaults[props.lang].cards.map((c) => ({ ...c, link: withBase(c.link) })),
)

const defaults = {
  en: {
    categoryLabels: [
      'Biology',
      'Biology',
      'NTFP',
      'Culture',
      'Economics',
      'Research',
    ],
    cards: [
      {
        title: 'Flora & Ecosystem',
        description:
          'Mangrove zonation patterns, species breakdown, and carbon stock assessments across Bintuni Bay.',
        link: '/biology/flora-ecosystem',
        linkText: 'Explore Flora',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Wide%20panoramic%20shot%20of%20Bintuni%20Bay%20mangrove%20zonation%20pattern%20from%20drone%2C%20distinct%20bands%20of%20Avicennia%2C%20Rhizophora%2C%20Bruguiera%20species%20along%20tidal%20gradient%2C%20Papua%20Indonesia&image_size=landscape_4_3',
      },
      {
        title: 'Fauna & Aquatic Life',
        description:
          'Benthic fauna, fish species, migratory birds, and endangered species within the mangrove ecosystem.',
        link: '/biology/fauna-aquatic',
        linkText: 'Discover Fauna',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Vibrant%20school%20of%20colorful%20coral%20reef%20fish%20swimming%20among%20mangrove%20prop%20roots%20underwater%2C%20blue%20green%20sun%20rays%20shining%20through%20water%20surface%2C%20juvenile%20snapper%20and%20grunt%20fish%2C%20clear%20tropical%20water%2C%20Indonesia&image_size=landscape_4_3',
      },
      {
        title: 'NTFP & Ecotourism',
        description:
          'Sustainable non-timber forest products and community-managed eco-travel initiatives.',
        link: '/ntfp-ecotourism/',
        linkText: 'Sustainable Products',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Traditional%20handmade%20woven%20palm%20leaf%20baskets%20and%20artisan%20crafts%20from%20Papua%20Indonesia%2C%20dried%20mangrove%20crab%2C%20Nypa%20palm%20sugar%20jars%2C%20displayed%20on%20rustic%20wooden%20table%2C%20soft%20natural%20lighting%2C%20indigenous%20NTFP%20products&image_size=landscape_4_3',
      },
      {
        title: 'Culture & Heritage',
        description:
          'Indigenous Teluk Bintuni tribes, traditional conservation practices, and cultural wisdom.',
        link: '/socio-economics/culture',
        linkText: 'Learn Culture',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Papuan%20traditional%20cultural%20ceremony%20dance%20with%20face%20paint%2C%20cassowary%20feather%20headdresses%2C%20shell%20ornaments%2C%20elders%20and%20youth%20performing%20at%20coastal%20village%2C%20Teluk%20Bintuni&image_size=landscape_4_3',
      },
      {
        title: 'Sustainable Livelihoods',
        description:
          'Community-based economic models and sustainable fisheries management frameworks.',
        link: '/socio-economics/livelihood',
        linkText: 'Livelihood Models',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Papuan%20fishermen%20in%20traditional%20wooden%20dugout%20canoe%20on%20calm%20mangrove%20river%2C%20checking%20sustainable%20fishing%20net%2C%20early%20morning%20mist%2C%20golden%20sun%20light%2C%20dense%20green%20mangrove%20walls%2C%20livelihood%20Bintuni&image_size=landscape_4_3',
      },
      {
        title: 'Research Repository',
        description:
          'Download publications, data logs, and research insights from our collaborative studies.',
        link: '/research-insights/',
        linkText: 'Access Research',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Marine%20biologist%20in%20waders%20holding%20water%20sample%20test%20kit%2C%20data%20tablet%2C%20field%20notebook%2C%20in%20mangrove%20forest%2C%20measuring%20blue%20carbon%20sediment%20core%2C%20community%20rangers%20in%20background%2C%20research%20expedition%20Papua&image_size=landscape_4_3',
      },
    ],
  },
  id: {
    categoryLabels: [
      'Biologi',
      'Biologi',
      'HHBK',
      'Budaya',
      'Ekonomi',
      'Riset',
    ],
    cards: [
      {
        title: 'Flora & Ekosistem',
        description:
          'Pola zonasi mangrove, analisis spesies, dan penilaian stok karbon di Teluk Bintuni.',
        link: '/id/biology/flora-ecosystem',
        linkText: 'Jelajahi Flora',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Wide%20panoramic%20shot%20of%20Bintuni%20Bay%20mangrove%20zonation%20pattern%20from%20drone%2C%20distinct%20bands%20of%20Avicennia%2C%20Rhizophora%2C%20Bruguiera%20species%20along%20tidal%20gradient%2C%20Papua%20Indonesia&image_size=landscape_4_3',
      },
      {
        title: 'Fauna & Kehidupan Akuatik',
        description:
          'Fauna bentik, spesies ikan, burung migran, dan spesies terancam di ekosistem mangrove.',
        link: '/id/biology/fauna-aquatic',
        linkText: 'Temukan Fauna',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Vibrant%20school%20of%20colorful%20coral%20reef%20fish%20swimming%20among%20mangrove%20prop%20roots%20underwater%2C%20blue%20green%20sun%20rays%20shining%20through%20water%20surface%2C%20juvenile%20snapper%20and%20grunt%20fish%2C%20clear%20tropical%20water%2C%20Indonesia&image_size=landscape_4_3',
      },
      {
        title: 'HHBK & Ekowisata',
        description:
          'Produk hutan bukan kayu berkelanjutan dan inisiatif ekowisata yang dikelola masyarakat.',
        link: '/id/ntfp-ecotourism/',
        linkText: 'Produk Berkelanjutan',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Traditional%20handmade%20woven%20palm%20leaf%20baskets%20and%20artisan%20crafts%20from%20Papua%20Indonesia%2C%20dried%20mangrove%20crab%2C%20Nypa%20palm%20sugar%20jars%2C%20displayed%20on%20rustic%20wooden%20table%2C%20soft%20natural%20lighting%2C%20indigenous%20NTFP%20products&image_size=landscape_4_3',
      },
      {
        title: 'Budaya & Warisan',
        description:
          'Suku adat Teluk Bintuni, praktik konservasi tradisional, dan kearifan budaya.',
        link: '/id/socio-economics/culture',
        linkText: 'Pelajari Budaya',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Papuan%20traditional%20cultural%20ceremony%20dance%20with%20face%20paint%2C%20cassowary%20feather%20headdresses%2C%20shell%20ornaments%2C%20elders%20and%20youth%20performing%20at%20coastal%20village%2C%20Teluk%20Bintuni&image_size=landscape_4_3',
      },
      {
        title: 'Mata Pencaharian Berkelanjutan',
        description:
          'Model ekonomi berbasis masyarakat dan kerangka pengelolaan perikanan berkelanjutan.',
        link: '/id/socio-economics/livelihood',
        linkText: 'Model Mata Pencaharian',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Papuan%20fishermen%20in%20traditional%20wooden%20dugout%20canoe%20on%20calm%20mangrove%20river%2C%20checking%20sustainable%20fishing%20net%2C%20early%20morning%20mist%2C%20golden%20sun%20light%2C%20dense%20green%20mangrove%20walls%2C%20livelihood%20Bintuni&image_size=landscape_4_3',
      },
      {
        title: 'Repositori Penelitian',
        description:
          'Unduh publikasi, catatan data, dan wawasan penelitian dari studi kolaboratif kami.',
        link: '/id/research-insights/',
        linkText: 'Akses Riset',
        image:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Marine%20biologist%20in%20waders%20holding%20water%20sample%20test%20kit%2C%20data%20tablet%2C%20field%20notebook%2C%20in%20mangrove%20forest%2C%20measuring%20blue%20carbon%20sediment%20core%2C%20community%20rangers%20in%20background%2C%20research%20expedition%20Papua&image_size=landscape_4_3',
      },
    ],
  },
}
</script>

<template>
  <section class="wmc-section surface-bone relative">
    <div class="wmc-container">
      <div
        class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12"
      >
        <div class="max-w-2xl">
          <span class="section-eyebrow mb-5">
            <svg
              class="w-4 h-4 text-electric-sprout"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            {{ eyebrow }}
          </span>
          <h2
            class="t-display mb-4 text-carbon"
            style="font-size: 40px; line-height: 1.05"
          >
            {{ title }}
          </h2>
          <p class="text-subheading text-moss-shadow font-regular">
            {{ subtitle }}
          </p>
        </div>
        <a
          :href="viewAllHref"
          class="btn-ghost-dark shrink-0 self-start md:self-auto"
        >
          {{ viewAllLabel }}
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <a
          v-for="(c, i) in cardsWithBase"
          :key="i"
          :href="c.link"
          class="explore-card"
        >
          <div class="cover">
            <img
              :src="c.image"
              :alt="c.title"
              loading="lazy"
            />
            <div class="absolute top-4 left-4">
              <span class="tag">
                {{ defaults[lang].categoryLabels[i] }}
              </span>
            </div>
          </div>
          <div class="body">
            <h3>{{ c.title }}</h3>
            <p>{{ c.description }}</p>
            <span class="link-row">
              {{ c.linkText }}
              <svg
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
