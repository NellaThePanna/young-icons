"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { CLASSCARD_URL } from "@/lib/config"

interface Coach {
  name: string
  role: string
  credential: string
  yearsCoaching: string
  sports: string
  ageGroups: string
  bio: string
  photoSrc?: string
  photoAlt?: string
}

interface CoachGalleryProps {
  coaches: Coach[]
}

export default function CoachGallery({ coaches }: CoachGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const tileEls = sectionRef.current?.querySelectorAll(".coach-tile") ?? []
    gsap.from(tileEls, {
      opacity: 0,
      y: prefersReduced ? 0 : 24,
      duration: prefersReduced ? 0.01 : 0.5,
      ease: "power2.out",
      stagger: { amount: prefersReduced ? 0 : 0.4, from: "start" },
    })
  }, { scope: sectionRef })

  const openCoach = openIndex !== null ? coaches[openIndex] : null

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-warm-off-white)",
        paddingTop: "8px",
        paddingBottom: "80px",
      }}
      aria-label="Coaching team"
    >
      <div className="mx-auto" style={{ maxWidth: "1120px" }}>
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-bold)",
            color: "rgba(0,0,0,0.4)",
          }}
        >
          Tap a coach to learn more
        </p>

        <div
          className="flex gap-2 overflow-x-auto md:overflow-visible"
          style={{ height: "clamp(260px, 40vw, 440px)" }}
        >
          {coaches.map((coach, i) => (
            <button
              key={coach.name + i}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="coach-tile group relative flex-none w-[42vw] md:w-auto md:flex-1 md:hover:flex-[2.4] h-full rounded-2xl overflow-hidden text-left transition-[flex] duration-500"
              style={{
                backgroundColor: "rgba(0,0,0,0.07)",
                transitionTimingFunction: "cubic-bezier(.2,.7,.3,1)",
              }}
              aria-haspopup="dialog"
            >
              <span
                className="absolute inset-0 flex items-center justify-center text-center px-4"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  lineHeight: 1.5,
                  color: "rgba(0,0,0,0.4)",
                }}
              >
                [PHOTO NEEDED]
              </span>
              <span
                className="absolute left-3 bottom-3 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "14px",
                  color: "var(--color-white)",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  maxWidth: "calc(100% - 24px)",
                }}
              >
                {coach.name}
              </span>
            </button>
          ))}
        </div>

        <p
          className="mt-4"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "rgba(0,0,0,0.4)",
            maxWidth: "520px",
            lineHeight: 1.6,
          }}
        >
          Placeholder layout — real coach photography, names, and bios required before this page ships.
        </p>
      </div>

      {openCoach && <CoachGlassCard coach={openCoach} onClose={() => setOpenIndex(null)} />}
    </section>
  )
}

function CoachGlassCard({ coach, onClose }: { coach: Coach; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: "rgba(12,14,12,0.55)", backdropFilter: "blur(3px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${coach.name} — coach details`}
      tabIndex={-1}
    >
      <svg
        className="absolute w-0 h-0 overflow-hidden"
        aria-hidden="true"
      >
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.015" numOctaves={1} seed={9} result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="softMap" />
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div
        className="relative w-full rounded-[28px] overflow-hidden"
        style={{ maxWidth: "420px", boxShadow: "0 30px 80px rgba(0,0,0,.45)" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0,0,0,.35)",
            backdropFilter: "blur(4px)",
            color: "var(--color-white)",
            fontSize: "18px",
          }}
          aria-label="Close coach details"
        >
          ×
        </button>

        <div
          className="absolute top-4 left-4 z-20 rounded"
          style={{
            backgroundColor: "rgba(255,190,0,.92)",
            color: "#000",
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "9.5px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            padding: "4px 8px",
          }}
        >
          Placeholder content
        </div>

        <div
          className="absolute inset-0"
          style={{
            background: coach.photoSrc
              ? `url(${coach.photoSrc}) center / cover`
              : "linear-gradient(135deg, var(--color-near-black), var(--color-black))",
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{ backdropFilter: "blur(2px)", filter: "url(#glass-distortion)" }}
        />
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,14,12,0.05) 0%, rgba(12,14,12,0.35) 55%, rgba(12,14,12,0.82) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-30 rounded-[28px] pointer-events-none"
          style={{
            boxShadow: "inset 1px 1px 1px rgba(255,255,255,.5), inset -1px -1px 1px rgba(255,255,255,.15)",
          }}
        />

        <div className="relative z-40" style={{ padding: "34px 30px 30px", paddingTop: "260px", color: "var(--color-white)" }}>
          <div className="flex items-center gap-2 mb-1.5">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                textTransform: "uppercase",
                fontSize: "28px",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              {coach.name}
            </h3>
            <div
              className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--color-academy-green)" }}
              aria-label="Certified coach"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                <path d="M20 6L9 17l-5-5" stroke="var(--color-white)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,.75)", margin: "0 0 16px", fontWeight: 500 }}>
            {coach.role}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,.92)", margin: "0 0 20px" }}>
            {coach.bio}
          </p>

          <div className="flex items-center justify-between mb-[22px]">
            <Stat num={coach.yearsCoaching} label="Years Coaching" />
            <div className="w-px h-8" style={{ backgroundColor: "rgba(255,255,255,.22)" }} />
            <Stat num={coach.sports} label="Sport(s)" />
            <div className="w-px h-8" style={{ backgroundColor: "rgba(255,255,255,.22)" }} />
            <Stat num={coach.ageGroups} label="Age Groups" />
          </div>

          <a
            href={CLASSCARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-full"
            style={{
              backgroundColor: "var(--color-white)",
              color: "var(--color-near-black)",
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "14px",
              padding: "14px",
              textDecoration: "none",
            }}
          >
            Enquire About This Coach
          </a>
        </div>
      </div>
    </div>
  )
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="text-center flex-1">
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "22px", color: "var(--color-white)" }}>
        {num}
      </div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "10.5px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "rgba(255,255,255,.65)",
          marginTop: "2px",
        }}
      >
        {label}
      </div>
    </div>
  )
}
