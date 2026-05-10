import type { StyleArchetype } from '../types'

// 9 archetypes shown in 3 rounds of 3 during the grasp phase
export const ARCHETYPES: StyleArchetype[] = [
  // Round 1
  {
    id: 'arch-scandi',
    name: 'Scandinavian Serenity',
    description: 'Clean lines, natural birch, calm neutral tones',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=560&fit=crop&q=80',
    tags: ['scandinavian', 'minimal', 'wood', 'white', 'natural', 'calm'],
  },
  {
    id: 'arch-industrial',
    name: 'Industrial Loft',
    description: 'Raw metal, exposed bulb, matte black attitude',
    imageUrl: 'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=400&h=560&fit=crop&q=80',
    tags: ['industrial', 'metal', 'dark', 'raw', 'urban', 'bold'],
  },
  {
    id: 'arch-midcentury',
    name: 'Mid-Century Modern',
    description: 'Tapered tripod legs, warm walnut, retro warmth',
    imageUrl: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=560&fit=crop&q=80',
    tags: ['midcentury', 'retro', 'wood', 'warm', 'walnut', 'iconic'],
  },
  // Round 2
  {
    id: 'arch-boho',
    name: 'Bohemian Dreams',
    description: 'Rattan weave, organic shapes, free-spirited warmth',
    imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=560&fit=crop&q=80',
    tags: ['bohemian', 'rattan', 'organic', 'warm', 'natural', 'handmade'],
  },
  {
    id: 'arch-artdeco',
    name: 'Art Deco Glamour',
    description: 'Geometric forms, polished brass, luxurious drama',
    imageUrl: 'https://images.unsplash.com/photo-1653854925886-223f664a3f2f?w=400&h=560&fit=crop&q=80',
    tags: ['artdeco', 'brass', 'geometric', 'luxury', 'gold', 'decorative'],
  },
  {
    id: 'arch-wabisabi',
    name: 'Wabi-Sabi Calm',
    description: 'Ceramic, imperfect beauty, meditative simplicity',
    imageUrl: 'https://images.unsplash.com/photo-1677204708410-859656e196e1?w=400&h=560&fit=crop&q=80',
    tags: ['wabisabi', 'ceramic', 'organic', 'neutral', 'handmade', 'calm'],
  },
  // Round 3
  {
    id: 'arch-japandi',
    name: 'Japandi Minimal',
    description: 'East meets West — serene, purposeful, uncluttered',
    imageUrl: 'https://images.unsplash.com/photo-1764445274424-47bbc216073b?w=400&h=560&fit=crop&q=80',
    tags: ['japandi', 'minimal', 'natural', 'calm', 'wood', 'neutral'],
  },
  {
    id: 'arch-memphis',
    name: 'Memphis Pop',
    description: 'Bold geometry, clashing color, unapologetic fun',
    imageUrl: 'https://images.unsplash.com/photo-1650137938625-11576502aecd?w=400&h=560&fit=crop&q=80',
    tags: ['memphis', 'colorful', 'geometric', 'bold', 'playful', 'retro'],
  },
  {
    id: 'arch-classic',
    name: 'Classic Elegance',
    description: 'Ornate silhouettes, silk shade, timeless refinement',
    imageUrl: 'https://images.unsplash.com/photo-1754999809963-79a41e8fb648?w=400&h=560&fit=crop&q=80',
    tags: ['classic', 'ornate', 'silk', 'traditional', 'refined', 'warm'],
  },
]

export const GRASP_ROUNDS: StyleArchetype[][] = [
  ARCHETYPES.slice(0, 3),
  ARCHETYPES.slice(3, 6),
  ARCHETYPES.slice(6, 9),
]
