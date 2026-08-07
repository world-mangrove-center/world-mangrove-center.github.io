<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  lang?: 'en' | 'id'
}

withDefaults(defineProps<Props>(), {
  title: 'Impact & Scale',
  subtitle:
    'Measuring our commitment to mangrove restoration and community resilience.',
  lang: 'en',
})

const defaults = {
  en: {
    badge: 'Impact & Scale',
    m1: { value: '12,500+', label: 'Hectares of Mangrove Restored' },
    m2: { value: '34', label: 'Species of Mangrove Documented' },
    m3: { value: '8', label: 'Indigenous Communities Partnered' },
    m4: { value: '47', label: 'Research Publications' },
  },
  id: {
    badge: 'Dampak & Skala',
    m1: { value: '12.500+', label: 'Hektar Mangrove Direhabilitasi' },
    m2: { value: '34', label: 'Spesies Mangrove Terdokumentasi' },
    m3: { value: '8', label: 'Komunitas Adat Bermitra' },
    m4: { value: '47', label: 'Publikasi Penelitian' },
  },
}

const metrics = [
  {
    icon:
      'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    color: 'bg-primary/60',
    key: 'm1',
  },
  {
    icon:
      'M12 2C8 8 5 12 5 16c0 3.5 3 6 7 6s7-2.5 7-6c0-4-3-8-7-14z',
    color: 'bg-accent/60',
    key: 'm2',
  },
  {
    icon:
      'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    color: 'bg-primary/60',
    key: 'm3',
  },
  {
    icon:
      'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    color: 'bg-accent/60',
    key: 'm4',
  },
]
</script>

<template>
  <section class="wmc-section bg-background relative">
    <div class="wmc-container">
      <div class="text-center max-w-2xl mx-auto mb-7">
        <span class="section-badge">
          {{ defaults[lang].badge }}
        </span>
        <h2
          class="font-heading font-bold text-2xl leading-none mb-3 text-text"
        >
          {{ title }}
        </h2>
        <p class="text-body text-text-muted">{{ subtitle }}</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div
          v-for="(m, i) in metrics"
          :key="i"
          class="card p-4 lg:p-5 group cursor-default"
        >
          <div
            :class="[
              m.color,
              'w-12 h-12 rounded-md border-2 border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-base',
            ]"
          >
            <svg
              class="w-6 h-6 text-on-primary"
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
          <p
            class="font-display font-extrabold text-5xl lg:text-6xl text-text mb-2 tracking-tight leading-[1.38]"
          >
            {{ defaults[lang][m.key as 'm1'].value }}
          </p>
          <p
            class="text-body text-text-muted font-medium leading-[1.43]"
          >
            {{ defaults[lang][m.key as 'm1'].label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
