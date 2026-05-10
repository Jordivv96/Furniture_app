import type { SwipeEvent, StyleProfile, FurnitureItem, RankedItem } from '../types'

// Stable interface — swap implementations freely without touching UI or store
export interface RecommendationEngine {
  ingest(event: SwipeEvent): void
  getStyleProfile(): StyleProfile
  rank(catalog: FurnitureItem[]): RankedItem[]
  reset(): void
}

export { TagWeightedEngine } from './tagWeighted'
