<script setup lang="ts">
import type { PublicPublication, PublicationType } from '~~/shared/types/api'

const props = defineProps<{ publications: PublicPublication[] }>()
const { tr, pick, formatDate } = useLocalized()

const typeLabels: Record<PublicationType, [string, string]> = {
  paper: ['Research Paper', 'Makalah Penelitian'],
  report: ['Technical Report', 'Laporan Teknis'],
  data: ['Data & Datasets', 'Data & Dataset'],
}
const typeLabel = (t: PublicationType) => tr(...typeLabels[t])
const types = Object.keys(typeLabels) as PublicationType[]

const active = ref<PublicationType | 'all'>('all')
const query = ref('')
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return props.publications.filter((p) => {
    if (active.value !== 'all' && p.type !== active.value) return false
    if (!q) return true
    return [p.titleEn, p.titleId, p.authors, p.tags.join(' ')].join(' ').toLowerCase().includes(q)
  })
})

const requestFor = ref<PublicPublication | null | undefined>(undefined) // undefined = closed, null = whole repository
</script>

<template>
  <section class="wmc-section surface-bone !pt-12">
    <div class="wmc-container">
      <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="flex flex-wrap gap-2">
          <button type="button" class="pub-filter" :class="{ active: active === 'all' }" @click="active = 'all'">{{ tr('All Types', 'Semua Tipe') }}</button>
          <button v-for="t in types" :key="t" type="button" class="pub-filter" :class="{ active: active === t }" @click="active = t">{{ typeLabel(t) }}</button>
        </div>
        <label class="relative block w-full md:w-72">
          <span class="sr-only">{{ tr('Search publications', 'Cari publikasi') }}</span>
          <svg class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lichen-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input v-model="query" type="search" class="field-input !rounded-pill !py-2.5 pl-10" :placeholder="tr('Search title, author, tag…', 'Cari judul, penulis, tag…')" />
        </label>
      </div>

      <p class="mb-5 text-body text-moss-shadow">
        {{ tr('Showing', 'Menampilkan') }} {{ filtered.length }} {{ tr('of', 'dari') }} {{ publications.length }} {{ tr('publications', 'publikasi') }}
      </p>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="p in filtered" :key="p.id" class="card-bone flex flex-col !bg-pure-white !p-5">
          <div class="mb-4 flex items-start justify-between gap-3">
            <span
              class="chip"
              :class="{
                'border-transparent bg-electric-sprout text-carbon': p.type === 'paper',
                'border-transparent bg-sprout-wash text-moss-shadow': p.type === 'report',
                'border-mist-green text-moss-shadow': p.type === 'data',
              }"
            >{{ typeLabel(p.type) }}</span>
            <time v-if="p.publishedOn" :datetime="p.publishedOn" class="text-caption text-lichen-sage">{{ formatDate(p.publishedOn) }}</time>
          </div>
          <div v-if="p.imageUrl" class="mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-mist-green">
            <img :src="p.imageUrl" :alt="pick(p, 'title')" loading="lazy" class="h-full w-full object-cover" />
          </div>
          <h3 class="mb-2 text-heading-sm font-semibold leading-snug text-carbon">{{ pick(p, 'title') }}</h3>
          <p class="mb-3 text-caption font-medium text-deep-verdant">{{ tr('Authors', 'Penulis') }}: {{ p.authors }}</p>
          <p class="mb-4 line-clamp-5 flex-1 text-body text-onyx-olive">{{ pick(p, 'abstract') }}</p>
          <div class="mb-4 flex flex-wrap gap-1.5">
            <span v-for="tag in p.tags" :key="tag" class="chip border-mist-green text-moss-shadow">{{ tag }}</span>
          </div>
          <div class="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-mist-green pt-4">
            <span class="text-caption text-lichen-sage">{{ p.fileSize }}<template v-if="p.pages"> • {{ p.pages }}</template></span>
            <a v-if="p.fileUrl" :href="p.fileUrl" target="_blank" rel="noopener" class="btn-sprout-sm">
              {{ p.type === 'data' ? tr('View Data', 'Lihat Data') : tr('Download PDF', 'Unduh PDF') }}
            </a>
            <button v-else type="button" class="btn-ghost-dark !px-4 !py-2" @click="requestFor = p">
              {{ tr('Request access', 'Minta akses') }}
            </button>
          </div>
        </article>
      </div>

      <p v-if="!filtered.length" class="py-16 text-center text-body-md text-moss-shadow">{{ tr('No publications match your filters.', 'Tidak ada publikasi yang cocok dengan filter.') }}</p>

      <div class="mt-12 grid grid-cols-1 items-center gap-6 rounded-card bg-forest-depths p-6 text-pure-white lg:grid-cols-5 lg:p-8">
        <div class="lg:col-span-3">
          <p class="mb-2 text-heading font-semibold">{{ tr('Access our complete data repository', 'Akses repositori data lengkap kami') }}</p>
          <p class="text-body text-pale-fern">
            {{ tr('Hydrological sensor datasets, high-resolution drone imagery, and herbarium specimen collections are available on request. Researcher requests and university partnerships welcomed.', 'Dataset sensor hidrologi, citra drone resolusi tinggi, dan koleksi spesimen herbarium tersedia atas permintaan. Permintaan peneliti dan kemitraan universitas disambut.') }}
          </p>
        </div>
        <div class="flex lg:col-span-2 lg:justify-end">
          <button type="button" class="btn-sprout" @click="requestFor = null">{{ tr('Request Data Access', 'Minta Akses Data') }}</button>
        </div>
      </div>
    </div>

    <DataRequestDialog v-if="requestFor !== undefined" :publication="requestFor" :publications="publications" @close="requestFor = undefined" />
  </section>
</template>

<style scoped>
.pub-filter {
  @apply inline-flex cursor-pointer items-center rounded-pill border border-mist-green bg-pure-white px-4 py-2 text-body font-medium text-moss-shadow transition-colors hover:border-onyx-olive;
}
.pub-filter.active {
  @apply border-onyx-olive bg-onyx-olive text-pure-white;
}
</style>
