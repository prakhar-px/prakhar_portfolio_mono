'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '@/lib/data'
import { useTheme } from '@/hooks/useTheme'
import { useIsMobile } from '@/hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

export default function MonoAbout() {
  const ref = useRef<HTMLElement>(null)
  const { bg, theme } = useTheme()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (window.innerWidth <= 640) {
      document.querySelectorAll<HTMLElement>('.stat-num').forEach(el => {
        const raw = el.dataset.val || ''
        const num = parseFloat(raw.replace(/[^\d.]/g, ''))
        const sfx = raw.replace(/[\d.]/g, '')
        if (Number.isNaN(num)) return
        let current = 0
        const step = Math.max(1, num / 30)
        const timer = setInterval(() => {
          current += step
          if (current >= num) {
            el.textContent = Math.round(num) + sfx
            clearInterval(timer)
          } else {
            el.textContent = Math.round(current) + sfx
          }
        }, 40)
      })
      return
    }
    const ctx = gsap.context(() => {
      gsap.from('.about-label', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.from('.bio-line', {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.bio-line', start: 'top 85%' },
      })
      gsap.from('.stat-item', {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stat-item', start: 'top 88%' },
      })

      document.querySelectorAll<HTMLElement>('.stat-num').forEach(el => {
        const raw = el.dataset.val || ''
        const num = parseFloat(raw.replace(/[^\d.]/g, ''))
        const sfx = raw.replace(/[\d.]/g, '')
        if (Number.isNaN(num)) return

        const obj = { v: 0 }
        gsap.to(obj, {
          v: num,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate() {
            el.textContent = Math.round(obj.v) + sfx
          },
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: isMobile ? '88px 16px 52px' : '120px 48px',
        borderTop: '1px solid var(--b1)',
        transition: 'border-color 0.35s',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="about-label" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: isMobile ? 28 : 64 }}>
          <span
            style={{
              fontSize: 11,
              color: '#dc2626',
              letterSpacing: '0.18em',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              fontWeight: 700,
              transition: 'color 0.35s',
            }}
          >
            01 / About
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--b1)', transition: 'background 0.35s' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 28 : 80,
            alignItems: 'start',
          }}
        >
          <div>
            <div className="bio-line">
              <h2
                style={{
                  fontSize: isMobile ? 'clamp(2.25rem, 10vw, 3rem)' : 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  lineHeight: 1.06,
                  letterSpacing: '-0.03em',
                  color: 'var(--t1)',
                  marginBottom: 24,
                  transition: 'color 0.35s',
                }}
              >
                Building backends
                <br />
                that just work.
              </h2>
            </div>

            <div className="bio-line">
              <p style={{ fontSize: isMobile ? 14.5 : 16, color: 'var(--t2)', lineHeight: 1.8, marginBottom: 18, transition: 'color 0.35s' }}>
                Software developer with 2+ years of experience in Java, Spring Boot, and scalable
                application design. I focus on event-driven architecture, backend integration,
                and shipping systems that perform under real load.
              </p>
            </div>

            <div className="bio-line">
              <p style={{ fontSize: isMobile ? 14.5 : 16, color: 'var(--t3)', lineHeight: 1.8, marginBottom: isMobile ? 26 : 40, transition: 'color 0.35s' }}>
                Built Kafka-based pipelines that cut latency by 90%, Elasticsearch search over 10M+
                products, and full-stack platforms from internships to production. Currently at
                Morgan Stanley, contributing to trading infrastructure.
              </p>
            </div>

            <div className="bio-line" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Java', 'Spring Boot', 'Kafka', 'Elasticsearch', 'Python', 'Flask', 'MySQL', 'MongoDB'].map(t => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    padding: '6px 14px',
                    border: '1px solid var(--b1)',
                    color: 'var(--t3)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                    transition: 'all 0.35s',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {!isMobile && <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1,
                background: 'var(--b1)',
                transition: 'background 0.35s',
              }}
            >
              {stats.map(s => (
                <div
                  key={s.label}
                  className="stat-item"
                  style={{
                    background: bg,
                    padding: isMobile ? '24px 18px' : '36px 28px',
                    transition: 'background 0.35s',
                  }}
                >
                  <div
                    className="stat-num"
                    data-val={s.value}
                    style={{
                      fontSize: isMobile ? 'clamp(1.7rem, 8vw, 2.2rem)' : 'clamp(2rem, 3.5vw, 2.8rem)',
                      fontWeight: 900,
                      color: '#dc2626',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      marginBottom: 10,
                      transition: 'color 0.35s',
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: theme === 'light' ? 'rgba(17,17,17,0.45)' : 'var(--t3)',
                      letterSpacing: '0.12em',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      transition: 'color 0.35s',
                    }}
                  >
                    {s.label.replace(/_/g, ' ')}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 1,
                padding: isMobile ? '16px 18px' : '20px 28px',
                background: bg,
                border: '1px solid var(--b1)',
                borderTop: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all 0.35s',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--t3)', fontFamily: 'var(--font-mono)', transition: 'color 0.35s' }}>
                Mumbai, India · Remote OK
              </span>
            </div>
          </div>}
        </div>
      </div>
    </section>
  )
}
