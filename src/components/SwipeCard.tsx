import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, type PanInfo } from 'framer-motion'

interface CardData {
  id: string
  name: string
  imageUrl: string
  brand?: string
  price?: number
  currency?: string
  description?: string
}

interface Props {
  card: CardData
  isTop: boolean
  stackDepth: number // 0 = top, 1 = second, 2 = third
  onSwipe: (score: number) => void
}

// Converts drag offset to a 0–10 score using the angle system:
//   Left (0°) = 0  |  Up (90°) = 5  |  Right (180°) = 10
// Downward drags score 0 (hard pass).
function calculateScore(dx: number, dy: number): number {
  const mathAngle = Math.atan2(-dy, dx) * (180 / Math.PI)
  if (mathAngle < 0) return 0
  const userAngle = 180 - mathAngle
  return Math.max(0, Math.min(10, (userAngle / 180) * 10))
}

function scoreToColor(score: number): string {
  if (score < 2.5) return 'rgba(239,68,68,0.35)'
  if (score < 4)   return 'rgba(249,115,22,0.35)'
  if (score < 6)   return 'rgba(234,179,8,0.30)'
  if (score < 8)   return 'rgba(132,204,16,0.30)'
  return 'rgba(34,197,94,0.35)'
}


function scoreToBorderColor(score: number): string {
  if (score < 2.5) return '#ef4444'
  if (score < 4)   return '#f97316'
  if (score < 6)   return '#eab308'
  if (score < 8)   return '#84cc16'
  return '#22c55e'
}

const SWIPE_THRESHOLD = 80

export function SwipeCard({ card, isTop, stackDepth, onSwipe }: Props) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-250, 250], [-18, 18])

  const [isDragging, setIsDragging] = useState(false)
  const [liveScore, setLiveScore] = useState(5)
  const [dismissed, setDismissed] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0 })

  const scale = 1 - stackDepth * 0.04
  const translateY = stackDepth * 12

  function handleDragStart() {
    setIsDragging(true)
    dragStartRef.current = { x: x.get(), y: y.get() }
  }

  function handleDrag(_: unknown, info: PanInfo) {
    setLiveScore(calculateScore(info.offset.x, info.offset.y))
  }

  async function handleDragEnd(_: unknown, info: PanInfo) {
    const { offset } = info
    const magnitude = Math.sqrt(offset.x ** 2 + offset.y ** 2)

    if (magnitude > SWIPE_THRESHOLD) {
      setDismissed(true)
      const factor = 1400 / magnitude
      await Promise.all([
        animate(x, offset.x * factor, { duration: 0.28, ease: 'easeOut' }),
        animate(y, offset.y * factor, { duration: 0.28, ease: 'easeOut' }),
      ])
      onSwipe(calculateScore(offset.x, offset.y))
    } else {
      setIsDragging(false)
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 28 })
      animate(y, 0, { type: 'spring', stiffness: 400, damping: 28 })
    }
  }

  if (dismissed) return null

  return (
    <motion.div
      drag={isTop}
      dragMomentum={false}
      style={{
        x,
        y,
        rotate,
        scale,
        translateY,
        zIndex: 10 - stackDepth,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className="touch-none select-none"
    >
      <div
        className="relative w-full rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: '#fff',
          border: isDragging ? `3px solid ${scoreToBorderColor(liveScore)}` : '3px solid transparent',
          transition: 'border-color 0.1s',
        }}
      >
        {/* Product image */}
        <div className="relative" style={{ height: '420px' }}>
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-full object-cover"
            draggable={false}
          />

          {/* Score overlay during drag */}
          {isDragging && isTop && (
            <div
              className="absolute inset-0"
              style={{ background: scoreToColor(liveScore) }}
            />
          )}
        </div>

        {/* Card info */}
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-serif text-xl font-semibold text-gray-900 leading-tight">
                {card.name}
              </h3>
              {card.brand && (
                <p className="text-sm text-gray-500 mt-0.5 font-medium">{card.brand}</p>
              )}
            </div>
            {card.price != null && (
              <span className="text-base font-semibold text-gray-800 whitespace-nowrap ml-3">
                {card.currency} {card.price}
              </span>
            )}
          </div>
          {card.description && (
            <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
              {card.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
