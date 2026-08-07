<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  eyebrow?: string
  lang?: 'en' | 'id'
}

withDefaults(defineProps<Props>(), {
  title: 'Impact & Scale',
  subtitle:
    'Measuring our commitment to mangrove restoration and community resilience.',
  eyebrow: 'Impact & Scale',
  lang: 'en',
})

const defaults = {
  en: {
    m1: { value: '12,500+', label: 'Hectares of Mangrove Restored' },
    m2: { value: '34', label: 'Species of Mangrove Documented' },
    m3: { value: '8', label: 'Indigenous Communities Partnered' },
    m4: { value: '47', label: 'Research Publications' },
  },
  id: {
    m1: { value: '12.500+', label: 'Hektar Mangrove Direhabilitasi' },
    m2: { value: '34', label: 'Spesies Mangrove Terdokumentasi' },
    m3: { value: '8', label: 'Komunitas Adat Bermitra' },
    m4: { value: '47', label: 'Publikasi Penelitian' },
  },
}

const metrics = [
  {
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    key: 'm1' as const,
  },
  {
    icon: 'M12 2C8 8 5 12 5 16c0 3.5 3 6 7 6s7-2.5 7-6c0-4-3-8-7-14z',
    key: 'm2' as const,
  },
  {
    icon:
      'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    key: 'm3' as const,
  },
  {
    icon:
      'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    key: 'm4' as const,
  },
]
</script>

<template>
  <section class="wmc-section surface-light relative">
    <div class="wmc-container">
      <div class="text-center max-w-2xl mx-auto mb-10 md:mb-12">
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
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          {{ eyebrow }}
        </span>
        <h2 class="t-display mb-4 text-carbon" style="font-size: 40px; line-height: 1.15">
          {{ title }}
        </h2>
        <p class="text-subheading text-moss-shadow font-regular">
          {{ subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div v-for="(m, i) in metrics" :key="i" class="metric">
          <div class="icon-wrap">
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                :d="m.icon"
              />
            </svg>
          </div>
          <p class="value">
            {{ defaults[lang][m.key].value }}
          </p>
          <p class="label">
            {{ defaults[lang][m.key].label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
