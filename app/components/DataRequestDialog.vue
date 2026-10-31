<script setup lang="ts">
import type { PublicPublication } from '~~/shared/types/api'

const props = defineProps<{ publication: PublicPublication | null; publications: PublicPublication[] }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const { lang, pick } = useLocalized()

const form = reactive({
  name: '',
  email: '',
  institution: '',
  purpose: '',
  publicationId: props.publication?.id ?? null as number | null,
  website: '',
})
const { status, fieldErrors, submit } = useFormSubmit('/api/data-requests')

const dialog = ref<HTMLDialogElement>()
onMounted(() => dialog.value?.showModal())
function close() {
  dialog.value?.close()
}
async function onSubmit() {
  await submit({ ...form, locale: lang.value })
}
</script>

<template>
  <dialog ref="dialog" class="req-dialog" @click.self="close" @close="emit('close')">
    <div class="relative max-h-[88vh] overflow-y-auto p-6 md:p-8">
      <button type="button" class="absolute right-4 top-4 rounded-full p-2 text-onyx-olive hover:bg-bone-white" :aria-label="t('common.close')" @click="close">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <h2 class="mb-2 pr-10 text-heading font-semibold text-carbon">{{ t('dataRequest.title') }}</h2>
      <p class="mb-6 text-body text-moss-shadow">{{ t('dataRequest.intro') }}</p>

      <div v-if="status === 'success'" class="alert-success">{{ t('dataRequest.success') }}</div>

      <form v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2" novalidate @submit.prevent="onSubmit">
        <div>
          <label class="field-label" for="dr-name">{{ t('contact.name') }}</label>
          <input id="dr-name" v-model="form.name" class="field-input" required autocomplete="name" />
          <p v-if="fieldErrors.name" class="field-error">{{ fieldErrors.name[0] }}</p>
        </div>
        <div>
          <label class="field-label" for="dr-email">{{ t('contact.email') }}</label>
          <input id="dr-email" v-model="form.email" type="email" class="field-input" required autocomplete="email" />
          <p v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email[0] }}</p>
        </div>
        <div class="sm:col-span-2">
          <label class="field-label" for="dr-inst">{{ t('dataRequest.institution') }}</label>
          <input id="dr-inst" v-model="form.institution" class="field-input" required autocomplete="organization" />
          <p v-if="fieldErrors.institution" class="field-error">{{ fieldErrors.institution[0] }}</p>
        </div>
        <div class="sm:col-span-2">
          <label class="field-label" for="dr-pub">{{ t('dataRequest.dataset') }}</label>
          <select id="dr-pub" v-model="form.publicationId" class="field-input">
            <option :value="null">{{ t('dataRequest.anyDataset') }}</option>
            <option v-for="p in publications" :key="p.id" :value="p.id">{{ pick(p, 'title') }}</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <label class="field-label" for="dr-purpose">{{ t('dataRequest.purpose') }}</label>
          <textarea id="dr-purpose" v-model="form.purpose" class="field-input" required minlength="20" />
          <p v-if="fieldErrors.purpose" class="field-error">{{ fieldErrors.purpose[0] }}</p>
        </div>
        <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
        <p v-if="status === 'error' && !Object.keys(fieldErrors).length" class="alert-error sm:col-span-2">{{ t('dataRequest.error') }}</p>
        <div class="sm:col-span-2">
          <button type="submit" class="btn-ghost-dark !bg-onyx-olive !text-pure-white" :disabled="status === 'sending'">
            {{ status === 'sending' ? t('common.sending') : t('common.send') }}
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<style scoped>
.req-dialog {
  @apply w-[min(640px,92vw)] rounded-card border border-mist-green bg-pure-white p-0 text-onyx-olive shadow-float-card;
}
.req-dialog::backdrop {
  background: rgba(8, 16, 9, 0.7);
  backdrop-filter: blur(4px);
}
</style>
