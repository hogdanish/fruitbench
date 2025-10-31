import { CRITERIA_INFO } from '../types'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
      <div className='card bg-base-100 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='card-body p-6 md:p-8'>
          {/* Header */}
          <div className='flex items-start justify-between gap-4 mb-6'>
            <div>
              <h2 className='card-title text-2xl md:text-3xl mb-2'>
                🍎 Welcome to Fruitbench!
              </h2>
              <p className='text-sm opacity-70'>
                Rank your favorite fruits and compare with friends
              </p>
            </div>
            <button
              onClick={onClose}
              className='btn btn-ghost btn-sm btn-circle'
              aria-label='Close'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
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

          {/* How it works */}
          <div className='divider my-4'>How It Works</div>
          <div className='space-y-3 mb-6'>
            <div className='flex gap-3'>
              <div className='shrink-0'>
                <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary'>
                  1
                </div>
              </div>
              <div>
                <h3 className='font-semibold'>Select Your Fruits</h3>
                <p className='text-sm opacity-70'>
                  Choose categories to add fruits to your benchmark list
                </p>
              </div>
            </div>

            <div className='flex gap-3'>
              <div className='shrink-0'>
                <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary'>
                  2
                </div>
              </div>
              <div>
                <h3 className='font-semibold'>Rate Each Fruit</h3>
                <p className='text-sm opacity-70'>
                  Score each fruit from 0-10 on 4 criteria (see below)
                </p>
              </div>
            </div>

            <div className='flex gap-3'>
              <div className='shrink-0'>
                <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary'>
                  3
                </div>
              </div>
              <div>
                <h3 className='font-semibold'>View & Share Results</h3>
                <p className='text-sm opacity-70'>
                  See your rankings in a sortable table and share with friends
                </p>
              </div>
            </div>
          </div>

          {/* Rating Criteria */}
          <div className='divider my-4'>Rating Criteria</div>
          <div className='grid gap-3 mb-6'>
            {CRITERIA_INFO.map((criterion) => (
              <div
                key={criterion.key}
                className='card bg-base-200/50 border border-base-300 transition-all hover:shadow-md hover:bg-base-200'>
                <div className='card-body p-4'>
                  <h3 className='font-bold flex items-center gap-2'>
                    <span className='text-lg'>{criterion.emoji}</span>
                    {criterion.label}
                    <span className='badge badge-sm badge-ghost ml-auto'>
                      0-10
                    </span>
                  </h3>
                  <p className='text-sm opacity-70'>{criterion.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tier System */}
          <div className='divider my-4'>Tier System</div>
          <div className='mb-6'>
            <p className='text-sm opacity-70 mb-3'>
              Your total score (0-70) determines the tier. Flavor is weighted
              4x:
            </p>
            <div className='flex flex-wrap gap-2 justify-center md:justify-start'>
              <div className='badge badge-warning gap-1.5 p-3'>
                <span className='font-bold text-base'>S</span>
                <span className='text-xs opacity-70'>63-70</span>
              </div>
              <div className='badge badge-success gap-1.5 p-3'>
                <span className='font-bold text-base'>A</span>
                <span className='text-xs opacity-70'>56-62</span>
              </div>
              <div className='badge badge-info gap-1.5 p-3'>
                <span className='font-bold text-base'>B</span>
                <span className='text-xs opacity-70'>49-55</span>
              </div>
              <div className='badge badge-accent gap-1.5 p-3'>
                <span className='font-bold text-base'>C</span>
                <span className='text-xs opacity-70'>35-48</span>
              </div>
              <div className='badge badge-error gap-1.5 p-3'>
                <span className='font-bold text-base'>F</span>
                <span className='text-xs opacity-70'>0-34</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className='card-actions justify-end mt-2'>
            <button
              onClick={onClose}
              className='btn btn-primary btn-wide md:btn-md'>
              Get Started
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 7l5 5m0 0l-5 5m5-5H6'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
