'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// SVG viewBox: 0 0 1000 480
const NODES = [
  { name: 'Java',          cx: 120, cy: 90,  r: 6, primary: true  },
  { name: 'Spring Boot',   cx: 260, cy: 60,  r: 5, primary: true  },
  { name: 'Apache Kafka',  cx: 430, cy: 80,  r: 5, primary: true  },
  { name: 'Elasticsearch', cx: 610, cy: 55,  r: 4, primary: false },
  { name: 'Python',        cx: 780, cy: 88,  r: 4, primary: false },
  { name: 'C++',           cx: 70,  cy: 230, r: 4, primary: false },
  { name: 'REST APIs',     cx: 200, cy: 210, r: 4, primary: false },
  { name: 'MySQL',         cx: 360, cy: 190, r: 4, primary: false },
  { name: 'Microservices', cx: 510, cy: 220, r: 5, primary: true  },
  { name: 'MongoDB',       cx: 680, cy: 190, r: 4, primary: false },
  { name: 'JavaScript',    cx: 860, cy: 210, r: 4, primary: false },
  { name: 'Flask',         cx: 140, cy: 370, r: 3, primary: false },
  { name: 'React.js',      cx: 300, cy: 350, r: 3, primary: false },
  { name: 'Docker',        cx: 450, cy: 380, r: 3, primary: false },
  { name: 'Git / GitHub',  cx: 600, cy: 355, r: 3, primary: false },
  { name: 'Linux',         cx: 750, cy: 375, r: 3, primary: false },
  { name: 'OOP',           cx: 900, cy: 350, r: 3, primary: false },
  { name: 'DSA',           cx: 960, cy: 100, r: 3, primary: false },
]

const CONNECT_DIST = 240

// Build edges between nodes within CONNECT_DIST
const EDGES = (() => {
  const edges: { x1: number; y1: number; x2: number; y2: number; len: number }[] = []
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const dx = NODES[i].cx - NODES[j].cx
      const dy = NODES[i].cy - NODES[j].cy
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < CONNECT_DIST) {
        edges.push({ x1: NODES[i].cx, y1: NODES[i].cy, x2: NODES[j].cx, y2: NODES[j].cy, len: d })
      }
    }
  }
  return edges
})()

export default function MonoSkillConstellation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate lines drawing in with stroke-dashoffset
      gsap.utils.toArray<SVGPathElement>('.const-edge').forEach((el, i) => {
        const len = el.getTotalLength()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: i * 0.04,
          scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        })
      })

      // Nodes fade + scale in
      gsap.from('.const-node', {
        scale: 0, opacity: 0,
        stagger: { amount: 0.8, from: 'random' },
        duration: 0.5, ease: 'back.out(2)',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      })

      // Labels fade in after nodes
      gsap.from('.const-label', {
        opacity: 0, y: 6,
        stagger: 0.04, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        delay: 0.4,
      })

      // Perpetual pulse on primary nodes
      gsap.to('.const-node-primary', {
        scale: 1.5, opacity: 0.3,
        duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1,
        stagger: { amount: 1.5 },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} style={{ padding: '72px 0', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 36, transition: 'color 0.35s' }}>
          // Skill Constellation
        </div>
      </div>
      <svg
        viewBox="0 0 1000 440"
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        aria-label="Skill constellation map"
      >
        {/* Edges */}
        {EDGES.map((e, i) => (
          <path
            key={i}
            className="const-edge"
            d={`M ${e.x1} ${e.y1} L ${e.x2} ${e.y2}`}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
            fill="none"
          />
        ))}

        {/* Glow rings on primary nodes */}
        {NODES.filter(n => n.primary).map((n, i) => (
          <circle
            key={`glow-${i}`}
            className="const-node-primary"
            cx={n.cx} cy={n.cy} r={n.r * 3}
            fill="none"
            stroke="rgba(220,38,38,0.15)"
            strokeWidth="1"
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
        ))}

        {/* Nodes */}
        {NODES.map((n, i) => (
          <circle
            key={`node-${i}`}
            className="const-node"
            cx={n.cx} cy={n.cy} r={n.r}
            fill={n.primary ? '#dc2626' : 'var(--t3)'}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px`, cursor: 'default' }}
          />
        ))}

        {/* Labels */}
        {NODES.map((n, i) => (
          <text
            key={`label-${i}`}
            className="const-label"
            x={n.cx}
            y={n.cy - n.r - 6}
            textAnchor="middle"
            fontSize={n.primary ? 13 : 11}
            fontWeight={n.primary ? 700 : 400}
            fill={n.primary ? 'var(--t1)' : 'var(--t3)'}
            fontFamily="var(--font-mono)"
            letterSpacing="-0.3"
            style={{ transition: 'fill 0.2s', cursor: 'default' }}
            onMouseEnter={e => { e.currentTarget.setAttribute('fill', '#dc2626') }}
            onMouseLeave={e => { e.currentTarget.setAttribute('fill', n.primary ? 'var(--t1)' : 'var(--t3)') }}
          >
            {n.name}
          </text>
        ))}
      </svg>
    </div>
  )
}
