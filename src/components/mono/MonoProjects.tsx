'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/data'
import { useTheme } from '@/hooks/useTheme'

gsap.registerPlugin(ScrollTrigger)

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const bodyRef  = useRef<HTMLDivElement>(null)
  const rowRef   = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)
  const { theme } = useTheme()

  const toggle = () => setOpen(o => {
    const next = !o
    gsap.to(bodyRef.current, { height: next ? 'auto' : 0, opacity: next ? 1 : 0, duration: 0.45, ease: next ? 'power3.out' : 'power2.in' })
    gsap.to(arrowRef.current, { rotation: next ? 45 : 0, duration: 0.3 })
    return next
  })

  const onEnter = () => { if (!open) gsap.to(rowRef.current, { x: 8, duration: 0.3, ease: 'power2.out' }) }
  const onLeave = () => { if (!open) gsap.to(rowRef.current, { x: 0, duration: 0.3 }) }

  return (
    <div style={{ borderBottom: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
      <div ref={rowRef} onClick={toggle} onMouseEnter={onEnter} onMouseLeave={onLeave} data-cursor
        style={{ padding: '28px 0', display: 'flex', alignItems: 'center', gap: 24, cursor: 'pointer' }}>
        <span style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'var(--font-mono)', width: 28, flexShrink: 0 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 800, letterSpacing: '-0.02em', color: open ? 'var(--t1)' : 'var(--t2)', flex: 1, transition: 'color 0.2s' }}>
          {project.name}
        </span>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {project.tech.slice(0, 3).map(t => (
            <span key={t} style={{ fontSize: 11, color: 'var(--t3)', fontFamily: 'var(--font-mono)', transition: 'color 0.35s' }}>{t}</span>
          ))}
        </div>
        <span ref={arrowRef} style={{ fontSize: 20, color: 'var(--t3)', fontWeight: 300, flexShrink: 0, lineHeight: 1, display: 'inline-block', transition: 'color 0.35s' }}>+</span>
      </div>

      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div style={{ padding: '0 52px 40px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 15, color: 'var(--t2)', lineHeight: 1.75, marginBottom: 20, transition: 'color 0.35s' }}>{project.description}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {project.tech.map(t => (
                <span key={t} style={{ fontSize: 11, padding: '5px 12px', border: `1px solid ${theme === 'light' ? 'var(--b1)' : 'rgba(255,255,255,0.25)'}`, color: theme === 'light' ? 'var(--t3)' : 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', transition: 'all 0.35s' }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0, alignItems: 'flex-end' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#dc2626', letterSpacing: '-0.02em', transition: 'color 0.35s' }}>{project.metric}</div>
              <div style={{ fontSize: 10, color: 'var(--t4)', fontFamily: 'var(--font-mono)', marginTop: 4, letterSpacing: '0.08em', transition: 'color 0.35s' }}>KEY METRIC</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
              {project.live !== '' && (
                <a href={project.live} target="_blank" rel="noreferrer" data-cursor
                  style={{ fontSize: 12, color: 'var(--t3)', textDecoration: 'none', borderBottom: '1px solid var(--b1)', paddingBottom: 2, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.borderColor = '#dc2626' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--t3)'; e.currentTarget.style.borderColor = 'var(--b1)' }}>
                  Live →
                </a>
              )}
              {project.github !== '' && (
                <a href={project.github} target="_blank" rel="noreferrer" data-cursor
                  style={{ fontSize: 12, color: 'var(--t3)', textDecoration: 'none', borderBottom: '1px solid var(--b1)', paddingBottom: 2, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--t1)'; e.currentTarget.style.borderColor = 'var(--t1)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--t3)'; e.currentTarget.style.borderColor = 'var(--b1)' }}>
                  GitHub →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MonoProjects() {
  const ref = useRef<HTMLElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proj-row', { opacity: 0, y: 20, stagger: 0.1, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={ref} style={{ padding: '120px 48px', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <span style={{ fontSize: 11, color: '#dc2626', letterSpacing: '0.18em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: 700, transition: 'color 0.35s' }}>03 / Work</span>
          <div style={{ flex: 1, height: 1, background: 'var(--b1)', transition: 'background 0.35s' }} />
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--t1)', marginBottom: 64, transition: 'color 0.35s' }}>
          Selected projects
        </h2>
        <div style={{ borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
          {projects.map((p, i) => (
            <div key={p.id} className="proj-row"><ProjectRow project={p} index={i} /></div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--t4)', marginTop: 28, fontFamily: 'var(--font-mono)', transition: 'color 0.35s' }}>
          Click a row to expand ↑
        </p>
      </div>
    </section>
  )
}
