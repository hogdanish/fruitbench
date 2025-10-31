import type { AppState, FruitRating, SortConfig } from '../types'

const STORAGE_KEY = 'fruitbench-state'
const STORAGE_VERSION = 1

interface StorageData {
  version: number
  state: AppState
}

/**
 * Default application state
 */
export const DEFAULT_STATE: AppState = {
  ratings: {},
  selectedFruitIds: [],
  sortConfig: {
    column: 'total',
    direction: 'desc',
  },
  filterConfig: {
    tags: [],
    searchQuery: '',
    selectedFruitIds: [],
  },
}

/**
 * Save the current application state to localStorage
 */
export function saveState(state: Partial<AppState>): void {
  try {
    const currentState = loadState()
    const newState: AppState = { ...currentState, ...state }

    const data: StorageData = {
      version: STORAGE_VERSION,
      state: newState,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
  catch (error) {
    console.error('Failed to save state to localStorage:', error)
  }
}

/**
 * Load the application state from localStorage
 */
export function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored)
      return DEFAULT_STATE

    const data: StorageData = JSON.parse(stored)

    // Check version and migrate if needed
    if (data.version !== STORAGE_VERSION) {
      console.warn('Storage version mismatch, using default state')
      return DEFAULT_STATE
    }

    // Validate and return state
    return validateState(data.state)
  }
  catch (error) {
    console.error('Failed to load state from localStorage:', error)
    return DEFAULT_STATE
  }
}

/**
 * Validate the state structure to ensure it matches expected types
 */
function validateState(state: any): AppState {
  const validated: AppState = {
    ratings: {},
    selectedFruitIds: [],
    sortConfig: { ...DEFAULT_STATE.sortConfig },
    filterConfig: { ...DEFAULT_STATE.filterConfig },
  }

  // Validate ratings
  if (state.ratings && typeof state.ratings === 'object') {
    Object.entries(state.ratings).forEach(([fruitId, rating]) => {
      if (isValidRating(rating)) {
        validated.ratings[fruitId] = rating as FruitRating
      }
    })
  }

  // Validate selected fruit IDs
  if (Array.isArray(state.selectedFruitIds)) {
    validated.selectedFruitIds = state.selectedFruitIds.filter(
      (id: any) => typeof id === 'string',
    )
  }

  // Validate sort config
  if (state.sortConfig && typeof state.sortConfig === 'object') {
    const { column, direction } = state.sortConfig
    if (isValidSortColumn(column)) {
      validated.sortConfig.column = column
    }
    if (direction === 'asc' || direction === 'desc') {
      validated.sortConfig.direction = direction
    }
  }

  // Validate filter config
  if (state.filterConfig && typeof state.filterConfig === 'object') {
    if (Array.isArray(state.filterConfig.tags)) {
      validated.filterConfig.tags = state.filterConfig.tags
    }
    if (typeof state.filterConfig.searchQuery === 'string') {
      validated.filterConfig.searchQuery = state.filterConfig.searchQuery
    }
  }

  return validated
}

/**
 * Check if a rating object is valid
 */
function isValidRating(rating: any): boolean {
  return (
    rating
    && typeof rating === 'object'
    && typeof rating.fruitId === 'string'
    && typeof rating.flavor === 'number'
    && typeof rating.nourishment === 'number'
    && typeof rating.reliability === 'number'
    && typeof rating.practicality === 'number'
    && rating.flavor >= 0
    && rating.flavor <= 10
    && rating.nourishment >= 0
    && rating.nourishment <= 10
    && rating.reliability >= 0
    && rating.reliability <= 10
    && rating.practicality >= 0
    && rating.practicality <= 10
  )
}

/**
 * Check if a sort column is valid
 */
function isValidSortColumn(column: any): boolean {
  return ['name', 'flavor', 'nourishment', 'reliability', 'practicality', 'total'].includes(
    column,
  )
}

/**
 * Save a single fruit rating
 */
export function saveRating(fruitId: string, rating: Omit<FruitRating, 'fruitId'>): void {
  const state = loadState()
  state.ratings[fruitId] = { fruitId, ...rating }
  saveState(state)
}

/**
 * Delete a fruit rating
 */
export function deleteRating(fruitId: string): void {
  const state = loadState()
  delete state.ratings[fruitId]
  saveState(state)
}

/**
 * Save selected fruit IDs
 */
export function saveSelectedFruits(fruitIds: string[]): void {
  const state = loadState()
  state.selectedFruitIds = fruitIds
  saveState(state)
}

/**
 * Add a fruit to selected list
 */
export function addSelectedFruit(fruitId: string): void {
  const state = loadState()
  if (!state.selectedFruitIds.includes(fruitId)) {
    state.selectedFruitIds.push(fruitId)
    saveState(state)
  }
}

/**
 * Remove a fruit from selected list
 */
export function removeSelectedFruit(fruitId: string): void {
  const state = loadState()
  state.selectedFruitIds = state.selectedFruitIds.filter(id => id !== fruitId)
  // Also remove the rating if it exists
  delete state.ratings[fruitId]
  saveState(state)
}

/**
 * Save sort configuration
 */
export function saveSortConfig(sortConfig: SortConfig): void {
  saveState({ sortConfig })
}

/**
 * Clear all saved data
 */
export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  }
  catch (error) {
    console.error('Failed to clear localStorage:', error)
  }
}

/**
 * Export state as JSON string for sharing
 */
export function exportState(): string {
  const state = loadState()
  return JSON.stringify(state, null, 2)
}

/**
 * Import state from JSON string
 */
export function importState(json: string): boolean {
  try {
    const state = JSON.parse(json)
    const validated = validateState(state)
    saveState(validated)
    return true
  }
  catch (error) {
    console.error('Failed to import state:', error)
    return false
  }
}
