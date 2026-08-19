"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HOME_PARTNERS } from "@/content/home"

const STATS = [
  { value: "45+", label: "EDUCATIONAL\nPARTNERS", isLocation: false },
  { value: "900+", label: "CHILDREN\nEVERY WEEK", isLocation: false },
  { value: "DUBAI +\nABU DHABI", label: "ACROSS THE UAE", isLocation: true },
] as const

export default function TrustScale() {
  const sectionRef = useRef<HTMLElement>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 82%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".trust-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 20,
          duration: prefersReduced ? 0.01 : 0.65,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.08,
        })

        if (!prefersReduced) {
          STATS.forEach((stat, index) => {
            if (stat.isLocation) return
            const element = valueRefs.current[index]
            const target = Number.parseInt(stat.value, 10)
            if (!element || Number.isNaN(target)) return

            const counter = { value: 0 }
            gsap.to(counter, {
              value: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                element.textContent = `${Math.round(counter.value)}+`
              },
            })
          })
        }
      },
    })

    return () => trigger.kill()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section="partner-stats"
      className="px-6 sm:px-10 lg:px-16"
      style={{
        backgroundColor: "var(--color-warm-off-white)",
        paddingTop: "34px",
        paddingBottom: "34px",
      }}
    >
      <div className="mx-auto border-y" style={{ maxWidth: "1280px", borderColor: "rgba(27,27,27,0.12)" }}>
        <div className="grid grid-cols-1 gap-y-9 py-9 md:grid-cols-[minmax(0,2.15fr)_repeat(3,minmax(0,1fr))] md:gap-x-8">
          <div className="trust-item px-0 md:pr-8">
            <p
              className="mb-2 text-xs font-semibold tracking-[0.16em]"
              style={{ color: "var(--color-academy-green)", fontFamily: "var(--font-body)" }}
            >
              TRUSTED ACROSS THE UAE.
            </p>
            <h2
              className="uppercase"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(1.65rem, 2.35vw, 2.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                color: "var(--color-black)",
              }}
            >
              PARTNERING WITH LEADING NURSERIES &amp; SCHOOLS.
            </h2>
          </div>

          {STATS.map((stat, index) => (
            <div key={stat.value} className="trust-item flex flex-col justify-start md:pt-1" style={{ minWidth: 0 }}>
              <span
                ref={(element) => {
                  valueRefs.current[index] = element
                }}
                className="uppercase"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: stat.isLocation ? "clamp(1.65rem, 2.2vw, 2.3rem)" : "clamp(2.3rem, 3.3vw, 3.45rem)",
                  lineHeight: 0.84,
                  letterSpacing: "-0.01em",
                  color: "var(--color-academy-green)",
                  whiteSpace: "pre-line",
                }}
              >
                {stat.value}
              </span>
              <span
                className="mt-2 whitespace-pre-line text-[0.64rem] leading-[1.15] tracking-[0.1em]"
                style={{
                  color: "rgba(27,27,27,0.78)",
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div
          className="grid grid-cols-2 border-t sm:grid-cols-3 lg:grid-cols-6"
          style={{ borderColor: "rgba(27,27,27,0.12)" }}
          aria-label="Young Icons education partners"
        >
          {HOME_PARTNERS.map((partner, index) => (
            <div
              key={partner}
              className="trust-item flex min-h-[78px] items-center justify-center px-4 text-center"
              style={{
                borderRight: index % 6 !== 5 ? "1px solid rgba(27,27,27,0.1)" : undefined,
              }}
            >
              <span
                className="uppercase"
                style={{
                  color: "rgba(27,27,27,0.78)",
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "0.62rem",
                  lineHeight: 1.15,
                  letterSpacing: "0.06em",
                }}
              >
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
