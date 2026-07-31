"use client"

import { useRef, type ReactElement } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MULTI_ABOUT } from "@/content/multi-sports"

function BasketballIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18M5.6 5.6c2.5 2.5 2.5 10.3 0 12.8M18.4 5.6c-2.5 2.5-2.5 10.3 0 12.8" />
    </svg>
  )
}

function SprintIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="15" cy="5" r="2" />
      <path d="M11 8l3 2 2 5 4 3M6 21l4-6-1-4-4 2M13 10l-4 1-2 5" />
    </svg>
  )
}

function SmileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
    </svg>
  )
}

function GroupIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15.5 14.5c2.5.3 4.5 2.3 4.5 5.5" />
    </svg>
  )
}

const ICONS: Record<string, () => ReactElement> = {
  basketball: BasketballIcon,
  sprint: SprintIcon,
  smile: SmileIcon,
  group: GroupIcon,
}

export default function MultiAbout() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".about-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 28,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.1,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-warm-off-white)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1280px" }}>
        <p
          className="about-item"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-academy-green)",
            fontSize: "clamp(1.375rem, 2.5vw, 1.5rem)",
            textTransform: "uppercase",
            margin: "0 0 12px 0",
          }}
        >
          {MULTI_ABOUT.eyebrow}
        </p>
        <p
          className="about-item"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(0,0,0,0.65)",
            fontSize: "17px",
            lineHeight: 1.6,
            maxWidth: "620px",
            margin: "0 0 40px 0",
          }}
        >
          {MULTI_ABOUT.body}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {MULTI_ABOUT.cards.map((card) => {
            const Icon = ICONS[card.icon]
            return (
              <div
                key={card.heading}
                className="about-item flex flex-col items-center text-center"
                style={{
                  backgroundColor: "var(--color-white)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  padding: "32px 22px",
                }}
              >
                <div style={{ width: "40px", height: "40px", color: "var(--color-academy-green)", marginBottom: "18px" }}>
                  <Icon />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    textTransform: "uppercase",
                    lineHeight: 1.15,
                    color: "var(--color-black)",
                    margin: "0 0 10px 0",
                  }}
                >
                  {card.heading}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "rgba(0,0,0,0.6)",
                    lineHeight: 1.5,
                    margin: 0,
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
