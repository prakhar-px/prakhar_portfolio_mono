'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function MonoSkills() {
  const ref = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (window.innerWidth <= 640 || !ref.current) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.from('.engineering-stack-intro', {
              y: 28,
              opacity: 0,
              stagger: 0.08,
              duration: 0.75,
              ease: 'power3.out',
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: isMobile ? '96px 16px 24px' : '120px 48px 40px',
        borderTop: '1px solid var(--b1)',
        transition: 'border-color 0.35s',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          className="engineering-stack-intro"
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: isMobile ? 24 : 34 }}
        >
          <span
            style={{
              fontSize: 11,
              color: '#dc2626',
              letterSpacing: '0.18em',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              fontWeight: 700,
              transition: 'color 0.35s',
              whiteSpace: 'nowrap',
            }}
          >
            02 / Engineering Stack
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--b1)', transition: 'background 0.35s' }} />
        </div>

        <div
          className="engineering-stack-intro"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.7fr) auto',
            gap: isMobile ? 22 : 20,
            alignItems: 'end',
          }}
        >
          <div>
            <h2
              style={{
                margin: '0 0 14px',
                fontSize: isMobile ? '2.55rem' : 'clamp(2rem, 4vw, 3.3rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.05em',
                color: 'var(--t1)',
              }}
            >
              Rotating through the tools behind the work.
            </h2>
            <p
              style={{
                margin: 0,
                maxWidth: 700,
                fontSize: isMobile ? '1rem' : 'clamp(1rem, 1.7vw, 1.12rem)',
                lineHeight: 1.65,
                color: 'var(--t2)',
              }}
            >
              Drag or scroll the dial to move through my stack. The selected category and skill lock into place
              while the center keeps the context concise.
            </p>
          </div>

          <Link
            href="/skills"
            className="engineering-stack-intro"
            style={{
              justifySelf: 'start',
              alignSelf: 'center',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'var(--t2)',
              textDecoration: 'none',
              borderBottom: '2px solid #dc2626',
              paddingBottom: 6,
            }}
          >
            View Skill Explorations
          </Link>
        </div>
      </div>
    </section>
  )
}
