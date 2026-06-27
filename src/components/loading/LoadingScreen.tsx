'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const BOOT_MESSAGES = [
  'INITIALIZING CORE SYSTEMS...',
  'LOADING NEURAL INTERFACE...',
  'CALIBRATING HUD OVERLAY...',
  'ESTABLISHING SECURE CONNECTION...',
  'DECRYPTING PROJECT MANIFESTS...',
  'ALL SYSTEMS NOMINAL.',
]

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const progressRef   = useRef<HTMLDivElement>(null)
  const percentRef    = useRef<HTMLSpanElement>(null)
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const tl = gsap.timeline()

    // Stagger boot messages
    BOOT_MESSAGES.forEach((msg, i) => {
      tl.call(() => setMessages(prev => [...prev, msg]), undefined, i * 0.38)
    })

    // Progress bar + percent counter
    tl.to(
      {},
      {
        duration: BOOT_MESSAGES.length * 0.38 + 0.2,
        onUpdate() {
          const pct = Math.round(this.progress() * 100)
          if (percentRef.current) percentRef.current.textContent = String(pct).padStart(3, '0')
          if (progressRef.current) progressRef.current.style.width = `${pct}%`
        },
      },
      0,
    )

    // Exit animation
    tl.to(containerRef.current, {
      clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
      duration: 0.7,
      ease: 'power3.inOut',
      delay: 0.4,
      onComplete,
    })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#05050a', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Arc reactor SVG */}
      <div className="relative mb-10">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          {/* Outer ring */}
          <circle
            cx="60" cy="60" r="54"
            stroke="#00d4ff" strokeWidth="1" opacity="0.3"
          />
          {/* Animated ring */}
          <circle
            cx="60" cy="60" r="48"
            stroke="#00d4ff" strokeWidth="1.5"
            strokeDasharray="600"
            strokeDashoffset="600"
            strokeLinecap="round"
            style={{ animation: 'draw-arc 1.4s ease-out forwards' }}
          />
          {/* Middle ring */}
          <circle
            cx="60" cy="60" r="36"
            stroke="#7b2ff7" strokeWidth="1"
            strokeDasharray="300"
            strokeDashoffset="300"
            style={{ animation: 'draw-arc 1.1s 0.3s ease-out forwards' }}
          />
          {/* Triangle blades */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <line
              key={i}
              x1="60" y1="60"
              x2={60 + 30 * Math.cos((deg * Math.PI) / 180)}
              y2={60 + 30 * Math.sin((deg * Math.PI) / 180)}
              stroke="#00d4ff" strokeWidth="1" opacity="0.6"
              strokeDasharray="30"
              strokeDashoffset="30"
              style={{ animation: `draw-arc 0.5s ${0.8 + i * 0.08}s ease-out forwards` }}
            />
          ))}
          {/* Core */}
          <circle cx="60" cy="60" r="8" fill="none" stroke="#00d4ff" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="4" fill="#00d4ff" opacity="0.9" />
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
        </svg>
        {/* Pulse rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-full border border-arc/20 animate-[pulse-ring_2s_ease-out_infinite]" />
          <div className="absolute w-24 h-24 rounded-full border border-arc/10 animate-[pulse-ring_2s_0.7s_ease-out_infinite]" />
        </div>
      </div>

      {/* Title */}
      <div className="font-mono text-arc text-xs tracking-[0.4em] mb-6 text-glow-arc">
        PRAKHAR.DEV / PORTFOLIO_v2.0
      </div>

      {/* Boot messages */}
      <div className="font-mono text-[11px] text-dim tracking-wider space-y-1 mb-8 w-80">
        {messages.map((msg, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-arc opacity-60">{'>'}</span>
            <span className={i === messages.length - 1 ? 'text-text' : 'text-muted'}>
              {msg}
            </span>
          </div>
        ))}
        {messages.length > 0 && messages.length < BOOT_MESSAGES.length && (
          <div className="flex items-center gap-2">
            <span className="text-arc opacity-60">{'>'}</span>
            <span className="terminal-caret" />
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-80">
        <div className="flex justify-between font-mono text-[10px] text-muted mb-1.5">
          <span>LOADING</span>
          <span ref={percentRef} className="text-arc">000</span>
        </div>
        <div className="h-[2px] bg-surface rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-arc rounded-full transition-none"
            style={{ width: '0%', boxShadow: '0 0 8px #00d4ff' }}
          />
        </div>
      </div>
    </div>
  )
}
