"use client"

import { useRef, type ReactNode } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CLASSCARD_URL } from "@/lib/config"

interface Camp {
  readonly name: string
  readonly venue: string
  readonly dates: string
  readonly ages: string
  readonly time: string
}

// nova-debt: stand-in photography, real shoot not sourced yet (tracked separately, task #11) — swap these paths when it arrives
const CAMP_PHOTOS: Record<string, string> = {
  "Summer Holiday Camp": "/images/placeholder/activity-football.png",
  "October Camp": "/images/placeholder/karate-crawl.jpg",
  "Winter Camp": "/images/placeholder/activity-rugby.png",
}

interface CampCardsProps {
  heading: string
  camps: readonly Camp[]
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-7.1-7-12a7 7 0 1 1 14 0c0 4.9-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

function InfoRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span style={{ color: "var(--color-academy-green)", flexShrink: 0 }}>{icon}</span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(0,0,0,0.7)" }}>
        {label}
      </span>
    </div>
  )
}

export default function CampCards({ heading, camps }: CampCardsProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const cards = sectionRef.current?.querySelectorAll(".camp-card") ?? []
        gsap.from(cards, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.12,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-warm-off-white)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "1120px" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-academy-green)",
            marginBottom: "8px",
          }}
        >
          Upcoming Camps
        </p>
        <h2
          className="mb-10 tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "2.5rem",
            textTransform: "uppercase",
            color: "var(--color-black)",
          }}
        >
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {camps.map((camp) => (
            <div
              key={camp.name}
              className="camp-card rounded-lg overflow-hidden flex flex-col"
              style={{ backgroundColor: "var(--color-white)" }}
            >
              <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
                <Image
                  src={CAMP_PHOTOS[camp.name]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="flex flex-col gap-5" style={{ padding: "32px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "1.375rem",
                    textTransform: "uppercase",
                    color: "var(--color-black)",
                  }}
                >
                  {camp.name}
                </h3>

                <div className="flex flex-col gap-3">
                  <InfoRow icon={<PinIcon />} label={camp.venue} />
                  <InfoRow icon={<CalendarIcon />} label={camp.dates} />
                  <InfoRow icon={<PersonIcon />} label={camp.ages} />
                  <InfoRow icon={<ClockIcon />} label={camp.time} />
                </div>

                <a
                  href={CLASSCARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto rounded-full px-6 py-3 text-center"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "14px",
                    color: "var(--color-white)",
                    backgroundColor: "var(--color-academy-green)",
                    textDecoration: "none",
                  }}
                >
                  Register Now
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center" style={{ marginTop: "32px" }}>
          <a
            href={CLASSCARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--color-black)",
              backgroundColor: "transparent",
              border: "1.5px solid rgba(0,0,0,0.25)",
              padding: "12px 24px",
              textDecoration: "none",
            }}
          >
            Register Your Interest
          </a>
        </div>
      </div>
    </section>
  )
}
