'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/data'
import ProjectCard from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0, y: 60, stagger: 0.15, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={ref} className="relative py-32 overflow-hidden" style={{ background: '#03030a' }}>
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)' }} />

      {/* Large decorative text */}
      <div className="absolute bottom-8 right-8 font-mono font-black opacity-[0.025] select-none pointer-events-none leading-none"
        style={{ fontSize: '14vw', color: '#00d4ff' }}>WORK</div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-16">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] text-arc/50 tracking-[0.4em]">[ 003 ]</span>
          <div className="h-px w-8 bg-arc/30" />
          <h2 className="font-mono text-3xl font-black tracking-widest">
            PROJECTS<span className="text-glow-arc text-arc">_</span>
          </h2>
        </div>

        <p className="font-mono text-sm text-muted/50 tracking-wider mb-16 max-w-lg">
          {projects.length} systems shipped to production. Each one solving real scale problems.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
