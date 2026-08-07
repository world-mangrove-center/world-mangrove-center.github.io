<script setup lang="ts">
import { computed } from 'vue'
import { useWithBase } from '../composables/useWithBase'

interface Props {
  title?: string
  description?: string
  lang?: 'en' | 'id'
  contactLabel?: string
  researchLabel?: string
  researchLink?: string
}

const props = withDefaults(defineProps<Props>(), {
  title:
    'Partner with us in advancing mangrove science and community stewardship.',
  description:
    "Whether through research collaboration, funding support, or community partnership — your engagement fuels meaningful conservation outcomes in one of Earth's most vital coastal ecosystems.",
  contactLabel: 'Contact Us',
  researchLabel: 'Download Research',
  researchLink: '/research-insights/',
  lang: 'en',
})

const { withBase } = useWithBase()
const researchHref = computed(() => withBase(props.researchLink))

const defaults = {
  en: {
    stats: [
      { label: 'Research Partners', value: '23+' },
      { label: 'Grant & Donors', value: '12' },
      { label: "Gov't Agencies", value: '5' },
      { label: 'Community Orgs', value: '18' },
    ],
  },
  id: {
    stats: [
      { label: 'Mitra Riset', value: '23+' },
      { label: 'Hibah & Donor', value: '12' },
      { label: 'Instansi Pemerintah', value: '5' },
      { label: 'Organisasi Masyarakat', value: '18' },
    ],
  },
}
</script>

<template>
  <section class="wmc-section cta-sprout relative overflow-hidden">
    <div
      class="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
      style="background: radial-gradient(circle, rgba(38,162,0,0.5), transparent 70%)"
    ></div>
    <div class="wmc-container relative">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div class="lg:col-span-7">
          <h2
            class="t-display mb-5 text-carbon"
            style="font-size: 48px; line-height: 1.05"
          >
            {{ title }}
          </h2>
          <p class="text-subheading text-onyx-olive font-regular mb-8" style="max-width: 620px">
            {{ description }}
          </p>
          <div class="flex flex-wrap gap-3">
            <a
              href="mailto:contact@worldmangrovecenter.org"
              class="btn-ghost-dark"
            >
              {{ contactLabel }}
            </a>
            <a :href="researchHref" class="btn-sprout">
              {{ researchLabel }}
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
        </div>
        <div class="lg:col-span-5 grid grid-cols-2 gap-4 lg:gap-6">
          <div v-for="s in defaults[lang].stats" :key="s.label" class="stat-dark">
            <p class="n">{{ s.value }}</p>
            <p class="l">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
