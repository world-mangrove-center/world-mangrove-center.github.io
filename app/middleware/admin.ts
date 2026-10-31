export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, fetch } = useUserSession()
  if (!loggedIn.value) await fetch()
  if (!loggedIn.value && to.path !== '/admin/login') {
    return navigateTo({ path: '/admin/login', query: { redirect: to.fullPath } })
  }
  if (loggedIn.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
