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
  <section
    class="wmc-section bg-primary text-text relative overflow-hidden"
  >
    <div
      class="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent/30 rounded-full blur-3xl"
    ></div>
    <div class="wmc-container relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-center">
        <div>
          <h2
            class="font-heading font-bold text-2xl leading-none mb-4 text-on-primary"
          >
            {{ title }}
          </h2>
          <p
            class="text-body-lg text-on-primary/90 leading-relaxed mb-6 max-w-xl"
          >
            {{ description }}
          </p>
          <div class="flex flex-wrap gap-3">
            <a
              href="mailto:contact@worldmangrovecenter.org"
              class="inline-flex items-center justify-center px-4 py-3 bg-accent text-on-primary font-bold rounded-md border-2 border-border hover:bg-surface hover:text-on-primary transition-all duration-base"
            >
              {{ contactLabel }}
            </a>
            <a
              :href="researchHref"
              class="inline-flex items-center justify-center px-4 py-3 bg-surface text-on-primary font-bold rounded-md border-2 border-text/30 hover:border-accent transition-all duration-base"
            >
              {{ researchLabel }}
            </a>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div
            v-for="s in defaults[lang].stats"
            :key="s.label"
            class="bg-text/5 border-2 border-text/20 rounded-xl p-5 hover:border-accent/60 hover:bg-text/10 transition-colors duration-base"
          >
            <p
              class="font-display font-extrabold text-4xl mb-2 text-accent leading-[1.38]"
            >
              {{ s.value }}
            </p>
            <p class="text-body text-on-primary/85">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
