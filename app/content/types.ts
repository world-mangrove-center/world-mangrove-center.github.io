/**
 * Bilingual content model for the knowledge-hub pages (Flora, Fauna, NTFP, Culture,
 * Livelihood, Ethnobiology). Text is either a plain string (same in both languages,
 * e.g. scientific names) or { en, id }.
 */
export type Text = string | { en: string; id: string }

export interface Stat {
  value: Text
  label: Text
}

export interface CardItem {
  title: Text
  /** Scientific name or secondary label, shown in italic serif */
  subtitle?: Text
  body: Text
  tags?: Text[]
  meta?: Text
}

export type Block =
  | { type: 'prose'; id: string; heading: Text; paragraphs: Text[] }
  | { type: 'cards'; id: string; heading: Text; intro?: Text; columns?: 2 | 3; items: CardItem[] }
  | { type: 'table'; id: string; heading: Text; intro?: Text; columns: Text[]; rows: Text[][]; italicFirstColumn?: boolean; note?: Text }
  | { type: 'steps'; id: string; heading: Text; intro?: Text; items: { title: Text; subtitle?: Text; body: Text }[] }
  | { type: 'callout'; id: string; tone: 'info' | 'caution'; heading: Text; body: Text }
  /** Lists publications from the database whose tags match */
  | { type: 'related'; id: string; heading: Text; tags: string[] }

export interface KnowledgePageContent {
  eyebrow: Text
  title: Text
  lead: Text
  image: string
  stats: Stat[]
  blocks: Block[]
  /** Real-world references for the factual (non-sample) statements on the page */
  sources?: { label: string; url: string }[]
  /** Optional deep link into the map, e.g. '/map?f=cagar-alam-teluk-bintuni' */
  mapLink?: { to: string; label: Text }
}
