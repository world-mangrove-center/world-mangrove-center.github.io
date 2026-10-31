/**
 * Placeholder imagery carried over from the VitePress site (AI-generated via an
 * external text-to-image endpoint). Replace with real photos — ideally files in
 * /public/images or a Vercel Blob/CDN URL — and only change them here.
 */
const gen = (prompt: string, size = 'landscape_4_3') =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`

export const images = {
  heroFront: gen('Aerial view of vast lush green mangrove forest at golden hour, meandering rivers winding through dense vegetation, silt sediment plumes at river mouths meeting turquoise ocean, small fishing boats visible, Papua Indonesia landscape, hyper detailed, dramatic lighting'),
  heroBack: gen('Clean white scientific dashboard UI showing mangrove biodiversity monitoring metrics and blue carbon charts, minimal design, flat surfaces, thin green borders, status badges, editorial'),
  flora: gen('Wide panoramic shot of Bintuni Bay mangrove zonation pattern from drone, distinct bands of Avicennia, Rhizophora, Bruguiera species along tidal gradient, Papua Indonesia'),
  fauna: gen('Vibrant school of colorful coral reef fish swimming among mangrove prop roots underwater, blue green sun rays shining through water surface, juvenile snapper and grunt fish, clear tropical water, Indonesia'),
  ntfp: gen('Traditional handmade woven palm leaf baskets and artisan crafts from Papua Indonesia, dried mangrove crab, Nypa palm sugar jars, displayed on rustic wooden table, soft natural lighting, indigenous NTFP products'),
  culture: gen('Papuan traditional cultural ceremony dance with face paint, cassowary feather headdresses, shell ornaments, elders and youth performing at coastal village, Teluk Bintuni'),
  livelihood: gen('Papuan fishermen in traditional wooden dugout canoe on calm mangrove river, checking sustainable fishing net, early morning mist, golden sun light, dense green mangrove walls, livelihood Bintuni'),
  research: gen('Marine biologist in waders holding water sample test kit, data tablet, field notebook, in mangrove forest, measuring blue carbon sediment core, community rangers in background, research expedition Papua'),
} as const
