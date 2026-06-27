'use client'

import Link from 'next/link'
import { ThemeProvider } from '@/context/ThemeContext'
import { useLenis } from '@/hooks/useLenis'
import ThemeToggle from '@/components/mono/ThemeToggle'
import MonoSkillsHighlight from '@/components/mono/MonoSkillsHighlight'
import MonoSkillCloud from '@/components/mono/MonoSkillCloud'
import MonoSkillConstellation from '@/components/mono/MonoSkillConstellation'
import MonoSkillPills from '@/components/mono/MonoSkillPills'
import MonoSkillTypewriter from '@/components/mono/MonoSkillTypewriter'
import MonoSkillOrbit from '@/components/mono/MonoSkillOrbit'
import MonoSkillBento from '@/components/mono/MonoSkillBento'
import MonoSkillDialContext from '@/components/mono/MonoSkillDialContext'

function SkillsArchive() {
  useLenis()

  return (
    <div className="noise">
      <ThemeToggle />

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          borderBottom: '1px solid var(--b1)',
          background: 'var(--bg-nav)',
          backdropFilter: 'blur(20px)',
          transition: 'background 0.35s ease, border-color 0.35s ease',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            minHeight: 56,
            padding: '0 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: '#dc2626',
                letterSpacing: '0.18em',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Secondary / Skills
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--t1)',
              }}
            >
              Skill Explorations
            </div>
          </div>

          <Link
            href="/"
            style={{
              fontSize: 13,
              color: 'var(--t2)',
              textDecoration: 'none',
              borderBottom: '2px solid #dc2626',
              paddingBottom: 2,
            }}
          >
            Back Home
          </Link>
        </div>
      </header>

      <main>
        <section style={{ padding: '72px 48px 24px', borderBottom: '1px solid var(--b1)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p
              style={{
                maxWidth: 720,
                margin: 0,
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.7,
                color: 'var(--t2)',
              }}
            >
              This page keeps the alternate skills explorations together while the homepage focuses on the
              final mechanical dial.
            </p>
          </div>
        </section>

        <MonoSkillsHighlight />
        <MonoSkillCloud />
        <MonoSkillConstellation />
        <MonoSkillPills />
        <MonoSkillTypewriter />
        <MonoSkillOrbit />
        <MonoSkillBento />
        <MonoSkillDialContext />
      </main>
    </div>
  )
}

export default function SkillsPage() {
  return (
    <ThemeProvider>
      <SkillsArchive />
    </ThemeProvider>
  )
}
