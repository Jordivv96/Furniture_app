import { Heart, ShoppingBag } from 'lucide-react'

interface Props {
  onFavourite: () => void
  onBuy: () => void
  isFavourited: boolean
}

export function ActionBar({ onFavourite, onBuy, isFavourited }: Props) {
  return (
    <div className="flex items-center justify-center gap-6 mt-6">
      {/* Favourite */}
      <button
        onClick={onFavourite}
        className={`
          flex flex-col items-center gap-1.5 w-20 py-3 rounded-2xl
          transition-all active:scale-90
          ${isFavourited
            ? 'bg-red-50 text-red-500'
            : 'bg-white text-gray-400 hover:text-red-400 hover:bg-red-50 shadow-sm border border-gray-100'}
        `}
      >
        <Heart
          size={24}
          className={isFavourited ? 'fill-red-500 stroke-red-500' : ''}
        />
        <span className="text-xs font-medium">
          {isFavourited ? 'Saved' : 'Favourite'}
        </span>
      </button>

      {/* Buy — this is the monetisation click */}
      <button
        onClick={onBuy}
        className="flex flex-col items-center gap-1.5 w-20 py-3 rounded-2xl bg-gray-900 text-white hover:bg-gray-700 active:scale-90 transition-all shadow-lg"
      >
        <ShoppingBag size={24} />
        <span className="text-xs font-semibold">Buy</span>
      </button>
    </div>
  )
}
