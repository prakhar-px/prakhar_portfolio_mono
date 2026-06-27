'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo } from '@/lib/data'
import { useTheme } from '@/hooks/useTheme'

gsap.registerPlugin(ScrollTrigger)

function useMagnetic(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current; if (!el) return
    const move  = (e: MouseEvent) => { const r = el.getBoundingClientRect(); gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power2.out' }) }
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, [ref])
}

export default function MonoContact() {
  const ref    = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const { theme } = useTheme()
  const [status,  setStatus]  = useState<'idle'|'sending'|'sent'>('idle')
  const [focused, setFocused] = useState('')
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  useMagnetic(btnRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 70%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  const send = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('sending')
    await new Promise(r => setTimeout(r, 1500)); setStatus('sent')
    setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }) }, 5000)
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: `1px solid ${focused === field ? 'var(--t2)' : 'var(--b1)'}`,
    color: 'var(--t1)', fontSize: 15, padding: '12px 0', outline: 'none',
    fontFamily: 'var(--font-sans)', letterSpacing: '-0.01em',
    transition: 'border-color 0.2s, color 0.35s',
  })

  return (
    <section id="contact" ref={ref} style={{ padding: '120px 48px 80px', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <span style={{ fontSize: 11, color: '#dc2626', letterSpacing: '0.18em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: 700, transition: 'color 0.35s' }}>07 / Contact</span>
          <div style={{ flex: 1, height: 1, background: 'var(--b1)', transition: 'background 0.35s' }} />
        </div>

        <div className="contact-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left */}
          <div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--t1)', marginBottom: 32, transition: 'color 0.35s' }}>
              Let's work<br />together.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--t2)', lineHeight: 1.7, marginBottom: 48, maxWidth: 380, transition: 'color 0.35s' }}>
              Open to SDE roles, backend consulting, and interesting engineering problems.
              I respond within 24 hours.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Email',    val: personalInfo.email,                                                                               href: `mailto:${personalInfo.email}` },
                { label: 'GitHub',   val: personalInfo.github.replace('https://', ''),                                                       href: personalInfo.github },
                { label: 'LinkedIn', val: personalInfo.linkedin.replace('https://', ''),                                                     href: personalInfo.linkedin },
                { label: 'LeetCode', val: personalInfo.leetcode.replace('https://', ''),                                                     href: personalInfo.leetcode },
                { label: 'Phone',    val: personalInfo.phone,                                                                                 href: `tel:${personalInfo.phone}` },
                { label: 'Naukri',   val: personalInfo.naukri.replace('https://', ''),                                                        href: personalInfo.naukri },
                { label: 'Location', val: 'Mumbai, India · Remote OK',                                                                        href: null },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <span style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'var(--font-mono)', width: 64, flexShrink: 0, transition: 'color 0.35s' }}>{item.label}</span>
                  <div style={{ width: 24, height: 1, background: 'var(--b1)', flexShrink: 0, transition: 'background 0.35s' }} />
                  {item.href
                    ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" data-cursor
                        style={{ fontSize: 14, color: 'var(--t2)', textDecoration: 'none', borderBottom: '1px solid var(--b1)', paddingBottom: 2, transition: 'all 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--t1)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--t2)')}>
                        {item.val}
                      </a>
                    : <span style={{ fontSize: 14, color: 'var(--t3)', transition: 'color 0.35s' }}>{item.val}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          {status === 'sent' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 40 }}>
              <div style={{ fontSize: 56, fontWeight: 900, color: 'var(--accent)', animation: 'fade-up 0.5s ease' }}>✓</div>
              <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--t1)', transition: 'color 0.35s' }}>Message received.</p>
              <p style={{ fontSize: 14, color: 'var(--t3)', transition: 'color 0.35s' }}>I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={send}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {[{ key: 'name', label: 'Your name', type: 'text', ph: 'Name' }, { key: 'email', label: 'Email address', type: 'email', ph: 'email@domain.com' }].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: 11, color: 'var(--t3)', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8, textTransform: 'uppercase', transition: 'color 0.35s' }}>{f.label}</label>
                    <input type={f.type} required placeholder={f.ph}
                      value={form[f.key as 'name'|'email']}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      onFocus={() => setFocused(f.key)} onBlur={() => setFocused('')}
                      style={inputStyle(f.key)} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 11, color: 'var(--t3)', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8, textTransform: 'uppercase', transition: 'color 0.35s' }}>Message</label>
                  <textarea required rows={4} placeholder="Tell me about your project or role..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    onFocus={() => setFocused('msg')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle('msg'), resize: 'none' }} />
                </div>
                <button ref={btnRef} type="submit" disabled={status === 'sending'} data-cursor
                  style={{ alignSelf: 'flex-start', padding: '14px 40px', background: 'var(--btn-bg)', color: 'var(--btn-text)', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', letterSpacing: '-0.01em', opacity: status === 'sending' ? 0.6 : 1, transition: 'all 0.35s' }}>
                  {status === 'sending' ? 'Sending…' : 'Send message →'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 96, paddingTop: 32, borderTop: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color 0.35s' }}>
          <span style={{ fontSize: 12, color: 'var(--t4)', fontFamily: 'var(--font-mono)', transition: 'color 0.35s' }}>Prakhar · 2026</span>
          <span style={{ fontSize: 12, color: 'var(--t4)', fontFamily: 'var(--font-mono)', transition: 'color 0.35s' }}>Built with Next.js · GSAP</span>
        </div>
      </div>
    </section>
  )
}
