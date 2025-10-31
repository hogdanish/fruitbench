import type { FruitTag } from '../lib'
import { useState } from 'react'
import { FRUITS, TAG_METADATA } from '../lib'

interface TagSelectorProps {
  selectedTags: FruitTag[]
  onToggleTag: (tag: FruitTag) => void
  onClearAll: () => void
  selectedFruitCount: number
}

export default function TagSelector({
  selectedTags,
  onToggleTag,
  onClearAll,
  selectedFruitCount,
}: TagSelectorProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      // Find fruits matching search
      const matchingFruits = FRUITS.filter(
        fruit =>
          fruit.name.toLowerCase().includes(query.toLowerCase())
          || fruit.searchTerms?.some(term =>
            term.toLowerCase().includes(query.toLowerCase()),
          ),
      )

      // Get unique tags from matching fruits
      const relevantTags = new Set<FruitTag>()
      matchingFruits.forEach(fruit => fruit.tags.forEach(tag => relevantTags.add(tag)))
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold opacity-70">
            Select Categories
          </h2>
          {selectedFruitCount > 0 && (
            <span className="badge badge-primary badge-xs">
              {selectedFruitCount}
              {' '}
              fruit
              {selectedFruitCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Search toggle */}
          <button
            onClick={() => {
              setShowSearch(!showSearch)
              if (showSearch) {
                setSearchQuery('')
              }
            }}
            className={`btn btn-ghost btn-sm btn-circle ${showSearch ? 'btn-active' : ''}`}
            title="Search fruits"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Clear all button */}
          {selectedFruitCount > 0 && (
            <button
              onClick={onClearAll}
              className="btn btn-ghost btn-sm text-error"
              title="Clear all selections"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Search bar (collapsible) */}
      {showSearch && (
        <input
          type="text"
          placeholder="Search fruits..."
          className="input input-bordered input-sm w-full"
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
          autoFocus
        />
      )}

      {/* Tag chips */}
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(TAG_METADATA) as FruitTag[]).map((tag) => {
          const isSelected = selectedTags.includes(tag)
          const fruitCount = FRUITS.filter(f => f.tags.includes(tag)).length

          return (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              className={`badge badge-md gap-1.5 cursor-pointer transition-all hover:scale-105 ${
                isSelected ? 'badge-primary' : 'badge-ghost hover:badge-outline'
              }`}
              title={TAG_METADATA[tag].description}
            >
              <span className="text-xs">{TAG_METADATA[tag].label}</span>
              <span className="text-[10px] opacity-70">
                (
                {fruitCount}
                )
              </span>
              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-2.5 w-2.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          )
        })}
      </div>

      {/* Helper text */}
      {selectedTags.length === 0 && (
        <p className="text-xs opacity-50">
          💡 Click categories to add fruits to your ranking list
        </p>
      )}
    </div>
  )
}
