import type { FruitRating, FruitTag, RatedFruit, SortColumn, SortDirection } from '../lib'
import { useEffect, useState } from 'react'
import { calculateTier, FRUITS, sortRatedFruits } from '../lib'
import RankingPanel from './RankingPanel'
import ResultsTable from './ResultsTable'
import ShareModal from './ShareModal'
import TagSelector from './TagSelector'
import ThemeToggle from './ThemeToggle'

const STORAGE_KEY = 'fruitbench-state'

export default function FruitBench() {
  const [selectedTags, setSelectedTags] = useState<FruitTag[]>(['popular']) // Default to popular
  const [removedFruitIds, setRemovedFruitIds] = useState<Set<string>>(new Set()) // Track manually removed fruits
  const [ratings, setRatings] = useState<Record<string, FruitRating>>({})
  const [sortColumn, setSortColumn] = useState<SortColumn>('total')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [showResultsModal, setShowResultsModal] = useState(false)

  // Get selected fruit IDs from selected tags, excluding manually removed ones
  const selectedFruitIds = FRUITS
    .filter(fruit =>
      selectedTags.length > 0 &&
      fruit.tags.some(tag => selectedTags.includes(tag)) &&
      !removedFruitIds.has(fruit.id)
    )
    .map(f => f.id)

  // Load state from localStorage on mount
  useEffect(() => {
    // Check if there's data in URL params (shared link)
    const urlParams = new URLSearchParams(window.location.search)
    const dataParam = urlParams.get('data')

    if (dataParam) {
      try {
        const decoded = JSON.parse(atob(dataParam))
        setRatings(decoded.ratings || {})
        // For shared links, we'll just show the ratings without auto-selecting tags
        // Clean URL after loading
        window.history.replaceState({}, '', window.location.pathname)
        return
      }
      catch (error) {
        console.error('Failed to load shared data:', error)
      }
    }

    // Otherwise load from localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const state = JSON.parse(saved)
        setRatings(state.ratings || {})
        setSelectedTags(state.selectedTags || ['popular'])
        setRemovedFruitIds(new Set(state.removedFruitIds || []))
        setSortColumn(state.sortConfig?.column || 'total')
        setSortDirection(state.sortConfig?.direction || 'desc')
      }
    }
    catch (error) {
      console.error('Failed to load state:', error)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state = {
      ratings,
      selectedTags,
      removedFruitIds: Array.from(removedFruitIds),
      sortConfig: { column: sortColumn, direction: sortDirection },
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [ratings, selectedTags, removedFruitIds, sortColumn, sortDirection])

  // Toggle tag selection
  const handleToggleTag = (tag: FruitTag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        // Remove tag
        return prev.filter(t => t !== tag)
      }
      else {
        // Add tag - also clear removed fruits with this tag so they reappear
        const fruitsWithTag = FRUITS.filter(f => f.tags.includes(tag)).map(f => f.id)
        setRemovedFruitIds(prevRemoved => {
          const newRemoved = new Set(prevRemoved)
          fruitsWithTag.forEach(id => newRemoved.delete(id))
          return newRemoved
        })
        return [...prev, tag]
      }
    })
  }

  // Remove individual fruit
  const handleRemoveFruit = (fruitId: string) => {
    // Add to removed set and clear rating
    setRemovedFruitIds(prev => new Set(prev).add(fruitId))
    const newRatings = { ...ratings }
    delete newRatings[fruitId]
    setRatings(newRatings)
  }

  // Update rating for a fruit
  const handleUpdateRating = (
    fruitId: string,
    criterion: keyof Omit<FruitRating, 'fruitId'>,
    value: number,
  ) => {
    setRatings((prev) => {
      const existing = prev[fruitId] || {
        fruitId,
        flavor: 0,
        nourishment: 0,
        reliability: 0,
        practicality: 0,
      }
      return {
        ...prev,
        [fruitId]: {
          ...existing,
          [criterion]: value,
        },
      }
    })
  }

  // Handle sorting
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    }
    else {
      // New column, default to descending
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  // Clear all
  const handleClearAll = () => {
    // eslint-disable-next-line no-alert
    if (confirm('Clear all selections and ratings? This cannot be undone.')) {
      setSelectedTags([])
      setRemovedFruitIds(new Set())
      setRatings({})
    }
  }

  // Calculate rated fruits
  const ratedFruits: RatedFruit[] = Object.entries(ratings)
    .map(([fruitId, rating]) => {
      const fruit = FRUITS.find(f => f.id === fruitId)
      if (!fruit)
        return null

      const total = rating.flavor + rating.nourishment + rating.reliability + rating.practicality
      const tier = calculateTier(total)

      return {
        ...fruit,
        rating,
        total,
        tier,
      }
    })
    .filter((f): f is RatedFruit => f !== null)

  // Sort rated fruits
  const sortedRatedFruits = sortRatedFruits(ratedFruits, sortColumn, sortDirection)

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="navbar bg-base-200 shadow-lg px-4 gap-2">
        <div className="flex-1">
          <a href="/" className="text-xl font-bold">
            🍎 Fruitbench
          </a>
        </div>
        <div className="flex-none gap-2">
          {ratedFruits.length > 0 && (
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="btn btn-primary btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span className="hidden sm:inline">Share</span>
            </button>
          )}
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop: Two-column layout */}
        <div className="hidden lg:flex flex-1">
          {/* Ranking Panel (45%) */}
          <section className="w-[45%] flex flex-col overflow-hidden border-r border-base-300">
            {/* Tag Selector - Sticky at top of ranking section */}
            <div className="border-b border-base-300 bg-base-100 p-3">
              <TagSelector
                selectedTags={selectedTags}
                onToggleTag={handleToggleTag}
                onClearAll={handleClearAll}
                selectedFruitCount={selectedFruitIds.length}
              />
            </div>
            {/* Scrollable fruit cards */}
            <div className="flex-1 overflow-y-auto p-4">
              <RankingPanel
                selectedFruitIds={selectedFruitIds}
                ratings={ratings}
                onUpdateRating={handleUpdateRating}
                onRemoveFruit={handleRemoveFruit}
              />
            </div>
          </section>

          {/* Results Table (55%) */}
          <section className="w-[55%] overflow-y-auto p-4">
            <ResultsTable
              ratedFruits={sortedRatedFruits}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              compact
            />
          </section>
        </div>

        {/* Mobile: Single column with ranking panel */}
        <div className="flex flex-1 flex-col lg:hidden overflow-hidden">
          {/* Tag Selector - Sticky at top */}
          <div className="border-b border-base-300 bg-base-100 p-4">
            <TagSelector
              selectedTags={selectedTags}
              onToggleTag={handleToggleTag}
              onClearAll={handleClearAll}
              selectedFruitCount={selectedFruitIds.length}
            />
          </div>
          {/* Scrollable fruit cards */}
          <section className="flex-1 overflow-y-auto p-4">
            <RankingPanel
              selectedFruitIds={selectedFruitIds}
              ratings={ratings}
              onUpdateRating={handleUpdateRating}
              onRemoveFruit={handleRemoveFruit}
            />
          </section>

          {/* Floating Action Button - Mobile Results */}
          {ratedFruits.length > 0 && (
            <button
              onClick={() => setShowResultsModal(true)}
              className="btn btn-primary btn-lg btn-circle fixed bottom-6 right-6 shadow-xl lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Results Modal */}
      {showResultsModal && (
        <div className="fixed inset-0 z-50 flex flex-col bg-base-100 lg:hidden">
          {/* Modal Header */}
          <div className="navbar bg-base-200 shadow-lg">
            <div className="flex-1">
              <h2 className="text-xl font-bold">Results</h2>
            </div>
            <button
              onClick={() => setShowResultsModal(false)}
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <ResultsTable
              ratedFruits={sortedRatedFruits}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              showAsCards
            />
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        ratings={ratings}
        selectedFruitIds={selectedFruitIds}
      />
    </div>
  )
}
