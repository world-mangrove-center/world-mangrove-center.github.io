<script setup lang="ts">
/**
 * Generic list + editor for a CRUD resource under /api/admin/<resource>.
 * Fields are described declaratively by each admin page.
 */
import type { ColumnDef, FieldDef } from '~/utils/admin'

const props = defineProps<{
  title: string
  description?: string
  endpoint: string
  fields: FieldDef[]
  columns: ColumnDef[]
  defaults: Record<string, any>
  searchKeys?: string[]
}>()

const emit = defineEmits<{ saved: [] }>()

const { data: rows, refresh, pending, error } = await useFetch<any[]>(props.endpoint, { default: () => [], server: false })

const query = ref('')
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return rows.value
  const keys = props.searchKeys ?? props.columns.map((c) => c.key)
  return rows.value.filter((r) => keys.some((k) => String(r[k] ?? '').toLowerCase().includes(q)))
})

const editing = ref<Record<string, any> | null>(null)
const isNew = computed(() => editing.value && !editing.value.id)
const saving = ref(false)
const fieldErrors = ref<Record<string, string[]>>({})
const formError = ref('')
const toast = ref('')

function clone(v: any) {
  return JSON.parse(JSON.stringify(v))
}
function openNew() {
  editing.value = clone(props.defaults)
  fieldErrors.value = {}
  formError.value = ''
}
function openEdit(row: any) {
  const copy = clone(row)
  for (const f of props.fields) {
    if (f.type === 'tags' && Array.isArray(copy[f.key])) copy[f.key] = copy[f.key].join(', ')
    if (copy[f.key] === null) copy[f.key] = f.type === 'checkbox' ? false : ''
  }
  editing.value = copy
  fieldErrors.value = {}
  formError.value = ''
}
function close() {
  editing.value = null
}
function flash(msg: string) {
  toast.value = msg
  setTimeout(() => (toast.value = ''), 2500)
}

async function save() {
  if (!editing.value) return
  saving.value = true
  fieldErrors.value = {}
  formError.value = ''
  const body: Record<string, any> = {}
  for (const f of props.fields) body[f.key] = editing.value[f.key]
  try {
    if (isNew.value) {
      await $fetch(props.endpoint, { method: 'POST', body })
    } else {
      await $fetch(`${props.endpoint}/${editing.value.id}`, { method: 'PUT', body })
    }
    await refresh()
    emit('saved')
    close()
    flash('Tersimpan ✓')
  } catch (e: any) {
    fieldErrors.value = e?.data?.data?.fieldErrors ?? {}
    formError.value = e?.data?.statusMessage || e?.statusMessage || 'Gagal menyimpan.'
  } finally {
    saving.value = false
  }
}

async function remove(row: any) {
  const label = row.name || row.titleEn || row.key || `#${row.id}`
  if (!window.confirm(`Hapus "${label}"? Tindakan ini tidak bisa dibatalkan.`)) return
  try {
    await $fetch(`${props.endpoint}/${row.id}`, { method: 'DELETE' })
    await refresh()
    emit('saved')
    if (editing.value?.id === row.id) close()
    flash('Dihapus')
  } catch (e: any) {
    window.alert(e?.data?.statusMessage || 'Gagal menghapus.')
  }
}

function toggleMulti(key: string, value: string) {
  const arr: string[] = editing.value![key] ?? (editing.value![key] = [])
  const i = arr.indexOf(value)
  i >= 0 ? arr.splice(i, 1) : arr.push(value)
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-heading-lg font-bold text-carbon">{{ title }}</h1>
        <p v-if="description" class="mt-1 max-w-2xl text-body text-moss-shadow">{{ description }}</p>
      </div>
      <div class="flex gap-2">
        <input v-model="query" type="search" placeholder="Cari…" class="field-input !rounded-lg !py-1.5 md:w-56" />
        <button type="button" class="btn-admin-primary shrink-0" @click="openNew">+ Tambah</button>
      </div>
    </div>

    <p v-if="error" class="alert-error mb-4">Gagal memuat data: {{ error.statusMessage || error.message }}</p>

    <div class="admin-card overflow-x-auto !p-0">
      <table class="admin-table">
        <thead>
          <tr>
            <th v-for="c in columns" :key="c.key">{{ c.label }}</th>
            <th class="w-36 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pending && !rows.length"><td :colspan="columns.length + 1" class="py-10 text-center text-lichen-sage">Memuat…</td></tr>
          <tr v-else-if="!filtered.length"><td :colspan="columns.length + 1" class="py-10 text-center text-lichen-sage">Belum ada data.</td></tr>
          <tr v-for="r in filtered" :key="r.id" class="hover:bg-bone-white/60">
            <td v-for="c in columns" :key="c.key">
              <img v-if="c.image && r[c.key]" :src="r[c.key]" alt="" class="h-10 w-10 rounded-lg object-cover" />
              <span v-else-if="c.image" class="inline-block h-10 w-10 rounded-lg bg-mist-green" />
              <span v-else-if="c.swatch" class="inline-block h-5 w-5 rounded-full border border-mist-green" :style="{ background: r[c.key] }" />
              <template v-else>{{ c.format ? c.format(r) : r[c.key] }}</template>
            </td>
            <td class="whitespace-nowrap text-right">
              <button type="button" class="btn-admin mr-1.5" @click="openEdit(r)">Edit</button>
              <button type="button" class="btn-admin-danger" @click="remove(r)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Editor slide-over -->
    <Transition name="slide">
      <div v-if="editing" class="fixed inset-0 z-50 flex justify-end bg-black/40" @click.self="close">
        <form class="flex h-full w-full max-w-2xl flex-col bg-pure-white shadow-float-card" @submit.prevent="save">
          <div class="flex items-center justify-between border-b border-mist-green px-6 py-4">
            <h2 class="text-heading-sm font-semibold">{{ isNew ? 'Tambah' : 'Edit' }} — {{ title }}</h2>
            <button type="button" class="rounded-lg p-1.5 hover:bg-bone-white" aria-label="Tutup" @click="close">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <div class="grid flex-1 grid-cols-1 gap-4 overflow-y-auto px-6 py-5 sm:grid-cols-2">
            <div v-for="f in fields" :key="f.key" :class="{ 'sm:col-span-2': f.full || f.type === 'textarea' || f.type === 'multiselect' || f.type === 'geometry' }">
              <label v-if="f.type !== 'checkbox'" class="field-label" :for="`f-${f.key}`">{{ f.label }}<span v-if="f.required" class="text-red-600"> *</span></label>
              <textarea v-if="f.type === 'textarea'" :id="`f-${f.key}`" v-model="editing[f.key]" class="field-input !rounded-xl !text-body" :rows="f.rows ?? 4" />
              <select v-else-if="f.type === 'select'" :id="`f-${f.key}`" v-model="editing[f.key]" class="field-input !rounded-xl !text-body">
                <option v-for="o in f.options" :key="String(o.value)" :value="o.value">{{ o.label }}</option>
              </select>
              <div v-else-if="f.type === 'multiselect'" class="flex flex-wrap gap-2">
                <label v-for="o in f.options" :key="String(o.value)" class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-mist-green px-3 py-1.5 text-body" :class="{ 'border-deep-verdant bg-sprout-wash': editing[f.key]?.includes(o.value) }">
                  <input type="checkbox" class="accent-deep-verdant" :checked="editing[f.key]?.includes(o.value)" @change="toggleMulti(f.key, String(o.value))" />
                  {{ o.label }}
                </label>
              </div>
              <ClientOnly v-else-if="f.type === 'geometry'">
                <GeometryEditor
                  v-model="editing[f.key]"
                  :color="f.geometryColor?.(editing)"
                  :reference="f.geometryReference?.(editing)"
                />
              </ClientOnly>
              <div v-else-if="f.type === 'color'" class="flex items-center gap-2">
                <input :id="`f-${f.key}`" v-model="editing[f.key]" type="color" class="h-10 w-14 cursor-pointer rounded-lg border border-mist-green bg-pure-white p-1" />
                <input v-model="editing[f.key]" class="field-input !rounded-xl !py-2 !text-body font-mono" maxlength="7" />
              </div>
              <label v-else-if="f.type === 'checkbox'" class="mt-6 inline-flex cursor-pointer items-center gap-2 text-body font-medium">
                <input :id="`f-${f.key}`" v-model="editing[f.key]" type="checkbox" class="h-4 w-4 accent-deep-verdant" />
                {{ f.label }}
              </label>
              <input
                v-else
                :id="`f-${f.key}`"
                v-model="editing[f.key]"
                :type="f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : f.type === 'email' ? 'email' : f.type === 'url' ? 'url' : 'text'"
                class="field-input !rounded-xl !py-2 !text-body"
              />
              <p v-if="f.help" class="mt-1 text-caption text-lichen-sage">{{ f.help }}</p>
              <p v-if="fieldErrors[f.key]" class="field-error">{{ fieldErrors[f.key]?.[0] }}</p>
            </div>
          </div>
          <div class="flex items-center justify-between gap-3 border-t border-mist-green px-6 py-4">
            <p class="text-body text-red-700">{{ formError && formError !== 'Validation failed' ? formError : Object.keys(fieldErrors).length ? 'Periksa isian yang ditandai.' : '' }}</p>
            <div class="flex gap-2">
              <button type="button" class="btn-admin" @click="close">Batal</button>
              <button type="submit" class="btn-admin-primary" :disabled="saving">{{ saving ? 'Menyimpan…' : 'Simpan' }}</button>
            </div>
          </div>
        </form>
      </div>
    </Transition>

    <div v-if="toast" class="fixed bottom-6 right-6 z-[60] rounded-xl bg-onyx-olive px-4 py-2.5 text-body text-pure-white shadow-float-card">{{ toast }}</div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
