/** Drop cached public API responses so admin edits appear immediately. */
export async function invalidatePublicCache() {
  const storage = useStorage('cache')
  const keys = await storage.getKeys('nitro:handlers')
  await Promise.all(keys.filter((k) => k.includes('public-')).map((k) => storage.removeItem(k)))
}
