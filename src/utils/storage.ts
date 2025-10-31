import type {
  AppState,
  FruitRating,
  FruitTag,
  SortColumn,
  SortConfig,
} from '../types.ts'

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
  } catch (error) {
    console.error('Failed to save state to localStorage:', error)
  }
}

/**
 * Load the application state from localStorage
 */
export function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === null || stored === '') return DEFAULT_STATE

    const data: StorageData = JSON.parse(stored) as StorageData

    // Check version and migrate if needed
    if (data.version !== STORAGE_VERSION) {
      console.warn('Storage version mismatch, using default state')
      return DEFAULT_STATE
    }

    // Validate and return state
    return validateState(data.state)
  } catch (error) {
    console.error('Failed to load state from localStorage:', error)
    return DEFAULT_STATE
  }
}

/**
 * Validate the state structure to ensure it matches expected types
 */
function validateState(state: unknown): AppState {
  const validated: AppState = {
    ratings: {},
    selectedFruitIds: [],
    sortConfig: { ...DEFAULT_STATE.sortConfig },
    filterConfig: { ...DEFAULT_STATE.filterConfig },
  }

  if (typeof state !== 'object' || state === null) {
    return validated
  }

  const stateObj = state as Record<string, unknown>

  // Validate ratings
  if (
    typeof stateObj.ratings === 'object' &&
    stateObj.ratings !== null &&
    !Array.isArray(stateObj.ratings)
  ) {
    const ratings = stateObj.ratings as Record<string, unknown>
    Object.entries(ratings).forEach(([fruitId, rating]) => {
      if (isValidRating(rating)) {
        validated.ratings[fruitId] = rating
      }
    })
  }

  // Validate selected fruit IDs
  if (Array.isArray(stateObj.selectedFruitIds)) {
    validated.selectedFruitIds = (
      stateObj.selectedFruitIds as unknown[]
    ).filter((id): id is string => typeof id === 'string')
  }

  // Validate sort config
  if (
    typeof stateObj.sortConfig === 'object' &&
    stateObj.sortConfig !== null &&
    !Array.isArray(stateObj.sortConfig)
  ) {
    const sortConfig = stateObj.sortConfig as Record<string, unknown>
    const { column, direction } = sortConfig
    if (isValidSortColumn(column)) {
      validated.sortConfig.column = column
    }
    if (direction === 'asc' || direction === 'desc') {
      validated.sortConfig.direction = direction
    }
  }

  // Validate filter config
  if (
    typeof stateObj.filterConfig === 'object' &&
    stateObj.filterConfig !== null &&
    !Array.isArray(stateObj.filterConfig)
  ) {
    const filterConfig = stateObj.filterConfig as Record<string, unknown>
    if (Array.isArray(filterConfig.tags)) {
      validated.filterConfig.tags = filterConfig.tags as FruitTag[]
    }
    if (typeof filterConfig.searchQuery === 'string') {
      validated.filterConfig.searchQuery = filterConfig.searchQuery
    }
  }

  return validated
}

/**
 * Check if a rating object is valid
 */
function isValidRating(rating: unknown): rating is FruitRating {
  if (typeof rating !== 'object' || rating === null) {
    return false
  }

  const r = rating as Record<string, unknown>

  return (
    typeof r.fruitId === 'string' &&
    typeof r.flavor === 'number' &&
    typeof r.nourishment === 'number' &&
    typeof r.reliability === 'number' &&
    typeof r.practicality === 'number' &&
    r.flavor >= 0 &&
    r.flavor <= 10 &&
    r.nourishment >= 0 &&
    r.nourishment <= 10 &&
    r.reliability >= 0 &&
    r.reliability <= 10 &&
    r.practicality >= 0 &&
    r.practicality <= 10
  )
}

/**
 * Check if a sort column is valid
 */
function isValidSortColumn(column: unknown): column is SortColumn {
  return (
    typeof column === 'string' &&
    [
      'name',
      'flavor',
      'nourishment',
      'reliability',
      'practicality',
      'total',
    ].includes(column)
  )
}

/**
 * Save a single fruit rating
 */
export function saveRating(
  fruitId: string,
  rating: Omit<FruitRating, 'fruitId'>,
): void {
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
  state.selectedFruitIds = state.selectedFruitIds.filter((id) => id !== fruitId)
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
  } catch (error) {
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
    const state = JSON.parse(json) as unknown
    const validated = validateState(state)
    saveState(validated)
    return true
  } catch (error) {
    console.error('Failed to import state:', error)
    return false
  }
}
