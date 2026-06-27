'use client'
import { useTheme } from '@/hooks/useTheme'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isMobile = useIsMobile()
  if (isMobile) return null
  const dim = theme === 'light' ? 'rgba(17,17,17,0.32)' : 'rgba(255,255,255,0.32)'
  const hover = theme === 'light' ? '#111' : '#fff'

  return (
    <button
      onClick={toggle}
      data-cursor
      aria-label="Toggle theme"
      style={{
        position:      'fixed',
        top:           isMobile ? 14 : 16,
        right:         isMobile ? 16 : 24,
        zIndex:        200,
        display:       'flex',
        alignItems:    'center',
        gap:           7,
        padding:       '6px 0',
        background:    'none',
        border:        'none',
        color:         dim,
        fontSize:      isMobile ? 12 : 13,
        fontWeight:    400,
        fontFamily:    'var(--font-geist-sans), Inter, sans-serif',
        letterSpacing: '-0.01em',
        cursor:        'pointer',
        transition:    'color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = hover)}
      onMouseLeave={e => (e.currentTarget.style.color = dim)}
    >
      {/* Small dot — same vibe as the active nav underline */}
      <span style={{
        display:         'inline-block',
        width:           5,
        height:          5,
        borderRadius:    '50%',
        background:      theme === 'light' ? '#dc2626' : 'currentColor',
        flexShrink:      0,
        transition:      'background 0.3s',
      }} />
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
