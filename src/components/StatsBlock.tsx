"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HOME_STATS } from "@/content/home"

export default function StatsBlock() {
  const sectionRef = useRef<HTMLElement>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".stat-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 30,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.12,
        })

        if (!prefersReduced) {
          HOME_STATS.forEach((stat, i) => {
            if (!stat.isNumeric) return
            const el = valueRefs.current[i]
            const match = stat.value.match(/^(\d+)(.*)$/)
            if (!el || !match) return
            const target = parseInt(match[1], 10)
            const suffix = match[2]
            const counter = { val: 0 }
            gsap.to(counter, {
              val: target,
              duration: 2,
              ease: "power1.out",
              onUpdate: () => {
                el.textContent = Math.round(counter.val) + suffix
              },
            })
          })
        }
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-black)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1280px" }}>
        <p
          className="mb-10 text-center"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.875rem",
            color: "var(--color-academy-green)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          YOUNG ICONS IN NUMBERS
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[rgba(255,255,255,0.1)]">
          {HOME_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item flex flex-col items-center justify-center text-center px-6 py-10"
            >
              <span
                ref={(el) => { valueRefs.current[i] = el }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "clamp(3rem, 6vw, 6rem)",
                  color: "var(--color-white)",
                  lineHeight: 1,
                }}
              >
                {stat.value.split("\n").map((line, lineIndex) => (
                  <span key={lineIndex} className="block">
                    {line}
                  </span>
                ))}
              </span>
              <span
                className="mt-3"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
