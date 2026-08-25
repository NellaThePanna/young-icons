"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Image from "next/image"
import { HOME_PARTNER_LOGOS } from "@/content/home"

const HEADLINE_LINES = ["BUILT", "FOR THE WAY", "CHILDREN", "MOVE."] as const

const STATS = [
  { value: "45+", label: "EDUCATIONAL\nPARTNERS", isLocation: false },
  { value: "900+", label: "CHILDREN\nEVERY WEEK", isLocation: false },
  { value: "DUBAI +\nABU DHABI", label: "ACROSS THE UAE", isLocation: true },
] as const

export default function TrustScale() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let split: SplitText | null = null

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 82%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        split = headingRef.current ? new SplitText(headingRef.current, { type: "words" }) : null
        if (split) {
          gsap.from(split.words, {
            opacity: 0,
            y: prefersReduced ? 0 : 24,
            duration: prefersReduced ? 0.01 : 0.68,
            ease: "power2.out",
            stagger: prefersReduced ? 0 : 0.07,
          })
        }

        const items = sectionRef.current?.querySelectorAll(".trust-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 20,
          duration: prefersReduced ? 0.01 : 0.65,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.08,
          delay: prefersReduced ? 0 : 0.2,
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

    return () => {
      trigger.kill()
      split?.revert()
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section="partner-stats"
      className="py-10 sm:py-14"
      style={{ backgroundColor: "#F4F1EB" }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "1440px",
          padding: "0 clamp(24px, 4vw, 72px)",
        }}
      >
        <h2
          ref={headingRef}
          className="uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(2.6rem, 5vw, 4.75rem)",
            lineHeight: 0.94,
            letterSpacing: "-0.015em",
            color: "var(--color-black)",
            margin: 0,
          }}
        >
          {HEADLINE_LINES.map((line) => (
            <span
              key={line}
              className="block"
              style={{ color: line === "MOVE." ? "var(--color-academy-green)" : undefined }}
            >
              {line}
            </span>
          ))}
        </h2>

        <div className="my-8 border-t sm:my-10" style={{ borderColor: "rgba(27,27,27,0.14)" }} />

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 min-[700px]:grid-cols-[minmax(0,2.15fr)_repeat(3,minmax(0,1fr))] min-[700px]:items-center min-[700px]:gap-x-8 min-[700px]:gap-y-0">
          <div className="trust-item col-span-2 min-[700px]:col-span-1 min-[700px]:pr-8">
            <p
              className="mb-2 text-xs font-semibold tracking-[0.16em]"
              style={{ color: "var(--color-academy-green)", fontFamily: "var(--font-body)" }}
            >
              TRUSTED ACROSS THE UAE.
            </p>
            <h3
              className="uppercase"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(1.65rem, 2.35vw, 2.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                color: "var(--color-black)",
                margin: 0,
              }}
            >
              PARTNERING WITH LEADING NURSERIES &amp; SCHOOLS.
            </h3>
          </div>

          {STATS.map((stat, index) => (
            <div
              key={stat.value}
              className="trust-item flex flex-col justify-center"
              style={{
                minWidth: 0,
                borderLeft: index > 0 ? "1px solid rgba(27,27,27,0.14)" : undefined,
                paddingLeft: index > 0 ? "1.5rem" : undefined,
              }}
            >
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
          className="trust-item mt-8 grid grid-cols-2 divide-x divide-y rounded sm:mt-10 min-[700px]:grid-cols-3 min-[1100px]:grid-cols-6 min-[1100px]:divide-y-0"
          style={{ border: "1px solid rgba(27,27,27,0.14)", borderColor: "rgba(27,27,27,0.14)" }}
          aria-label="Young Icons education partners"
        >
          {HOME_PARTNER_LOGOS.map((partner) => (
            <div
              key={partner.name}
              className="relative flex items-center justify-center"
              style={{ height: "104px", borderColor: "rgba(27,27,27,0.14)" }}
            >
              <Image
                src={partner.src}
                alt={partner.name}
                fill
                sizes="180px"
                className="object-contain"
                style={{ objectPosition: "center", filter: "grayscale(1)", padding: "18px 28px" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
