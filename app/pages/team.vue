<script setup lang="ts">
import type { PublicTeamMember } from '~~/shared/types/api'

const { t } = useI18n()
const { tr } = useLocalized()
const { data: members, error } = await useFetch<PublicTeamMember[]>('/api/team', { default: () => [] })

useSeoMeta({
  title: () => tr('Our Team & Experts', 'Tim & Pakar Kami'),
  description: () =>
    tr(
      'Meet the interdisciplinary team of researchers, conservation specialists, and indigenous knowledge holders behind the World Mangrove Center.',
      'Kenali tim interdisipliner peneliti, spesialis konservasi, dan pemegang pengetahuan adat di balik World Mangrove Center.',
    ),
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="tr('People', 'Orang-orang')"
      :title="tr('Meet Our Team & Experts', 'Temui Tim & Pakar Kami')"
      :subtitle="tr('The interdisciplinary team of researchers, conservation specialists, and indigenous knowledge holders behind the World Mangrove Center.', 'Tim interdisipliner peneliti, spesialis konservasi, dan pemegang pengetahuan adat di balik World Mangrove Center.')"
    />
    <div v-if="error" class="wmc-container py-16"><p class="alert-error">{{ t('common.loadError') }}</p></div>
    <TeamGrid v-else :members="members" />
  </div>
</template>
