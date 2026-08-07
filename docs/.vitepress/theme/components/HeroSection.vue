<script setup lang="ts">
import { computed } from 'vue'
import { useWithBase } from '../composables/useWithBase'

interface Props {
  badgeEvent?: string
  badgeHighlight?: string
  title?: string
  titleAccent?: string
  subtitle?: string
  ctaPrimary?: string
  ctaSecondary?: string
  ctaPrimaryLink?: string
  ctaSecondaryLink?: string
  heroImageFront?: string
  heroImageBack?: string
  lang?: 'en' | 'id'
  trustedCaption?: string
  trustBadges?: { label: string }[]
}

const props = withDefaults(defineProps<Props>(), {
  badgeEvent: '',
  badgeHighlight: '',
  title: 'Restoring Mangroves,',
  titleAccent: 'Sustaining Life',
  subtitle:
    'An international portal and knowledge hub for mangrove forest biodiversity restoration. Leading research, conservation, and community empowerment in Bintuni Bay.',
  ctaPrimary: 'Explore Our Work',
  ctaSecondary: 'Meet the Team',
  ctaPrimaryLink: '/research-insights/',
  ctaSecondaryLink: '/team/',
  heroImageFront:
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Aerial%20view%20of%20vast%20lush%20green%20mangrove%20forest%20at%20golden%20hour%2C%20meandering%20rivers%20winding%20through%20dense%20vegetation%2C%20silt%20sediment%20plumes%20at%20river%20mouths%20meeting%20turquoise%20ocean%2C%20small%20fishing%20boats%20visible%2C%20Papua%20Indonesia%20landscape%2C%20hyper%20detailed%2C%20dramatic%20lighting&image_size=landscape_4_3',
  heroImageBack:
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Clean%20white%20scientific%20dashboard%20UI%20showing%20mangrove%20biodiversity%20monitoring%20metrics%20and%20blue%20carbon%20charts%2C%20minimal%20design%2C%20flat%20surfaces%2C%20thin%20green%20borders%2C%20status%20badges%2C%20editorial&image_size=landscape_4_3',
  lang: 'en',
  trustedCaption: 'They put their trust in us, as do more than 100,000 users',
  trustBadges: () => [
    { label: 'KEMENTERIAN LHK' },
    { label: 'BRIN' },
    { label: 'UNIPA' },
    { label: 'WWF-ID' },
    { label: 'Ramsar' },
    { label: 'GCF' },
  ],
})

const { withBase } = useWithBase()
const primaryLink = computed(() => withBase(props.ctaPrimaryLink))
const secondaryLink = computed(() => withBase(props.ctaSecondaryLink))
</script>

<template>
  <section class="hero-shell">
    <div class="hero-orb hero-orb-1"></div>
    <div class="hero-orb hero-orb-2"></div>

    <div class="wmc-container relative pt-8 md:pt-10">
      <!-- Event pill -->
      <div class="flex justify-start mb-8">
        <div class="chip-event-pill">
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span v-if="badgeEvent">{{ badgeEvent }}</span>
          <span v-else>
            <span v-if="lang === 'en'">
              Hub Bintuni • Papua, Indonesia
            </span>
            <span v-else>
              Hub Bintuni • Papua, Indonesia
            </span>
          </span>
          <span class="t-accent" v-if="badgeHighlight">
            · {{ badgeHighlight }}
          </span>
          <span class="t-accent" v-else>
            <span v-if="lang === 'en'"> · Q4 2026 Ramsar Nomination</span>
            <span v-else> · Nominasi Ramsar Q4 2026</span>
          </span>
        </div>
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <div class="lg:col-span-7 order-2 lg:order-1">
          <h1 class="hero-heading mb-6">
            {{ title }}<br />
            <span class="t-accent">{{ titleAccent }}</span>
          </h1>

          <p class="hero-copy mb-8">{{ subtitle }}</p>

          <div class="flex flex-wrap items-center gap-4 mb-12">
            <a :href="primaryLink" class="btn-sprout">
              {{ ctaPrimary }}
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
            <a :href="secondaryLink" class="btn-ghost-white">
              <svg
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {{ ctaSecondary }}
            </a>
          </div>

          <p class="trust-caption mb-2">{{ trustedCaption }}</p>
          <div class="trust-logos">
            <div
              v-for="(b, i) in trustBadges"
              :key="i"
              class="logo font-instrument-serif italic flex items-center justify-center text-lg"
              style="padding: 0 12px; letter-spacing: 0.02em"
            >
              {{ b.label }}
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 order-1 lg:order-2 mb-4 lg:mb-0">
          <div class="mockup-stack">
            <div class="card-floating back">
              <img
                :src="heroImageBack"
                alt=""
                class="w-full h-full object-cover"
                style="aspect-ratio: 4 / 3"
              />
            </div>
            <div class="card-floating front">
              <img
                :src="heroImageFront"
                :alt="title"
                class="w-full h-full object-cover"
                style="aspect-ratio: 4 / 3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
