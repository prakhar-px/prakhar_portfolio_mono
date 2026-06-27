'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '@/lib/data'
import { useTheme } from '@/hooks/useTheme'

gsap.registerPlugin(ScrollTrigger)

export default function MonoAbout() {
  const ref = useRef<HTMLElement>(null)
  const { bg, theme } = useTheme()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-label', { opacity: 0, x: -20, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
      gsap.from('.bio-line',    { opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.bio-line', start: 'top 85%' } })
      gsap.from('.stat-item',   { opacity: 0, y: 40, stagger: 0.08, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: '.stat-item', start: 'top 88%' } })

      document.querySelectorAll<HTMLElement>('.stat-num').forEach(el => {
        const raw = el.dataset.val || ''; const num = parseFloat(raw.replace(/[^\d.]/g, '')); const sfx = raw.replace(/[\d.]/g, '')
        if (isNaN(num)) return
        const obj = { v: 0 }
        gsap.to(obj, { v: num, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate() { el.textContent = Math.round(obj.v) + sfx } })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={ref} style={{ padding: '120px 48px', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div className="about-label" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 64 }}>
          <span style={{ fontSize: 11, color: '#dc2626', letterSpacing: '0.18em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: 700, transition: 'color 0.35s' }}>01 / About</span>
          <div style={{ flex: 1, height: 1, background: 'var(--b1)', transition: 'background 0.35s' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Bio */}
          <div>
            <div className="bio-line">
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 32, transition: 'color 0.35s' }}>
                Building backends<br />that just work.
              </h2>
            </div>
            <div className="bio-line">
              <p style={{ fontSize: 16, color: 'var(--t2)', lineHeight: 1.8, marginBottom: 20, transition: 'color 0.35s' }}>
                Software developer with 2+ years of experience in Java, Spring Boot, and scalable
                application design. I focus on event-driven architecture, backend integration,
                and shipping systems that perform under real load.
              </p>
            </div>
            <div className="bio-line">
              <p style={{ fontSize: 16, color: 'var(--t3)', lineHeight: 1.8, marginBottom: 40, transition: 'color 0.35s' }}>
                Built Kafka-based pipelines that cut latency by 90%, Elasticsearch search over 10M+
                products, and full-stack platforms from internships to production. Currently at
                Morgan Stanley, contributing to trading infrastructure.
              </p>
            </div>
            <div className="bio-line" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Java', 'Spring Boot', 'Kafka', 'Elasticsearch', 'Python', 'Flask', 'MySQL', 'MongoDB'].map(t => (
                <span key={t} style={{ fontSize: 12, padding: '6px 14px', border: '1px solid var(--b1)', color: 'var(--t3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', transition: 'all 0.35s' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--b1)', transition: 'background 0.35s' }}>
              {stats.map(s => (
                <div key={s.label} className="stat-item" style={{ background: bg, padding: '36px 28px', transition: 'background 0.35s' }}>
                  <div className="stat-num" data-val={s.value}
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#dc2626', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 10, transition: 'color 0.35s' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: theme === 'light' ? 'rgba(17,17,17,0.45)' : 'var(--t3)', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', transition: 'color 0.35s' }}>
                    {s.label.replace(/_/g, ' ')}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 1, padding: '20px 28px', background: bg, border: '1px solid var(--b1)', borderTop: 'none', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.35s' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--t3)', fontFamily: 'var(--font-mono)', transition: 'color 0.35s' }}>Mumbai, India · Remote OK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
