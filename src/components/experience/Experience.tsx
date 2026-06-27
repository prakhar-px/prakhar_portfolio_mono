'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-line', {
        scaleY: 0, transformOrigin: 'top', duration: 1.4, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 65%' },
      })
      document.querySelectorAll('.exp-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, x: i % 2 === 0 ? -50 : 50, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={ref} className="relative py-32 overflow-hidden" style={{ background: '#060610' }}>
      <div className="absolute inset-0 grid-bg-dense opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(123,47,247,0.3), transparent)' }} />

      {/* Large bg text */}
      <div className="absolute top-16 left-6 font-mono font-black opacity-[0.025] select-none pointer-events-none leading-none"
        style={{ fontSize: '12vw', color: '#7b2ff7' }}>EXP</div>

      <div className="relative max-w-4xl mx-auto px-6 md:px-16">
        <div className="flex items-center gap-4 mb-20">
          <span className="font-mono text-[10px] text-arc/50 tracking-[0.4em]">[ 004 ]</span>
          <div className="h-px w-8 bg-arc/30" />
          <h2 className="font-mono text-3xl font-black tracking-widest">
            EXPERIENCE<span className="text-glow-arc text-arc">_</span>
          </h2>
        </div>

        <div className="relative pl-10">
          {/* Timeline spine */}
          <div className="timeline-line absolute left-0 top-3 bottom-3 w-px"
            style={{ background: 'linear-gradient(to bottom, #00d4ff40, #7b2ff740, #00d4ff15)' }} />

          <div className="space-y-10">
            {experience.map((exp, i) => (
              <div key={exp.id} className="exp-card relative">
                {/* Node */}
                <div className="absolute -left-10 top-6 flex items-center justify-center w-4 h-4">
                  {i === 0 && (
                    <div className="absolute w-7 h-7 rounded-full border border-arc/30"
                      style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
                  )}
                  <div className="w-3 h-3 rounded-full border border-arc/80"
                    style={{ background: i === 0 ? '#00d4ff' : 'transparent', boxShadow: i === 0 ? '0 0 10px #00d4ff' : 'none' }} />
                </div>

                <div className="glass-bright rounded-sm hud-corners glow-arc p-7 transition-all duration-300 hover:border-arc/30"
                  style={{ border: `1px solid ${i === 0 ? 'rgba(0,212,255,0.2)' : 'rgba(0,212,255,0.1)'}` }}>

                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="font-mono text-[10px] text-arc/50 tracking-[0.3em]">{exp.id}</span>
                        <span className="font-mono text-[9px] px-2 py-0.5 tracking-widest"
                          style={{ border: '1px solid rgba(0,212,255,0.15)', color: '#64748b' }}>
                          {exp.type}
                        </span>
                        {i === 0 && (
                          <span className="font-mono text-[9px] px-2 py-0.5 text-arc/80"
                            style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                            CURRENT
                          </span>
                        )}
                      </div>
                      <h3 className="font-mono font-black text-xl text-text tracking-wider">{exp.role}</h3>
                      <p className="font-mono text-sm text-arc/80 mt-1">{exp.company}</p>
                    </div>
                    <span className="font-mono text-xs text-muted/50 tracking-wider whitespace-nowrap">{exp.period}</span>
                  </div>

                  <p className="text-sm text-dim/80 leading-relaxed mb-5">{exp.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {exp.highlights.map((h, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <span className="text-arc/50 text-xs mt-0.5 shrink-0">▸</span>
                        <span className="font-mono text-xs text-muted/70 leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
