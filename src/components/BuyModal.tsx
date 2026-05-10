import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ShoppingBag } from 'lucide-react'
import type { FurnitureItem } from '../types'

interface Props {
  item: FurnitureItem | null
  onClose: () => void
}

export function BuyModal({ item, onClose }: Props) {
  function handleShopClick() {
    if (!item) return
    // In production this click is tracked server-side before redirect
    window.open(item.shopUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl overflow-hidden"
            style={{ maxHeight: '80vh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          >
            <div className="flex justify-between items-center px-6 pt-5 pb-2">
              <h2 className="font-serif text-xl font-semibold text-gray-900">Ready to buy?</h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 pb-6">
              {/* Product row */}
              <div className="flex gap-4 mt-4 mb-6">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    {item.retailer}
                  </p>
                  <h3 className="font-serif text-lg font-semibold text-gray-900 mt-0.5 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-base font-semibold text-gray-700 mt-1">
                    {item.currency} {item.price}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {item.description}
              </p>

              {/* CTA — this click is how FurniSwipe earns */}
              <button
                onClick={handleShopClick}
                className="w-full flex items-center justify-center gap-2.5 bg-gray-900 text-white font-semibold text-base py-4 rounded-2xl hover:bg-gray-700 active:scale-95 transition-all"
              >
                <ShoppingBag size={20} />
                Shop at {item.retailer}
                <ExternalLink size={16} className="opacity-60" />
              </button>

              <p className="text-xs text-center text-gray-400 mt-3">
                You'll be taken to {item.retailer}'s website
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
