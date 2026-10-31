<script setup lang="ts">
definePageMeta({ layout: false, i18n: false, middleware: 'admin' })
useHead({ title: 'Masuk · Admin WMC' })

const route = useRoute()
const { fetch } = useUserSession()
const form = reactive({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

async function login() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: form })
    await fetch()
    const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/admin') ? route.query.redirect : '/admin'
    await navigateTo(redirect)
  } catch (e: any) {
    error.value =
      e?.statusCode === 401
        ? 'Email atau kata sandi salah (atau akun admin belum dibuat di database ini — cek /api/health).'
        : `Gagal masuk (${e?.statusCode ?? 'network'}): ${e?.data?.message || e?.data?.statusMessage || 'periksa konfigurasi server'}. Detail: /api/health`
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest-depths p-5">
    <div class="hero-orb hero-orb-1" />
    <div class="hero-orb hero-orb-2" />
    <form class="relative w-full max-w-sm rounded-card border border-mist-green bg-pure-white p-7 text-onyx-olive shadow-float-card" @submit.prevent="login">
      <div class="mb-6 flex items-center gap-3">
        <img src="/favicon.svg" alt="" class="h-10 w-10 rounded-xl" />
        <div>
          <p class="font-semibold">World Mangrove Center</p>
          <p class="font-serif text-body italic text-lichen-sage">Admin panel</p>
        </div>
      </div>
      <label class="field-label" for="email">Email</label>
      <input id="email" v-model="form.email" type="email" class="field-input mb-4" required autocomplete="username" autofocus />
      <label class="field-label" for="password">Kata sandi</label>
      <input id="password" v-model="form.password" type="password" class="field-input mb-5" required autocomplete="current-password" />
      <p v-if="error" class="alert-error mb-4">{{ error }}</p>
      <button type="submit" class="btn-sprout w-full" :disabled="loading">{{ loading ? 'Memproses…' : 'Masuk' }}</button>
    </form>
  </div>
</template>
