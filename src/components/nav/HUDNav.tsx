'use client'
import { useEffect, useRef, useState } from 'react'
import { navItems } from '@/lib/data'
import { getLenisInstance } from '@/lib/lenis'

export default function HUDNav() {
  const [active, setActive] = useState('hero')
  const [visible, setVisible] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = navItems
      .map(n => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[]

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    )
    sections.forEach(s => io.observe(s))

    // Show nav after 3s (after loading screen)
    const t = setTimeout(() => setVisible(true), 3000)

    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenisInstance()
    if (lenis) {
      lenis.scrollTo(el, { offset: 0 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(-50%) translateX(${visible ? 0 : 20}px)`,
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Top bracket */}
      <div className="w-6 h-[1px] bg-arc/40 ml-auto" />
      <div className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              data-hover
              className="group flex items-center gap-2 justify-end"
            >
              {/* Label — visible on hover or active */}
              <span
                className="font-mono text-[9px] tracking-[0.2em] transition-all duration-300"
                style={{
                  color: isActive ? '#00d4ff' : '#64748b',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(6px)',
                }}
              >
                {item.label}
              </span>
              {/* Dot indicator */}
              <div
                className="relative flex items-center justify-center"
                style={{ width: 10, height: 10 }}
              >
                {isActive && (
                  <div className="absolute w-4 h-4 rounded-full border border-arc/40 animate-[pulse-ring_1.5s_ease-out_infinite]" />
                )}
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:      isActive ? 8 : 4,
                    height:     isActive ? 8 : 4,
                    background: isActive ? '#00d4ff' : 'rgba(100,116,139,0.5)',
                    boxShadow:  isActive ? '0 0 8px #00d4ff' : 'none',
                  }}
                />
              </div>
            </button>
          )
        })}
      </div>
      {/* Bottom bracket */}
      <div className="w-6 h-[1px] bg-arc/40 ml-auto" />

      {/* Coordinate display */}
      <div className="font-mono text-[8px] text-muted/50 tracking-widest text-right mt-1">
        {navItems.findIndex(n => n.id === active).toString().padStart(3, '0')}
        <span className="text-arc/40"> / </span>
        {String(navItems.length - 1).padStart(3, '0')}
      </div>
    </nav>
  )
}
