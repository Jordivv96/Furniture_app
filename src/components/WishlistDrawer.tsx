import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react'
import type { FurnitureItem } from '../types'

interface Props {
  open: boolean
  items: FurnitureItem[]
  onClose: () => void
  onRemove: (id: string) => void
  onBuy: (item: FurnitureItem) => void
}

export function WishlistDrawer({ open, items, onClose, onRemove, onBuy }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 bg-white w-full max-w-sm flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-red-500 fill-red-500" />
                <h2 className="font-serif text-xl font-semibold text-gray-900">Favourites</h2>
                <span className="ml-1 text-sm text-gray-400">({items.length})</span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-8">
                  <Heart size={40} className="text-gray-200 mb-3" />
                  <p className="text-gray-400 text-sm">
                    Tap the heart while swiping to save pieces you love.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3 px-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 bg-gray-50 rounded-2xl p-3"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                          {item.retailer}
                        </p>
                        <p className="font-serif text-sm font-semibold text-gray-900 mt-0.5 leading-tight truncate">
                          {item.name}
                        </p>
                        <p className="text-sm font-semibold text-gray-700 mt-1">
                          {item.currency} {item.price}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => onBuy(item)}
                            className="flex items-center gap-1 text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-xl hover:bg-gray-700 transition-colors"
                          >
                            <ShoppingBag size={12} />
                            Buy
                          </button>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="flex items-center gap-1 text-xs font-medium text-gray-400 px-2 py-1.5 rounded-xl hover:bg-gray-200 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
