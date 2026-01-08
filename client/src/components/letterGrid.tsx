import { useEffect, useRef } from 'react'

interface LetterGridProps {
  dark: boolean
}

export function LetterGrid({ dark }: LetterGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return

    const ctx = canvas.getContext('2d')
    if (ctx === null) return

    const CELL = 40
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    const paletteDark = ['#8b5cf6', '#22d3ee', '#e5e7eb']
    const paletteLight = ['#6366f1', '#0ea5e9', '#111827']

    let rafId: number | null = null
    let frame = 0

    const UPDATE_EVERY = 10
    const NEAR_CHANCE = 0.06
    const FAR_CHANCE = 0.003

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      frame++
      console.log('drawing')

      // only mutate content occasionally
      if (frame % UPDATE_EVERY !== 0) return

      // 🧊 soft fade instead of hard clear (trail effect)
      ctx.fillStyle = dark
        ? 'rgba(0, 0, 0, 0.18)'
        : 'rgba(255, 255, 255, 0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let x = 0; x < canvas.width; x += CELL) {
        for (let y = 0; y < canvas.height; y += CELL) {
          const cx = x + CELL / 2
          const cy = y + CELL / 2

          const dist = Math.hypot(
            cx - canvas.width / 2,
            cy - canvas.height / 2
          )

          const chance = dist < 200 ? NEAR_CHANCE : FAR_CHANCE
          if (Math.random() > chance) continue

          const char =
            letters[Math.floor(Math.random() * letters.length)]

          const palette = dark ? paletteDark : paletteLight

          ctx.fillStyle =
            palette[Math.floor(Math.random() * palette.length)]
          ctx.font = '12px monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(char, cx, cy)
        }
      }
    }

    const animate = () => {
      console.log('drawing')
      draw()
      rafId = requestAnimationFrame(animate)
    }

    // const timeoutId = setTimeout(() => {
    //   animate()
    // }, 50)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      // clearTimeout(timeoutId)
      window.removeEventListener('resize', resize)
    }
  }, [dark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[100]"
    />
  )
}
