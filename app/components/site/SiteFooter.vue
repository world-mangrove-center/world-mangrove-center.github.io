<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-onyx-olive bg-forest-depths text-pure-white">
    <div class="wmc-container grid grid-cols-1 gap-10 py-14 md:grid-cols-12">
      <div class="md:col-span-5">
        <div class="mb-4 flex items-center gap-3">
          <img src="/favicon.svg" alt="" class="h-10 w-10 rounded-xl" />
          <div>
            <p class="font-semibold">World Mangrove Center</p>
            <p class="font-serif text-body italic text-lichen-sage">Hub Bintuni</p>
          </div>
        </div>
        <p class="max-w-sm text-body text-pale-fern">{{ t('footer.tagline') }}</p>
      </div>
      <div class="md:col-span-3">
        <p class="mb-3 font-serif text-body-md italic text-lichen-sage">{{ t('footer.explore') }}</p>
        <ul class="space-y-2 text-body">
          <li><NuxtLink :to="localePath('/biology/flora-ecosystem')" class="footer-link">{{ t('nav.flora') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/biology/fauna-aquatic')" class="footer-link">{{ t('nav.fauna') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/ntfp-ecotourism')" class="footer-link">{{ t('nav.ntfp') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/ethnobiology')" class="footer-link">{{ t('nav.ethnobiology') }}</NuxtLink></li>
        </ul>
      </div>
      <div class="md:col-span-4">
        <p class="mb-3 font-serif text-body-md italic text-lichen-sage">{{ t('footer.organization') }}</p>
        <ul class="space-y-2 text-body">
          <li><NuxtLink :to="localePath('/research-insights')" class="footer-link">{{ t('nav.research') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/team')" class="footer-link">{{ t('nav.team') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/contact')" class="footer-link">{{ t('nav.contact') }}</NuxtLink></li>
          <li><a :href="`mailto:${config.public.contactEmail}`" class="footer-link">{{ config.public.contactEmail }}</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-onyx-olive">
      <div class="wmc-container flex flex-col gap-2 py-6 text-caption text-lichen-sage md:flex-row md:justify-between">
        <p>© {{ year }} World Mangrove Center · Teluk Bintuni, Papua Barat, Indonesia</p>
        <p>{{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  @apply text-pale-fern transition-colors hover:text-electric-sprout;
}
</style>
