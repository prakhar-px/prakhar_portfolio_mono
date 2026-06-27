'use client'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { personalInfo } from '@/lib/data'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: 'power3.out', delay: 3.4,
      })
      gsap.from('.hero-cta', {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.7, ease: 'power2.out', delay: 4.0,
      })
    }, contentRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh', background: '#03030a' }}
    >
      {/* ── Rich background layers ── */}

      {/* Radial gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: 700, height: 700,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -60%)',
            background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            top: '30%', left: '65%',
            background: 'radial-gradient(circle, rgba(123,47,247,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            top: '60%', left: '20%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

      {/* Horizontal accent lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[20, 40, 60, 80].map(pct => (
          <div
            key={pct}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${pct}%`,
              background: `linear-gradient(90deg, transparent, rgba(0,212,255,${pct === 40 || pct === 60 ? '0.08' : '0.03'}), transparent)`,
            }}
          />
        ))}
      </div>

      {/* Spinning rings (decorative) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(0,212,255,0.06)',
            animation: 'spin-slow 30s linear infinite',
          }}
        />
        <div
          className="absolute inset-8 rounded-full"
          style={{
            border: '1px dashed rgba(123,47,247,0.08)',
            animation: 'spin-rev 20s linear infinite',
          }}
        />
        <div
          className="absolute inset-20 rounded-full"
          style={{
            border: '1px solid rgba(0,212,255,0.05)',
            animation: 'spin-slow 15s linear infinite',
          }}
        />
      </div>

      {/* WebGL canvas (enhancement only — page looks great without it) */}
      <div className="absolute inset-0 z-[2]">
        <HeroCanvas />
      </div>

      {/* Top HUD bar */}
      <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none px-8 pt-8 flex justify-between items-start">
        <div className="font-mono text-[10px] text-arc/50 tracking-[0.3em] space-y-1">
          <div>◆ PRAKHAR.DEV</div>
          <div className="text-muted/40">v2.0 · ONLINE</div>
        </div>
        <div className="font-mono text-[10px] text-muted/30 tracking-[0.2em] text-right space-y-1">
          <div>BACKEND_SYS</div>
          <div>NODE: ACTIVE</div>
        </div>
      </div>

      {/* Corner brackets */}
      {[
        'top-6 left-6 border-t border-l',
        'top-6 right-6 border-t border-r',
        'bottom-6 left-6 border-b border-l',
        'bottom-6 right-6 border-b border-r',
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-10 h-10 ${cls} pointer-events-none z-10`}
          style={{ borderColor: 'rgba(0,212,255,0.35)' }}
        />
      ))}

      {/* ── Main content ── */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">

        {/* System label */}
        <div className="hero-line section-label mb-8 tracking-[0.5em] opacity-80">
          IDENTITY_CONFIRMED · SDE · BACKEND_SYSTEMS
        </div>

        {/* Giant name */}
        <h1 className="hero-line font-mono font-black leading-[0.9] tracking-[-0.02em] mb-4 select-none"
          style={{ fontSize: 'clamp(5rem, 14vw, 11rem)' }}>
          <span className="gradient-text">{personalInfo.name.toUpperCase()}</span>
        </h1>

        {/* Subtitle */}
        <div className="hero-line relative w-full max-w-2xl my-6">
          <div className="h-px bg-gradient-to-r from-transparent via-arc/40 to-transparent" />
          <p className="font-mono text-muted tracking-[0.15em] py-4"
            style={{ fontSize: 'clamp(0.65rem, 1.4vw, 0.8rem)' }}>
            {personalInfo.subtitle}
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-arc/20 to-transparent" />
        </div>

        {/* Stat pills */}
        <div className="hero-line flex flex-wrap gap-3 justify-center mb-10">
          {['Go · Python · Java', 'Kafka · Redis · gRPC', 'K8s · AWS · Terraform'].map(tag => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-[0.2em] px-4 py-2 glass rounded-sm text-muted/70"
              style={{ borderColor: 'rgba(0,212,255,0.12)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            data-hover
            className="hero-cta group relative font-mono text-xs tracking-[0.25em] px-10 py-4 overflow-hidden transition-all duration-300"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.5)',
              color: '#00d4ff',
              boxShadow: '0 0 20px rgba(0,212,255,0.1)',
            }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ background: 'rgba(0,212,255,0.12)' }} />
            <span className="relative">[ VIEW PROJECTS ]</span>
          </a>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            data-hover
            className="hero-cta font-mono text-xs tracking-[0.25em] px-10 py-4 transition-all duration-300"
            style={{
              border: '1px solid rgba(100,116,139,0.35)',
              color: '#94a3b8',
            }}
          >
            [ CONTACT ]
          </a>
        </div>
      </div>

      {/* Bottom HUD bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none px-8 pb-8 flex justify-between items-end">
        {/* Left stats */}
        <div className="font-mono text-[9px] text-muted/35 tracking-[0.2em] space-y-1">
          <div>5+ YRS EXPERIENCE</div>
          <div>10M+ EVENTS / DAY</div>
        </div>
        {/* Scroll hint */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] text-muted/30 tracking-[0.3em]">SCROLL</span>
          <div className="flex flex-col gap-1" style={{ animation: 'scroll-hint 1.8s ease-in-out infinite' }}>
            <div className="w-px h-6 mx-auto" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)' }} />
          </div>
        </div>
        {/* Right coords */}
        <div className="font-mono text-[9px] text-muted/35 tracking-[0.2em] text-right space-y-1">
          <div>28.6139° N · 77.2090° E</div>
          <div>BUILD 2025</div>
        </div>
      </div>
    </section>
  )
}
