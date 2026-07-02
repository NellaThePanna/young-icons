'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // autoRaf: false — Lenis does not run its own requestAnimationFrame loop.
    // GSAP's ticker drives both Lenis and ScrollTrigger in a single RAF loop,
    // preventing the scroll/animation desync described in LESSONS.md Category B.
    const lenis = new Lenis({ autoRaf: false })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
