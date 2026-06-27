'use client'
import { ThemeProvider } from '@/context/ThemeContext'
import { useLenis }      from '@/hooks/useLenis'
import MonoNav           from '@/components/mono/MonoNav'
import ThemeToggle       from '@/components/mono/ThemeToggle'
import MonoHero          from '@/components/mono/MonoHero'
import MonoAbout         from '@/components/mono/MonoAbout'
import MonoSkills              from '@/components/mono/MonoSkills'
import MonoSkillDial           from '@/components/mono/MonoSkillDial'
import MonoProjects            from '@/components/mono/MonoProjects'
import MonoExperience    from '@/components/mono/MonoExperience'
import MonoEducation     from '@/components/mono/MonoEducation'
import MonoAwards        from '@/components/mono/MonoAwards'
import MonoContact       from '@/components/mono/MonoContact'

function Portfolio() {
  useLenis()
  return (
    <div className="noise">
      <ThemeToggle />
      <MonoNav />
      <MonoHero />
      <MonoAbout />
      <MonoSkills />
      <MonoSkillDial />
      <MonoProjects />
      <MonoExperience />
      <MonoEducation />
      <MonoAwards />
      <MonoContact />
    </div>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  )
}
