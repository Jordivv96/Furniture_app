import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { GRASP_ROUNDS } from '../data/archetypes'
import { useSessionStore } from '../store/sessionStore'
import type { StyleArchetype } from '../types'

export function GraspScreen() {
  const { graspRound, recordGraspRound } = useSessionStore((s) => ({
    graspRound: s.graspRound,
    recordGraspRound: s.recordGraspRound,
  }))

  const [picked, setPicked] = useState<string | null>(null)
  const round = GRASP_ROUNDS[graspRound]

  function handlePick(archetype: StyleArchetype) {
    if (picked) return
    setPicked(archetype.id)
    setTimeout(() => {
      recordGraspRound(archetype.id, round)
      setPicked(null)
    }, 480)
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-5">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
          Style check · {graspRound + 1} of {GRASP_ROUNDS.length}
        </p>
        <h1 className="font-serif text-3xl font-semibold text-gray-900 leading-snug">
          Which speaks<br />to you most?
        </h1>

        {/* Progress dots */}
        <div className="flex gap-2 mt-4">
          {GRASP_ROUNDS.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === graspRound ? '28px' : '8px',
                background: i < graspRound ? '#92400e' : i === graspRound ? '#c8852a' : '#d1d5db',
              }}
            />
          ))}
        </div>
      </div>

      {/* Three-way choice */}
      <AnimatePresence mode="wait">
        <motion.div
          key={graspRound}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.22 }}
          className="px-6 flex flex-col gap-3 flex-1"
        >
          {round.map((archetype, i) => {
            const isChosen = picked === archetype.id
            const isRejected = picked !== null && picked !== archetype.id

            return (
              <motion.button
                key={archetype.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handlePick(archetype)}
                disabled={!!picked}
                className="relative rounded-2xl overflow-hidden text-left w-full flex-1"
                style={{
                  minHeight: '160px',
                  outline: isChosen ? '3px solid #c8852a' : '3px solid transparent',
                  transition: 'outline 0.15s, opacity 0.2s',
                  opacity: isRejected ? 0.4 : 1,
                }}
              >
                {/* Background image */}
                <img
                  src={archetype.imageUrl}
                  alt={archetype.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />

                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-serif text-white text-lg font-semibold leading-tight">
                    {archetype.name}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">
                    {archetype.description}
                  </p>
                </div>

                {/* Chosen checkmark */}
                {isChosen && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center shadow-lg"
                  >
                    <Check size={16} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </AnimatePresence>

      <div className="px-6 py-6 text-center">
        <p className="text-xs text-gray-400">Tap the style that feels most like you</p>
      </div>
    </div>
  )
}
