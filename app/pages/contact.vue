<script setup lang="ts">
const { t } = useI18n()
const { tr } = useLocalized()
const config = useRuntimeConfig()

useSeoMeta({
  title: () => t('contact.title'),
  description: () => t('contact.subtitle'),
})
</script>

<template>
  <div>
    <PageHero :eyebrow="t('contact.eyebrow')" :title="t('contact.title')" :subtitle="t('contact.subtitle')" />
    <section class="wmc-section surface-bone !pt-14">
      <div class="wmc-container grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <ContactForm />
        </div>
        <aside class="space-y-6 lg:col-span-4">
          <div class="card-bone">
            <p class="mb-1 font-serif text-body-md italic text-lichen-sage">{{ tr('Field station', 'Stasiun lapangan') }}</p>
            <p class="text-body-md font-semibold text-carbon">Hub Bintuni</p>
            <p class="text-body text-moss-shadow">Kabupaten Teluk Bintuni<br />Papua Barat, Indonesia</p>
          </div>
          <div class="card-bone">
            <p class="mb-1 font-serif text-body-md italic text-lichen-sage">Email</p>
            <a :href="`mailto:${config.public.contactEmail}`" class="text-body-md font-semibold text-deep-verdant hover:underline">{{ config.public.contactEmail }}</a>
            <p class="mt-2 text-body text-moss-shadow">{{ tr('For data access, use the request form on the Research page.', 'Untuk akses data, gunakan formulir permintaan di halaman Riset.') }}</p>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
