<script setup lang="ts">
import { computed } from 'vue'
import { useWithBase } from '../composables/useWithBase'

interface Props {
  title: string
  description?: string
  lang?: 'en' | 'id'
  icon?: string
  image?: string
}

const props = withDefaults(defineProps<Props>(), {
  description:
    'This section is under active development and will be populated with comprehensive research insights, field data, and multimedia content.',
  lang: 'en',
  icon:
    'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
})

const { withBase } = useWithBase()
const homeHref = computed(() => withBase(props.lang === 'id' ? '/id/' : '/'))
const hubHref = computed(() =>
  withBase(props.lang === 'id' ? '/id/research-insights/' : '/research-insights/'),
)

const defaults = {
  en: {
    badge: 'Content Hub',
    coming: 'Coming Soon',
    progress: 'Building Content',
    percentage: '65% Complete',
    message: 'Full page launching Q3 2026',
    backHome: 'Back to Home',
    returnLabel: 'Or explore our Knowledge Hub',
  },
  id: {
    badge: 'Pusat Konten',
    coming: 'Segera Hadir',
    progress: 'Pembangunan Konten',
    percentage: '65% Selesai',
    message: 'Halaman penuh rilis Q3 2026',
    backHome: 'Kembali ke Beranda',
    returnLabel: 'Atau jelajahi Pusat Pengetahuan kami',
  },
}
</script>

<template>
  <section class="wmc-section min-h-screen relative overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20"
    ></div>
    <div
      class="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/25 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"
    ></div>

    <div
      class="wmc-container relative flex items-center justify-center pt-5 pb-9"
    >
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center max-w-6xl w-full"
      >
        <div class="lg:col-span-7">
          <div class="hero-badge">
            <span
              class="w-2 h-2 bg-accent rounded-full animate-pulse"
            ></span>
            {{ defaults[lang].badge }}
          </div>

          <span
            class="inline-block px-3 py-1 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider rounded-pill border-2 border-border mb-5"
          >
            {{ defaults[lang].coming }}
          </span>

          <h1
            class="font-display font-extrabold text-display leading-[1.38] tracking-tight text-text mb-4 max-w-3xl"
          >
            {{ title }}
          </h1>

          <p class="text-body-lg text-text/85 leading-relaxed mb-8 max-w-xl">
            {{ description }}
          </p>

          <div class="space-y-4 max-w-md mb-8">
            <div class="flex justify-between items-center mb-2">
              <p class="text-body font-bold uppercase tracking-wider text-text/85">
                {{ defaults[lang].progress }}
              </p>
              <p class="text-body font-bold text-accent">
                {{ defaults[lang].percentage }}
              </p>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: 65%"></div>
            </div>
            <p class="text-body text-text-muted">
              {{ defaults[lang].message }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <a :href="homeHref" class="btn-primary">
              {{ defaults[lang].backHome }}
            </a>
            <a
              :href="hubHref"
              class="font-semibold text-text underline-offset-4 hover:underline"
            >
              {{ defaults[lang].returnLabel }}
            </a>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="relative mx-auto max-w-md">
            <div
              class="aspect-[4/5] rounded-xl border-2 border-border shadow-elevated overflow-hidden bg-surface"
            >
              <img
                v-if="image"
                :src="image"
                :alt="title"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/30 via-background to-background"
              >
                <svg
                  class="w-32 h-32 text-text opacity-30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    :d="icon"
                  />
                </svg>
              </div>
            </div>
            <div
              class="floating-progress-chip -bottom-4 -left-4 w-[200px]"
            >
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 h-10 bg-primary rounded-md flex items-center justify-center border border-border"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-bold text-xs text-text">
                    {{ lang === 'id' ? 'Dalam Pengembangan' : 'Active Drafts' }}
                  </p>
                  <p class="text-[10px] text-text-muted">
                    {{ defaults[lang].progress }}
                  </p>
                </div>
              </div>
              <div class="space-y-1.5">
                <div class="progress-track">
                  <div class="progress-fill w-[80%]"></div>
                </div>
                <div class="progress-track">
                  <div class="progress-fill w-[55%] bg-primary"></div>
                </div>
                <div class="progress-track">
                  <div class="progress-fill w-[30%] bg-accent/70"></div>
                </div>
              </div>
            </div>
            <div class="floating-status-chip -top-4 -right-4">
              <div>
                <span class="text-text-muted font-normal text-[10px]">
                  {{ lang === 'id' ? 'Target' : 'Target' }}
                </span>
                <p class="text-accent mt-0.5 text-sm font-bold">Q3 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
