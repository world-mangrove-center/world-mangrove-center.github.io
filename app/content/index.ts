import { culture } from './culture'
import { ethnobiology } from './ethnobiology'
import { fauna } from './fauna'
import { flora } from './flora'
import { livelihood } from './livelihood'
import { ntfp } from './ntfp'
import type { KnowledgePageContent } from './types'

export const knowledgePages = { flora, fauna, ntfp, culture, livelihood, ethnobiology } satisfies Record<string, KnowledgePageContent>
export type KnowledgePageKey = keyof typeof knowledgePages
