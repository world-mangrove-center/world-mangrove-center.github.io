<script setup lang="ts">
import type { Block, KnowledgePageContent, Text } from '~/content/types'
import type { PublicPublication } from '~~/shared/types/api'

const props = defineProps<{ content: KnowledgePageContent }>()
const { lang, tr, pick, formatDate } = useLocalized()
const localePath = useLocalePath()

const L = (t: Text | undefined) => (t == null ? '' : typeof t === 'string' ? t : t[lang.value])
const c = computed(() => props.content)

const toc = computed(() => c.value.blocks.filter((b) => b.type !== 'callout').map((b) => ({ id: b.id, label: L(b.heading) })))

// Related publications (from the database), matched by tag
const hasRelated = c.value.blocks.some((b) => b.type === 'related')
const { data: pubs } = await useFetch<PublicPublication[]>('/api/publications', {
  default: () => [],
  immediate: hasRelated,
})
function relatedFor(b: Extract<Block, { type: 'related' }>) {
  const tags = b.tags.map((t) => t.toLowerCase())
  return pubs.value.filter((p) => p.tags.some((t) => tags.includes(t.toLowerCase())))
}

useSeoMeta({
  title: () => L(c.value.title),
  description: () => L(c.value.lead),
  ogTitle: () => L(c.value.title),
  ogDescription: () => L(c.value.lead),
  ogImage: () => c.value.image,
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="page-hero !pb-14">
      <div class="hero-orb hero-orb-1" />
      <div class="hero-orb hero-orb-2" />
      <div class="wmc-container relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <span class="section-eyebrow mb-6">{{ L(c.eyebrow) }}</span>
          <h1>{{ L(c.title) }}</h1>
          <p>{{ L(c.lead) }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a :href="`#${c.blocks[0]?.id}`" class="btn-sprout">{{ tr('Read more', 'Baca selengkapnya') }}</a>
            <NuxtLink v-if="c.mapLink" :to="localePath(c.mapLink.to)" class="btn-ghost-white">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              {{ L(c.mapLink.label) }}
            </NuxtLink>
          </div>
        </div>
        <div class="hidden lg:col-span-5 lg:block">
          <div class="overflow-hidden rounded-card border border-onyx-olive shadow-float-card">
            <img :src="c.image" :alt="L(c.title)" class="aspect-[4/3] w-full bg-moss-shadow object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Key figures -->
    <section class="border-y border-onyx-olive bg-forest-depths">
      <div class="wmc-container grid grid-cols-2 py-2 md:grid-cols-4">
        <div v-for="(s, i) in c.stats" :key="i" class="px-2 py-6 md:px-5">
          <p class="font-ozik text-[30px] font-bold leading-none text-electric-sprout md:text-[40px]">{{ L(s.value) }}</p>
          <p class="mt-2 text-body text-pale-fern">{{ L(s.label) }}</p>
        </div>
      </div>
    </section>

    <!-- Body -->
    <section class="surface-bone py-14 md:py-20">
      <div class="wmc-container grid grid-cols-1 gap-10 lg:grid-cols-12">
        <aside class="hidden lg:col-span-3 lg:block">
          <nav class="sticky top-32" :aria-label="tr('On this page', 'Di halaman ini')">
            <p class="mb-3 font-serif text-body-md italic text-lichen-sage">{{ tr('On this page', 'Di halaman ini') }}</p>
            <ul class="space-y-1 border-l border-mist-green">
              <li v-for="t in toc" :key="t.id">
                <a :href="`#${t.id}`" class="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-body text-moss-shadow transition-colors hover:border-deep-verdant hover:text-carbon">{{ t.label }}</a>
              </li>
            </ul>
          </nav>
        </aside>

        <div class="min-w-0 space-y-16 lg:col-span-9">
          <template v-for="b in c.blocks" :key="b.id">
            <!-- Prose -->
            <article v-if="b.type === 'prose'" :id="b.id" class="scroll-mt-32">
              <h2 class="kp-h2">{{ L(b.heading) }}</h2>
              <p v-for="(p, i) in b.paragraphs" :key="i" class="mb-4 max-w-3xl text-body-md leading-relaxed text-onyx-olive">{{ L(p) }}</p>
            </article>

            <!-- Steps (zonation, processes) -->
            <article v-else-if="b.type === 'steps'" :id="b.id" class="scroll-mt-32">
              <h2 class="kp-h2">{{ L(b.heading) }}</h2>
              <p v-if="b.intro" class="kp-intro">{{ L(b.intro) }}</p>
              <ol class="relative ml-4 space-y-7 border-l-2 border-mist-green pl-8">
                <li v-for="(s, i) in b.items" :key="i" class="relative">
                  <span class="absolute -left-[49px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-onyx-olive text-body font-semibold text-electric-sprout">{{ i + 1 }}</span>
                  <h3 class="text-heading-sm font-semibold text-carbon">{{ L(s.title) }}</h3>
                  <p v-if="s.subtitle" class="mb-1 font-serif text-body-md italic text-deep-verdant">{{ L(s.subtitle) }}</p>
                  <p class="max-w-3xl text-body-md text-onyx-olive">{{ L(s.body) }}</p>
                </li>
              </ol>
            </article>

            <!-- Cards -->
            <article v-else-if="b.type === 'cards'" :id="b.id" class="scroll-mt-32">
              <h2 class="kp-h2">{{ L(b.heading) }}</h2>
              <p v-if="b.intro" class="kp-intro">{{ L(b.intro) }}</p>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2" :class="{ 'xl:grid-cols-3': b.columns === 3 }">
                <div v-for="(it, i) in b.items" :key="i" class="flex flex-col rounded-card border border-mist-green bg-pure-white p-5 transition-colors hover:border-deep-verdant">
                  <h3 class="text-heading-sm font-semibold leading-snug text-carbon">{{ L(it.title) }}</h3>
                  <p v-if="it.subtitle" class="font-serif text-body-md italic text-deep-verdant">{{ L(it.subtitle) }}</p>
                  <p class="mt-2 flex-1 text-body text-onyx-olive">{{ L(it.body) }}</p>
                  <p v-if="it.meta" class="mt-3 text-caption font-medium text-moss-shadow">{{ L(it.meta) }}</p>
                  <div v-if="it.tags?.length" class="mt-3 flex flex-wrap gap-1.5">
                    <span v-for="(t, j) in it.tags" :key="j" class="chip border-transparent bg-sprout-wash text-moss-shadow">{{ L(t) }}</span>
                  </div>
                </div>
              </div>
            </article>

            <!-- Table -->
            <article v-else-if="b.type === 'table'" :id="b.id" class="scroll-mt-32">
              <h2 class="kp-h2">{{ L(b.heading) }}</h2>
              <p v-if="b.intro" class="kp-intro">{{ L(b.intro) }}</p>
              <div class="overflow-x-auto rounded-card border border-mist-green bg-pure-white">
                <table class="w-full min-w-[640px] text-left text-body">
                  <thead class="bg-bone-white">
                    <tr>
                      <th v-for="(h, i) in b.columns" :key="i" class="border-b border-mist-green px-4 py-3 text-caption font-semibold uppercase tracking-[0.06em] text-moss-shadow">{{ L(h) }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(r, i) in b.rows" :key="i" class="border-b border-bone-white last:border-0">
                      <td v-for="(cell, j) in r" :key="j" class="px-4 py-3 align-top text-onyx-olive" :class="{ 'font-serif text-body-md italic text-carbon': j === 0 && b.italicFirstColumn }">{{ L(cell) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p v-if="b.note" class="mt-2 text-caption text-lichen-sage">{{ L(b.note) }}</p>
            </article>

            <!-- Callout -->
            <aside v-else-if="b.type === 'callout'" :id="b.id" class="rounded-card border p-5" :class="b.tone === 'caution' ? 'border-amber-300 bg-amber-50' : 'border-deep-verdant/40 bg-sprout-wash'">
              <p class="mb-1 font-semibold text-carbon">{{ L(b.heading) }}</p>
              <p class="text-body text-onyx-olive">{{ L(b.body) }}</p>
            </aside>

            <!-- Related publications -->
            <article v-else-if="b.type === 'related'" :id="b.id" class="scroll-mt-32">
              <h2 class="kp-h2">{{ L(b.heading) }}</h2>
              <div v-if="relatedFor(b).length" class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <NuxtLink v-for="p in relatedFor(b)" :key="p.id" :to="localePath('/research-insights')" class="group rounded-card border border-mist-green bg-pure-white p-5 transition-colors hover:border-deep-verdant">
                  <p class="mb-1 text-caption uppercase tracking-wider text-lichen-sage">{{ formatDate(p.publishedOn) }} · {{ p.authors }}</p>
                  <p class="font-semibold leading-snug text-carbon group-hover:text-deep-verdant">{{ pick(p, 'title') }}</p>
                </NuxtLink>
              </div>
              <p v-else class="text-body text-moss-shadow">{{ tr('Publications on this topic will appear here.', 'Publikasi tentang topik ini akan tampil di sini.') }}</p>
            </article>
          </template>

          <!-- Sources & sample-data notice -->
          <footer class="border-t border-mist-green pt-6 text-caption text-moss-shadow">
            <p class="mb-3 max-w-3xl">
              {{ tr('Programme figures, site names, prices and project results on this page are sample data for demonstration and will be replaced with verified data. Regional facts (mangrove extent, species, tribes, fisheries) are drawn from the sources below.', 'Angka program, nama lokasi, harga, dan hasil proyek di halaman ini adalah data contoh untuk demonstrasi dan akan diganti dengan data terverifikasi. Fakta wilayah (luas mangrove, spesies, suku, perikanan) diambil dari sumber di bawah.') }}
            </p>
            <template v-if="c.sources?.length">
              <p class="mb-1 font-semibold uppercase tracking-wider text-lichen-sage">{{ tr('Sources', 'Sumber') }}</p>
              <ul class="space-y-1">
                <li v-for="s in c.sources" :key="s.url"><a :href="s.url" target="_blank" rel="noopener" class="text-deep-verdant hover:underline">{{ s.label }}</a></li>
              </ul>
            </template>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.kp-h2 {
  @apply mb-4 text-heading-lg font-bold text-carbon;
}
.kp-intro {
  @apply mb-6 max-w-3xl text-body-md text-moss-shadow;
}
</style>
