<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)
</script>

<template>
  <NuxtLayout>
    <section class="page-hero min-h-[70vh]">
      <div class="hero-orb hero-orb-1" />
      <div class="wmc-container relative">
        <span class="section-eyebrow mb-6">{{ error.statusCode }}</span>
        <h1>{{ is404 ? 'Page not found' : 'Something went wrong' }}</h1>
        <p class="mb-8">{{ is404 ? 'Halaman tidak ditemukan — the page may have moved.' : error.statusMessage || 'Please try again later.' }}</p>
        <button type="button" class="btn-sprout" @click="clearError({ redirect: '/' })">Back to home</button>
      </div>
    </section>
  </NuxtLayout>
</template>
