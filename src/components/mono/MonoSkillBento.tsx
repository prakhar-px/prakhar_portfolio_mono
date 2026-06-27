'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Each cell: name, rowSpan, colSpan, size (font size class), accent
const CELLS = [
  { name: 'Java',          col: 2, row: 2, fs: '2.4rem', fw: 800, accent: true  },
  { name: 'Spring Boot',   col: 1, row: 2, fs: '1.5rem', fw: 700, accent: false },
  { name: 'Apache Kafka',  col: 1, row: 1, fs: '1.3rem', fw: 600, accent: false },
  { name: 'Elasticsearch', col: 2, row: 1, fs: '1.4rem', fw: 600, accent: false },
  { name: 'Python',        col: 1, row: 1, fs: '1.3rem', fw: 500, accent: false },
  { name: 'C++',           col: 1, row: 1, fs: '1.6rem', fw: 700, accent: false },
  { name: 'MySQL',         col: 1, row: 1, fs: '1.2rem', fw: 500, accent: false },
  { name: 'REST APIs',     col: 2, row: 1, fs: '1.4rem', fw: 600, accent: false },
  { name: 'MongoDB',       col: 1, row: 1, fs: '1.2rem', fw: 500, accent: false },
  { name: 'Microservices', col: 1, row: 2, fs: '1.3rem', fw: 600, accent: false },
  { name: 'Docker',        col: 1, row: 1, fs: '1.2rem', fw: 500, accent: false },
  { name: 'React.js',      col: 1, row: 1, fs: '1.2rem', fw: 500, accent: false },
  { name: 'Flask',         col: 1, row: 1, fs: '1.1rem', fw: 400, accent: false },
  { name: 'Git / GitHub',  col: 1, row: 1, fs: '1.1rem', fw: 400, accent: false },
  { name: 'OOP',           col: 1, row: 1, fs: '1.1rem', fw: 400, accent: false },
  { name: 'DSA',           col: 1, row: 1, fs: '1.0rem', fw: 400, accent: false },
]

export default function MonoSkillBento() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bento-cell', {
        opacity: 0, scale: 0.92,
        stagger: { amount: 0.9, from: 'start' },
        duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        .bento-cell {
          background: var(--bg-card);
          border: 1px solid var(--b1);
          padding: 28px;
          display: flex;
          align-items: flex-end;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.25s, background 0.25s;
        }
        .bento-cell::before {
          content: '';
          position: absolute; inset: 0;
          background: #dc2626;
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2);
          z-index: 0;
        }
        .bento-cell:hover::before { transform: translateY(0); }
        .bento-cell:hover { border-color: rgba(220,38,38,0.5); }
        .bento-cell:hover .bento-name { color: #ffffff; }
        .bento-cell:hover .bento-dot { background: #ffffff; }
        .bento-name {
          position: relative; z-index: 1;
          color: var(--t1); letter-spacing: -0.025em;
          line-height: 1.1;
          transition: color 0.2s;
        }
        .bento-dot {
          position: absolute; top: 12px; right: 12px; z-index: 1;
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--b2);
          transition: background 0.2s;
        }
      `}</style>
      <div ref={ref} style={{ padding: '72px 48px', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 40, transition: 'color 0.35s' }}>
            // Bento Grid Layout
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 10,
          }}>
            {CELLS.map((cell, i) => (
              <div
                key={i}
                className="bento-cell"
                style={{
                  gridColumn: `span ${cell.col}`,
                  gridRow: `span ${cell.row}`,
                  minHeight: cell.row === 2 ? 160 : 90,
                }}
              >
                <div className="bento-dot" style={{ background: cell.accent ? '#dc2626' : 'var(--b2)' }} />
                <span
                  className="bento-name"
                  style={{ fontSize: cell.fs, fontWeight: cell.fw, color: cell.accent ? '#dc2626' : 'var(--t1)' }}
                >
                  {cell.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
