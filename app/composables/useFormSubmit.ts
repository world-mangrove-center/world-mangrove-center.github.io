/** Small helper for public forms: posts JSON, exposes status + server field errors. */
export function useFormSubmit<T extends Record<string, any>>(url: string) {
  const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
  const fieldErrors = ref<Record<string, string[]>>({})
  const errorMessage = ref('')

  async function submit(body: T) {
    status.value = 'sending'
    fieldErrors.value = {}
    errorMessage.value = ''
    try {
      await $fetch(url, { method: 'POST', body })
      status.value = 'success'
      return true
    } catch (err: any) {
      fieldErrors.value = err?.data?.data?.fieldErrors ?? {}
      errorMessage.value = err?.data?.statusMessage || err?.statusMessage || ''
      status.value = 'error'
      return false
    }
  }
  return { status, fieldErrors, errorMessage, submit }
}
