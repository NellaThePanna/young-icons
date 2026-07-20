"use client"

import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HOME_STATS, PARTNERS_SECTION, HOME_PARTNERS } from "@/content/home"

const LOGO_GROUP_SIZE = 8
const ROTATE_INTERVAL_MS = 4000

function chunk<T>(arr: readonly T[], size: number): T[][] {
  const groups: T[][] = []
  for (let i = 0; i < arr.length; i += size) groups.push(arr.slice(i, i + size) as T[])
  return groups
}

export default function TrustScale() {
  const sectionRef = useRef<HTMLElement>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])
  const logoGroups = chunk(HOME_PARTNERS, LOGO_GROUP_SIZE)
  const [activeGroup, setActiveGroup] = useState(0)

  useEffect(() => {
    if (logoGroups.length <= 1) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => {
      setActiveGroup((g) => (g + 1) % logoGroups.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [logoGroups.length])

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".stat-item, .trust-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 30,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.1,
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
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(counter.val))
              },
              onComplete: () => {
                el.textContent = target + suffix
                gsap.from(el, {
                  scale: 1.3,
                  duration: 0.3,
                  ease: "power2.out",
                })
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

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(255,255,255,0.1)] mb-20">
          {HOME_STATS.map((stat, i) => (
            <div
              key={`${stat.value}-${i}`}
              className="stat-item flex flex-col items-center justify-center text-center px-6 py-10"
            >
              <span
                ref={(el) => { valueRefs.current[i] = el }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
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
              {stat.label && (
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
              )}
            </div>
          ))}
        </div>

        <div className="trust-item mx-auto text-center mb-10" style={{ maxWidth: "780px" }}>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              color: "var(--color-white)",
              textTransform: "uppercase",
              lineHeight: 1.15,
            }}
          >
            {PARTNERS_SECTION.heading}
          </h2>
          <p
            className="mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "640px",
              lineHeight: 1.6,
            }}
          >
            {PARTNERS_SECTION.sub}
          </p>
        </div>

        <div
          className="trust-item relative mx-auto"
          style={{ maxWidth: "1100px", minHeight: "140px" }}
        >
          {logoGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="absolute inset-0 flex flex-wrap items-center justify-center gap-4"
              style={{
                opacity: groupIndex === activeGroup ? 1 : 0,
                transition: "opacity 0.8s ease",
                pointerEvents: groupIndex === activeGroup ? "auto" : "none",
              }}
              aria-hidden={groupIndex !== activeGroup}
            >
              {group.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center whitespace-nowrap rounded-full"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--color-white)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "12px 24px",
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
