'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATS = [
  { label: 'Languages',       skills: ['Java', 'C++', 'Python', 'JavaScript', 'SQL'] },
  { label: 'Frameworks',      skills: ['Spring Boot', 'Flask', 'React.js', 'REST APIs', 'SQLAlchemy'] },
  { label: 'Data & Messaging',skills: ['Apache Kafka', 'Elasticsearch', 'MySQL', 'MongoDB'] },
  { label: 'Infrastructure',  skills: ['Docker', 'Linux', 'Git / GitHub', 'Postman', 'Microservices'] },
  { label: 'Fundamentals',    skills: ['OOP', 'DSA', 'Info Security', 'HTML5', 'CSS3'] },
]

export default function MonoSkillPills() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pill-row', {
        opacity: 0, x: -24,
        stagger: 0.12, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      })
      gsap.from('.skill-pill', {
        opacity: 0, scale: 0.85,
        stagger: { amount: 0.8, from: 'start' },
        duration: 0.45, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        delay: 0.2,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        .skill-pill {
          display: inline-flex; align-items: center;
          padding: 7px 16px;
          border: 1px solid var(--b1);
          font-family: var(--font-mono); font-size: 12px;
          letter-spacing: 0.06em; color: var(--t2);
          cursor: default; white-space: nowrap;
          transition: color 0.2s, border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .skill-pill:hover {
          color: #dc2626;
          border-color: rgba(220,38,38,0.5);
          box-shadow: 0 0 14px rgba(220,38,38,0.18), inset 0 0 8px rgba(220,38,38,0.06);
          background: rgba(220,38,38,0.03);
        }
      `}</style>
      <div ref={ref} style={{ padding: '72px 48px', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 48, transition: 'color 0.35s' }}>
            // Categorized Pill Cloud
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {CATS.map((cat, i) => (
              <div key={i} className="pill-row" style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 10, color: '#dc2626', fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  fontWeight: 700, width: 130, flexShrink: 0,
                }}>
                  {cat.label}
                </span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
                  {cat.skills.map((s, j) => (
                    <span key={j} className="skill-pill">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
