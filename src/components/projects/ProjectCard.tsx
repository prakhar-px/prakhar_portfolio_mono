'use client'
import { useRef } from 'react'
import gsap from 'gsap'

interface Project {
  id: string; name: string; tagline: string; description: string
  tech: string[]; github: string; live: string; status: string; metric: string
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const glowRef  = useRef<HTMLDivElement>(null)
  const isPlasma = index === 1

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r  = cardRef.current!.getBoundingClientRect()
    const x  = e.clientX - r.left
    const y  = e.clientY - r.top
    gsap.to(cardRef.current, {
      rotateX: ((y - r.height / 2) / r.height) * -8,
      rotateY: ((x - r.width  / 2) / r.width ) *  8,
      transformPerspective: 1000,
      duration: 0.4, ease: 'power2.out',
    })
    gsap.to(glowRef.current, { x: x - 120, y: y - 120, opacity: 1, duration: 0.3 })
  }

  const onLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' })
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 })
  }

  return (
    <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}
      className="project-card relative rounded-sm overflow-hidden group cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        background: isPlasma ? 'rgba(15,10,30,0.9)' : 'rgba(10,10,26,0.85)',
        border: `1px solid ${isPlasma ? 'rgba(123,47,247,0.25)' : 'rgba(0,212,255,0.14)'}`,
        boxShadow: isPlasma ? '0 0 40px rgba(123,47,247,0.08)' : '0 0 30px rgba(0,212,255,0.05)',
      }}>

      {/* Mouse-follow spotlight */}
      <div ref={glowRef} className="absolute w-60 h-60 rounded-full pointer-events-none opacity-0"
        style={{ background: `radial-gradient(circle, ${isPlasma ? 'rgba(123,47,247,0.12)' : 'rgba(0,212,255,0.1)'}, transparent 70%)` }} />

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3.5"
        style={{ borderBottom: `1px solid ${isPlasma ? 'rgba(123,47,247,0.15)' : 'rgba(0,212,255,0.1)'}` }}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em]"
            style={{ color: isPlasma ? 'rgba(123,47,247,0.6)' : 'rgba(0,212,255,0.5)' }}>
            PROJ_{project.id}
          </span>
          <div className="w-1.5 h-1.5 rounded-full"
            style={{
              background: isPlasma ? '#7b2ff7' : '#00d4ff',
              boxShadow: `0 0 8px ${isPlasma ? '#7b2ff7' : '#00d4ff'}`,
              animation: 'glow-pulse 2s ease-in-out infinite',
            }} />
        </div>
        <span className="font-mono text-[9px] tracking-widest px-2.5 py-1"
          style={{
            color:       isPlasma ? '#7b2ff7' : '#00d4ff',
            background:  isPlasma ? 'rgba(123,47,247,0.08)' : 'rgba(0,212,255,0.07)',
            border:      `1px solid ${isPlasma ? 'rgba(123,47,247,0.3)' : 'rgba(0,212,255,0.25)'}`,
          }}>
          {project.status}
        </span>
      </div>

      <div className="p-6">
        {/* Metric */}
        <div className="font-mono text-[10px] tracking-[0.2em] mb-3"
          style={{ color: isPlasma ? 'rgba(123,47,247,0.8)' : 'rgba(0,212,255,0.7)' }}>
          ◆ {project.metric}
        </div>

        {/* Name */}
        <h3 className="font-mono font-black text-2xl tracking-widest mb-1 transition-all duration-300"
          style={{ color: '#e2e8f0' }}
          onMouseEnter={e => (e.currentTarget.style.color = isPlasma ? '#7b2ff7' : '#00d4ff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#e2e8f0')}>
          {project.name}
        </h3>
        <p className="font-mono text-xs text-muted/60 tracking-wider mb-4">{project.tagline}</p>

        {/* Description */}
        <p className="text-sm text-dim/80 leading-relaxed mb-5">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map(t => (
            <span key={t} className="font-mono text-[10px] tracking-wider px-2.5 py-1"
              style={{
                background: 'rgba(0,212,255,0.03)',
                border: `1px solid ${isPlasma ? 'rgba(123,47,247,0.15)' : 'rgba(0,212,255,0.12)'}`,
                color: '#64748b',
              }}>
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a href={project.github} data-hover
            className="font-mono text-[11px] tracking-[0.18em] hover:text-arc transition-colors duration-200"
            style={{ color: '#64748b' }}>
            [ GITHUB ]
          </a>
          {project.live !== '#' && (
            <a href={project.live} data-hover
              className="font-mono text-[11px] tracking-[0.18em] hover:text-arc transition-colors duration-200"
              style={{ color: '#64748b' }}>
              [ LIVE ]
            </a>
          )}
        </div>
      </div>

      {/* Bottom glow line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg, transparent, ${isPlasma ? '#7b2ff7' : '#00d4ff'}, transparent)` }} />
    </div>
  )
}
