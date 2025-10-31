# Fruitbench Data Structure & API Documentation

This document explains the underlying data structure and API for the Fruitbench application.

## Overview

The Fruitbench data layer is built around:

1. **Fruit Database** - Comprehensive list of ~70 fruits with metadata
2. **Tag System** - Flexible categorization allowing fruits to have multiple tags
3. **Rating System** - 4-criteria scoring (0-10 each) with automatic tier calculation
4. **Filtering & Sorting** - Utilities for finding and organizing fruits
5. **Local Storage** - Persistent data for user ratings and selections

## Core Types

### `Fruit`

```typescript
interface Fruit {
  id: string // Unique identifier (e.g., 'banana', 'apple-red')
  name: string // Display name (e.g., 'Banana', 'Red Apple')
  emoji: string // Visual icon (e.g., '🍌')
  tags: FruitTag[] // Categories (e.g., ['popular', 'tropical'])
  searchTerms?: string[] // Alternative names for search (e.g., ['kiwifruit'])
}
```

### `FruitRating`

```typescript
interface FruitRating {
  fruitId: string
  flavor: number // 0-10: How good does it taste?
  nourishment: number // 0-10: How nutritious is it?
  reliability: number // 0-10: How consistent is the quality?
  practicality: number // 0-10: How easy is it to eat/store/prepare?
}
```

### `RatedFruit`

A `Fruit` combined with its rating, total score, and calculated tier:

```typescript
interface RatedFruit extends Fruit {
  rating: FruitRating
  total: number // Sum of all 4 scores (0-40)
  tier: 'S' | 'A' | 'B' | 'C' | 'F'
}
```

### `AppState`

The complete application state stored in localStorage:

```typescript
interface AppState {
  ratings: Record<string, FruitRating> // fruitId -> rating
  selectedFruitIds: string[] // fruits in user's benchmark
  sortConfig: SortConfig // current sort preferences
  filterConfig: Partial<FilterConfig> // current filter settings
}
```

## Tag System

Fruits can have multiple tags for flexible filtering:

| Tag                  | Description                               | Example Fruits                   |
| -------------------- | ----------------------------------------- | -------------------------------- |
| `popular`            | Common supermarket fruits                 | Banana, Apple, Orange            |
| `berries`            | Small, juicy fruits with seeds            | Strawberry, Blueberry, Raspberry |
| `tropical`           | Fruits from tropical climates             | Mango, Pineapple, Papaya         |
| `citrus`             | Tangy fruits rich in vitamin C            | Orange, Lemon, Lime              |
| `stone-fruit`        | Fruits with a hard pit                    | Peach, Cherry, Plum              |
| `melons`             | Large fruits with thick rind              | Watermelon, Cantaloupe           |
| `exotic`             | Specialty or harder-to-find               | Dragonfruit, Durian, Rambutan    |
| `culinary-vegetable` | Botanically fruits, culinarily vegetables | Tomato, Avocado, Cucumber        |
| `dried`              | Commonly consumed dried                   | Dates                            |
| `orchard`            | Tree fruits from orchards                 | Apple, Pear, Peach               |

**Example:** A banana has tags `['popular', 'tropical']` - it's both a common supermarket fruit AND a tropical fruit.

## Tier Calculation

Tiers are calculated based on total score (out of 40):

| Tier  | Score Range | Percentage |
| ----- | ----------- | ---------- |
| **S** | 36-40       | 90%+       |
| **A** | 32-35       | 80-89%     |
| **B** | 28-31       | 70-79%     |
| **C** | 20-27       | 50-69%     |
| **F** | 0-19        | <50%       |

S-tier should be visually distinctive in the UI (special styling, prominent placement).

## Core Functions

### Filtering

```typescript
// Filter by tags (OR logic - fruit needs at least one matching tag)
filterByTags(FRUITS, ['popular', 'berries'])
// Returns: fruits that are EITHER popular OR berries

// Filter by search query (searches name and searchTerms)
filterBySearch(FRUITS, 'apple')
// Returns: Red Apple, Green Apple

// Combined filtering
filterFruits(FRUITS, {
  tags: ['tropical'],
  searchQuery: 'mango',
})
```

### Rating & Scoring

```typescript
// Create a rating
const rating: FruitRating = {
  fruitId: 'banana',
  flavor: 9,
  nourishment: 8,
  reliability: 10,
  practicality: 10,
}

// Calculate total and tier
const total = calculateTotal(rating) // 37
const tier = calculateTier(total) // 'S'

// Convert to RatedFruit
const ratedBanana = toRatedFruit(banana, rating)
```

### Sorting

```typescript
// Sort rated fruits
sortRatedFruits(ratedFruits, 'total', 'desc') // By total score, descending
sortRatedFruits(ratedFruits, 'name', 'asc') // By name, ascending
sortRatedFruits(ratedFruits, 'flavor', 'desc') // By flavor, descending
```

Available sort columns: `'name' | 'flavor' | 'nourishment' | 'reliability' | 'practicality' | 'total'`

### Grouping

```typescript
// Group fruits by tier (useful for displaying tier separators)
const grouped = groupByTier(ratedFruits)
// Returns: { S: [...], A: [...], B: [...], C: [...], F: [...] }
```

### Local Storage

```typescript
// Save a rating
saveRating('banana', {
  flavor: 9,
  nourishment: 8,
  reliability: 10,
  practicality: 10,
})

// Add fruit to benchmark
addSelectedFruit('banana')

// Remove fruit from benchmark (also deletes its rating)
removeSelectedFruit('banana')

// Load current state
const state = loadState()

// Clear everything
clearState()

// Export/Import for sharing
const json = exportState()
importState(json)
```

## Fruit Database

The database contains ~70 fruits organized into:

- **Popular fruits** (9): Banana, Apples, Orange, Strawberry, Grape, Watermelon, Blueberry, Pear
- **Berries** (13): Strawberry, Blueberry, Raspberry, Blackberry, Cranberry, etc.
- **Stone fruits** (5): Peach, Cherry, Plum, Apricot, Nectarine
- **Citrus** (9): Orange, Lemon, Lime, Grapefruit, Tangerine, Blood Orange, etc.
- **Tropical** (10): Mango, Pineapple, Papaya, Coconut, Kiwi, Passion Fruit, etc.
- **Melons** (3): Watermelon, Cantaloupe, Honeydew
- **Exotic** (15): Dragonfruit, Durian, Starfruit, Rambutan, Mangosteen, etc.
- **Culinary vegetables** (9): Tomato, Avocado, Cucumber, Bell Pepper, etc.

See `/src/data/fruits.ts` for the complete list.

## Usage Patterns

### Pattern 1: Initial Fruit Selection

```typescript
// User wants to see all popular fruits to start with
const popularFruits = filterFruits(FRUITS, { tags: ['popular'] })

// User searches for a specific fruit
const searchResults = filterFruits(FRUITS, { searchQuery: 'berry' })

// User wants all tropical fruits
const tropicalFruits = filterFruits(FRUITS, { tags: ['tropical'] })
```

### Pattern 2: Building a Benchmark

```typescript
// User selects fruits to add to their benchmark
addSelectedFruit('banana')
addSelectedFruit('apple-red')
addSelectedFruit('strawberry')

// Get the user's selected fruits
const state = loadState()
const selectedFruits = getFruitsByIds(FRUITS, state.selectedFruitIds)
```

### Pattern 3: Rating Fruits

```typescript
// User rates each fruit on 4 criteria
saveRating('banana', {
  flavor: 9,
  nourishment: 8,
  reliability: 10,
  practicality: 10,
})

// Check if a fruit is fully rated
const bananaRating = state.ratings.banana
const isComplete = isFullyRated(bananaRating) // true
```

### Pattern 4: Displaying Results

```typescript
// Get all rated fruits with calculated totals and tiers
const state = loadState()
const ratedFruits = getRatedFruits(FRUITS, state.ratings)

// Sort by total (for leaderboard view)
const sorted = sortRatedFruits(ratedFruits, 'total', 'desc')

// Group by tier (for tier-separated view)
const grouped = groupByTier(sorted)

// Display with tier separators
if (grouped.S.length > 0) {
  console.log('=== S TIER ===')
  grouped.S.forEach((fruit) => displayFruit(fruit))
}
if (grouped.A.length > 0) {
  console.log('=== A TIER ===')
  grouped.A.forEach((fruit) => displayFruit(fruit))
}
// ... etc
```

## UI Considerations

When building the UI, consider:

1. **Fruit Selection**: Use the tag system to help users quickly find fruits
   - "Quick select" buttons for popular tags (Popular, Berries, Tropical, etc.)
   - Search bar for finding specific fruits
   - Visual display of fruit count for each tag

2. **Ranking Interface**: Make it quick to rate multiple fruits
   - Sliders (0-10) for each criterion
   - Visual feedback showing current tier as user adjusts scores
   - Ability to reset or remove ratings easily

3. **Results Display**: Emphasize the tier system
   - S-tier should be visually special (gold color, larger, prominent)
   - Color-coded tiers with clear separators
   - Sortable by clicking column headers

4. **Data Persistence**: Everything auto-saves to localStorage
   - No "Save" button needed
   - Users can close and reopen without losing progress

5. **Mobile-First**: Compact, efficient use of space
   - Scrollable lists with sticky headers
   - Responsive sliders
   - Touch-friendly interactive elements

## Example Files

See `/src/utils/examples.ts` for complete working examples of all functionality.
