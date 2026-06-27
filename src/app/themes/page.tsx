'use client'
import { useState, useEffect, useRef } from 'react'

const THEMES = [
  { id: 'linear',    label: '01 — Linear Dark',       color: '#8b5cf6' },
  { id: 'brutalist', label: '02 — Brutalist',          color: '#dc2626' },
  { id: 'aurora',    label: '03 — Aurora Glass',       color: '#06b6d4' },
  { id: 'mono',      label: '04 — Monochrome',         color: '#ffffff' },
]

/* ─────────────────────────────────────────────────────────── */
/*  THEME 1 — Linear / Apple Dark                              */
/* ─────────────────────────────────────────────────────────── */
function ThemeLinear() {
  return (
    <section id="linear" style={{ minHeight: '100vh', background: '#09090b', fontFamily: 'var(--font-geist-sans), Inter, sans-serif', padding: '0' }}>
      {/* Nav bar */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 48px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.02em' }}>Prakhar</span>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Work', 'Skills', 'Experience', 'Contact'].map(l => (
            <span key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
        <div style={{ width: 80, height: 32, background: '#8b5cf6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Hire me</div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '100px 48px 80px' }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 999, padding: '5px 14px', marginBottom: 40 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6', boxShadow: '0 0 8px #8b5cf6' }} />
          <span style={{ fontSize: 12, color: '#a78bfa', fontWeight: 500, letterSpacing: '0.04em' }}>Available for work · Remote</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 800, lineHeight: 1.05, color: '#ffffff', marginBottom: 24, letterSpacing: '-0.03em' }}>
          Backend engineer<br />
          <span style={{ color: 'transparent', backgroundImage: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
            at scale.
          </span>
        </h1>

        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 540, marginBottom: 48 }}>
          I build distributed systems that handle millions of events per day.
          Go, Kafka, Kubernetes — systems that never sleep.
        </p>

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ padding: '14px 28px', background: '#8b5cf6', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>View projects →</div>
          <div style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 14, color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>Download CV</div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 0, marginTop: 80, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 40 }}>
          {[['5+', 'Years exp.'], ['10M+', 'Events/day'], ['99.99%', 'Uptime SLA'], ['20+', 'Systems shipped']].map(([v, l]) => (
            <div key={l} style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.06)', paddingRight: 32, marginRight: 32 }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{v}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4, fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 64 }}>
          {[
            { name: 'HYPERSTREAM', desc: 'Real-time pipeline · 2M events/sec', tech: 'Go · Kafka · K8s' },
            { name: 'GRIDMESH', desc: 'Service mesh for 50+ microservices', tech: 'gRPC · Envoy · Go' },
            { name: 'VAULTDB', desc: 'Multi-tenant DB proxy + auto-sharding', tech: 'Go · PostgreSQL' },
          ].map(p => (
            <div key={p.name} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 11, color: '#8b5cf6', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 10 }}>{p.tech}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────── */
/*  THEME 2 — Brutalist Editorial                              */
/* ─────────────────────────────────────────────────────────── */
function ThemeBrutalist() {
  return (
    <section id="brutalist" style={{ minHeight: '100vh', background: '#fafaf8', fontFamily: 'var(--font-geist-sans), Inter, sans-serif' }}>
      {/* Nav */}
      <div style={{ borderBottom: '3px solid #111', padding: '0 48px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#111', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Prakhar /</span>
        <div style={{ display: 'flex', gap: 0 }}>
          {['WORK', 'SKILLS', 'EXP', 'CONTACT'].map((l, i) => (
            <div key={l} style={{ padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', fontSize: 11, fontWeight: 800, color: '#111', letterSpacing: '0.12em', borderLeft: i === 0 ? '2px solid #111' : 'none', cursor: 'pointer' }}>{l}</div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 48px' }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#888', textTransform: 'uppercase' }}>Software Engineer — Backend Systems</div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#888' }}>India · 2025</div>
        </div>

        {/* Giant name */}
        <div style={{ fontSize: 'clamp(5rem, 13vw, 10rem)', fontWeight: 900, lineHeight: 0.88, color: '#111', letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: 24 }}>
          PRAKHAR
        </div>

        {/* Red accent bar */}
        <div style={{ height: 8, background: '#dc2626', marginBottom: 32 }} />

        {/* Two-col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 20, lineHeight: 1.55, color: '#333', fontWeight: 400 }}>
              Backend engineer specializing in distributed systems. I build pipelines that handle
              <span style={{ fontWeight: 900, color: '#111' }}> 10 million events per day</span> and infrastructure
              that scales on demand.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <div style={{ padding: '14px 24px', background: '#111', fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>VIEW WORK</div>
              <div style={{ padding: '14px 24px', border: '2px solid #111', fontSize: 13, fontWeight: 800, color: '#111', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>CONTACT</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[['5+', 'YEARS'], ['10M+', 'EVENTS/DAY'], ['20+', 'SYSTEMS'], ['99.99%', 'UPTIME']].map(([v, l]) => (
              <div key={l} style={{ background: '#111', padding: 28 }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>{v}</div>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#dc2626', letterSpacing: '0.15em', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div style={{ marginTop: 64, borderTop: '3px solid #111', paddingTop: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', color: '#888', marginBottom: 24 }}>SELECTED WORK</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
            {[
              { num: '01', name: 'HYPERSTREAM', desc: '2M events/sec pipeline', tags: 'Go · Kafka · Redis' },
              { num: '02', name: 'GRIDMESH', desc: 'Service mesh for 50 services', tags: 'Go · gRPC · Envoy' },
              { num: '03', name: 'VAULTDB', desc: 'Multi-tenant DB proxy', tags: 'Go · PostgreSQL' },
            ].map((p, i) => (
              <div key={p.name} style={{ padding: '28px 28px', borderLeft: i > 0 ? '2px solid #111' : 'none', cursor: 'pointer' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#dc2626', letterSpacing: '0.15em', marginBottom: 12 }}>{p.num}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#111', letterSpacing: '-0.02em', marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: '#555', marginBottom: 8 }}>{p.desc}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.08em' }}>{p.tags}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────── */
/*  THEME 3 — Aurora / Glassmorphism                           */
/* ─────────────────────────────────────────────────────────── */
function ThemeAurora() {
  return (
    <section id="aurora" style={{ minHeight: '100vh', background: '#070714', fontFamily: 'var(--font-geist-sans), Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Aurora blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.2), transparent 70%)', top: '-200px', left: '-100px', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)', top: '100px', right: '-100px', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%)', bottom: '0', left: '30%', filter: 'blur(100px)' }} />
      </div>

      {/* Nav */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 48px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Prakhar<span style={{ color: '#a78bfa' }}>.</span></span>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Work', 'Skills', 'Experience', 'Contact'].map(l => (
            <span key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
        <div style={{ padding: '8px 20px', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.35)', borderRadius: 999, fontSize: 12, fontWeight: 600, color: '#a78bfa', cursor: 'pointer' }}>Open to work</div>
      </div>

      {/* Hero */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 950, margin: '0 auto', padding: '90px 48px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '6px 16px', marginBottom: 40, backdropFilter: 'blur(10px)' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>BACKEND · DISTRIBUTED SYSTEMS · INDIA</span>
        </div>

        <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 800, lineHeight: 1.05, color: '#fff', letterSpacing: '-0.03em', marginBottom: 24 }}>
          I build systems that
          <br />
          <span style={{ color: 'transparent', backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
            never stop running.
          </span>
        </h1>

        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 48px' }}>
          Senior SDE focused on distributed systems, event streaming, and cloud infrastructure.
          Go · Kafka · Kubernetes · AWS.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 80 }}>
          <div style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #a78bfa, #06b6d4)', borderRadius: 10, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>View my work →</div>
          <div style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 14, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>Get in touch</div>
        </div>

        {/* Glass cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { name: 'HYPERSTREAM', metric: '2M events/sec', desc: 'Real-time event processing pipeline', tech: 'Go · Kafka · K8s', color: '#a78bfa' },
            { name: 'GRIDMESH', metric: '50+ services', desc: 'Service mesh orchestration platform', tech: 'Go · gRPC · Envoy', color: '#06b6d4' },
            { name: 'VAULTDB', metric: '40% cost cut', desc: 'Multi-tenant database proxy layer', tech: 'Go · PostgreSQL', color: '#ec4899' },
          ].map(p => (
            <div key={p.name} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px', backdropFilter: 'blur(16px)', textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: '0.08em', marginBottom: 8 }}>{p.metric}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em' }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5, marginBottom: 12 }}>{p.desc}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {p.tech.split(' · ').map(t => (
                  <span key={t} style={{ fontSize: 10, padding: '3px 8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, color: 'rgba(255,255,255,0.4)' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 56, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {[['5+', 'Years'], ['10M+', 'Events/day'], ['20+', 'Systems'], ['99.99%', 'Uptime']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{v}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────── */
/*  THEME 4 — Monochrome                                       */
/* ─────────────────────────────────────────────────────────── */
function ThemeMono() {
  return (
    <section id="mono" style={{ minHeight: '100vh', background: '#000', fontFamily: 'var(--font-geist-sans), Inter, sans-serif', color: '#fff' }}>
      {/* Nav */}
      <div style={{ padding: '0 48px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Prakhar — SDE</span>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Work', 'Experience', 'Contact'].map(l => (
            <span key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 48px' }}>
        {/* Giant asymmetric layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
          <div>
            {/* Role tag */}
            <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 24 }}>
              Senior Software Engineer · Backend · India
            </div>

            {/* Massive name */}
            <h1 style={{ fontSize: 'clamp(5rem, 12vw, 10rem)', fontWeight: 900, lineHeight: 0.9, color: '#fff', letterSpacing: '-0.04em', marginBottom: 40 }}>
              PRAKHAR
            </h1>

            <p style={{ fontSize: 20, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 480, marginBottom: 48 }}>
              I design and build distributed systems that handle millions of events at scale.
              Five years. Twenty systems. Zero downtime.
            </p>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ padding: '14px 32px', background: '#fff', fontSize: 13, fontWeight: 700, color: '#000', cursor: 'pointer', letterSpacing: '0.02em' }}>View work</div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2 }}>Download CV →</span>
            </div>
          </div>

          {/* Right: vertical stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 48, minWidth: 180 }}>
            {[['5+', 'Years experience'], ['10M+', 'Events per day'], ['20+', 'Systems built'], ['99.99%', 'Uptime SLA']].map(([v, l]) => (
              <div key={l} style={{ paddingBottom: 28, marginBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 6, letterSpacing: '0.04em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal project list */}
        <div style={{ marginTop: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { num: '01', name: 'Hyperstream', desc: '2M events/sec · Go · Kafka · K8s', year: '2024' },
              { num: '02', name: 'Gridmesh', desc: '50 services · gRPC · Envoy · Go', year: '2023' },
              { num: '03', name: 'VaultDB', desc: 'DB proxy · Go · PostgreSQL · Redis', year: '2022' },
            ].map((p, i) => (
              <div key={p.name} style={{ padding: '32px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontWeight: 500 }}>{p.num}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{p.year}</span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────── */
/*  PICKER PAGE                                                 */
/* ─────────────────────────────────────────────────────────── */
export default function ThemePicker() {
  const [active, setActive] = useState('linear')

  const scrollTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const ios = THEMES.map(t => {
      const el = document.getElementById(t.id)
      if (!el) return null
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(t.id) }, { threshold: 0.5 })
      io.observe(el)
      return io
    })
    return () => ios.forEach(io => io?.disconnect())
  }, [])

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      {/* ── Fixed picker bar ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '0 32px', height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-geist-mono), monospace' }}>
          Theme Picker — Pick one to build →
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => scrollTo(t.id)}
              style={{
                padding: '6px 16px',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.02em',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: active === t.id ? t.color : 'transparent',
                color: active === t.id ? (t.id === 'brutalist' ? '#fff' : '#000') : 'rgba(255,255,255,0.4)',
                boxShadow: active === t.id ? `0 0 16px ${t.color}60` : 'none',
                fontFamily: 'var(--font-geist-sans), sans-serif',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <a href="/" style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textDecoration: 'none', letterSpacing: '0.08em' }}>
          ← Back to portfolio
        </a>
      </div>

      {/* ── Theme sections ── */}
      <div style={{ paddingTop: 52 }}>
        <ThemeLinear />
        <ThemeBrutalist />
        <ThemeAurora />
        <ThemeMono />
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{
        background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 48px',
        textAlign: 'center',
        fontFamily: 'var(--font-geist-sans), sans-serif',
      }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', marginBottom: 20, letterSpacing: '0.04em' }}>
          Chose a theme? Tell me which one and I'll rebuild the full portfolio in that direction.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {THEMES.map(t => (
            <div key={t.id} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 12, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontWeight: 500 }}>
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
