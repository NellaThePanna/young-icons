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
  { value: "DUBAI + ABU DHABI", label: "ACROSS THE\nUAE", isLocation: true },
] as const

const LOGO_FRAMES: Record<string, { width: string; height: string }> = {
  "Cedar School": { width: "66px", height: "51px" },
  "Chubby Cheeks Nursery": { width: "108px", height: "46px" },
  "Citizens School": { width: "118px", height: "40px" },
  "British Home Nursery": { width: "84px", height: "48px" },
  "Dubai British School Jumeira": { width: "106px", height: "45px" },
  "Swiss International Scientific School Dubai": { width: "66px", height: "56px" },
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
            lineHeight: 0.96,
            letterSpacing: 0,
            color: "var(--color-black)",
            margin: 0,
          }}
        >
          {HEADLINE_LINES.map((line) => (
            <span
              key={line}
              className="block"
              style={{
                color: line === "MOVE." ? "var(--color-academy-green)" : undefined,
                marginTop: line === "FOR THE WAY" ? "0.12em" : line === "CHILDREN" || line === "MOVE." ? "0.035em" : undefined,
                wordSpacing: line === "FOR THE WAY" ? "0.13em" : undefined,
              }}
            >
              {line}
            </span>
          ))}
        </h2>

        <div className="my-8 border-t sm:my-10" style={{ borderColor: "rgba(27,27,27,0.14)" }} />

        <div className="grid grid-cols-1 gap-y-8 min-[700px]:grid-cols-3 min-[700px]:gap-x-6 min-[900px]:grid-cols-[minmax(0,2.05fr)_minmax(120px,0.82fr)_minmax(120px,0.82fr)_minmax(235px,1.28fr)] min-[900px]:items-start min-[900px]:gap-x-0">
          <div className="trust-item min-[700px]:col-span-3 min-[900px]:col-span-1 min-[900px]:pr-8">
            <p
              className="mb-4 uppercase"
              style={{ color: "var(--color-academy-green)", fontFamily: "var(--font-anton)", fontWeight: 400, fontSize: "1rem", letterSpacing: "0.08em", wordSpacing: "0.12em" }}
            >
              TRUSTED ACROSS THE UAE.
            </p>
            <h3
              className="uppercase"
              style={{
                fontFamily: "var(--font-anton)",
                fontWeight: 400,
                fontSize: "clamp(1.65rem, 2.35vw, 2.5rem)",
                lineHeight: 1.07,
                letterSpacing: "0.018em",
                wordSpacing: "0.12em",
                color: "var(--color-black)",
                margin: 0,
              }}
            >
              <span className="block">PARTNERING WITH LEADING</span>
              <span className="block" style={{ marginTop: "0.18em" }}>NURSERIES &amp; SCHOOLS.</span>
            </h3>
          </div>

          {STATS.map((stat, index) => (
            <div
              key={stat.value}
              className={`trust-item grid ${index > 0 ? "trust-stat-divider" : ""}`}
              style={{
                gridTemplateRows: "clamp(3.05rem, 4.6vw, 3.85rem) minmax(2.45rem, auto)",
                minWidth: 0,
                paddingRight: index < STATS.length - 1 ? "clamp(1rem, 2vw, 1.75rem)" : undefined,
              }}
            >
              <span
                ref={(element) => {
                  valueRefs.current[index] = element
                }}
                className={`flex items-start uppercase ${stat.isLocation ? "trust-location-value" : ""}`}
                style={{
                  fontFamily: "var(--font-anton)",
                  fontWeight: 400,
                  fontSize: stat.isLocation ? "clamp(1.45rem, 1.9vw, 2rem)" : "clamp(2.3rem, 3.3vw, 3.45rem)",
                  lineHeight: stat.isLocation ? 1.05 : 0.86,
                  letterSpacing: stat.isLocation ? "0.012em" : "0.006em",
                  wordSpacing: stat.isLocation ? "0.06em" : undefined,
                  color: "var(--color-academy-green)",
                  whiteSpace: stat.isLocation ? undefined : "pre-line",
                }}
              >
                {stat.value}
              </span>
              <span
                className="whitespace-pre-line uppercase"
                style={{
                  color: "rgba(27,27,27,0.78)",
                  fontFamily: "var(--font-anton)",
                  fontWeight: 400,
                  fontSize: "0.76rem",
                  lineHeight: 1.32,
                  letterSpacing: "0.08em",
                  wordSpacing: "0.08em",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div
          className="trust-item partner-logo-row mt-9 grid grid-cols-2 sm:grid-cols-3 min-[1024px]:grid-cols-6"
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
