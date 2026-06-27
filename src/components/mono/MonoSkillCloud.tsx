'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Pre-placed positions: x/y as % of container, size in rem, slight rotation
const WORDS = [
  { text: 'Java',          x: 6,  y: 8,  size: 3.4, w: 800, rot: -1 },
  { text: 'Spring Boot',   x: 30, y: 4,  size: 2.6, w: 700, rot: 1  },
  { text: 'Apache Kafka',  x: 60, y: 8,  size: 2.2, w: 700, rot: -2 },
  { text: 'Python',        x: 79, y: 3,  size: 2.0, w: 600, rot: 1  },
  { text: 'C++',           x: 4,  y: 38, size: 1.9, w: 600, rot: 2  },
  { text: 'Elasticsearch', x: 20, y: 34, size: 1.8, w: 500, rot: -1 },
  { text: 'MySQL',         x: 44, y: 30, size: 1.6, w: 500, rot: 1  },
  { text: 'REST APIs',     x: 62, y: 33, size: 2.0, w: 600, rot: -1 },
  { text: 'MongoDB',       x: 82, y: 36, size: 1.5, w: 500, rot: 2  },
  { text: 'Microservices', x: 8,  y: 62, size: 1.8, w: 500, rot: -2 },
  { text: 'Docker',        x: 33, y: 58, size: 1.4, w: 400, rot: 1  },
  { text: 'Flask',         x: 52, y: 62, size: 1.4, w: 400, rot: -1 },
  { text: 'React.js',      x: 68, y: 57, size: 1.5, w: 400, rot: 0  },
  { text: 'JavaScript',    x: 84, y: 62, size: 1.8, w: 500, rot: 1  },
  { text: 'Git / GitHub',  x: 5,  y: 82, size: 1.3, w: 400, rot: 2  },
  { text: 'Linux',         x: 25, y: 84, size: 1.2, w: 400, rot: -1 },
  { text: 'OOP',           x: 42, y: 83, size: 1.2, w: 400, rot: 1  },
  { text: 'DSA',           x: 56, y: 85, size: 1.1, w: 300, rot: -2 },
  { text: 'SQLAlchemy',    x: 70, y: 82, size: 1.1, w: 300, rot: 0  },
  { text: 'SQL',           x: 88, y: 20, size: 1.5, w: 400, rot: -1 },
]

const colorBySize = (size: number) =>
  size > 3 ? 'var(--t1)' : size > 2 ? 'var(--t2)' : 'var(--t3)'

export default function MonoSkillCloud() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial rotations via GSAP (avoids inline transform conflicts)
      WORDS.forEach((w, i) => {
        gsap.set(`.cw-${i}`, { rotation: w.rot })
      })

      // Scroll-triggered entrance
      gsap.from('.cloud-word', {
        opacity: 0, scale: 0.2,
        stagger: { amount: 1.4, from: 'random' },
        duration: 0.65, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      })

      // Gentle perpetual float (different offset per word)
      WORDS.forEach((_, i) => {
        gsap.to(`.cw-${i}`, {
          y: i % 2 === 0 ? -10 : 10,
          duration: 2.8 + (i % 5) * 0.5,
          ease: 'sine.inOut', yoyo: true, repeat: -1,
          delay: i * 0.12,
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ padding: '72px 48px', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 48, transition: 'color 0.35s' }}>
          // Animated Word Cloud
        </div>
        <div style={{ position: 'relative', height: 440, overflow: 'hidden' }}>
          {WORDS.map((w, i) => (
            <span
              key={i}
              className={`cloud-word cw-${i}`}
              style={{
                position: 'absolute',
                left: `${w.x}%`,
                top: `${w.y}%`,
                fontSize: `${w.size}rem`,
                fontWeight: w.w,
                color: colorBySize(w.size),
                letterSpacing: '-0.025em',
                whiteSpace: 'nowrap',
                cursor: 'default',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#dc2626' }}
              onMouseLeave={e => { e.currentTarget.style.color = colorBySize(w.size) }}
            >
              {w.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
