/**
 * Core type definitions for Fruitbench
 */

export type FruitTag =
  | 'popular'
  | 'berries'
  | 'tropical'
  | 'citrus'
  | 'stone-fruit'
  | 'melons'
  | 'exotic'
  | 'culinary-vegetable'
  | 'dried'
  | 'orchard'

export type Criterion =
  | 'flavor'
  | 'nourishment'
  | 'reliability'
  | 'practicality'

export interface CriterionMetadata {
  key: Criterion
  label: string
  emoji: string
  description: string
}

export const CRITERION_METADATA: Record<Criterion, CriterionMetadata> = {
  flavor: {
    key: 'flavor',
    label: 'Flavor',
    emoji: '😋',
    description:
      'How delicious and enjoyable the fruit tastes. Consider sweetness, tartness, complexity, and overall palatability. [Weighted 4x in scoring - most critical criterion]',
  },
  nourishment: {
    key: 'nourishment',
    label: 'Nourishment',
    emoji: '💪',
    description:
      'Nutritional value and health benefits. Vitamins, minerals, fiber, antioxidants, and overall contribution to a healthy diet.',
  },
  reliability: {
    key: 'reliability',
    label: 'Reliability',
    emoji: '🎯',
    description:
      'Consistency in quality and availability. How often you can find good specimens year-round, shelf life, and predictable ripeness.',
  },
  practicality: {
    key: 'practicality',
    label: 'Practicality',
    emoji: '✨',
    description:
      'Ease of consumption and use. Consider portability, ease of peeling/cutting, messiness, seed removal, and versatility in recipes.',
  },
}

export const CRITERIA_INFO: CriterionMetadata[] =
  Object.values(CRITERION_METADATA)

export interface Fruit {
  id: string
  name: string
  emoji: string
  tags: FruitTag[]
  searchTerms?: string[] // Alternative names for better search
}

export interface FruitRating {
  fruitId: string
  flavor: number // 0-10
  nourishment: number // 0-10
  reliability: number // 0-10
  practicality: number // 0-10
}

export interface RatedFruit extends Fruit {
  rating: FruitRating
  total: number
  tier: 'S' | 'A' | 'B' | 'C' | 'F'
}

export type SortColumn =
  | 'name'
  | 'tier'
  | 'flavor'
  | 'nourishment'
  | 'reliability'
  | 'practicality'
  | 'total'
export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  column: SortColumn
  direction: SortDirection
}

export interface FilterConfig {
  tags: FruitTag[]
  searchQuery: string
  selectedFruitIds: string[]
}

export interface AppState {
  ratings: Record<string, FruitRating> // fruitId -> rating
  selectedFruitIds: string[] // fruits user has added to their benchmark
  sortConfig: SortConfig
  filterConfig: Partial<FilterConfig>
}
