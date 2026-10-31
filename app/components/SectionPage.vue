<script setup lang="ts">
import { sections, type SectionKey } from '~/utils/sections'

const props = defineProps<{ section: SectionKey; highlights?: { en: string[]; id: string[] } }>()
const { lang } = useLocalized()
const s = computed(() => sections[props.section])

useSeoMeta({
  title: () => s.value.title[lang.value],
  description: () => s.value.description[lang.value],
  ogTitle: () => s.value.title[lang.value],
  ogDescription: () => s.value.description[lang.value],
  ogImage: () => s.value.image,
})
</script>

<template>
  <PlaceholderPage
    :eyebrow="s.eyebrow[lang]"
    :title="s.title[lang]"
    :description="s.description[lang]"
    :image="s.image"
    :highlights="highlights?.[lang]"
  />
</template>
