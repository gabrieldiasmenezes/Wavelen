"use client"

import { useEffect, useRef } from "react"

export function SoundWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = 72
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    // Barras de onda sonora (equalizador)
    const barCount = 7
    const barWidth = 3.5
    const gap = 4
    const totalWidth = barCount * barWidth + (barCount - 1) * gap
    const startX = (size - totalWidth) / 2
    const centerY = size / 2
    const maxHeight = 34
    const minHeight = 7

    // Defasagem de cada barra para um movimento orgânico
    const phases = Array.from({ length: barCount }, (_, i) => i * 0.7)

    let frame = 0
    let raf = 0

    const draw = () => {
      ctx.clearRect(0, 0, size, size)
      frame += 1
      const t = frame * 0.018 // bem lento

      ctx.shadowColor = "#38bdf8"
      ctx.shadowBlur = 8

      for (let i = 0; i < barCount; i++) {
        // Combinação de senos para variar a altura suavemente
        const wave = (Math.sin(t * 2 + phases[i]) + Math.sin(t * 1.3 + phases[i] * 1.7)) / 2
        const h = minHeight + ((wave + 1) / 2) * (maxHeight - minHeight)
        const x = startX + i * (barWidth + gap)
        const y = centerY - h / 2

        ctx.fillStyle = "#38bdf8"
        const r = barWidth / 2
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, h, r)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="relative flex size-18 items-center justify-center">
      {/* Painel squircle com pegada tecnológica */}
      <div
        className="absolute inset-0 rounded-2xl border border-primary"
        style={{
          background: "linear-gradient(150deg, var(--secondary), var(--background))",
        }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="relative"
        style={{ width: 72, height: 72 }}
        role="img"
        aria-label="Onda sonora animada do wavelen"
      />
    </div>
  )
}
