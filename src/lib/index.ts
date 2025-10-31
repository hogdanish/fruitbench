/**
 * Main exports for Fruitbench library
 * This file provides a clean API for importing all the core functionality
 */

// Fruit database
export { FRUITS, TAG_METADATA } from '../data/fruits'

// Types
export type {
  AppState,
  FilterConfig,
  Fruit,
  FruitRating,
  FruitTag,
  RatedFruit,
  SortColumn,
  SortConfig,
  SortDirection,
} from '../types'

// Utility functions
export {
  calculateTier,
  calculateTotal,
  filterBySearch,
  filterByTags,
  filterFruits,
  getFruitsByIds,
  getRatedFruits,
  getUniqueTags,
  groupByTier,
  isFullyRated,
  sortRatedFruits,
  toRatedFruit,
} from '../utils/fruit-utils'

// Storage utilities
export {
  addSelectedFruit,
  clearState,
  DEFAULT_STATE,
  deleteRating,
  exportState,
  importState,
  loadState,
  removeSelectedFruit,
  saveRating,
  saveSelectedFruits,
  saveSortConfig,
  saveState,
} from '../utils/storage'
