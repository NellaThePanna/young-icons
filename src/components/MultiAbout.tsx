"use client"

import { useRef, type ReactElement } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MULTI_ABOUT } from "@/content/multi-sports"

function FootballIcon() {
  return (
    <svg className="h-11 w-11 sm:h-12 sm:w-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="17" />
      <path d="m24 14 7 5-2.7 8h-8.6L17 19l7-5Z" />
      <path d="m17 19-5.4-4M31 19l5.4-4M19.7 27 16 36M28.3 27 32 36M16 36l-5.4-3.6M32 36l5.4-3.6" />
    </svg>
  )
}

function SprintIcon() {
  return (
    <svg className="h-11 w-11 sm:h-12 sm:w-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="29" cy="10" r="4" />
      <path d="m21 18 8 3 5 8 7 4" />
      <path d="m25 24-7 5-7 1" />
      <path d="m27 25-4 8-6 8" />
      <path d="m32 30-2 7h10" />
      <path d="M8 38h7M9 30h5" />
    </svg>
  )
}

function SmileIcon() {
  return (
    <svg className="h-11 w-11 sm:h-12 sm:w-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="17" />
      <path d="m21 17 10 7-10 7V17Z" />
      <path d="M16 31.5c2 3 4.7 4.5 8 4.5s6-1.5 8-4.5" />
      <path d="M16.5 18.5h.1M31.5 18.5h.1" />
    </svg>
  )
}

function GroupIcon() {
  return (
    <svg className="h-11 w-11 sm:h-12 sm:w-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="15" r="5" />
      <circle cx="12.5" cy="19" r="4" />
      <circle cx="35.5" cy="19" r="4" />
      <path d="M14 40c.9-8.2 4.4-13 10-13s9.1 4.8 10 13" />
      <path d="M4 39c.7-6.2 3.7-9.8 8.5-9.8 2.2 0 4 .8 5.4 2.2" />
      <path d="M30.1 31.4c1.4-1.4 3.2-2.2 5.4-2.2 4.8 0 7.8 3.6 8.5 9.8" />
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
      style={{ backgroundColor: "#F3F3ED", paddingTop: "clamp(72px, 8vw, 120px)", paddingBottom: "clamp(32px, 4vw, 56px)" }}
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
                fontFamily: "var(--font-display)",
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

        <div className="multi-about-item mt-14 grid grid-cols-2 gap-x-6 gap-y-3 text-center sm:mt-16 sm:grid-cols-4 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-0">
          {MULTI_ABOUT.sports.map((sport, index) => (
            <span
              key={sport}
              className="inline-flex items-center justify-center"
              style={{
                color: "var(--color-academy-green)",
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
              }}
            >
              {sport}
              {index < MULTI_ABOUT.sports.length - 2 && <span className="ml-3" aria-hidden="true">•</span>}
            </span>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" style={{ borderColor: "rgba(27,27,27,0.14)" }}>
          {MULTI_ABOUT.cards.map((card, index) => {
            const Icon = ICONS[card.icon]
            return (
              <div
                key={card.heading}
                className={`multi-about-item grid min-h-[320px] grid-rows-[58px_4.1em_37px_1fr] justify-items-center px-6 py-8 text-center sm:min-h-[318px] sm:px-8 lg:min-h-[314px] lg:px-8 lg:py-2 ${index > 0 ? "border-t" : ""} ${index === 1 || index === 3 ? "sm:border-l" : ""} ${index === 1 ? "sm:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:border-t-0" : ""}`}
                style={{ borderColor: "rgba(27,27,27,0.14)" }}
              >
                <div className="flex items-start justify-center" style={{ width: "52px", height: "58px", color: "var(--color-academy-green)" }}>
                  <Icon />
                </div>
                <h3
                  className="flex items-center justify-center uppercase"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "1rem",
                    lineHeight: 1.25,
                    color: "var(--color-black)",
                    margin: 0,
                    maxWidth: "170px",
                  }}
                >
                  {card.heading}
                </h3>
                <div aria-hidden="true" className="self-center" style={{ width: "36px", height: "1px", backgroundColor: "var(--color-academy-green)" }} />
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.88rem, 0.78vw, 0.94rem)",
                    lineHeight: 1.6,
                    color: "rgba(27,27,27,0.74)",
                    margin: 0,
                    maxWidth: "220px",
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
