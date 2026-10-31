<script setup lang="ts">
const { t } = useI18n()
const { lang } = useLocalized()
const route = useRoute()

const topics = ['general', 'research', 'partnership', 'media', 'volunteer'] as const
type Topic = (typeof topics)[number]
const initialTopic = (topics as readonly string[]).includes(String(route.query.topic)) ? (route.query.topic as Topic) : 'general'

const form = reactive({ name: '', email: '', organization: '', topic: initialTopic as Topic, message: '', website: '' })
const { status, fieldErrors, errorMessage, submit } = useFormSubmit('/api/contact')

async function onSubmit() {
  const ok = await submit({ ...form, locale: lang.value })
  if (ok) Object.assign(form, { name: '', email: '', organization: '', message: '' })
}
</script>

<template>
  <div class="rounded-card border border-mist-green bg-pure-white p-6 md:p-8">
    <div v-if="status === 'success'" class="alert-success mb-6" role="status">{{ t('contact.success') }}</div>
    <form class="grid grid-cols-1 gap-5 sm:grid-cols-2" novalidate @submit.prevent="onSubmit">
      <div>
        <label class="field-label" for="c-name">{{ t('contact.name') }}</label>
        <input id="c-name" v-model="form.name" class="field-input" required autocomplete="name" />
        <p v-if="fieldErrors.name" class="field-error">{{ fieldErrors.name[0] }}</p>
      </div>
      <div>
        <label class="field-label" for="c-email">{{ t('contact.email') }}</label>
        <input id="c-email" v-model="form.email" type="email" class="field-input" required autocomplete="email" />
        <p v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email[0] }}</p>
      </div>
      <div>
        <label class="field-label" for="c-org">{{ t('contact.organization') }}</label>
        <input id="c-org" v-model="form.organization" class="field-input" autocomplete="organization" />
      </div>
      <div>
        <label class="field-label" for="c-topic">{{ t('contact.subject') }}</label>
        <select id="c-topic" v-model="form.topic" class="field-input">
          <option v-for="tp in topics" :key="tp" :value="tp">{{ t(`contact.topics.${tp}`) }}</option>
        </select>
      </div>
      <div class="sm:col-span-2">
        <label class="field-label" for="c-msg">{{ t('contact.message') }}</label>
        <textarea id="c-msg" v-model="form.message" class="field-input" required minlength="10" />
        <p v-if="fieldErrors.message" class="field-error">{{ fieldErrors.message[0] }}</p>
      </div>
      <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
      <p v-if="status === 'error' && !Object.keys(fieldErrors).length" class="alert-error sm:col-span-2" role="alert">
        {{ errorMessage && errorMessage !== 'Validation failed' ? errorMessage : t('contact.error') }}
      </p>
      <div class="sm:col-span-2">
        <button type="submit" class="btn-sprout" :disabled="status === 'sending'">
          {{ status === 'sending' ? t('common.sending') : t('common.send') }}
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </button>
      </div>
    </form>
  </div>
</template>
