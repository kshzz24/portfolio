import { useEffect, useRef } from 'react'

// 16 vertices of a 4D hypercube — each coord is ±1
const VERTS = Array.from({ length: 16 }, (_, i) => [
  ((i >> 0) & 1) * 2 - 1,
  ((i >> 1) & 1) * 2 - 1,
  ((i >> 2) & 1) * 2 - 1,
  ((i >> 3) & 1) * 2 - 1,
])

// 32 edges — vertices differing in exactly one coordinate
const EDGES = []
for (let i = 0; i < 16; i++) {
  for (let j = i + 1; j < 16; j++) {
    const xor = i ^ j
    if (xor !== 0 && (xor & (xor - 1)) === 0) EDGES.push([i, j])
  }
}

function rotate4D(v, a1, a2) {
  let [x, y, z, w] = v
  // XW plane rotation
  const c1 = Math.cos(a1), s1 = Math.sin(a1)
  ;[x, w] = [x * c1 - w * s1, x * s1 + w * c1]
  // YZ plane rotation
  const c2 = Math.cos(a2), s2 = Math.sin(a2)
  ;[y, z] = [y * c2 - z * s2, y * s2 + z * c2]
  return [x, y, z, w]
}

function projectVert(v, scale, cx, cy) {
  let [x, y, z, w] = v
  const d4 = 2.5 - w          // 4D perspective distance
  x = x / d4; y = y / d4; z = z / d4
  const d3 = 3.5 - z * 0.28  // 3D perspective distance
  return {
    px: (x / d3) * scale + cx,
    py: (y / d3) * scale + cy,
    depth: (z + 1) / 2,       // normalized 0–1
  }
}

function drawTesseract(ctx, cx, cy, scale, angle, alpha, lineW = 0.8) {
  const a2 = angle * 0.6180339887 // golden ratio — avoids repetition
  const pts = VERTS.map(v => projectVert(rotate4D(v, angle, a2), scale, cx, cy))

  ctx.lineWidth = lineW
  EDGES.forEach(([i, j]) => {
    const p1 = pts[i], p2 = pts[j]
    const d = ((p1.depth + p2.depth) / 2) * 0.72 + 0.15
    ctx.beginPath()
    ctx.strokeStyle = `rgba(0, 212, 170, ${d * alpha})`
    ctx.moveTo(p1.px, p1.py)
    ctx.lineTo(p2.px, p2.py)
    ctx.stroke()
  })

  pts.forEach(p => {
    ctx.beginPath()
    ctx.fillStyle = `rgba(0, 212, 170, ${(p.depth * 0.85 + 0.15) * alpha * 1.3})`
    ctx.arc(p.px, p.py, lineW * 1.5, 0, Math.PI * 2)
    ctx.fill()
  })
}

/**
 * TesseractCanvas
 * mode="tunnel" → infinite tunnel of spinning tesseracts (hero bg)
 * mode="single" → one large centered spinning tesseract (contact)
 */
export default function TesseractCanvas({ className, style, mode = 'tunnel' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId
    let globalAngle = 0

    // DPR-aware sizing
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas)

    // Tunnel: N tesseracts at staggered depths
    const N = 10
    const tunnel = Array.from({ length: N }, (_, i) => ({
      t: i / N,   // 0 = far, 1 = near
      phase: (i / N) * Math.PI * 2,
    }))

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const cx = w / 2
      const cy = h / 2
      const base = Math.min(w, h)

      ctx.clearRect(0, 0, w, h)

      // Soft radial glow at vanishing point
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.5)
      grd.addColorStop(0, 'rgba(0, 212, 170, 0.05)')
      grd.addColorStop(0.5, 'rgba(0, 212, 170, 0.01)')
      grd.addColorStop(1, 'rgba(0, 212, 170, 0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, w, h)

      if (mode === 'tunnel') {
        // Draw far-to-near so closer ones paint on top
        const sorted = [...tunnel].sort((a, b) => a.t - b.t)
        sorted.forEach(item => {
          const scale = Math.pow(item.t, 1.55) * base * 0.44
          const alpha = Math.pow(item.t, 0.6) * 0.48
          if (scale > 5 && alpha > 0.018) {
            drawTesseract(ctx, cx, cy, scale, globalAngle + item.phase, alpha)
          }
          item.t += 0.0021
          if (item.t >= 1.08) item.t = 0
        })
      } else {
        // Single: large, slow rotation, glowing
        const scale = base * 0.34
        drawTesseract(ctx, cx, cy, scale, globalAngle, 0.62, 1.1)

        // Add a second faint outer ring at 1.5× scale for depth
        drawTesseract(ctx, cx, cy, scale * 1.55, globalAngle * 0.5, 0.12, 0.5)
      }

      globalAngle += 0.0048
      rafId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [mode])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
