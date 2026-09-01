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

const LOGO_FRAMES: Record<string, { width: string; height: string }> = {
  "Cedar School": { width: "70px", height: "54px" },
  "Chubby Cheeks Nursery": { width: "118px", height: "50px" },
  "Citizens School": { width: "132px", height: "44px" },
  "British Home Nursery": { width: "92px", height: "52px" },
  "Dubai British School Jumeira": { width: "118px", height: "50px" },
  "Swiss International Scientific School Dubai": { width: "68px", height: "58px" },
}

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
          className="partner-hero-heading uppercase"
          style={{
            fontFamily: "var(--font-anton)",
            fontWeight: 400,
            fontSize: "clamp(3rem, 5.9vw, 5.65rem)",
            lineHeight: 0.9,
            letterSpacing: 0,
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
              className="mb-2 text-xs uppercase"
              style={{ color: "var(--color-academy-green)", fontFamily: "var(--font-anton)", fontWeight: 400, letterSpacing: 0 }}
            >
              TRUSTED ACROSS THE UAE.
            </p>
            <h3
              className="uppercase"
              style={{
                fontFamily: "var(--font-anton)",
                fontWeight: 400,
                fontSize: "clamp(1.65rem, 2.35vw, 2.5rem)",
                lineHeight: 0.95,
                letterSpacing: 0,
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
                  fontFamily: "var(--font-anton)",
                  fontWeight: 400,
                  fontSize: stat.isLocation ? "clamp(1.65rem, 2.2vw, 2.3rem)" : "clamp(2.3rem, 3.3vw, 3.45rem)",
                  lineHeight: 0.84,
                  letterSpacing: 0,
                  color: "var(--color-academy-green)",
                  whiteSpace: "pre-line",
                }}
              >
                {stat.value}
              </span>
              <span
                className="mt-2 whitespace-pre-line uppercase"
                style={{
                  color: "rgba(27,27,27,0.78)",
                  fontFamily: "var(--font-anton)",
                  fontWeight: 400,
                  fontSize: "0.64rem",
                  lineHeight: 1.15,
                  letterSpacing: 0,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div
          className="trust-item partner-logo-row mt-12 grid grid-cols-2 sm:grid-cols-3 min-[1024px]:grid-cols-6"
          aria-label="Young Icons education partners"
        >
          {HOME_PARTNER_LOGOS.map((partner) => {
            const frame = LOGO_FRAMES[partner.name] ?? { width: "110px", height: "50px" }

            return (
              <div key={partner.name} className="partner-logo-cell flex items-center justify-center">
                <div className="partner-logo-frame relative" style={frame}>
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 36vw, (max-width: 1024px) 24vw, 132px"
                    className="object-contain"
                    style={{ objectPosition: "center", filter: "grayscale(1)" }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
