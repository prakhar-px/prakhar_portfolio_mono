'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const RINGS = [
  {
    skills: ['Java', 'Spring Boot', 'Kafka', 'Python', 'C++'],
    radius: 110, speed: 0.18, fontSize: 13, fontWeight: 700,
    color: 'rgba(255,255,255,0.9)', ringStroke: 'rgba(220,38,38,0.2)',
  },
  {
    skills: ['Elasticsearch', 'MySQL', 'MongoDB', 'REST APIs', 'Microservices', 'Docker'],
    radius: 195, speed: -0.10, fontSize: 12, fontWeight: 500,
    color: 'rgba(255,255,255,0.6)', ringStroke: 'rgba(255,255,255,0.07)',
  },
  {
    skills: ['Flask', 'React.js', 'Git/GitHub', 'Linux', 'Postman', 'OOP', 'DSA', 'SQLAlchemy'],
    radius: 285, speed: 0.06, fontSize: 11, fontWeight: 400,
    color: 'rgba(255,255,255,0.35)', ringStroke: 'rgba(255,255,255,0.04)',
  },
]

export default function MonoSkillOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const rafRef    = useRef<number>(0)
  const activeRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1

    const W = 700, H = 620
    canvas.style.width  = W + 'px'
    canvas.style.height = H + 'px'
    canvas.width  = W * dpr
    canvas.height = H * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const cx = W / 2, cy = H / 2
    let t = 0

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Centre pulse
      ctx.beginPath()
      ctx.arc(cx, cy, 6, 0, Math.PI * 2)
      ctx.fillStyle = '#dc2626'
      ctx.fill()

      const pulseFactor = 1 + 0.3 * Math.sin(t * 0.04)
      ctx.beginPath()
      ctx.arc(cx, cy, 14 * pulseFactor, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(220,38,38,0.25)'
      ctx.lineWidth = 1
      ctx.stroke()

      RINGS.forEach(ring => {
        // Draw orbit ring
        ctx.beginPath()
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2)
        ctx.strokeStyle = ring.ringStroke
        ctx.lineWidth = 1
        ctx.stroke()

        const n = ring.skills.length
        ring.skills.forEach((skill, i) => {
          const angle = (i / n) * Math.PI * 2 + t * ring.speed * 0.02
          const x = cx + ring.radius * Math.cos(angle)
          const y = cy + ring.radius * Math.sin(angle)

          // Dot at position
          ctx.beginPath()
          ctx.arc(x, y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = ring.color
          ctx.fill()

          // Label — always upright (no rotation on canvas text)
          ctx.font = `${ring.fontWeight} ${ring.fontSize}px var(--font-mono, monospace)`
          ctx.fillStyle = ring.color
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          // Offset label to avoid overlapping the dot
          const ox = x + (x - cx > 0 ? 26 : -26)
          const oy = y + (y - cy > 0 ? 14 : -14)
          ctx.fillText(skill, ox, oy)
        })
      })

      t++
      rafRef.current = requestAnimationFrame(draw)
    }

    // Only start when in view
    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top 80%',
      onEnter: () => { if (!activeRef.current) { activeRef.current = true; draw() } },
    })

    return () => { cancelAnimationFrame(rafRef.current); st.kill() }
  }, [])

  return (
    <div ref={wrapRef} style={{ padding: '72px 0', borderTop: '1px solid var(--b1)', transition: 'border-color 0.35s' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 36, transition: 'color 0.35s' }}>
          // Layered Orbit System
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  )
}
