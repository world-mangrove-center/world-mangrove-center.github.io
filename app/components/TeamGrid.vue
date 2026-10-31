<script setup lang="ts">
import type { PublicTeamMember, TeamCategory } from '~~/shared/types/api'

const props = defineProps<{ members: PublicTeamMember[] }>()
const { tr, pick } = useLocalized()
const localePath = useLocalePath()

const categoryLabels: Record<TeamCategory, [string, string]> = {
  researcher: ['Researchers', 'Peneliti'],
  localAdvisor: ['Local Advisors', 'Penasihat Lokal'],
  management: ['Management', 'Manajemen'],
  ecologyExpert: ['Ecology Experts', 'Ahli Ekologi'],
}
const categories = Object.keys(categoryLabels) as TeamCategory[]
const catLabel = (c: TeamCategory) => tr(...categoryLabels[c])

const active = ref<TeamCategory | 'all'>('all')
const filtered = computed(() =>
  active.value === 'all' ? props.members : props.members.filter((m) => m.categories.includes(active.value as TeamCategory)),
)
const countFor = (c: TeamCategory) => props.members.filter((m) => m.categories.includes(c)).length

const selected = ref<PublicTeamMember | null>(null)
const dialog = ref<HTMLDialogElement>()
function open(m: PublicTeamMember) {
  selected.value = m
  nextTick(() => dialog.value?.showModal())
}
function close() {
  dialog.value?.close()
}
const initials = (name: string) =>
  name
    .replace(/^(Dr\.|Prof\.|Pak|Ibu)\s+/i, '')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
</script>

<template>
  <section class="wmc-section surface-dark !pt-12">
    <div class="wmc-container">
      <div class="mb-10 flex flex-wrap justify-center gap-2">
        <button type="button" class="chip-filter" :class="{ active: active === 'all' }" @click="active = 'all'">
          {{ tr('All', 'Semua') }} <span class="opacity-70">({{ members.length }})</span>
        </button>
        <button v-for="c in categories" :key="c" type="button" class="chip-filter" :class="{ active: active === c }" @click="active = c">
          {{ catLabel(c) }} <span class="opacity-70">({{ countFor(c) }})</span>
        </button>
      </div>

      <TransitionGroup tag="div" name="fade" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <article
          v-for="m in filtered"
          :key="m.id"
          class="group flex cursor-pointer flex-col overflow-hidden rounded-card border border-onyx-olive bg-forest-depths transition-all duration-base hover:-translate-y-1 hover:border-electric-sprout"
          tabindex="0"
          @click="open(m)"
          @keydown.enter="open(m)"
        >
          <div class="relative aspect-square overflow-hidden bg-moss-shadow">
            <img v-if="m.imageUrl" :src="m.imageUrl" :alt="m.name" loading="lazy" class="h-full w-full object-cover transition-transform duration-slow group-hover:scale-105" />
            <div v-else class="flex h-full w-full items-center justify-center font-ozik text-display-xl text-electric-sprout/60">{{ initials(m.name) }}</div>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <h3 class="mb-1 text-heading-sm font-semibold text-pure-white">{{ m.name }}</h3>
            <p class="mb-3 text-body font-medium text-electric-sprout">{{ pick(m, 'role') }}</p>
            <p class="mb-4 line-clamp-3 flex-1 text-body text-pale-fern">{{ pick(m, 'shortBio') }}</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="c in m.categories" :key="c" class="chip border-moss-shadow text-lichen-sage">{{ catLabel(c) }}</span>
            </div>
          </div>
        </article>
      </TransitionGroup>

      <div class="mt-14 grid grid-cols-1 items-center gap-6 rounded-card border border-onyx-olive bg-moss-shadow/40 p-6 lg:grid-cols-5 lg:p-8">
        <div class="lg:col-span-3">
          <p class="mb-2 text-heading font-semibold text-pure-white">{{ tr('Join our team of researchers & advisors?', 'Bergabung dengan tim peneliti & penasihat kami?') }}</p>
          <p class="text-body text-pale-fern">
            {{ tr('Contact us for research collaborations, volunteer positions, and grant-funded opportunities in mangrove conservation and biodiversity.', 'Hubungi kami untuk kolaborasi penelitian, posisi sukarelawan, dan kesempatan pendanaan hibah di bidang konservasi mangrove dan keanekaragaman hayati.') }}
          </p>
        </div>
        <div class="flex lg:col-span-2 lg:justify-end">
          <NuxtLink :to="localePath({ path: '/contact', query: { topic: 'volunteer' } })" class="btn-sprout">{{ tr('Apply Today', 'Kirim Permohonan') }}</NuxtLink>
        </div>
      </div>
    </div>

    <dialog ref="dialog" class="team-dialog" @click.self="close" @close="selected = null">
      <div v-if="selected" class="relative grid max-h-[85vh] grid-cols-1 overflow-y-auto md:grid-cols-5">
        <div class="bg-moss-shadow md:col-span-2">
          <img v-if="selected.imageUrl" :src="selected.imageUrl" :alt="selected.name" class="h-full max-h-80 w-full object-cover md:max-h-none" />
        </div>
        <div class="p-6 md:col-span-3 md:p-8">
          <button type="button" class="absolute right-4 top-4 rounded-full bg-forest-depths/80 p-2 text-pure-white hover:text-electric-sprout" :aria-label="tr('Close', 'Tutup')" @click="close">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <p class="mb-1 font-serif text-body-md italic text-lichen-sage">{{ pick(selected, 'role') }}</p>
          <h2 class="mb-4 text-heading-lg font-bold text-pure-white">{{ selected.name }}</h2>
          <p class="mb-6 text-body-md text-pale-fern">{{ pick(selected, 'bio') }}</p>
          <p v-if="selected.expertise.length" class="mb-2 text-caption font-semibold uppercase tracking-wider text-lichen-sage">{{ tr('Expertise', 'Keahlian') }}</p>
          <div class="mb-6 flex flex-wrap gap-2">
            <span v-for="e in selected.expertise" :key="e" class="chip border-transparent bg-sprout-wash text-moss-shadow">{{ e }}</span>
          </div>
          <div class="flex flex-wrap gap-3">
            <a v-if="selected.email" :href="`mailto:${selected.email}`" class="btn-sprout-sm">{{ tr('Email', 'Email') }}</a>
            <a v-if="selected.linkedinUrl" :href="selected.linkedinUrl" target="_blank" rel="noopener" class="btn-ghost-white !py-2">LinkedIn</a>
            <a v-if="selected.publicationsUrl" :href="selected.publicationsUrl" target="_blank" rel="noopener" class="btn-ghost-white !py-2">{{ tr('Publications', 'Publikasi') }}</a>
          </div>
        </div>
      </div>
    </dialog>
  </section>
</template>

<style scoped>
.team-dialog {
  @apply w-[min(960px,92vw)] overflow-hidden rounded-card border border-onyx-olive bg-forest-depths p-0 text-pure-white shadow-float-card;
}
.team-dialog::backdrop {
  background: rgba(8, 16, 9, 0.75);
  backdrop-filter: blur(4px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.fade-leave-active {
  position: absolute;
}
</style>
