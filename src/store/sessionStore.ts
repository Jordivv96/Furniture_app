import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppScreen, FurnitureItem, RankedItem, SwipeEvent } from '../types'
import { TagWeightedEngine } from '../engine/tagWeighted'

interface SessionState {
  screen: AppScreen
  category: string | null
  graspRound: number       // which round in grasp phase (0–2)
  discoveryItems: RankedItem[]
  wishlist: FurnitureItem[]
  swipeHistory: SwipeEvent[]

  // Actions
  selectCategory: (category: string) => void
  recordGraspRound: (pickedId: string, roundArchetypes: { id: string; tags: string[] }[]) => void
  recordDiscoverySwipe: (event: SwipeEvent) => void
  addToWishlist: (item: FurnitureItem) => void
  removeFromWishlist: (itemId: string) => void
  setScreen: (screen: AppScreen) => void
  reset: () => void
}

// Engine lives outside zustand so it's not serialized — rebuilt from swipeHistory on hydration
let engine = new TagWeightedEngine()

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      screen: 'category',
      category: null,
      graspRound: 0,
      discoveryItems: [],
      wishlist: [],
      swipeHistory: [],

      selectCategory: (category) => {
        engine.reset()
        set({ category, screen: 'grasp', graspRound: 0, swipeHistory: [], discoveryItems: [] })
      },

      recordGraspRound: (pickedId, roundArchetypes) => {
        const events: SwipeEvent[] = roundArchetypes.map((arch) => ({
          itemId: arch.id,
          score: arch.id === pickedId ? 10 : 1,
          tags: arch.tags,
          phase: 'grasp',
        }))
        events.forEach((e) => engine.ingest(e))
        const nextRound = get().graspRound + 1
        const history = [...get().swipeHistory, ...events]
        if (nextRound >= 3) {
          set({ swipeHistory: history, screen: 'discovery' })
        } else {
          set({ graspRound: nextRound, swipeHistory: history })
        }
      },

      recordDiscoverySwipe: (event) => {
        engine.ingest(event)
        set({ swipeHistory: [...get().swipeHistory, event] })
      },

      addToWishlist: (item) => {
        const already = get().wishlist.some((w) => w.id === item.id)
        if (!already) set({ wishlist: [...get().wishlist, item] })
      },

      removeFromWishlist: (itemId) => {
        set({ wishlist: get().wishlist.filter((w) => w.id !== itemId) })
      },

      setScreen: (screen) => set({ screen }),

      reset: () => {
        engine.reset()
        set({
          screen: 'category',
          category: null,
          graspRound: 0,
          discoveryItems: [],
          wishlist: [],
          swipeHistory: [],
        })
      },
    }),
    {
      name: 'furniswipe-session',
      partialize: (s) => ({ wishlist: s.wishlist }),
    }
  )
)
