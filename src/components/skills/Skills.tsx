'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const ref    = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-tab', {
        opacity: 0, y: 20, stagger: 0.06, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
      gsap.from('.skill-panel', {
        opacity: 0, x: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    gsap.from('.bar-fill', {
      scaleX: 0, transformOrigin: 'left', duration: 0.8, stagger: 0.06, ease: 'power3.out',
    })
  }, [active])

  const cat = skills[active]

  return (
    <section id="skills" ref={ref} className="relative py-32 overflow-hidden" style={{ background: '#060610' }}>
      <div className="absolute inset-0 grid-bg-dense opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(123,47,247,0.3), transparent)' }} />

      <div className="relative max-w-6xl mx-auto px-6 md:px-16">
        <div className="flex items-center gap-4 mb-20">
          <span className="font-mono text-[10px] text-arc/50 tracking-[0.4em]">[ 002 ]</span>
          <div className="h-px w-8 bg-arc/30" />
          <h2 className="font-mono text-3xl font-black tracking-widest">
            SKILLS<span className="text-glow-arc text-arc">_</span>
          </h2>
        </div>

        <div className="flex gap-8 flex-col lg:flex-row">
          {/* Tab list */}
          <div className="lg:w-56 flex flex-row lg:flex-col gap-2 flex-wrap">
            {skills.map((c, i) => (
              <button key={c.category} onClick={() => setActive(i)} data-hover
                className={`skill-tab text-left font-mono text-[11px] tracking-[0.18em] px-4 py-3 rounded-sm transition-all duration-250 ${
                  i === active
                    ? 'text-arc border-l-2 border-arc'
                    : 'text-muted/60 border-l-2 border-transparent hover:text-text/70 hover:border-arc/30'
                }`}
                style={{ background: i === active ? 'rgba(0,212,255,0.05)' : 'transparent' }}>
                {c.category}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="skill-panel flex-1 glass-bright rounded-sm hud-corners glow-arc p-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-arc/10">
              <span className="font-mono text-sm text-text tracking-[0.2em]">
                DIAGNOSTIC / <span className="text-arc">{cat.category}</span>
              </span>
              <span className="font-mono text-[10px] text-muted/40">{cat.items.length} MODULES</span>
            </div>

            <div className="space-y-5">
              {cat.items.map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm text-text/90 tracking-wider">{skill.name}</span>
                    <span className="font-mono text-xs text-arc/60">{skill.level}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden"
                    style={{ background: 'rgba(0,212,255,0.07)' }}>
                    <div className="bar-fill h-full rounded-full"
                      style={{
                        width: `${skill.level}%`,
                        background: skill.level >= 90
                          ? 'linear-gradient(90deg, #00d4ff, #00d4ff)'
                          : 'linear-gradient(90deg, #00d4ff, #7b2ff7)',
                        boxShadow: `0 0 8px rgba(0,212,255,${skill.level / 200})`,
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All tech tags */}
        <div className="mt-14 pt-10 border-t border-arc/8">
          <p className="font-mono text-[10px] text-muted/40 tracking-[0.3em] mb-5">COMPLETE STACK</p>
          <div className="flex flex-wrap gap-2">
            {skills.flatMap(c => c.items).map(s => (
              <span key={s.name}
                className="font-mono text-[11px] tracking-wider px-3 py-1.5 rounded-sm text-muted/60 hover:text-arc/80 transition-colors duration-200"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.08)' }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
