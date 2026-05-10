import type { StyleArchetype } from '../types'

// 9 archetypes shown in 3 rounds of 3 during the grasp phase
export const ARCHETYPES: StyleArchetype[] = [
  // Round 1
  {
    id: 'arch-scandi',
    name: 'Scandinavian Serenity',
    description: 'Clean lines, natural birch, calm neutral tones',
    imageUrl: 'https://loremflickr.com/400/560/scandinavian,lamp,minimal?lock=101',
    tags: ['scandinavian', 'minimal', 'wood', 'white', 'natural', 'calm'],
  },
  {
    id: 'arch-industrial',
    name: 'Industrial Loft',
    description: 'Raw metal, exposed bulb, matte black attitude',
    imageUrl: 'https://loremflickr.com/400/560/industrial,lamp,metal?lock=102',
    tags: ['industrial', 'metal', 'dark', 'raw', 'urban', 'bold'],
  },
  {
    id: 'arch-midcentury',
    name: 'Mid-Century Modern',
    description: 'Tapered tripod legs, warm walnut, retro warmth',
    imageUrl: 'https://loremflickr.com/400/560/retro,lamp,wood?lock=103',
    tags: ['midcentury', 'retro', 'wood', 'warm', 'walnut', 'iconic'],
  },
  // Round 2
  {
    id: 'arch-boho',
    name: 'Bohemian Dreams',
    description: 'Rattan weave, organic shapes, free-spirited warmth',
    imageUrl: 'https://loremflickr.com/400/560/rattan,lamp,boho?lock=104',
    tags: ['bohemian', 'rattan', 'organic', 'warm', 'natural', 'handmade'],
  },
  {
    id: 'arch-artdeco',
    name: 'Art Deco Glamour',
    description: 'Geometric forms, polished brass, luxurious drama',
    imageUrl: 'https://loremflickr.com/400/560/brass,lamp,luxury?lock=105',
    tags: ['artdeco', 'brass', 'geometric', 'luxury', 'gold', 'decorative'],
  },
  {
    id: 'arch-wabisabi',
    name: 'Wabi-Sabi Calm',
    description: 'Ceramic, imperfect beauty, meditative simplicity',
    imageUrl: 'https://loremflickr.com/400/560/ceramic,lamp,handmade?lock=106',
    tags: ['wabisabi', 'ceramic', 'organic', 'neutral', 'handmade', 'calm'],
  },
  // Round 3
  {
    id: 'arch-japandi',
    name: 'Japandi Minimal',
    description: 'East meets West — serene, purposeful, uncluttered',
    imageUrl: 'https://loremflickr.com/400/560/japanese,lamp,minimal?lock=107',
    tags: ['japandi', 'minimal', 'natural', 'calm', 'wood', 'neutral'],
  },
  {
    id: 'arch-memphis',
    name: 'Memphis Pop',
    description: 'Bold geometry, clashing color, unapologetic fun',
    imageUrl: 'https://loremflickr.com/400/560/colorful,lamp,design?lock=108',
    tags: ['memphis', 'colorful', 'geometric', 'bold', 'playful', 'retro'],
  },
  {
    id: 'arch-classic',
    name: 'Classic Elegance',
    description: 'Ornate silhouettes, silk shade, timeless refinement',
    imageUrl: 'https://loremflickr.com/400/560/classic,lamp,elegant?lock=109',
    tags: ['classic', 'ornate', 'silk', 'traditional', 'refined', 'warm'],
  },
]

export const GRASP_ROUNDS: StyleArchetype[][] = [
  ARCHETYPES.slice(0, 3),
  ARCHETYPES.slice(3, 6),
  ARCHETYPES.slice(6, 9),
]
