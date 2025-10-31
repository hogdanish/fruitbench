import type { FruitRating } from '../lib'
import { useEffect, useState } from 'react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  ratings: Record<string, FruitRating>
  selectedFruitIds: string[]
}

export default function ShareModal({
  isOpen,
  onClose,
  ratings,
  selectedFruitIds,
}: ShareModalProps) {
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Generate shareable URL with encoded state
      const state = {
        ratings,
        selectedFruitIds,
      }
      const encoded = btoa(JSON.stringify(state))
      const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`
      setShareUrl(url)
      setCopied(false)
    }
  }, [isOpen, ratings, selectedFruitIds])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const downloadAsJson = () => {
    const data = {
      ratings,
      selectedFruitIds,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fruitbench-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isOpen)
    return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="card w-full max-w-lg bg-base-100 shadow-2xl">
          <div className="card-body">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Share Your Results</h3>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-square"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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

            {/* Content */}
            <div className="mt-4 space-y-4">
              {/* Share Link */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Share Link</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1 font-mono text-sm"
                    value={shareUrl}
                    readOnly
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`btn ${copied ? 'btn-success' : 'btn-primary'}`}
                  >
                    {copied
                      ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Copied
                          </>
                        )
                      : (
                          'Copy'
                        )}
                  </button>
                </div>
                <p className="label-text-alt mt-2 opacity-70">
                  Share this link with friends to compare rankings
                </p>
              </div>

              {/* Export Options */}
              <div className="divider" />

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Export Data</span>
                </label>
                <button
                  onClick={downloadAsJson}
                  className="btn btn-outline btn-block"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download as JSON
                </button>
                <p className="label-text-alt mt-2 opacity-70">
                  Download your rankings as a JSON file for backup
                </p>
              </div>

              {/* Stats */}
              <div className="rounded-lg bg-base-200 p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{selectedFruitIds.length}</div>
                    <div className="text-sm opacity-70">Fruits Selected</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {Object.keys(ratings).length}
                    </div>
                    <div className="text-sm opacity-70">Fruits Rated</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="card-actions mt-4 justify-end">
              <button onClick={onClose} className="btn btn-primary">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
