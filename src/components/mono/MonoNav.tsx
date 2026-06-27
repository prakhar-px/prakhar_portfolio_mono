'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { getLenisInstance } from '@/lib/lenis'
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
  const [show,   setShow]   = useState(false)
  const [active, setActive] = useState('')
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll, { passive: true })

    const sections = LINKS.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -40% 0px' },
    )
    sections.forEach(s => io.observe(s))
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  useEffect(() => {
    gsap.to(navRef.current, { y: show ? 0 : isMobile ? -96 : -64, opacity: show ? 1 : 0, duration: 0.5, ease: 'power3.out' })
  }, [show, isMobile])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenisInstance()
    lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' })
  }

  const accentColor = '#dc2626'

  return (
    <nav ref={navRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, opacity: 0, transform: `translateY(${isMobile ? '-96px' : '-64px'})` }}>
      <div style={{
        borderBottom: '1px solid var(--b1)',
        background: 'var(--bg-nav)',
        backdropFilter: 'blur(20px)',
        minHeight: isMobile ? 88 : 56,
        padding: isMobile ? '10px 16px 8px' : '0 48px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: isMobile ? 8 : 0,
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-cursor
          style={{ fontSize: isMobile ? 13 : 14, fontWeight: 800, color: 'var(--t1)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '-0.02em', transition: 'color 0.3s', alignSelf: isMobile ? 'flex-start' : 'auto' }}>
          Prakhar
        </button>

        <div style={{
          display: 'flex',
          gap: isMobile ? 10 : 4,
          overflowX: isMobile ? 'auto' : 'visible',
          whiteSpace: 'nowrap',
          width: isMobile ? '100%' : 'auto',
          paddingBottom: isMobile ? 2 : 0,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {LINKS.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} data-cursor style={{
              padding: isMobile ? '6px 0 8px' : '6px 16px', fontSize: isMobile ? 11.5 : 13,
              fontWeight: active === l.id ? 600 : 400,
              color: active === l.id ? 'var(--t1)' : 'var(--t3)',
              background: 'transparent',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              borderBottom: `2px solid ${active === l.id ? accentColor : 'transparent'}`,
              letterSpacing: '-0.01em',
            }}>
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ width: isMobile ? 0 : 80, display: isMobile ? 'none' : 'block' }} />
      </div>
    </nav>
  )
}
