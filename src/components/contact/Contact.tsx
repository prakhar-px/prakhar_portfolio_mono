'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

type Status = 'idle' | 'sending' | 'sent'

export default function Contact() {
  const ref  = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [focused, setFocused] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-left', {
        opacity: 0, x: -50, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
      gsap.from('.contact-right', {
        opacity: 0, x: 50, duration: 0.9, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const send = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('sending')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
    setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }) }, 5000)
  }

  const inputStyle = (field: string) => ({
    background: 'transparent',
    borderBottom: `1px solid ${focused === field ? '#00d4ff' : 'rgba(0,212,255,0.12)'}`,
    transition: 'border-color 0.3s',
  })

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden" style={{ background: '#03030a' }}>
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent)' }} />

      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.04), transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative max-w-6xl mx-auto px-6 md:px-16">
        <div className="flex items-center gap-4 mb-20">
          <span className="font-mono text-[10px] text-arc/50 tracking-[0.4em]">[ 005 ]</span>
          <div className="h-px w-8 bg-arc/30" />
          <h2 className="font-mono text-3xl font-black tracking-widest">
            CONTACT<span className="text-glow-arc text-arc">_</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div className="contact-left space-y-10">
            <div>
              <h3 className="font-mono font-black leading-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                LET'S BUILD
                <br />
                <span className="gradient-text">SOMETHING GREAT.</span>
              </h3>
              <p className="text-dim/80 text-sm leading-relaxed max-w-sm">
                Open to senior and staff SDE roles, distributed systems consulting, and
                interesting backend challenges. I respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'EMAIL', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { label: 'GITHUB', value: 'github.com/prakhar', href: personalInfo.github },
                { label: 'LINKEDIN', value: 'linkedin.com/in/prakhar', href: personalInfo.linkedin },
                { label: 'LOCATION', value: `${personalInfo.location} — Remote OK`, href: null },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="font-mono text-[9px] text-muted/40 tracking-[0.3em] w-20 shrink-0">{item.label}</span>
                  <div className="h-px w-4 bg-arc/20" />
                  {item.href
                    ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer" data-hover
                        className="font-mono text-xs text-muted/70 hover:text-arc transition-colors duration-200 tracking-wide">
                        {item.value}
                      </a>
                    : <span className="font-mono text-xs text-muted/60 tracking-wide">{item.value}</span>
                  }
                </div>
              ))}
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-3 glass-bright rounded-sm px-5 py-3.5">
              <div className="w-2.5 h-2.5 rounded-full bg-arc" style={{ boxShadow: '0 0 10px #00d4ff', animation: 'glow-pulse 1.5s ease-in-out infinite' }} />
              <span className="font-mono text-xs text-arc/90 tracking-[0.18em]">ACTIVELY OPEN TO WORK</span>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-right">
            <div className="glass-bright rounded-sm hud-corners glow-arc p-8">
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-arc flex items-center justify-center"
                    style={{ boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}>
                    <span className="text-arc text-2xl">✓</span>
                  </div>
                  <div>
                    <p className="font-mono text-arc tracking-[0.25em] mb-1">SIGNAL RECEIVED</p>
                    <p className="font-mono text-xs text-muted/50 tracking-wider">I'll respond within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={send} className="space-y-7">
                  <p className="font-mono text-[10px] text-muted/40 tracking-[0.3em] border-b border-arc/8 pb-4 mb-6">
                    ENCRYPTED CHANNEL · DIRECT LINE
                  </p>

                  {[
                    { key: 'name',    label: 'YOUR NAME',    type: 'text',  placeholder: 'Name' },
                    { key: 'email',   label: 'EMAIL ADDRESS', type: 'email', placeholder: 'email@domain.com' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="section-label block mb-2">{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder}
                        value={form[f.key as 'name' | 'email']}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        onFocus={() => setFocused(f.key)} onBlur={() => setFocused('')}
                        className="w-full font-mono text-sm text-text tracking-wide py-3 outline-none placeholder:text-muted/25"
                        style={inputStyle(f.key)} />
                    </div>
                  ))}

                  <div>
                    <label className="section-label block mb-2">MESSAGE</label>
                    <textarea required rows={4} placeholder="Describe your project or opportunity..."
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                      className="w-full font-mono text-sm text-text tracking-wide py-3 outline-none resize-none placeholder:text-muted/25"
                      style={inputStyle('message')} />
                  </div>

                  <button type="submit" disabled={status === 'sending'} data-hover
                    className="group relative w-full font-mono text-xs tracking-[0.3em] py-4 overflow-hidden transition-all duration-300 disabled:opacity-50"
                    style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.4)', color: '#00d4ff' }}>
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                      style={{ background: 'rgba(0,212,255,0.1)' }} />
                    <span className="relative">{status === 'sending' ? '[ TRANSMITTING... ]' : '[ SEND MESSAGE ]'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 flex flex-wrap justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(0,212,255,0.06)' }}>
          <span className="font-mono text-[10px] text-muted/25 tracking-widest">PRAKHAR · {new Date().getFullYear()}</span>
          <span className="font-mono text-[10px] text-muted/20 tracking-widest">NEXT.JS · THREE.JS · GSAP</span>
        </div>
      </div>
    </section>
  )
}
