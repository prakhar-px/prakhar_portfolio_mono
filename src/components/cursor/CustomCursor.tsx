'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const isVisible = useRef(false)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Hide until first move
    gsap.set([dot, ring], { opacity: 0 })

    const onMove = (e: MouseEvent) => {
      if (!isVisible.current) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
        isVisible.current = true
      }
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power2.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' })
    }

    const onEnterLink = () => {
      gsap.to(ring, { scale: 1.7, borderColor: '#00d4ff', opacity: 0.9, duration: 0.25 })
      gsap.to(dot,  { scale: 0.4, duration: 0.2 })
    }
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(0,212,255,0.5)', opacity: 1, duration: 0.25 })
      gsap.to(dot,  { scale: 1, duration: 0.2 })
    }
    const onMouseDown = () => gsap.to(ring, { scale: 0.85, duration: 0.1 })
    const onMouseUp   = () => gsap.to(ring, { scale: 1,    duration: 0.15 })

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup',   onMouseUp)

    const bindLinks = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }
    bindLinks()

    const observer = new MutationObserver(bindLinks)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup',   onMouseUp)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
