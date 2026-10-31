<script setup lang="ts">
const head = useLocaleHead()
useHead({
  titleTemplate: (t) => (t ? `${t} | World Mangrove Center` : 'World Mangrove Center | Hub Bintuni'),
  htmlAttrs: { lang: () => head.value.htmlAttrs?.lang },
  link: () => head.value.link ?? [],
  meta: () => head.value.meta ?? [],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
