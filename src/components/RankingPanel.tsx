import type { CriterionMetadata, FruitRating } from '../lib'
import { FRUITS, TAG_METADATA } from '../lib'

interface RankingPanelProps {
  selectedFruitIds: string[]
  ratings: Record<string, FruitRating>
  onUpdateRating: (
    fruitId: string,
    criterion: keyof Omit<FruitRating, 'fruitId'>,
    value: number,
  ) => void
  onRemoveFruit: (fruitId: string) => void
  showEmptyState?: boolean
}

const CRITERIA: CriterionMetadata[] = [
  {
    key: 'flavor',
    label: 'Flavor',
    emoji: '😋',
    description:
      'How delicious and enjoyable the fruit tastes. Consider sweetness, tartness, complexity, and overall palatability.',
  },
  {
    key: 'nourishment',
    label: 'Nourishment',
    emoji: '💪',
    description:
      'Nutritional value and health benefits. Vitamins, minerals, fiber, antioxidants, and overall contribution to a healthy diet.',
  },
  {
    key: 'reliability',
    label: 'Reliability',
    emoji: '🎯',
    description:
      'Consistency in quality and availability. How often you can find good specimens year-round, shelf life, and predictable ripeness.',
  },
  {
    key: 'practicality',
    label: 'Practicality',
    emoji: '✨',
    description:
      'Ease of consumption and use. Consider portability, ease of peeling/cutting, messiness, seed removal, and versatility in recipes.',
  },
]

export default function RankingPanel({
  selectedFruitIds,
  ratings,
  onUpdateRating,
  onRemoveFruit,
  showEmptyState = true,
}: RankingPanelProps) {
  const selectedFruits = FRUITS.filter((f) => selectedFruitIds.includes(f.id))

  if (selectedFruits.length === 0 && showEmptyState) {
    return (
      <div className='flex h-full flex-col items-center justify-center gap-4 text-center p-8'>
        <div className='text-6xl opacity-20'>🍎</div>
        <div>
          <h3 className='text-lg font-semibold'>No fruits selected</h3>
          <p className='text-sm opacity-70'>
            Click categories above to add fruits
          </p>
        </div>
      </div>
    )
  }

  if (selectedFruits.length === 0) {
    return null
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold'>Your Fruits</h2>
        <div className='text-sm opacity-70'>
          {selectedFruits.filter((f) => ratings[f.id] !== undefined).length} /
          {selectedFruits.length} rated
        </div>
      </div>

      {/* Fruit Cards */}
      <div className='grid gap-3'>
        {selectedFruits.map((fruit) => (
          <FruitRankingCard
            key={fruit.id}
            fruit={fruit}
            rating={ratings[fruit.id]}
            onUpdateRating={onUpdateRating}
            onRemove={() => onRemoveFruit(fruit.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface FruitRankingCardProps {
  fruit: { id: string; name: string; emoji: string }
  rating?: FruitRating
  onUpdateRating: (
    fruitId: string,
    criterion: keyof Omit<FruitRating, 'fruitId'>,
    value: number,
  ) => void
  onRemove: () => void
}

function FruitRankingCard({
  fruit,
  rating,
  onUpdateRating,
  onRemove,
}: FruitRankingCardProps) {
  const hasAnyRating =
    rating && Object.values(rating).some((v) => typeof v === 'number' && v > 0)
  const fullFruit = FRUITS.find((f) => f.id === fruit.id)

  return (
    <div className='card bg-base-200 transition-shadow hover:shadow-md'>
      <div className='card-body p-3 md:p-4'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 flex-1'>
            <span className='text-3xl'>{fruit.emoji}</span>
            <h3 className='text-lg font-bold'>{fruit.name}</h3>
            {/* Tag badges */}
            {fullFruit && (
              <div className='flex flex-wrap gap-1'>
                {fullFruit.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className='badge badge-xs opacity-60'>
                    {TAG_METADATA[tag].label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className='flex gap-1'>
            {hasAnyRating && (
              <button
                onClick={() => {
                  CRITERIA.forEach((criterion) => {
                    onUpdateRating(fruit.id, criterion.key, 0)
                  })
                }}
                className='btn btn-ghost btn-sm btn-square'
                title='Reset all ratings'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                  />
                </svg>
              </button>
            )}
            <button
              onClick={onRemove}
              className='btn btn-ghost btn-sm btn-square text-error'
              title='Remove fruit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Sliders - Compact 2-column layout */}
        <div className='mt-3 grid grid-cols-1 gap-4 md:grid-cols-2'>
          {CRITERIA.map((criterion) => (
            <div key={criterion.key} className='flex flex-col gap-1'>
              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-1.5'>
                  <span className='font-medium'>{criterion.label}</span>
                  <div
                    className='tooltip tooltip-top cursor-help'
                    data-tip={criterion.description}>
                    <span className='text-xs opacity-50 hover:opacity-100 transition-opacity'>
                      Ⓘ
                    </span>
                  </div>
                </div>
                <span className='badge badge-sm badge-ghost'>
                  {rating?.[criterion.key] ?? 0}
                </span>
              </div>
              <input
                type='range'
                min='0'
                max='10'
                value={rating?.[criterion.key] ?? 0}
                onChange={(e) =>
                  onUpdateRating(
                    fruit.id,
                    criterion.key,
                    Number(e.target.value),
                  )
                }
                className='range range-primary range-xs w-full'
                step='1'
              />
            </div>
          ))}
        </div>

        {/* Total */}
        {hasAnyRating && (
          <div className='mt-2 flex items-center justify-between rounded-lg bg-base-300 px-3 py-2'>
            <span className='font-semibold'>Total Score</span>
            <span className='text-lg font-bold'>
              {(rating?.flavor ?? 0) +
                (rating?.nourishment ?? 0) +
                (rating?.reliability ?? 0) +
                (rating?.practicality ?? 0)}
              /40
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
