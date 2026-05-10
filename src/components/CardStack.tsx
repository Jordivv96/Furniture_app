import { SwipeCard } from './SwipeCard'

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
  cards: CardData[]
  topIndex: number
  onSwipe: (score: number) => void
}

const VISIBLE = 3

export function CardStack({ cards, topIndex, onSwipe }: Props) {
  const visible = cards.slice(topIndex, topIndex + VISIBLE)

  return (
    <div className="relative w-full" style={{ height: '520px' }}>
      {visible.map((card, i) => (
        <SwipeCard
          key={card.id}
          card={card}
          isTop={i === 0}
          stackDepth={i}
          onSwipe={i === 0 ? onSwipe : () => {}}
        />
      ))}

      {visible.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 text-center text-base">
            You've seen everything!
          </p>
        </div>
      )}
    </div>
  )
}
