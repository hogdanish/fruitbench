import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<'nord' | 'dim'>('nord')

  useEffect(() => {
    // Initialize theme-change
    themeChange(false)

    // Get initial theme from localStorage or default to 'nord'
    const savedTheme = localStorage.getItem('theme') as 'nord' | 'dim' | null
    if (savedTheme) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = currentTheme === 'nord' ? 'dim' : 'nord'
    setCurrentTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
      title={`Switch to ${currentTheme === 'nord' ? 'dark' : 'light'} theme`}
    >
      {currentTheme === 'nord'
        ? (
          // Moon icon for dark mode
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
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )
        : (
          // Sun icon for light mode
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
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
    </button>
  )
}
