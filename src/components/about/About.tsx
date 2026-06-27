'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo, stats } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-left', {
        opacity: 0, x: -60, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
      gsap.from('.about-right', {
        opacity: 0, x: 60, duration: 1, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
      gsap.from('.stat-card', {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: '.stat-card', start: 'top 85%' },
      })
      // Animated counters
      document.querySelectorAll('.stat-num').forEach(el => {
        const raw = el.getAttribute('data-val') || ''
        const num = parseFloat(raw.replace(/[^0-9.]/g, ''))
        const sfx = raw.replace(/[0-9.]/g, '')
        if (isNaN(num)) return
        gsap.to({ v: 0 }, {
          v: num, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate() { el.textContent = Math.round(this.targets()[0].v) + sfx },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden" style={{ background: '#03030a' }}>
      <div className="absolute inset-0 grid-bg" />

      {/* Section accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)' }} />

      <div className="relative max-w-6xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="flex items-center gap-4 mb-20">
          <span className="font-mono text-[10px] text-arc/50 tracking-[0.4em]">[ 001 ]</span>
          <div className="h-px w-8 bg-arc/30" />
          <h2 className="font-mono text-3xl font-black tracking-widest">
            ABOUT<span className="text-glow-arc text-arc">_</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: bio */}
          <div className="about-left lg:col-span-3">
            <div className="glass-bright rounded-sm hud-corners glow-arc p-8">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-arc/10">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="font-mono text-[10px] text-muted/40 ml-3 tracking-wider">prakhar@dev ~/about</span>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex gap-3">
                  <span className="text-arc/60 select-none">$</span>
                  <span className="text-dim">whoami</span>
                </div>
                <p className="pl-5 text-text/80 leading-relaxed text-sm">
                  {personalInfo.bio.split('\n')[0].trim()}
                </p>
                <p className="pl-5 text-text/70 leading-relaxed text-sm">
                  {personalInfo.bio.split('\n').slice(1).join(' ').trim()}
                </p>

                <div className="flex gap-3 mt-6">
                  <span className="text-arc/60 select-none">$</span>
                  <span className="text-dim">ls skills/</span>
                </div>
                <div className="pl-5 grid grid-cols-2 gap-x-8 gap-y-1">
                  {['Go', 'Kafka', 'Kubernetes', 'PostgreSQL', 'gRPC', 'AWS', 'Redis', 'Terraform'].map(s => (
                    <span key={s} className="text-arc/80 text-xs">▸ {s}</span>
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  <span className="text-arc/60 select-none">$</span>
                  <span className="text-dim">echo $STATUS</span>
                </div>
                <div className="pl-5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-arc" style={{ boxShadow: '0 0 8px #00d4ff' }} />
                  <span className="text-arc text-xs tracking-wider">Available for senior SDE roles · Remote OK</span>
                </div>

                <div className="flex gap-3 mt-3 terminal-caret">
                  <span className="text-arc/60 select-none">$</span>
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-arc/8">
                {[
                  { label: 'GitHub', href: personalInfo.github },
                  { label: 'LinkedIn', href: personalInfo.linkedin },
                  { label: `${personalInfo.email}`, href: `mailto:${personalInfo.email}` },
                ].map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" data-hover
                    className="font-mono text-[11px] tracking-wider text-muted/60 hover:text-arc transition-colors duration-200 border-b border-transparent hover:border-arc/40 pb-0.5">
                    {l.label} →
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: stat cards */}
          <div className="about-right lg:col-span-2 grid grid-cols-2 gap-4 content-start">
            {stats.map(s => (
              <div key={s.label} className="stat-card glass-bright rounded-sm hud-corners glow-arc p-6 flex flex-col justify-between">
                <div className="stat-num font-mono font-black text-arc text-glow-arc leading-none"
                  data-val={s.value}
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>
                  {s.value}
                </div>
                <div className="font-mono text-[9px] text-muted/60 tracking-[0.22em] mt-3 leading-snug">
                  {s.label.replace(/_/g, ' ')}
                </div>
              </div>
            ))}

            {/* Location card */}
            <div className="stat-card col-span-2 glass-bright rounded-sm p-5 flex items-center gap-4"
              style={{ border: '1px solid rgba(123,47,247,0.2)' }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: '#00d4ff', boxShadow: '0 0 10px #00d4ff', animation: 'glow-pulse 2s ease-in-out infinite' }} />
              <div className="font-mono text-xs text-text/70 tracking-wider">
                {personalInfo.location} · Open to remote · Immediate availability
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
