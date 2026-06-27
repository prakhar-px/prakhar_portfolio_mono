'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type Theme = 'dark' | 'light'

interface ThemeCtx {
  theme:  Theme
  toggle: () => void
  bg:     string
  fg:     string
}

const Ctx = createContext<ThemeCtx>({
  theme:  'dark',
  toggle: () => {},
  bg:     '#000000',
  fg:     '#ffffff',
})

const PALETTE: Record<Theme, { bg: string; fg: string }> = {
  dark:  { bg: '#000000', fg: '#ffffff' },
  light: { bg: '#fafaf8', fg: '#111111' },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = (localStorage.getItem('portfolio-theme') as Theme) ?? 'dark'
    setTheme(saved)
    applyDOM(saved)
  }, [])

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      applyDOM(next)
      localStorage.setItem('portfolio-theme', next)
      return next
    })
  }, [])

  const { bg, fg } = PALETTE[theme]

  return (
    <Ctx.Provider value={{ theme, toggle, bg, fg }}>
      <div
        style={{
          background:  bg,
          color:       fg,
          minHeight:   '100vh',
          transition:  'background 0.35s ease, color 0.35s ease',
        }}
      >
        {children}
      </div>
    </Ctx.Provider>
  )
}

export const useTheme = () => useContext(Ctx)

function applyDOM(t: Theme) {
  if (t === 'light') document.documentElement.setAttribute('data-theme', 'light')
  else               document.documentElement.removeAttribute('data-theme')
}
