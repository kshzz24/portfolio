import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const squareRef = useRef(null)
  const ringRef   = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return

    const sq   = squareRef.current
    const ring = ringRef.current
    if (!sq || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my
    let rafId

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      sq.style.left = mx + 'px'
      sq.style.top  = my + 'px'
    }

    const onEnter = () => {
      ring.classList.add('hovering')
      sq.classList.add('expanded')
    }
    const onLeave = () => {
      ring.classList.remove('hovering')
      sq.classList.remove('expanded')
    }

    const loop = () => {
      rx += (mx - rx) * 0.10
      ry += (my - ry) * 0.10
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      rafId = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove, { passive: true })

    const els = document.querySelectorAll('a, button, [data-hover]')
    els.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    rafId = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      els.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div ref={squareRef} className="cb-cursor" />
      <div ref={ringRef}   className="cb-cursor-ring" />
    </>
  )
}
