'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MonoCursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const vis  = useRef(false)

  useEffect(() => {
    gsap.set([dot.current, ring.current], { opacity: 0 })

    const move = (e: MouseEvent) => {
      if (!vis.current) {
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 })
        vis.current = true
      }
      gsap.to(dot.current,  { x: e.clientX, y: e.clientY, duration: 0.03, ease: 'none' })
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.14, ease: 'power2.out' })
    }

    const enterBtn = () => gsap.to(ring.current, { scale: 2.2, duration: 0.3 })
    const leaveBtn = () => gsap.to(ring.current, { scale: 1,   duration: 0.3 })
    const down     = () => gsap.to(ring.current, { scale: 0.8, duration: 0.15 })
    const up       = () => gsap.to(ring.current, { scale: 1,   duration: 0.2 })

    document.addEventListener('mousemove',  move)
    document.addEventListener('mousedown',  down)
    document.addEventListener('mouseup',    up)

    const bind = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', enterBtn)
        el.addEventListener('mouseleave', leaveBtn)
      })
    }
    bind()
    const obs = new MutationObserver(bind)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup',   up)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dot}  className="c-dot"  />
      <div ref={ring} className="c-ring" />
    </>
  )
}
