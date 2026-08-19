"use client"

import { useRef, type ReactElement } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MULTI_ABOUT } from "@/content/multi-sports"

function FootballIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="19" />
      <path d="m24 14 7 5-3 8h-8l-3-8 7-5Z" />
      <path d="m17 19-6-4M31 19l6-4M20 27l-4 9M28 27l4 9M17 37l-6-4M31 37l6-4" />
    </svg>
  )
}

function SprintIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="29" cy="9" r="4" />
      <path d="m21 16 8 3 5 9 8 5M18 40l8-12-3-8-9 5M29 19l-7 7M39 34h-9" />
    </svg>
  )
}

function SmileIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="19" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
      <circle cx="30" cy="20" r="1" fill="currentColor" />
      <path d="M16 28s3.2 5 8 5 8-5 8-5" />
    </svg>
  )
}

function GroupIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="17" r="6" />
      <circle cx="32" cy="18" r="5" />
      <path d="M6 40c0-7 5.4-12 12-12s12 5 12 12M29 28c7 0 13 4.6 13 12" />
    </svg>
  )
}

const ICONS: Record<string, () => ReactElement> = {
  football: FootballIcon,
  sprint: SprintIcon,
  smile: SmileIcon,
  group: GroupIcon,
}

export default function MultiAbout() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".multi-about-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 24,
          duration: prefersReduced ? 0.01 : 0.65,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.08,
        })
      },
    })

    return () => trigger.kill()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6 sm:px-10 lg:px-16"
      style={{ backgroundColor: "var(--color-warm-off-white)", paddingTop: "clamp(72px, 8vw, 120px)", paddingBottom: "clamp(48px, 5vw, 80px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "1280px" }}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <div className="multi-about-item">
            <p
              className="mb-4 text-xs font-semibold tracking-[0.16em]"
              style={{ color: "var(--color-academy-green)", fontFamily: "var(--font-body)" }}
            >
              {MULTI_ABOUT.eyebrow}
            </p>
            <h2
              className="uppercase"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(2.5rem, 4.2vw, 4.25rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                color: "var(--color-black)",
                margin: 0,
              }}
            >
              {MULTI_ABOUT.headingLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h2>
          </div>

          <div className="multi-about-item flex items-center lg:border-l lg:pl-16" style={{ borderColor: "rgba(27,27,27,0.16)" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.45vw, 1.25rem)",
                lineHeight: 1.65,
                color: "rgba(27,27,27,0.82)",
                margin: 0,
                maxWidth: "550px",
              }}
            >
              {MULTI_ABOUT.body}
            </p>
          </div>
        </div>

        <div className="multi-about-item mt-14 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mt-16">
          {MULTI_ABOUT.sports.map((sport, index) => (
            <span key={sport} className="inline-flex items-center" style={{ color: "var(--color-academy-green)", fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-bold)", fontSize: "0.82rem", letterSpacing: "0.1em" }}>
              {index > 0 && <span className="mr-4" aria-hidden="true">•</span>}
              {sport}
            </span>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {MULTI_ABOUT.cards.map((card, index) => {
            const Icon = ICONS[card.icon]
            return (
              <div
                key={card.heading}
                className={`multi-about-item flex flex-col items-center px-6 py-8 text-center sm:px-8 lg:py-0 ${index > 0 ? "border-t lg:border-l lg:border-t-0" : ""}`}
                style={{ borderColor: "rgba(27,27,27,0.14)" }}
              >
                <div style={{ width: "52px", height: "52px", color: "var(--color-academy-green)", marginBottom: "20px" }}>
                  <Icon />
                </div>
                <h3
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "1rem",
                    lineHeight: 1.25,
                    color: "var(--color-black)",
                    margin: 0,
                    maxWidth: "160px",
                  }}
                >
                  {card.heading}
                </h3>
                <div aria-hidden="true" style={{ width: "36px", height: "1px", backgroundColor: "var(--color-academy-green)", margin: "18px 0" }} />
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    lineHeight: 1.55,
                    color: "rgba(27,27,27,0.74)",
                    margin: 0,
                    maxWidth: "200px",
                  }}
                >
                  {card.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
