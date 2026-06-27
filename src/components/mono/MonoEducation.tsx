'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { education } from '@/lib/data'
import { useIsMobile } from '@/hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

export default function MonoEducation() {
  const ref = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-card', {
        opacity: 0, y: 24, stagger: 0.12, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-card', start: 'top 80%' },
      })
      gsap.from('.edu-row', {
        opacity: 0, y: 18, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-row', start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="education" ref={ref} style={{ padding: isMobile ? '80px 16px' : '120px 48px', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <span style={{ fontSize: 11, color: '#dc2626', letterSpacing: '0.18em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: 700 }}>
            05 / Training
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--b1)', transition: 'background 0.35s' }} />
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 64, transition: 'color 0.35s' }}>
          Education
        </h2>

        <div style={{ borderTop: '1px solid var(--b1)' }}>
          {education.map((item) => (
            <div key={item.id} className="edu-row"
              style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '148px 1fr 100px', gap: isMobile ? 8 : 40, padding: '28px 0', borderBottom: '1px solid var(--b1)', alignItems: 'start', transition: 'border-color 0.35s' }}>
              <div style={{ fontSize: 11, color: '#dc2626', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', paddingTop: 3 }}>
                {item.period}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--t1)', marginBottom: 5, letterSpacing: '-0.01em', transition: 'color 0.35s' }}>
                  {item.degree}
                </div>
                <div style={{ fontSize: 13, color: 'var(--t2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.03em', transition: 'color 0.35s' }}>
                  {item.institution} · {item.location}
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#dc2626', fontFamily: 'var(--font-mono)', textAlign: isMobile ? 'left' : 'right', paddingTop: 3 }}>
                {item.score}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
