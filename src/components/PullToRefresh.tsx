import { useEffect, useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'

const THRESHOLD = 72
const MAX_PULL = 110

export function PullToRefresh({ children }: { children: React.ReactNode }) {
  const [pullY, setPullY] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'pulling' | 'releasing' | 'refreshing'>('idle')
  const startY = useRef<number | null>(null)
  const pullRef = useRef(0)

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (window.scrollY !== 0) return
      startY.current = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (startY.current === null) return
      const dy = e.touches[0].clientY - startY.current
      if (dy <= 0) {
        startY.current = null
        return
      }
      e.preventDefault()
      // Rubber-band: full movement up to threshold, then dampened
      const pull = dy < THRESHOLD ? dy : THRESHOLD + (dy - THRESHOLD) * 0.25
      pullRef.current = Math.min(pull, MAX_PULL)
      setPullY(pullRef.current)
      setPhase('pulling')
    }

    const onTouchEnd = () => {
      if (startY.current === null) return
      startY.current = null
      if (pullRef.current >= THRESHOLD) {
        setPhase('refreshing')
        setPullY(THRESHOLD * 0.75)
        setTimeout(() => window.location.reload(), 600)
      } else {
        setPhase('releasing')
        setPullY(0)
        pullRef.current = 0
        setTimeout(() => setPhase('idle'), 250)
      }
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', onTouchEnd)
    document.addEventListener('touchcancel', onTouchEnd)
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [])

  const animate = phase === 'releasing' || phase === 'refreshing'
  const progress = Math.min(pullY / THRESHOLD, 1)
  const triggered = pullY >= THRESHOLD

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 z-50 flex justify-center"
        style={{
          top: -44,
          transform: `translateY(${pullY}px)`,
          transition: animate ? 'transform 0.25s ease' : 'none',
        }}
      >
        <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ${triggered ? 'text-blue-500' : 'text-gray-400'}`}>
          <RefreshCw
            size={16}
            className={phase === 'refreshing' ? 'animate-spin' : ''}
            style={phase !== 'refreshing' ? { transform: `rotate(${progress * 270}deg)` } : undefined}
          />
        </div>
      </div>
      <div
        style={{
          transform: `translateY(${pullY}px)`,
          transition: animate ? 'transform 0.25s ease' : 'none',
        }}
      >
        {children}
      </div>
    </>
  )
}
