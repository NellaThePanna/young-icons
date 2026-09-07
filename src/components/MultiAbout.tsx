"use client"

import { useRef, type ReactElement } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MULTI_ABOUT } from "@/content/multi-sports"

function FootballIcon() {
  return (
    <svg className="h-12 w-12 sm:h-14 sm:w-14" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="17" />
      <path d="m24 13.5 7.4 5.4-2.8 8.7h-9.2l-2.8-8.7 7.4-5.4Z" />
      <path d="M16.6 18.9 11.2 15" />
      <path d="m31.4 18.9 5.4-3.9" />
      <path d="m19.4 27.6-3.6 8.6" />
      <path d="m28.6 27.6 3.6 8.6" />
      <path d="M15.8 36.2 10.4 32" />
      <path d="m32.2 36.2 5.4-4.2" />
    </svg>
  )
}

function AgilityIcon() {
  return (
    <svg className="h-12 w-12 sm:h-14 sm:w-14" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 37.5h9" />
      <path d="m14.5 24.5-4 13h12l-4-13h-4Z" />
      <path d="M27 37.5h9" />
      <path d="m29.5 24.5-4 13h12l-4-13h-4Z" />
      <path d="M17 21c5-6 10-6 15 0" />
      <path d="M31.2 15.2 32 21l-5.8-.8" />
      <path d="m16 13 4-4 4 4-4 4-4-4Z" />
    </svg>
  )
}

function SmileIcon() {
  return (
    <svg className="h-12 w-12 sm:h-14 sm:w-14" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 9h10v6a3 3 0 1 0 6 0V9h6v10h-6a3 3 0 1 0 0 6h6v10H25v-6a3 3 0 1 0-6 0v6H9V25h6a3 3 0 1 0 0-6H9v-6a4 4 0 0 1 4-4Z" />
      <path d="M23 9v8" />
      <path d="M9 25h8" />
      <path d="M31 25h4" />
      <path d="M25 31v4" />
    </svg>
  )
}

function GroupIcon() {
  return (
    <svg className="h-12 w-12 sm:h-14 sm:w-14" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="14.5" r="5" />
      <circle cx="12.2" cy="18.5" r="4.2" />
      <circle cx="35.8" cy="18.5" r="4.2" />
      <path d="M14.5 40.5c1-8.2 4.2-12.3 9.5-12.3s8.5 4.1 9.5 12.3" />
      <path d="M4.5 39.5c.8-6.1 3.5-9.2 8-9.2 2 0 3.7.6 5.1 1.9" />
      <path d="M30.4 32.2c1.4-1.3 3.1-1.9 5.1-1.9 4.5 0 7.2 3.1 8 9.2" />
    </svg>
  )
}

const ICONS: Record<string, () => ReactElement> = {
  football: FootballIcon,
  sprint: AgilityIcon,
  smile: SmileIcon,
  group: GroupIcon,
}

const TITLE_LINES: Record<string, [string, string]> = {
  "NEW SPORT EVERY WEEK": ["NEW SPORT EVERY", "WEEK"],
  "BUILD FUNDAMENTAL SKILLS": ["BUILD FUNDAMENTAL", "SKILLS"],
  "LEARN THROUGH PLAY": ["LEARN THROUGH", "PLAY"],
  "SMALL GROUP COACHING": ["SMALL GROUP", "COACHING"],
}

const DESCRIPTION_LINES: Record<string, [string, string, string, string]> = {
  "NEW SPORT EVERY WEEK": [
    "Discover a variety of sports and",
    "activities that keep children",
    "engaged, motivated and excited",
    "to learn.",
  ],
  "BUILD FUNDAMENTAL SKILLS": [
    "Develop agility, balance,",
    "coordination and strength",
    "through movement and",
    "play.",
  ],
  "LEARN THROUGH PLAY": [
    "Fun games and challenges that",
    "build confidence, teamwork and",
    "a positive attitude towards sport",
    "and activity.",
  ],
  "SMALL GROUP COACHING": [
    "Qualified coaches provide",
    "personalised attention in a safe,",
    "inclusive and supportive",
    "environment.",
  ],
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
            const titleLines = TITLE_LINES[card.heading]
            const descriptionLines = DESCRIPTION_LINES[card.heading]

            return (
              <div
                key={card.heading}
                className={`multi-about-item grid min-h-[320px] grid-rows-[66px_40px_18px_1px_18px_auto] lg:grid-rows-[66px_40px_18px_1px_18px_88px] justify-items-center px-6 py-8 text-center sm:min-h-[326px] sm:px-8 lg:min-h-[322px] lg:px-8 lg:py-2 ${index > 0 ? "border-t" : ""} ${index === 1 || index === 3 ? "sm:border-l" : ""} ${index === 1 ? "sm:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:border-t-0" : ""}`}
                style={{ borderColor: "rgba(27,27,27,0.14)" }}
              >
                <div className="flex items-start justify-center" style={{ width: "56px", height: "66px", color: "var(--color-academy-green)" }}>
                  <Icon />
                </div>
                <h3
                  className="grid grid-rows-[20px_20px] items-start justify-items-center uppercase"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "1rem",
                    lineHeight: "20px",
                    color: "var(--color-black)",
                    margin: 0,
                    width: "210px",
                    maxWidth: "210px",
                    height: "40px",
                  }}
                >
                  <span className="block h-5 whitespace-nowrap text-center">{titleLines[0]}</span>
                  <span className="block h-5 whitespace-nowrap text-center">{titleLines[1]}</span>
                </h3>
                <div aria-hidden="true" />
                <div aria-hidden="true" style={{ width: "36px", height: "1px", backgroundColor: "var(--color-academy-green)" }} />
                <div aria-hidden="true" />
                <p
                  className="grid auto-rows-auto justify-items-center lg:grid-rows-[repeat(4,22px)]"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.88rem, 0.78vw, 0.94rem)",
                    lineHeight: "22px",
                    color: "rgba(27,27,27,0.74)",
                    margin: 0,
                    width: "220px",
                    maxWidth: "220px",
                  }}
                >
                  {descriptionLines.map((line) => (
                    <span key={line} className="block min-h-[22px] text-center lg:whitespace-nowrap">{line}</span>
                  ))}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}