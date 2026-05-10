import type { SwipeEvent, StyleProfile, FurnitureItem, RankedItem } from '../types'
import type { RecommendationEngine } from './index'

// v1 prototype: incremental weighted average per tag.
// Replace this class with any other RecommendationEngine implementation to upgrade.
export class TagWeightedEngine implements RecommendationEngine {
  private profile: StyleProfile = { tagScores: {}, tagCounts: {} }

  ingest(event: SwipeEvent): void {
    for (const tag of event.tags) {
      const prev = this.profile.tagScores[tag] ?? 0
      const count = this.profile.tagCounts[tag] ?? 0
      this.profile.tagScores[tag] = (prev * count + event.score) / (count + 1)
      this.profile.tagCounts[tag] = count + 1
    }
  }

  getStyleProfile(): StyleProfile {
    return {
      tagScores: { ...this.profile.tagScores },
      tagCounts: { ...this.profile.tagCounts },
    }
  }

  rank(catalog: FurnitureItem[]): RankedItem[] {
    return catalog
      .map((item) => {
        const knownScores = item.tags
          .map((tag) => this.profile.tagScores[tag])
          .filter((s): s is number => s !== undefined)

        const matchScore =
          knownScores.length > 0
            ? knownScores.reduce((a, b) => a + b, 0) / knownScores.length
            : 5 // neutral cold-start score for unseen tags

        return { ...item, matchScore }
      })
      .sort((a, b) => b.matchScore - a.matchScore)
  }

  reset(): void {
    this.profile = { tagScores: {}, tagCounts: {} }
  }
}
