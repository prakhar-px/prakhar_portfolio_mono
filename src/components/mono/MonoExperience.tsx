'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/lib/data'
import { useTheme } from '@/hooks/useTheme'
import { useIsMobile } from '@/hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

export default function MonoExperience() {
  const ref = useRef<HTMLElement>(null)
  const { theme } = useTheme()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (window.innerWidth <= 640) return
    const ctx = gsap.context(() => {
      gsap.from('.exp-row', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={ref}
      style={{ padding: isMobile ? '88px 16px 56px' : '120px 48px', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
          <span style={{ fontSize: 11, color: '#dc2626', letterSpacing: '0.18em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: 700, transition: 'color 0.35s' }}>
            04 / Experience
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--b1)', transition: 'background 0.35s' }} />
        </div>

        <h2
          style={{
            fontSize: isMobile ? 'clamp(2.35rem, 10vw, 3.2rem)' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'var(--t1)',
            marginBottom: isMobile ? 34 : 72,
            transition: 'color 0.35s',
          }}
        >
          Where I've worked
        </h2>

        {experience.map((exp, i) => (
          <div
            key={exp.id}
            className="exp-row"
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
              gap: isMobile ? 18 : 48,
              padding: isMobile ? '28px 0' : '48px 0',
              borderTop: '1px solid var(--b1)',
              transition: 'border-color 0.35s',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--t3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', transition: 'color 0.35s' }}>
                {exp.period}
              </div>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', opacity: 0.8 }} />
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--t1)', transition: 'color 0.35s' }}>
                {exp.company}
              </div>
              <div style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', transition: 'color 0.35s' }}>
                {exp.type}
              </div>
              {i === 0 && (
                <div style={{ marginTop: isMobile ? 0 : 4, display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 10px', border: '1px solid var(--b2)', transition: 'border-color 0.35s' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', animation: 'blink 2s ease-in-out infinite' }} />
                  <span style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', fontWeight: 700 }}>
                    CURRENT
                  </span>
                </div>
              )}
            </div>

            <div>
              <h3
                style={{
                  fontSize: isMobile ? '1.3rem' : 'clamp(1.2rem, 2vw, 1.6rem)',
                  fontWeight: 800,
                  color: 'var(--t1)',
                  letterSpacing: '-0.02em',
                  marginBottom: 14,
                  transition: 'color 0.35s',
                }}
              >
                {exp.role}
              </h3>
              <p style={{ fontSize: isMobile ? 14.5 : 15, color: 'var(--t2)', lineHeight: 1.7, marginBottom: 20, transition: 'color 0.35s' }}>
                {exp.description}
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '8px 18px',
                }}
              >
                {exp.highlights.map((h, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: 'var(--t4)', fontSize: 12, marginTop: 2, flexShrink: 0, transition: 'color 0.35s' }}>-</span>
                    <span style={{ fontSize: 13, color: 'var(--t3)', lineHeight: 1.5, transition: 'color 0.35s' }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
