import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, RefreshCw } from 'lucide-react'
import { useSessionStore } from '../store/sessionStore'
import { LAMP_CATALOG } from '../data/catalog'
import { TagWeightedEngine } from '../engine/tagWeighted'
import { CardStack } from '../components/CardStack'
import { ActionBar } from '../components/ActionBar'
import { BuyModal } from '../components/BuyModal'
import { WishlistDrawer } from '../components/WishlistDrawer'
import type { FurnitureItem, RankedItem } from '../types'

export function DiscoveryScreen() {
  const {
    swipeHistory,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    recordDiscoverySwipe,
    setScreen,
    reset,
  } = useSessionStore((s) => ({
    swipeHistory: s.swipeHistory,
    wishlist: s.wishlist,
    addToWishlist: s.addToWishlist,
    removeFromWishlist: s.removeFromWishlist,
    recordDiscoverySwipe: s.recordDiscoverySwipe,
    setScreen: s.setScreen,
    reset: s.reset,
  }))

  // Build ranked list once on mount using the engine populated during grasp
  const rankedRef = useRef<RankedItem[]>([])
  useEffect(() => {
    const eng = new TagWeightedEngine()
    for (const ev of swipeHistory) {
      if (ev.phase === 'grasp') eng.ingest(ev)
    }
    rankedRef.current = eng.rank(LAMP_CATALOG)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [topIndex, setTopIndex] = useState(0)
  const [buyItem, setBuyItem] = useState<FurnitureItem | null>(null)
  const [wishlistOpen, setWishlistOpen] = useState(false)

  const currentItem = rankedRef.current[topIndex] ?? null
  const isFavourited = currentItem ? wishlist.some((w) => w.id === currentItem.id) : false
  const allSeen = topIndex >= rankedRef.current.length

  function handleSwipe(score: number) {
    if (!currentItem) return
    recordDiscoverySwipe({
      itemId: currentItem.id,
      score,
      tags: currentItem.tags,
      phase: 'discovery',
    })
    setTopIndex((i) => i + 1)
  }

  function handleFavourite() {
    if (!currentItem) return
    if (isFavourited) {
      removeFromWishlist(currentItem.id)
    } else {
      addToWishlist(currentItem)
    }
  }

  function handleBuy() {
    if (!currentItem) return
    setBuyItem(currentItem)
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-2 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-0.5">
            Your matches · Lamps
          </p>
          <h1 className="font-serif text-3xl font-semibold text-gray-900">
            Swipe to discover
          </h1>
        </div>

        {/* Wishlist button */}
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

      {/* Swipe hint */}
      <div className="px-6 mb-2 flex gap-4 text-xs text-gray-400">
        <span>← Dislike</span>
        <span className="mx-auto">↑ Neutral</span>
        <span>Love →</span>
      </div>

      {/* Card stack */}
      <div className="px-6 flex-1 flex flex-col justify-center">
        {allSeen ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-16"
            >
              <div className="text-6xl mb-4">✨</div>
              <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-2">
                All done!
              </h2>
              <p className="text-gray-500 text-base mb-6">
                You've rated everything in your style. Check your favourites or start fresh.
              </p>
              <button
                onClick={() => setWishlistOpen(true)}
                className="flex items-center gap-2 bg-gray-900 text-white font-semibold px-6 py-3 rounded-2xl mb-3 hover:bg-gray-700 transition-colors"
              >
                <Heart size={18} />
                View favourites ({wishlist.length})
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-2 text-gray-500 font-medium px-6 py-3 rounded-2xl hover:bg-gray-200 transition-colors"
              >
                <RefreshCw size={16} />
                Start over
              </button>
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            <CardStack
              cards={rankedRef.current}
              topIndex={topIndex}
              onSwipe={handleSwipe}
            />

            {/* Action buttons — always explicit, never triggered by swipe score */}
            {currentItem && (
              <ActionBar
                onFavourite={handleFavourite}
                onBuy={handleBuy}
                isFavourited={isFavourited}
              />
            )}
          </>
        )}
      </div>

      <div className="pb-6" />

      {/* Modals */}
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
