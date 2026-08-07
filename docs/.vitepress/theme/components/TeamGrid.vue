<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { teamMembers, type TeamMember, type TeamCategory } from '../../data/team'

interface Props {
  lang?: 'en' | 'id'
  title?: string
  subtitle?: string
  badge?: string
}

const props = withDefaults(defineProps<Props>(), {
  lang: 'en',
  title: 'Meet Our Team & Experts',
  subtitle:
    'The interdisciplinary team of researchers, conservation specialists, and indigenous knowledge holders behind the World Mangrove Center.',
  badge: 'People',
})

const defaults = {
  en: {
    all: 'All',
    researcher: 'Researchers',
    localAdvisor: 'Local Advisors',
    management: 'Management',
    ecologyExpert: 'Ecology Experts',
    viewProfile: 'View Profile',
    categories: 'Categories',
    expertise: 'Expertise',
    email: 'Email',
    contact: 'Contact',
    close: 'Close',
    publications: 'Publications',
    linkedin: 'LinkedIn',
    joinTeam: 'Join our team of researchers & advisors?',
    joinTeamDesc:
      'Contact us for research collaborations, volunteer positions, and grant-funded opportunities in mangrove conservation and biodiversity.',
    apply: 'Apply Today',
  },
  id: {
    all: 'Semua',
    researcher: 'Peneliti',
    localAdvisor: 'Penasihat Lokal',
    management: 'Manajemen',
    ecologyExpert: 'Ahli Ekologi',
    viewProfile: 'Lihat Profil',
    categories: 'Kategori',
    expertise: 'Keahlian',
    email: 'Email',
    contact: 'Kontak',
    close: 'Tutup',
    publications: 'Publikasi',
    linkedin: 'LinkedIn',
    joinTeam: 'Bergabung dengan tim peneliti & penasihat kami?',
    joinTeamDesc:
      'Hubungi kami untuk kolaborasi penelitian, posisi sukarelawan, dan kesempatan pendanaan hibah di bidang konservasi mangrove dan keanekaragaman hayati.',
    apply: 'Kirim Permohonan',
  },
}

const roleLabels: Record<string, { en: string; id: string }> = {
  leadResearcher: {
    en: 'Lead Researcher / Mangrove Ecology',
    id: 'Peneliti Utama / Ekologi Mangrove',
  },
  conservationSpecialist: {
    en: 'Field Conservation Specialist',
    id: 'Spesialis Konservasi Lapangan',
  },
  localAdvisor: {
    en: 'Indigenous Knowledge Advisor',
    id: 'Penasihat Pengetahuan Adat',
  },
  programManager: {
    en: 'Program Manager',
    id: 'Manajer Program',
  },
  ecologyExpert: {
    en: 'Marine Ecology Expert',
    id: 'Ahli Ekologi Laut',
  },
  communityLiaison: {
    en: 'Community Liaison & Socio-Economics Officer',
    id: 'Petugas Hubungan Masyarakat & Sosio-Ekonomi',
  },
  researcher: {
    en: 'Avian Ecologist / Research Associate',
    id: 'Ekolog Burung / Asisten Peneliti',
  },
}

const categories: TeamCategory[] = [
  'researcher',
  'localAdvisor',
  'management',
  'ecologyExpert',
]

const activeFilter = ref<TeamCategory | 'all'>('all')
const selectedMember = ref<TeamMember | null>(null)
const visibleIds = ref<Set<string>>(new Set())

const filteredMembers = computed(() => {
  if (activeFilter.value === 'all') return teamMembers
  return teamMembers.filter((m) =>
    m.categories.includes(activeFilter.value as TeamCategory),
  )
})

function openModal(member: TeamMember) {
  selectedMember.value = member
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedMember.value = null
  document.body.style.overflow = ''
}

function escHandler(e: KeyboardEvent) {
  if (e.key === 'Escape') closeModal()
  if (e.key === 'd' && e.ctrlKey) {
    e.preventDefault()
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', escHandler)
  filteredMembers.value.forEach((m, i) => {
    setTimeout(() => visibleIds.value.add(m.id), 50 + i * 60)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', escHandler)
  document.body.style.overflow = ''
})
</script>

<template>
  <section
    class="wmc-section min-h-screen relative overflow-hidden"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20"
    ></div>
    <div
      class="absolute top-40 left-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-40 right-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
    ></div>

    <div class="wmc-container relative">
      <div class="text-center max-w-3xl mx-auto mb-7">
        <span class="section-badge">
          {{ badge }}
        </span>
        <h1
          class="font-heading font-bold text-2xl leading-none mb-3 text-text"
        >
          {{ title }}
        </h1>
        <p class="text-body text-text-muted leading-[1.43]">
          {{ subtitle }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2 mb-7 justify-center">
        <button
          :class="['tag-pill', { active: activeFilter === 'all' }]"
          @click="activeFilter = 'all'"
        >
          {{ defaults[lang].all }}
          <span class="ml-1.5 opacity-80">({{ teamMembers.length }})</span>
        </button>
        <button
          v-for="c in categories"
          :key="c"
          :class="['tag-pill', { active: activeFilter === c }]"
          @click="activeFilter = c"
        >
          {{ defaults[lang][c] }}
          <span class="ml-1.5 opacity-80">(
            {{
              teamMembers.filter((m) => m.categories.includes(c)).length
            }}
          )</span>
        </button>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4"
      >
        <div
          v-for="(m, i) in filteredMembers"
          :key="m.id"
          class="card group flex flex-col h-full relative overflow-hidden bg-surface"
          :style="{
            opacity: visibleIds.has(m.id) ? 1 : 0,
            transform: visibleIds.has(m.id)
              ? 'translateY(0)'
              : 'translateY(24px)',
            transition:
              'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), transform 500ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 500ms ease',
          }"
        >
          <div
            class="relative aspect-square overflow-hidden border-b-2 border-border"
          >
            <img
              :src="m.image"
              :alt="m.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-base flex items-end p-3"
            >
              <button
                @click="openModal(m)"
                class="w-full py-2.5 bg-primary text-on-primary text-xs font-bold rounded-md border-2 border-on-primary/30 hover:bg-accent hover:border-accent transition-colors duration-base"
              >
                {{ defaults[lang].viewProfile }}
              </button>
            </div>
            <div class="absolute top-2 right-2 flex flex-col gap-1.5">
              <span
                v-for="cat in m.categories.slice(0, 2)"
                :key="cat"
                class="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-pill border border-border bg-background text-text"
              >
                {{ defaults[lang][cat] }}
              </span>
            </div>
          </div>
          <div class="p-4 flex flex-col flex-grow">
            <h3
              class="font-bold text-base leading-[1.43] mb-0.5 text-text"
            >
              {{ m.name }}
            </h3>
            <p class="text-xs text-accent font-semibold mb-3">
              {{ roleLabels[m.roleKey][lang] }}
            </p>
            <p
              class="text-xs text-text/85 leading-[1.43] mb-4 flex-grow"
            >
              {{ m.shortBio[lang] }}
            </p>
            <div class="flex flex-wrap gap-1.5 mt-auto">
              <span
                v-for="exp in m.expertise.slice(0, 3)"
                :key="exp"
                class="px-2 py-0.5 text-[10px] bg-primary/60 text-text rounded border border-border/70"
              >
                {{ exp }}
              </span>
              <span
                v-if="m.expertise.length > 3"
                class="px-2 py-0.5 text-[10px] bg-background text-text rounded border border-border"
              >
                +{{ m.expertise.length - 3 }}
              </span>
            </div>
          </div>
          <div
            class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface to-transparent h-6 pointer-events-none"
          ></div>
        </div>
      </div>

      <div class="mt-7 w-full">
        <div
          class="rounded-lg p-5 border-2 border-border bg-accent/40 shadow-card grid grid-cols-1 lg:grid-cols-5 gap-5 items-center"
        >
          <div class="lg:col-span-3">
            <p class="font-heading font-bold text-2xl leading-none mb-2">
              {{ defaults[lang].joinTeam }}
            </p>
            <p class="text-body text-text/85 leading-[1.43]">
              {{ defaults[lang].joinTeamDesc }}
            </p>
          </div>
          <div class="lg:col-span-2 flex justify-end">
            <a href="mailto:hr@worldmangrovecenter.org" class="btn-primary">
              {{ defaults[lang].apply }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="selectedMember"
        class="fixed inset-0 z-[100] flex items-center justify-center p-3"
        role="dialog"
        aria-modal="true"
        @click.self="closeModal"
      >
        <div
          class="absolute inset-0 bg-black/70 backdrop-blur-sm"
          @click="closeModal"
        ></div>
        <div
          class="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-surface border-2 border-border rounded-2xl shadow-elevated"
          style="
            animation: teamFadeIn 500ms cubic-bezier(0.4, 0, 0.2, 1);
          "
        >
          <div
            class="relative aspect-[21/9] overflow-hidden rounded-t-2xl border-b-2 border-border"
          >
            <img
              :src="selectedMember.image"
              :alt="selectedMember.name"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
            ></div>
            <button
              class="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface border-2 border-border flex items-center justify-center hover:bg-accent hover:text-on-primary hover:border-accent transition-colors duration-base"
              aria-label="Close"
              @click="closeModal"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div
              class="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-on-primary"
            >
              <p
                class="text-xs font-semibold text-accent mb-2 tracking-wider uppercase"
              >
                {{ roleLabels[selectedMember.roleKey][lang] }}
              </p>
              <h2
                class="font-display font-extrabold text-4xl mb-1 leading-[1.38]"
              >
                {{ selectedMember.name }}
              </h2>
              <div class="flex flex-wrap gap-2 mt-2">
                <span
                  v-for="cat in selectedMember.categories"
                  :key="cat"
                  class="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-pill border-2 border-on-primary/30 bg-background/60 backdrop-blur-sm text-text"
                >
                  {{ defaults[lang][cat] }}
                </span>
              </div>
            </div>
          </div>

          <div class="p-5 lg:p-6">
            <p class="leading-relaxed mb-7 text-text/90">
              {{ selectedMember.bio[lang] }}
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">
              <div>
                <h4
                  class="text-xs font-bold uppercase tracking-wider mb-3 text-accent"
                >
                  {{ defaults[lang].expertise }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="e in selectedMember.expertise"
                    :key="e"
                    class="px-3 py-1.5 text-sm bg-primary/60 text-text rounded-md border-2 border-border"
                  >
                    {{ e }}
                  </span>
                </div>
              </div>
              <div>
                <h4
                  class="text-xs font-bold uppercase tracking-wider mb-3 text-accent"
                >
                  {{ defaults[lang].contact }}
                </h4>
                <div class="space-y-2">
                  <a
                    :href="`mailto:${selectedMember.email}`"
                    class="flex items-center gap-3 p-3 rounded-lg border-2 border-border hover:bg-primary/60 transition-colors duration-base"
                  >
                    <span
                      class="w-9 h-9 rounded-lg bg-background text-text flex items-center justify-center shrink-0"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <div>
                      <p class="text-[10px] font-bold uppercase text-text-muted">
                        {{ defaults[lang].email }}
                      </p>
                      <p class="text-sm font-semibold text-text">
                        {{ selectedMember.email }}
                      </p>
                    </div>
                  </a>
                  <a
                    v-if="selectedMember.linkedin"
                    :href="selectedMember.linkedin"
                    class="flex items-center gap-3 p-3 rounded-lg border-2 border-border hover:bg-primary/60 transition-colors duration-base"
                  >
                    <span
                      class="w-9 h-9 rounded-lg bg-accent text-on-primary flex items-center justify-center shrink-0"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                      </svg>
                    </span>
                    <div>
                      <p class="text-[10px] font-bold uppercase text-text-muted">
                        {{ defaults[lang].linkedin }}
                      </p>
                      <p class="text-sm font-semibold text-text">
                        {{ selectedMember.name }}
                      </p>
                    </div>
                  </a>
                  <a
                    v-if="selectedMember.publications"
                    :href="selectedMember.publications"
                    class="flex items-center gap-3 p-3 rounded-lg border-2 border-border hover:bg-primary/60 transition-colors duration-base"
                  >
                    <span
                      class="w-9 h-9 rounded-lg bg-accent/80 text-on-primary flex items-center justify-center shrink-0"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </span>
                    <div>
                      <p class="text-[10px] font-bold uppercase text-text-muted">
                        {{ defaults[lang].publications }}
                      </p>
                      <p class="text-sm font-semibold text-text">
                        View Publication List
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div
              class="pt-4 border-t border-border flex flex-wrap justify-between items-center gap-4"
            >
              <p class="text-xs text-text-muted">
                {{
                  lang === 'id'
                    ? 'ESC atau klik tutup untuk menutup'
                    : 'Press ESC or click outside to close'
                }}
              </p>
              <button
                class="px-5 py-2.5 bg-primary text-on-primary text-sm font-semibold rounded-md border-2 border-border hover:bg-accent hover:border-accent transition-colors duration-base"
                @click="closeModal"
              >
                {{ defaults[lang].close }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
@keyframes teamFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
