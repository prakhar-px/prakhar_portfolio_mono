'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SEQUENCE = [
  { skill: 'Java',          cat: 'LANGUAGE'     },
  { skill: 'Spring Boot',   cat: 'FRAMEWORK'    },
  { skill: 'Apache Kafka',  cat: 'MESSAGING'    },
  { skill: 'Elasticsearch', cat: 'SEARCH ENGINE'},
  { skill: 'Python',        cat: 'LANGUAGE'     },
  { skill: 'MySQL',         cat: 'DATABASE'     },
  { skill: 'Microservices', cat: 'ARCHITECTURE' },
  { skill: 'Docker',        cat: 'TOOLING'      },
  { skill: 'REST APIs',     cat: 'INTEGRATION'  },
  { skill: 'MongoDB',       cat: 'DATABASE'     },
  { skill: 'Flask',         cat: 'FRAMEWORK'    },
  { skill: 'React.js',      cat: 'FRONTEND'     },
  { skill: 'Git / GitHub',  cat: 'VERSION CTRL' },
  { skill: 'OOP',           cat: 'PARADIGM'     },
]

const TYPE_SPEED  = 75   // ms per character
const PAUSE_TIME  = 1400 // ms at full text
const DELETE_SPEED = 38  // ms per delete

export default function MonoSkillTypewriter() {
  const ref        = useRef<HTMLDivElement>(null)
  const [display,  setDisplay]  = useState('')
  const [idx,      setIdx]      = useState(0)
  const [phase,    setPhase]    = useState<'typing' | 'pausing' | 'deleting'>('typing')
  const [active,   setActive]   = useState(false)

  // Start animation once section enters viewport
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 75%',
      onEnter: () => setActive(true),
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    if (!active) return

    const target = SEQUENCE[idx].skill

    if (phase === 'typing') {
      if (display.length < target.length) {
        const t = setTimeout(() => setDisplay(target.slice(0, display.length + 1)), TYPE_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('pausing'), PAUSE_TIME)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'pausing') {
      setPhase('deleting')
    }

    if (phase === 'deleting') {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(d => d.slice(0, -1)), DELETE_SPEED)
        return () => clearTimeout(t)
      } else {
        setIdx(i => (i + 1) % SEQUENCE.length)
        setPhase('typing')
      }
    }
  }, [active, display, idx, phase])

  const current = SEQUENCE[idx]

  return (
    <div ref={ref} style={{ padding: '72px 48px', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 64, transition: 'color 0.35s' }}>
          // Typewriter Reveal
        </div>

        <div style={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 0' }}>
          {/* Category label */}
          <div style={{ fontSize: 11, color: '#dc2626', fontFamily: 'var(--font-mono)', letterSpacing: '0.22em', marginBottom: 20, minHeight: 16, transition: 'color 0.35s' }}>
            {active ? current.cat : ''}
          </div>

          {/* Typed text + cursor */}
          <div style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--t1)', lineHeight: 1, display: 'flex', alignItems: 'center', transition: 'color 0.35s' }}>
            <span>{display}</span>
            <span style={{
              display: 'inline-block',
              width: '3px',
              height: '0.85em',
              background: '#dc2626',
              marginLeft: '6px',
              verticalAlign: 'middle',
              animation: 'tw-blink 0.8s step-end infinite',
            }} />
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 6, marginTop: 36 }}>
            {SEQUENCE.map((_, i) => (
              <div key={i} style={{
                width: i === idx ? 18 : 5, height: 5,
                background: i === idx ? '#dc2626' : 'var(--b2)',
                transition: 'width 0.3s ease, background 0.3s ease',
              }} />
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes tw-blink { 0%,100%{opacity:1;} 50%{opacity:0;} }`}</style>
    </div>
  )
}
