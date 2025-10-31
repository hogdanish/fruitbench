import type { RatedFruit, SortColumn, SortDirection } from '../lib'

interface ResultsTableProps {
  ratedFruits: RatedFruit[]
  sortColumn: SortColumn
  sortDirection: SortDirection
  onSort: (column: SortColumn) => void
  compact?: boolean
}

const TIER_CONFIG = {
  S: { label: 'S', color: 'badge-warning', bgColor: 'bg-warning/10' },
  A: { label: 'A', color: 'badge-success', bgColor: 'bg-success/10' },
  B: { label: 'B', color: 'badge-info', bgColor: 'bg-info/10' },
  C: { label: 'C', color: 'badge-accent', bgColor: 'bg-accent/10' },
  F: { label: 'F', color: 'badge-error', bgColor: 'bg-error/10' },
} as const

export default function ResultsTable({
  ratedFruits,
  sortColumn,
  sortDirection,
  onSort,
  compact = false,
}: ResultsTableProps) {
  if (ratedFruits.length === 0) {
    return (
      <div className='flex h-full flex-col items-center justify-center gap-4 text-center p-8'>
        <div className='text-6xl opacity-20'>📊</div>
        <div>
          <h3 className='text-lg font-semibold'>No rated fruits yet</h3>
          <p className='text-sm opacity-70'>
            Rate some fruits to see your results here
          </p>
        </div>
      </div>
    )
  }

  // Group fruits by tier
  const groupedByTier = ratedFruits.reduce(
    (acc, fruit) => {
      if (acc[fruit.tier] === undefined) {
        acc[fruit.tier] = []
      }
      acc[fruit.tier].push(fruit)
      return acc
    },
    {} as Record<string, RatedFruit[]>,
  )

  const tiers = ['S', 'A', 'B', 'C', 'F'] as const

  return (
    <div className='flex h-full flex-col gap-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>Results</h2>
        <div className='text-sm opacity-70'>
          {ratedFruits.length} fruit
          {ratedFruits.length !== 1 ? 's' : ''} ranked
        </div>
      </div>

      {/* Table */}
      <div className='flex-1 overflow-x-auto overflow-y-auto'>
        <table
          className={`table table-pin-rows ${compact ? 'table-xs' : 'table-xs md:table-sm'}`}>
          <thead>
            <tr>
              <SortableHeader
                column='tier'
                label='Tier'
                currentColumn={sortColumn}
                direction={sortDirection}
                onSort={onSort}
              />
              <th>Fruit</th>
              <SortableHeader
                column='flavor'
                label='Flavor'
                currentColumn={sortColumn}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeader
                column='nourishment'
                label='Nourishment'
                currentColumn={sortColumn}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeader
                column='reliability'
                label='Reliability'
                currentColumn={sortColumn}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeader
                column='practicality'
                label='Practicality'
                currentColumn={sortColumn}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeader
                column='total'
                label='Total'
                currentColumn={sortColumn}
                direction={sortDirection}
                onSort={onSort}
              />
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => {
              const fruits = groupedByTier[tier]
              if (fruits === undefined || fruits.length === 0) return null

              return fruits.map((fruit) => (
                <tr
                  key={fruit.id}
                  className={`${TIER_CONFIG[tier].bgColor} transition-colors hover:bg-base-200`}>
                  <td>
                    <div
                      className={`badge ${TIER_CONFIG[tier].color} badge-lg font-bold`}>
                      {tier}
                    </div>
                  </td>
                  <td>
                    <div className='flex items-center gap-2'>
                      <span className='text-lg'>{fruit.emoji}</span>
                      <span className='font-semibold'>{fruit.name}</span>
                    </div>
                  </td>
                  <td className='text-center font-mono'>
                    {fruit.rating.flavor}
                  </td>
                  <td className='text-center font-mono'>
                    {fruit.rating.nourishment}
                  </td>
                  <td className='text-center font-mono'>
                    {fruit.rating.reliability}
                  </td>
                  <td className='text-center font-mono'>
                    {fruit.rating.practicality}
                  </td>
                  <td>
                    <span className='font-bold'>{fruit.total}</span>
                    <span className='opacity-50'>/70</span>
                  </td>
                </tr>
              ))
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className='flex flex-wrap gap-2 rounded-lg bg-base-200 p-3'>
        <span className='text-sm font-semibold opacity-70'>Tiers:</span>
        {tiers.map((tier) => (
          <div key={tier} className='flex items-center gap-1'>
            <div className={`badge ${TIER_CONFIG[tier].color} badge-sm`}>
              {tier}
            </div>
            <span className='text-xs opacity-70'>
              {tier === 'S' && '90%+'}
              {tier === 'A' && '80-89%'}
              {tier === 'B' && '70-79%'}
              {tier === 'C' && '50-69%'}
              {tier === 'F' && '<50%'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface SortableHeaderProps {
  column: SortColumn
  label: string
  currentColumn: SortColumn
  direction: SortDirection
  onSort: (column: SortColumn) => void
}

function SortableHeader({
  column,
  label,
  currentColumn,
  direction,
  onSort,
}: SortableHeaderProps) {
  const isActive = currentColumn === column

  return (
    <th
      onClick={() => onSort(column)}
      className='cursor-pointer select-none hover:bg-base-200'
      title={`Sort by ${label}`}>
      <div className='flex items-center gap-1'>
        <span>{label}</span>
        <span className={`text-xs ${isActive ? 'opacity-100' : 'opacity-30'}`}>
          {isActive && direction === 'desc' ? '↓' : '↑'}
        </span>
      </div>
    </th>
  )
}
