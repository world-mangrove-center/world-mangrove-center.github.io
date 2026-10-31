<script setup lang="ts">
import type { PublicMapData } from '~~/shared/types/api'

const { t } = useI18n()
const { tr } = useLocalized()
const { data, error } = await useFetch<PublicMapData>('/api/map', {
  default: (): PublicMapData => ({ categories: [], features: { type: 'FeatureCollection', features: [] } }),
})

useSeoMeta({
  title: () => tr('Interactive Map', 'Peta Interaktif'),
  description: () =>
    tr(
      'Explore restoration sites, monitoring plots, conservation areas and partner villages across Bintuni Bay, West Papua.',
      'Jelajahi lokasi restorasi, petak pemantauan, kawasan konservasi, dan kampung mitra di Teluk Bintuni, Papua Barat.',
    ),
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="tr('Spatial Data', 'Data Spasial')"
      :title="tr('Bintuni Bay Map', 'Peta Teluk Bintuni')"
      :subtitle="tr('Restoration sites, permanent monitoring plots, conservation areas and partner villages across Bintuni Bay. Switch between satellite imagery and OpenStreetMap, and filter layers by category.', 'Lokasi restorasi, petak pemantauan permanen, kawasan konservasi, dan kampung mitra di Teluk Bintuni. Beralih antara citra satelit dan OpenStreetMap, serta saring lapisan berdasarkan kategori.')"
    />
    <section class="wmc-section surface-dark !pt-10">
      <div class="wmc-container">
        <p v-if="error" class="alert-error mb-6">{{ t('common.loadError') }}</p>
        <ClientOnly>
          <MangroveMap :data="data" />
          <template #fallback>
            <div class="h-[62vh] min-h-[420px] animate-pulse rounded-card border border-onyx-olive bg-moss-shadow/40 lg:h-[72vh]" />
          </template>
        </ClientOnly>
        <p class="mt-5 text-caption text-lichen-sage">
          {{ tr('Locations shown are sample data for illustration and will be replaced by verified field data.', 'Lokasi yang ditampilkan adalah data contoh untuk ilustrasi dan akan diganti dengan data lapangan terverifikasi.') }}
        </p>
      </div>
    </section>
  </div>
</template>
