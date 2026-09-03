import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeMode = 'dark' | 'light'

interface ThemeContextType {
  themeMode: ThemeMode
  theme: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  toggleThemeMode: () => void
  toggleTheme: () => void
  cursorLabel: string | null
  setCursorLabel: (label: string | null) => void
  activeBrief: string | null
  setActiveBrief: (brief: string | null) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nayaklabs-theme') as ThemeMode
      if (saved === 'light' || saved === 'dark') return saved
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    }
    return 'dark'
  })

  const [cursorLabel, setCursorLabel] = useState<string | null>(null)
  const [activeBrief, setActiveBrief] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode)
    localStorage.setItem('nayaklabs-theme', themeMode)
  }, [themeMode])

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode)
  }

  const toggleThemeMode = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark'
    setThemeMode(nextMode)
  }

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        theme: themeMode,
        setThemeMode,
        toggleThemeMode,
        toggleTheme: toggleThemeMode,
        cursorLabel,
        setCursorLabel,
        activeBrief,
        setActiveBrief,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
