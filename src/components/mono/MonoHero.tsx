'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '@/hooks/useTheme'
import { useIsMobile } from '@/hooks/useIsMobile'
import { stats } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

function useMagnetic(ref: React.RefObject<HTMLElement | null>, strength = 0.35) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      gsap.to(el, {
        x: (e.clientX - r.left - r.width / 2) * strength,
        y: (e.clientY - r.top - r.height / 2) * strength,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [ref, strength])
}

export default function MonoHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const btn1Ref = useRef<HTMLButtonElement>(null)
  const btn2Ref = useRef<HTMLButtonElement>(null)
  const { theme } = useTheme()
  const isMobile = useIsMobile()

  useMagnetic(btn1Ref)
  useMagnetic(btn2Ref)

  const statTargets = stats.map(s => parseFloat(s.value.replace(/[^\d.]/g, '')))
  const statSuffixes = stats.map(s => s.value.replace(/[\d.]+/g, ''))
  const [statCounts, setStatCounts] = useState(statTargets.map(() => 0))

  useEffect(() => {
    if (!isMobile) { setStatCounts(statTargets.map(() => 0)); return }
    let rafId: number
    const start = performance.now()
    const duration = 1200
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setStatCounts(statTargets.map(t => Math.round(t * p)))
      if (p < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isMobile])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(labelRef.current, { y: -20, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(
          nameRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power4.inOut' },
          '-=0.1'
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.7, ease: 'power3.inOut' },
          '-=0.4'
        )
        .from([subRef.current, ctaRef.current], { y: 28, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out' }, '-=0.2')
        .from(scrollRef.current, { opacity: 0, duration: 0.5 }, '-=0.2')

      gsap.to(nameRef.current, {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: isMobile ? 'auto' : '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'flex-start' : 'flex-end',
        padding: isMobile ? '84px 16px 22px' : '0 48px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        ref={labelRef}
        style={{
          position: 'absolute',
          top: isMobile ? 76 : 32,
          left: isMobile ? 16 : 48,
          right: isMobile ? 16 : 'auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 10 : 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: theme === 'light' ? '#dc2626' : 'var(--t1)',
              animation: 'blink 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontSize: 11,
              color: 'var(--t3)',
              letterSpacing: '0.14em',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
            }}
          >
            Available for work
          </span>
        </div>
        <div style={{ width: isMobile ? 28 : 1, height: isMobile ? 1 : 12, background: 'var(--b1)' }} />
        <span
          style={{
            fontSize: 11,
            color: 'var(--t4)',
            letterSpacing: '0.14em',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            maxWidth: isMobile ? 250 : 'none',
            lineHeight: 1.5,
          }}
        >
          Software Engineer - Java & Spring Boot
        </span>
      </div>

      <div ref={nameRef} style={{ willChange: 'clip-path, transform' }}>
        <h1
          style={{
            fontSize: isMobile ? 'clamp(4.25rem, 18vw, 5.4rem)' : 'clamp(5.5rem, 15vw, 13rem)',
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: '-0.04em',
            color: 'var(--t1)',
            transition: 'color 0.35s',
            marginTop: isMobile ? 18 : 0,
          }}
        >
          PRAKHAR
        </h1>
      </div>

      <div
        ref={lineRef}
        style={{
          height: 1,
          background: 'var(--b1)',
          margin: isMobile ? '14px 0 16px' : '28px 0',
          transition: 'background 0.35s',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'flex-end',
          justifyContent: 'space-between',
          gap: isMobile ? 24 : 40,
        }}
      >
        <div ref={subRef} style={{ maxWidth: 500 }}>
          <p
            style={{
              fontSize: isMobile ? '1rem' : 'clamp(1rem, 1.8vw, 1.2rem)',
              color: 'var(--t2)',
              lineHeight: 1.65,
              fontWeight: 300,
              transition: 'color 0.35s',
            }}
          >
            I build scalable backend applications - Kafka-based event pipelines,
            Elasticsearch-powered search, and Spring Boot services that ship.
          </p>
          {isMobile && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, marginTop: 20 }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{ padding: '16px 0' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#dc2626', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 4 }}>
                    {Math.round(statCounts[i])}{statSuffixes[i]}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--t3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {s.label.replace(/_/g, ' ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'row',
            gap: 12,
            flexShrink: 0,
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <button
            ref={btn1Ref}
            onClick={() => scrollTo('work')}
            data-cursor
            style={{
              padding: '14px 32px',
              flex: isMobile ? 1 : 'none',
              background: 'var(--btn-bg)',
              color: 'var(--btn-text)',
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'all 0.35s',
            }}
          >
            View work
          </button>
          <button
            ref={btn2Ref}
            onClick={() => scrollTo('contact')}
            data-cursor
            style={{
              padding: '14px 32px',
              flex: isMobile ? 1 : 'none',
              background: 'transparent',
              color: 'var(--t3)',
              fontSize: 13,
              fontWeight: 500,
              border: '1px solid var(--b2)',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'all 0.35s',
            }}
          >
            Contact
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: isMobile ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 10, color: 'var(--t4)', letterSpacing: '0.2em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--b2), transparent)', animation: 'scroll-down 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}
