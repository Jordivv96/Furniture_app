import { useEffect, useRef, useState } from 'react'
import { Heart } from 'lucide-react'
import { useSessionStore } from '../store/sessionStore'
import { LAMP_CATALOG } from '../data/catalog'
import { TagWeightedEngine } from '../engine/tagWeighted'
import { CardStack } from '../components/CardStack'
import { ActionBar } from '../components/ActionBar'
import { BuyModal } from '../components/BuyModal'
import { WishlistDrawer } from '../components/WishlistDrawer'
import type { FurnitureItem, RankedItem } from '../types'

const CATEGORIES = [
  { id: 'lamp',  label: 'Lamps',   catalog: LAMP_CATALOG, active: true  },
  { id: 'sofa',  label: 'Sofas',   catalog: [],           active: false },
  { id: 'table', label: 'Tables',  catalog: [],           active: false },
  { id: 'bed',   label: 'Beds',    catalog: [],           active: false },
]

export function DiscoveryScreen() {
  const {
    category: initialCategory,
    swipeHistory,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    recordDiscoverySwipe,
  } = useSessionStore((s) => ({
    category: s.category,
    swipeHistory: s.swipeHistory,
    wishlist: s.wishlist,
    addToWishlist: s.addToWishlist,
    removeFromWishlist: s.removeFromWishlist,
    recordDiscoverySwipe: s.recordDiscoverySwipe,
  }))

  // Local engine — seeded from grasp, updated on every discovery swipe
  const engineRef = useRef(new TagWeightedEngine())
  const rankedRef = useRef<RankedItem[]>([])

  const [activeCategory, setActiveCategory] = useState(initialCategory ?? 'lamp')
  const [topIndex, setTopIndex] = useState(0)
  const [generation, setGeneration] = useState(0)
  const [buyItem, setBuyItem] = useState<FurnitureItem | null>(null)
  const [wishlistOpen, setWishlistOpen] = useState(false)

  // Seed engine from grasp history on mount
  useEffect(() => {
    for (const ev of swipeHistory) {
      if (ev.phase === 'grasp') engineRef.current.ingest(ev)
    }
    rankAndReset(activeCategory)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function getCatalog(categoryId: string) {
    return CATEGORIES.find((c) => c.id === categoryId)?.catalog ?? LAMP_CATALOG
  }

  function rankAndReset(categoryId: string) {
    rankedRef.current = engineRef.current.rank(getCatalog(categoryId))
    setTopIndex(0)
    setGeneration((g) => g + 1)
  }

  function handleCategorySwitch(categoryId: string) {
    if (categoryId === activeCategory) return
    const cat = CATEGORIES.find((c) => c.id === categoryId)
    if (!cat?.active) return
    setActiveCategory(categoryId)
    rankAndReset(categoryId)
  }

  const currentItem = rankedRef.current[topIndex] ?? null
  const isFavourited = currentItem ? wishlist.some((w) => w.id === currentItem.id) : false

  function handleSwipe(score: number) {
    if (!currentItem) return
    const event = {
      itemId: currentItem.id,
      score,
      tags: currentItem.tags,
      phase: 'discovery' as const,
    }
    engineRef.current.ingest(event)
    recordDiscoverySwipe(event)

    const next = topIndex + 1
    if (next >= rankedRef.current.length) {
      rankedRef.current = engineRef.current.rank(getCatalog(activeCategory))
      setGeneration((g) => g + 1)
      setTopIndex(0)
    } else {
      setTopIndex(next)
    }
  }

  function handleFavourite() {
    if (!currentItem) return
    if (isFavourited) removeFromWishlist(currentItem.id)
    else addToWishlist(currentItem)
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-2 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-semibold text-gray-900">
          Discover
        </h1>
        <button
          onClick={() => setWishlistOpen(true)}
          className="relative w-11 h-11 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <Heart size={20} />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>
      </div>

      {/* Category switcher */}
      <div className="px-6 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySwitch(cat.id)}
              disabled={!cat.active}
              className={`
                flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${isActive
                  ? 'bg-gray-900 text-white'
                  : cat.active
                    ? 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'}
              `}
            >
              {cat.label}
              {!cat.active && <span className="ml-1 text-xs opacity-60">soon</span>}
            </button>
          )
        })}
      </div>

      {/* Swipe hint */}
      <div className="px-6 mb-2 flex gap-4 text-xs text-gray-400">
        <span>← Dislike</span>
        <span className="mx-auto">↑ Neutral</span>
        <span>Love →</span>
      </div>

      {/* Card stack */}
      <div className="px-6 flex-1 flex flex-col justify-center">
        <CardStack
          key={generation}
          cards={rankedRef.current}
          topIndex={topIndex}
          onSwipe={handleSwipe}
        />

        {currentItem && (
          <ActionBar
            onFavourite={handleFavourite}
            onBuy={() => setBuyItem(currentItem)}
            isFavourited={isFavourited}
          />
        )}
      </div>

      <div className="pb-6" />

      <BuyModal item={buyItem} onClose={() => setBuyItem(null)} />

      <WishlistDrawer
        open={wishlistOpen}
        items={wishlist}
        onClose={() => setWishlistOpen(false)}
        onRemove={removeFromWishlist}
        onBuy={(item) => {
          setWishlistOpen(false)
          setBuyItem(item)
        }}
      />
    </div>
  )
}
