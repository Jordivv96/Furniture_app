export interface FurnitureItem {
  id: string
  name: string
  brand: string
  price: number
  currency: string
  imageUrl: string
  shopUrl: string
  category: string
  tags: string[]
  retailer: string
  description: string
}

export interface StyleArchetype {
  id: string
  name: string
  description: string
  imageUrl: string
  tags: string[]
}

export interface SwipeEvent {
  itemId: string
  score: number
  tags: string[]
  phase: 'grasp' | 'discovery'
}

export interface StyleProfile {
  tagScores: Record<string, number>
  tagCounts: Record<string, number>
}

export interface RankedItem extends FurnitureItem {
  matchScore: number
}

export type AppScreen = 'category' | 'grasp' | 'discovery' | 'wishlist'
