<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; subtitle?: string }>()
</script>

<template>
  <section class="page-hero">
    <div class="hero-orb hero-orb-1" />
    <div class="hero-orb hero-orb-2" />
    <div class="wmc-container relative">
      <span v-if="eyebrow" class="section-eyebrow mb-6">{{ eyebrow }}</span>
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
      <slot />
    </div>
  </section>
</template>
