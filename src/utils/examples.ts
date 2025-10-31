/**
 * Example usage patterns for the Fruitbench library
 * This file demonstrates how to use the various utilities
 */

/* eslint-disable no-console */

import type { FruitRating } from '../types'
import { FRUITS, TAG_METADATA } from '../data/fruits'
import {
  addSelectedFruit,
  calculateTier,
  calculateTotal,
  filterFruits,
  getFruitsByIds,
  getRatedFruits,
  groupByTier,
  loadState,
  saveRating,
  saveSelectedFruits,
  sortRatedFruits,
  toRatedFruit,
} from '../lib'

/**
 * Example 1: Filter fruits by tags
 */
export function exampleFilterByTags() {
  // Get all popular fruits
  const popularFruits = filterFruits(FRUITS, { tags: ['popular'] })
  console.log('Popular fruits:', popularFruits.map(f => f.name))

  // Get all berries
  const berries = filterFruits(FRUITS, { tags: ['berries'] })
  console.log('Berries:', berries.map(f => f.name))

  // Get fruits that are either tropical OR citrus
  const tropicalOrCitrus = filterFruits(FRUITS, { tags: ['tropical', 'citrus'] })
  console.log('Tropical or Citrus:', tropicalOrCitrus.map(f => f.name))
}

/**
 * Example 2: Search for fruits
 */
export function exampleSearch() {
  // Search for fruits containing "apple"
  const apples = filterFruits(FRUITS, { searchQuery: 'apple' })
  console.log('Fruits matching "apple":', apples.map(f => f.name))

  // Search using alternative terms
  const kiwis = filterFruits(FRUITS, { searchQuery: 'kiwifruit' })
  console.log('Fruits matching "kiwifruit":', kiwis.map(f => f.name))
}

/**
 * Example 3: Combine filters
 */
export function exampleCombinedFilters() {
  // Get popular berries
  const popularBerries = filterFruits(FRUITS, {
    tags: ['popular', 'berries'],
    searchQuery: '',
  })
  console.log('Popular berries:', popularBerries.map(f => f.name))
}

/**
 * Example 4: Rate a fruit
 */
export function exampleRateFruit() {
  const banana = FRUITS.find(f => f.id === 'banana')!

  // Create a rating
  const rating: FruitRating = {
    fruitId: 'banana',
    flavor: 9,
    nourishment: 8,
    reliability: 10,
    practicality: 10,
  }

  // Save to localStorage
  saveRating('banana', rating)

  // Calculate tier
  const total = calculateTotal(rating)
  const tier = calculateTier(total)

  console.log(`Banana scored ${total}/40 (Tier ${tier})`)

  // Convert to RatedFruit
  const ratedBanana = toRatedFruit(banana, rating)
  console.log('Rated banana:', ratedBanana)
}

/**
 * Example 5: Work with selected fruits
 */
export function exampleSelectedFruits() {
  // Add some fruits to the benchmark
  addSelectedFruit('banana')
  addSelectedFruit('apple-red')
  addSelectedFruit('strawberry')

  // Or set all at once
  saveSelectedFruits(['banana', 'apple-red', 'strawberry', 'orange'])

  // Load and display selected fruits
  const state = loadState()
  const selectedFruits = getFruitsByIds(FRUITS, state.selectedFruitIds)
  console.log('Selected fruits:', selectedFruits.map(f => f.name))
}

/**
 * Example 6: Get and sort rated fruits
 */
export function exampleGetRatedFruits() {
  // Assuming some fruits have been rated
  const state = loadState()

  // Get all rated fruits with calculated totals and tiers
  const ratedFruits = getRatedFruits(FRUITS, state.ratings)

  // Sort by total score (descending)
  const sortedByTotal = sortRatedFruits(ratedFruits, 'total', 'desc')
  console.log('Fruits sorted by total:', sortedByTotal.map(f => `${f.name}: ${f.total}`))

  // Sort by name (ascending)
  const sortedByName = sortRatedFruits(ratedFruits, 'name', 'asc')
  console.log('Fruits sorted by name:', sortedByName.map(f => f.name))

  // Sort by flavor (descending)
  const sortedByFlavor = sortRatedFruits(ratedFruits, 'flavor', 'desc')
  console.log('Fruits sorted by flavor:', sortedByFlavor.map(f => `${f.name}: ${f.rating.flavor}`))
}

/**
 * Example 7: Group fruits by tier
 */
export function exampleGroupByTier() {
  const state = loadState()
  const ratedFruits = getRatedFruits(FRUITS, state.ratings)

  // Group by tier for display with separators
  const grouped = groupByTier(ratedFruits)

  console.log('S-Tier:', grouped.S.map(f => f.name))
  console.log('A-Tier:', grouped.A.map(f => f.name))
  console.log('B-Tier:', grouped.B.map(f => f.name))
  console.log('C-Tier:', grouped.C.map(f => f.name))
  console.log('F-Tier:', grouped.F.map(f => f.name))
}

/**
 * Example 8: Working with tags metadata
 */
export function exampleTagMetadata() {
  // Display all available tags with descriptions
  Object.entries(TAG_METADATA).forEach(([tag, meta]) => {
    const count = FRUITS.filter(f => f.tags.includes(tag as any)).length
    console.log(`${meta.label} (${count} fruits): ${meta.description}`)
  })
}

/**
 * Example 9: Complete workflow
 */
export function exampleCompleteWorkflow() {
  console.log('=== Complete Fruitbench Workflow ===\n')

  // Step 1: User selects fruits (let's pick popular ones)
  const popularFruits = filterFruits(FRUITS, { tags: ['popular'] })
  const selectedIds = popularFruits.slice(0, 5).map(f => f.id)
  saveSelectedFruits(selectedIds)
  console.log('Selected fruits:', popularFruits.slice(0, 5).map(f => f.name))

  // Step 2: Rate each fruit
  const ratings: Array<{ id: string, rating: Omit<FruitRating, 'fruitId'> }> = [
    { id: 'banana', rating: { flavor: 9, nourishment: 8, reliability: 10, practicality: 10 } },
    { id: 'apple-red', rating: { flavor: 8, nourishment: 7, reliability: 9, practicality: 9 } },
    { id: 'strawberry', rating: { flavor: 10, nourishment: 6, reliability: 7, practicality: 7 } },
    { id: 'orange', rating: { flavor: 8, nourishment: 9, reliability: 8, practicality: 6 } },
    { id: 'grape', rating: { flavor: 8, nourishment: 7, reliability: 9, practicality: 9 } },
  ]

  ratings.forEach(({ id, rating }) => {
    saveRating(id, rating)
  })

  // Step 3: Load and display results
  const state = loadState()
  const ratedFruits = getRatedFruits(FRUITS, state.ratings)
  const sorted = sortRatedFruits(ratedFruits, 'total', 'desc')

  console.log('\n=== Results Table ===')
  sorted.forEach((fruit, index) => {
    console.log(
      `${index + 1}. ${fruit.emoji} ${fruit.name.padEnd(15)} | `
      + `Flavor: ${fruit.rating.flavor}/10 | `
      + `Nourishment: ${fruit.rating.nourishment}/10 | `
      + `Reliability: ${fruit.rating.reliability}/10 | `
      + `Practicality: ${fruit.rating.practicality}/10 | `
      + `Total: ${fruit.total}/40 | `
      + `Tier: ${fruit.tier}`,
    )
  })

  // Step 4: Group by tier
  const grouped = groupByTier(sorted)
  console.log('\n=== Grouped by Tier ===')
  if (grouped.S.length > 0)
    console.log(`S-Tier: ${grouped.S.map(f => f.name).join(', ')}`)
  if (grouped.A.length > 0)
    console.log(`A-Tier: ${grouped.A.map(f => f.name).join(', ')}`)
  if (grouped.B.length > 0)
    console.log(`B-Tier: ${grouped.B.map(f => f.name).join(', ')}`)
  if (grouped.C.length > 0)
    console.log(`C-Tier: ${grouped.C.map(f => f.name).join(', ')}`)
  if (grouped.F.length > 0)
    console.log(`F-Tier: ${grouped.F.map(f => f.name).join(', ')}`)
}
