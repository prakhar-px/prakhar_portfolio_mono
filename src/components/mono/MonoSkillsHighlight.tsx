'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROWS = [
  {
    skills: ['Java', 'Spring Boot', 'Apache Kafka', 'Python', 'C++', 'Elasticsearch', 'JavaScript', 'REST APIs', 'SQL'],
    reverse: false,
    duration: 44,
    color: 'var(--t1)',
    size: 'clamp(2.2rem, 4.5vw, 3.6rem)',
    weight: 800,
    py: 30,
    gap: 64,
  },
  {
    skills: ['MySQL', 'MongoDB', 'Flask', 'React.js', 'SQLAlchemy', 'Microservices', 'Docker', 'REST APIs'],
    reverse: true,
    duration: 34,
    color: 'var(--t2)',
    size: 'clamp(1.5rem, 3vw, 2.4rem)',
    weight: 500,
    py: 22,
    gap: 48,
  },
  {
    skills: ['Git / GitHub', 'Linux', 'Postman', 'OOP', 'DSA', 'Info Security', 'HTML5', 'CSS3', 'Docker'],
    reverse: false,
    duration: 28,
    color: 'var(--t3)',
    size: 'clamp(1rem, 2vw, 1.6rem)',
    weight: 400,
    py: 18,
    gap: 36,
  },
]

export default function MonoSkillsHighlight() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const innerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])

  useEffect(() => {
    const tweens: gsap.core.Tween[] = []

    ROWS.forEach((row, i) => {
      const inner = innerRefs.current[i]
      if (!inner) return

      const tween = gsap.fromTo(
        inner,
        { xPercent: row.reverse ? -50 : 0 },
        { xPercent: row.reverse ? 0 : -50, ease: 'none', duration: row.duration, repeat: -1 }
      )
      tweens.push(tween)

      const track = inner.parentElement
      if (track) {
        track.addEventListener('mouseenter', () => tween.pause())
        track.addEventListener('mouseleave', () => tween.resume())
      }
    })

    // Stagger-reveal each row on scroll
    const ctx = gsap.context(() => {
      gsap.from('.sk-hl-row', {
        opacity: 0, y: 24, stagger: 0.14, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 78%' },
      })
    }, wrapRef)

    return () => { tweens.forEach(t => t.kill()); ctx.revert() }
  }, [])

  return (
    <>
      {/* Scoped hover style — turns hovered skill word red without affecting separators */}
      <style>{`
        .sk-word { transition: color 0.22s ease; cursor: default; }
        .sk-word:hover { color: #dc2626 !important; }
      `}</style>

      <div ref={wrapRef} style={{ overflow: 'hidden', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>

        {/* Sub-label */}
        <div style={{ padding: '52px 48px 40px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 36, height: 1, background: 'var(--b2)', flexShrink: 0, transition: 'background 0.35s' }} />
          <span style={{ fontSize: 11, color: 'var(--t4)', letterSpacing: '0.26em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', whiteSpace: 'nowrap', transition: 'color 0.35s' }}>
            expertise in motion
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--b1)', transition: 'background 0.35s' }} />
        </div>

        {/* Marquee rows */}
        {ROWS.map((row, i) => (
          <div
            key={i}
            className="sk-hl-row"
            style={{
              borderTop: '1px solid var(--b1)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.35s',
            }}
          >
            {/* Left edge fade */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 160,
              background: 'linear-gradient(90deg, var(--bg) 45%, transparent)',
              zIndex: 2, pointerEvents: 'none',
            }} />
            {/* Right edge fade */}
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: 160,
              background: 'linear-gradient(-90deg, var(--bg) 45%, transparent)',
              zIndex: 2, pointerEvents: 'none',
            }} />

            {/* Scrolling content — duplicated for seamless loop */}
            <div
              ref={el => { innerRefs.current[i] = el }}
              style={{ display: 'flex', alignItems: 'center', width: 'max-content', padding: `${row.py}px 0` }}
            >
              {[0, 1].map(copy => (
                <div
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {row.skills.map((skill, k) => (
                    <span key={k} style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <span
                        className="sk-word"
                        style={{
                          fontSize: row.size,
                          fontWeight: row.weight,
                          color: row.color,
                          letterSpacing: '-0.025em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {skill}
                      </span>
                      <span style={{
                        display: 'inline-block',
                        width: row.gap,
                        textAlign: 'center',
                        color: 'var(--b2)',
                        fontSize: `calc(${row.size} * 0.4)`,
                        fontWeight: 300,
                        flexShrink: 0,
                        transition: 'color 0.35s',
                      }}>
                        ·
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Closing rule */}
        <div style={{ height: 1, background: 'var(--b1)', transition: 'background 0.35s' }} />

      </div>
    </>
  )
}
