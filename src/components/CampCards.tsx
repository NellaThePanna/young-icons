"use client"

import { useRef, type ReactNode } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CLASSCARD_URL } from "@/lib/config"
import { SCHOOLS_CAMPS_UPCOMING } from "@/content/schools-holiday-camps"

const CAMP_PHOTOS: Record<string, string> = {
  "Summer Camp": "/images/holiday-camps/summer-camp-exact-photo.png",
  "October Camp": "/images/holiday-camps/october-camp-exact-photo.png",
  "Winter Camp": "/images/holiday-camps/winter-camp-exact-photo.png",
}

const CAMP_PHOTO_ALT: Record<string, string> = {
  "Summer Camp": "Children playing basketball in a school gymnasium",
  "October Camp": "A young child painting in a school classroom",
  "Winter Camp": "Children playing tug-of-war in a school gymnasium",
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-7.1-7-12a7 7 0 1 1 14 0c0 4.9-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
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

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
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

export default function CampCards() {
  const sectionRef = useRef<HTMLElement>(null)
  const { heading, camps } = SCHOOLS_CAMPS_UPCOMING

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
        <div className="flex items-start justify-between gap-5" style={{ marginBottom: "24px" }}>
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-academy-green)",
                marginBottom: "7px",
              }}
            >
              Upcoming Camps
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-anton)",
                fontWeight: 400,
                fontSize: "clamp(48px, 7.2vw, 90px)",
                lineHeight: 0.86,
                textTransform: "uppercase",
                color: "var(--color-black)",
              }}
            >
              {heading}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Previous camps"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "1.5px solid rgba(0,0,0,0.2)",
                background: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-black)",
              }}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              aria-label="Next camps"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "1.5px solid rgba(0,0,0,0.2)",
                background: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-black)",
              }}
            >
              <ChevronRightIcon />
            </button>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1px solid var(--color-black)",
                background: "var(--color-white)",
                padding: "6px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/holiday-camps/young-icons-circle-logo.png"
                alt="Young Icons"
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {camps.map((camp) => (
            <div
              key={camp.name}
              className="camp-card flex flex-col"
              style={{
                backgroundColor: "var(--color-white)",
                border: "1px solid rgba(0,0,0,0.12)",
              }}
            >
              <div className="relative w-full" style={{ aspectRatio: "1.66" }}>
                <Image
                  src={CAMP_PHOTOS[camp.name]}
                  alt={CAMP_PHOTO_ALT[camp.name]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="flex flex-col gap-3" style={{ padding: "15px 16px 16px" }}>
                <InfoRow icon={<CalendarIcon />} label={camp.dates} />
                <InfoRow icon={<PinIcon />} label={camp.venue} />
                <InfoRow icon={<PersonIcon />} label={camp.ages} />
                <InfoRow icon={<ClockIcon />} label={camp.time} />
              </div>

              <a
                href={CLASSCARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between"
                style={{
                  padding: "16px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "16px",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "var(--color-white)",
                  backgroundColor: "var(--color-black)",
                  textDecoration: "none",
                }}
              >
                <span>Register Now</span>
                <span aria-hidden="true" style={{ fontSize: "22px", lineHeight: 0.6 }}>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
