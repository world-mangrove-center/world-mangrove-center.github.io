<script setup lang="ts">
import { computed } from 'vue'
import { useWithBase } from '../composables/useWithBase'

interface Props {
  badge?: string
  title?: string
  subtitle?: string
  ctaPrimary?: string
  ctaSecondary?: string
  ctaPrimaryLink?: string
  ctaSecondaryLink?: string
  heroImage?: string
  lang?: 'en' | 'id'
}

const props = withDefaults(defineProps<Props>(), {
  badge: 'Hub Bintuni • Papua, Indonesia',
  title: 'Restoring Mangroves, Sustaining Life',
  subtitle:
    'An international portal and knowledge hub for mangrove forest biodiversity restoration. Leading research, conservation, and community empowerment in Bintuni Bay.',
  ctaPrimary: 'Explore Our Work',
  ctaSecondary: 'Meet the Team',
  ctaPrimaryLink: '/research-insights/',
  ctaSecondaryLink: '/team/',
  heroImage:
    'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Aerial%20view%20of%20vast%20lush%20green%20mangrove%20forest%20at%20golden%20hour%2C%20meandering%20rivers%20winding%20through%20dense%20vegetation%2C%20silt%20sediment%20plumes%20at%20river%20mouths%20meeting%20turquoise%20ocean%2C%20small%20fishing%20boats%20visible%2C%20Papua%20Indonesia%20landscape%2C%20hyper%20detailed%2C%20dramatic%20lighting&image_size=portrait_4_3',
  lang: 'en',
})

const { withBase } = useWithBase()

const primaryLink = computed(() => withBase(props.ctaPrimaryLink))
const secondaryLink = computed(() => withBase(props.ctaSecondaryLink))

const defaults = {
  en: {
    trustedBy: 'Trusted by',
    communities: '8+ Indigenous Communities',
    ramsar: {
      title: 'Ramsar Nomination',
      label: "Site of Int'l Importance",
      progress: '87% Complete • Q4 2026',
    },
    species: {
      title: 'Mangrove Species',
      label: 'Documented',
    },
  },
  id: {
    trustedBy: 'Dipercaya oleh',
    communities: '8+ Komunitas Adat',
    ramsar: {
      title: 'Nominasi Ramsar',
      label: 'Situs Penting Internasional',
      progress: '87% Selesai • Q4 2026',
    },
    species: {
      title: 'Spesies Mangrove',
      label: 'Terdokumentasi',
    },
  },
}
</script>

<template>
  <section class="relative overflow-hidden gradient-hero">
    <div
      class="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/30"
    ></div>
    <div
      class="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"
    ></div>

    <div class="wmc-container relative pt-5 pb-8 lg:pt-8 lg:pb-9">
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center"
      >
        <div class="lg:col-span-7 order-2 lg:order-1">
          <div class="hero-badge">
            <span class="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            {{ badge }}
          </div>

          <h1
            class="font-display font-extrabold text-display leading-[1.38] tracking-tight text-text mb-4"
          >
            {{ title }}
          </h1>

          <p
            class="font-body font-normal text-body-lg leading-relaxed text-text/85 mb-6 max-w-2xl"
          >
            {{ subtitle }}
          </p>

          <div class="flex flex-wrap items-center gap-3 mb-8">
            <a :href="primaryLink" class="btn-primary">
              {{ ctaPrimary }}
              <svg
                class="w-5 h-5 ml-2"
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
            <a :href="secondaryLink" class="btn-secondary">
              {{ ctaSecondary }}
            </a>
          </div>

          <div class="mt-8 grid grid-cols-3 gap-3 max-w-md">
            <div class="flex items-center gap-3">
              <div class="flex -space-x-2">
                <div
                  v-for="i in ['SN', 'BW', 'MT']"
                  :key="i"
                  class="w-8 h-8 rounded-full bg-accent border-2 border-background flex items-center justify-center text-[10px] font-bold text-on-primary"
                >
                  {{ i }}
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <p class="text-xs text-text-muted leading-tight">
                {{ defaults[lang].trustedBy }}
              </p>
              <p class="font-bold text-sm">{{ defaults[lang].communities }}</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 order-1 lg:order-2 mb-4 lg:mb-0">
          <div class="relative">
            <div
              class="aspect-[4/5] rounded-xl border-2 border-border shadow-elevated overflow-hidden bg-surface"
            >
              <img
                :src="heroImage"
                :alt="title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="floating-progress-chip -bottom-4 -left-4">
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center border border-border"
                >
                  <svg
                    class="w-5 h-5 text-on-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-bold text-xs text-text">
                    {{ defaults[lang].ramsar.title }}
                  </p>
                  <p class="text-[10px] text-text-muted">
                    {{ defaults[lang].ramsar.label }}
                  </p>
                </div>
              </div>
              <div class="progress-track">
                <div class="progress-fill w-[87%]"></div>
              </div>
              <p class="text-[10px] text-text-muted mt-1.5 font-medium">
                {{ defaults[lang].ramsar.progress }}
              </p>
            </div>
            <div class="floating-status-chip -top-4 -right-4">
              <div class="flex -space-x-1">
                <div
                  class="w-7 h-7 rounded-full bg-accent border-2 border-background"
                ></div>
                <div
                  class="w-7 h-7 rounded-full bg-primary text-on-primary border-2 border-background flex items-center justify-center text-[8px] font-bold"
                >
                  34
                </div>
              </div>
              <div>
                <p class="text-[10px] font-medium text-text-muted">
                  {{ defaults[lang].species.title }}
                </p>
                <p class="text-xs font-bold">{{ defaults[lang].species.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
