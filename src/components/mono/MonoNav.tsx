'use client'
import { useEffect, useRef, useState } from 'react'
import { getLenisInstance } from '@/lib/lenis'
import { useTheme } from '@/hooks/useTheme'
import { useIsMobile } from '@/hooks/useIsMobile'

const LINKS = [
  { id: 'about',      label: 'About'      },
  { id: 'skills',     label: 'Skills'     },
  { id: 'work',       label: 'Work'       },
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Training'   },
  { id: 'awards',     label: 'Honours'    },
  { id: 'contact',    label: 'Contact'    },
]

export default function MonoNav() {
  const navRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const sections = LINKS.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -40% 0px' },
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenisInstance()
    lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const accentColor = '#dc2626'

  return (
    <nav ref={navRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, opacity: 1, transform: 'translateY(0)' }}>
      <div style={{
        borderBottom: '1px solid var(--b1)',
        background: 'var(--bg-nav)',
        backdropFilter: 'blur(20px)',
        minHeight: isMobile ? 64 : 56,
        padding: isMobile ? '10px 14px 10px' : '0 48px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: isMobile ? 10 : 0,
        transition: 'background 0.35s ease, border-color 0.35s ease',
        position: 'relative',
      }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-cursor
          style={{ fontSize: isMobile ? 13 : 14, fontWeight: 800, color: 'var(--t1)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '-0.02em', transition: 'color 0.3s', flexShrink: 0 }}>
          Prakhar
        </button>

        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{
                height: 34,
                padding: '0 10px',
                border: '1px solid var(--b1)',
                background: 'transparent',
                color: theme === 'light' ? 'rgba(17,17,17,0.45)' : 'rgba(255,255,255,0.45)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                border: '1px solid var(--b1)',
                background: 'transparent',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ width: 14, height: 1.5, background: 'var(--t1)', borderRadius: 999 }} />
                <span style={{ width: 14, height: 1.5, background: 'var(--t1)', borderRadius: 999 }} />
                <span style={{ width: 14, height: 1.5, background: 'var(--t1)', borderRadius: 999 }} />
              </span>
            </button>
          </div>
        )}

        {!isMobile && (
          <div style={{
            display: 'flex',
            gap: 4,
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            width: 'auto',
            paddingBottom: 0,
          }}>
            {LINKS.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} data-cursor style={{
                padding: '6px 16px', fontSize: 13,
                fontWeight: active === l.id ? 600 : 400,
                color: active === l.id ? 'var(--t1)' : 'var(--t3)',
                background: 'transparent',
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                borderBottom: `2px solid ${active === l.id ? accentColor : 'transparent'}`,
                letterSpacing: '-0.01em',
                textAlign: 'left',
              }}>
                {l.label}
              </button>
            ))}
          </div>
        )}

        {!isMobile && <div style={{ width: 80 }} />}

        {isMobile && menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--bg-nav)',
              borderBottom: '1px solid var(--b1)',
              backdropFilter: 'blur(20px)',
              padding: '10px 14px 16px',
              boxShadow: '0 18px 30px rgba(0,0,0,0.06)',
            }}
          >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                {LINKS.map(link => (
                  <button
                    key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 10px',
                    border: '1px solid var(--b1)',
                    background: active === link.id ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
                    color: active === link.id ? 'var(--t1)' : 'var(--t2)',
                    fontSize: 12,
                    fontWeight: active === link.id ? 700 : 500,
                    letterSpacing: '0.02em',
                    borderRadius: 0,
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
