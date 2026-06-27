'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { awards } from '@/lib/data'
import { useIsMobile } from '@/hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

export default function MonoAwards() {
  const ref = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()



  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.award-row', {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="awards" ref={ref} style={{ padding: isMobile ? '80px 16px' : '120px 48px', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <span style={{ fontSize: 11, color: '#dc2626', letterSpacing: '0.18em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: 700 }}>
            06 / Honours
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--b1)', transition: 'background 0.35s' }} />
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 72, transition: 'color 0.35s' }}>
          Achievements
        </h2>

        <div style={{ borderTop: '1px solid var(--b1)' }}>
          {awards.map((award, i) => (
            <div key={award.id} className="award-row"
              style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '28px 140px 1fr 80px', gap: isMobile ? 6 : 36, padding: '28px 0', borderBottom: '1px solid var(--b1)', alignItems: 'center', transition: 'border-color 0.35s' }}>

              {/* Index */}
              <span style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', transition: 'color 0.35s' }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Rank */}
              <span style={{ fontSize: 11, color: '#dc2626', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                {award.rank}
              </span>

              {/* Name + Org */}
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--t1)', marginBottom: 4, letterSpacing: '-0.01em', transition: 'color 0.35s' }}>
                  {award.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--t3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', transition: 'color 0.35s' }}>
                  {award.org}
                </div>
              </div>

              {/* Date */}
              <span style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textAlign: 'right', transition: 'color 0.35s' }}>
                {award.date}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
