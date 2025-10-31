/**
 * Core type definitions for Fruitbench
 */

export type FruitTag
  = | 'popular'
    | 'berries'
    | 'tropical'
    | 'citrus'
    | 'stone-fruit'
    | 'melons'
    | 'exotic'
    | 'culinary-vegetable'
    | 'dried'
    | 'orchard'

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

export type SortColumn = 'name' | 'flavor' | 'nourishment' | 'reliability' | 'practicality' | 'total'
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
