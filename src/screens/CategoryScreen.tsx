import { motion } from 'framer-motion'
import { Lamp, Sofa, UtensilsCrossed, Bed, Clock, BookOpen } from 'lucide-react'
import { useSessionStore } from '../store/sessionStore'

const CATEGORIES = [
  { id: 'lamp',  label: 'Lamps',    Icon: Lamp,           active: true  },
  { id: 'sofa',  label: 'Sofas',    Icon: Sofa,           active: false },
  { id: 'table', label: 'Tables',   Icon: UtensilsCrossed,active: false },
  { id: 'bed',   label: 'Beds',     Icon: Bed,            active: false },
  { id: 'clock', label: 'Clocks',   Icon: Clock,          active: false },
  { id: 'shelf', label: 'Shelves',  Icon: BookOpen,       active: false },
]

export function CategoryScreen() {
  const selectCategory = useSessionStore((s) => s.selectCategory)

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      <div className="px-6 pt-14 pb-6">
        <h1 className="font-serif text-4xl font-semibold text-gray-900 leading-tight">
          What are you<br />shopping for?
        </h1>
        <p className="text-gray-500 mt-3 text-base">
          We'll learn your style and find your perfect match.
        </p>
      </div>

      <div className="px-6 grid grid-cols-2 gap-3 flex-1">
        {CATEGORIES.map(({ id, label, Icon, active }, i) => (
          <motion.button
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => active && selectCategory(id)}
            className={`
              relative flex flex-col items-start p-5 rounded-3xl aspect-square
              transition-all
              ${active
                ? 'bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer active:scale-95'
                : 'bg-gray-100 cursor-not-allowed opacity-50'}
            `}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-auto ${active ? 'bg-amber-50' : 'bg-gray-200'}`}>
              <Icon size={22} className={active ? 'text-amber-700' : 'text-gray-400'} />
            </div>
            <div className="mt-8">
              <span className="font-serif text-lg font-semibold text-gray-900">{label}</span>
              {!active && (
                <p className="text-xs text-gray-400 mt-0.5">Coming soon</p>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="px-6 py-8 text-center">
        <p className="text-xs text-gray-400">
          FurniSwipe · We earn when you buy
        </p>
      </div>
    </div>
  )
}
