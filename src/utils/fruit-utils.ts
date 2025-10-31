import type { Fruit, FruitRating, FruitTag, RatedFruit, SortColumn, SortDirection } from '../types'

/**
 * Calculate the tier based on total score (out of 40)
 * S: 36-40 (90%+)
 * A: 32-35 (80-89%)
 * B: 28-31 (70-79%)
 * C: 20-27 (50-69%)
 * F: 0-19 (<50%)
 */
export function calculateTier(total: number): 'S' | 'A' | 'B' | 'C' | 'F' {
  if (total >= 36)
    return 'S'
  if (total >= 32)
    return 'A'
  if (total >= 28)
    return 'B'
  if (total >= 20)
    return 'C'
  return 'F'
}

/**
 * Calculate the total score from individual ratings
 */
export function calculateTotal(rating: FruitRating): number {
  return rating.flavor + rating.nourishment + rating.reliability + rating.practicality
}

/**
 * Convert a Fruit with its rating to a RatedFruit
 */
export function toRatedFruit(fruit: Fruit, rating: FruitRating): RatedFruit {
  const total = calculateTotal(rating)
  const tier = calculateTier(total)

  return {
    ...fruit,
    rating,
    total,
    tier,
  }
}

/**
 * Filter fruits by tags (OR logic - fruit must have at least one of the selected tags)
 */
export function filterByTags(fruits: Fruit[], tags: FruitTag[]): Fruit[] {
  if (tags.length === 0)
    return fruits
  return fruits.filter(fruit => fruit.tags.some(tag => tags.includes(tag)))
}

/**
 * Filter fruits by search query (searches name and alternative search terms)
 */
export function filterBySearch(fruits: Fruit[], query: string): Fruit[] {
  if (!query.trim())
    return fruits

  const normalizedQuery = query.toLowerCase().trim()

  return fruits.filter((fruit) => {
    // Search in name
    if (fruit.name.toLowerCase().includes(normalizedQuery))
      return true

    // Search in alternative terms
    if (fruit.searchTerms?.some(term => term.toLowerCase().includes(normalizedQuery))) {
      return true
    }

    return false
  })
}

/**
 * Filter fruits by multiple criteria
 */
export function filterFruits(
  fruits: Fruit[],
  options: {
    tags?: FruitTag[]
    searchQuery?: string
  },
): Fruit[] {
  let filtered = fruits

  if (options.tags && options.tags.length > 0) {
    filtered = filterByTags(filtered, options.tags)
  }

  if (options.searchQuery) {
    filtered = filterBySearch(filtered, options.searchQuery)
  }

  return filtered
}

/**
 * Sort fruits by a specific column and direction
 */
export function sortRatedFruits(
  fruits: RatedFruit[],
  column: SortColumn,
  direction: SortDirection,
): RatedFruit[] {
  const sorted = [...fruits].sort((a, b) => {
    let comparison = 0

    switch (column) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'flavor':
        comparison = a.rating.flavor - b.rating.flavor
        break
      case 'nourishment':
        comparison = a.rating.nourishment - b.rating.nourishment
        break
      case 'reliability':
        comparison = a.rating.reliability - b.rating.reliability
        break
      case 'practicality':
        comparison = a.rating.practicality - b.rating.practicality
        break
      case 'total':
        comparison = a.total - b.total
        break
    }

    return direction === 'asc' ? comparison : -comparison
  })

  return sorted
}

/**
 * Group rated fruits by tier (for display with separators)
 */
export function groupByTier(fruits: RatedFruit[]): Record<'S' | 'A' | 'B' | 'C' | 'F', RatedFruit[]> {
  return fruits.reduce(
    (acc, fruit) => {
      acc[fruit.tier].push(fruit)
      return acc
    },
    { S: [], A: [], B: [], C: [], F: [] } as Record<'S' | 'A' | 'B' | 'C' | 'F', RatedFruit[]>,
  )
}

/**
 * Get all fruits that have been rated
 */
export function getRatedFruits(
  fruits: Fruit[],
  ratings: Record<string, FruitRating>,
): RatedFruit[] {
  return fruits
    .filter(fruit => ratings[fruit.id])
    .map(fruit => toRatedFruit(fruit, ratings[fruit.id]))
}

/**
 * Check if a fruit has been fully rated (all 4 criteria have values > 0)
 */
export function isFullyRated(rating: FruitRating | undefined): boolean {
  if (!rating)
    return false
  return (
    rating.flavor > 0
    && rating.nourishment > 0
    && rating.reliability > 0
    && rating.practicality > 0
  )
}

/**
 * Get all fruits from an array of IDs
 */
export function getFruitsByIds(fruits: Fruit[], ids: string[]): Fruit[] {
  const fruitMap = new Map(fruits.map(f => [f.id, f]))
  return ids.map(id => fruitMap.get(id)).filter(Boolean) as Fruit[]
}

/**
 * Get all unique tags from a list of fruits
 */
export function getUniqueTags(fruits: Fruit[]): FruitTag[] {
  const tags = new Set<FruitTag>()
  fruits.forEach(fruit => fruit.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags)
}
