"use client"

import Image from "next/image"
import { MULTIPLE_ACTIVITIES_CHIPS, WHY_YOUNG_ICONS } from "@/content/nurseries-about"

const multipleActivities = WHY_YOUNG_ICONS[1]

type MultipleActivitiesProps = {
  isOpen: boolean
  onToggle: () => void
}

export default function MultipleActivities({ isOpen, onToggle }: MultipleActivitiesProps) {
  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-expanded="false"
        aria-controls="multiple-activities-detail"
        className="group flex w-full items-baseline justify-between gap-5 border-b border-[#d8d5cc] py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:py-6"
        style={{ background: "transparent", borderRight: 0, borderBottom: 0, borderLeft: 0, cursor: "pointer" }}
      >
        <span className="flex items-baseline gap-4 sm:gap-7">
          <span style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.78rem", letterSpacing: "0.12em", color: "var(--color-academy-green)" }}>
            {multipleActivities.number}
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.15rem, calc(6vw - 4px), 5.55rem)", lineHeight: 0.85, letterSpacing: "-0.025em", color: "var(--color-black)" }}>
            {multipleActivities.label}
          </span>
        </span>
        <span aria-hidden="true" className="pt-2 transition-transform duration-200 group-hover:translate-x-1" style={{ fontFamily: "var(--font-body)", color: "var(--color-academy-green)", fontSize: "1.15rem" }}>↗</span>
      </button>
    )
  }

  return (
    <section id="multiple-activities-detail" className="relative border-t border-[#d8d5cc] pt-10 sm:pt-12 lg:pt-14" aria-labelledby="multiple-activities-title">
      <button
        type="button"
        onClick={onToggle}
        aria-label="Close Multiple Activities detail"
        className="absolute right-0 top-10 z-10 text-2xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:top-12 lg:top-14"
        style={{ border: 0, background: "transparent", color: "var(--color-black)", cursor: "pointer" }}
      >
        ×
      </button>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: "var(--font-weight-medium)",
          fontSize: "0.82rem",
          letterSpacing: "0.08em",
          color: "var(--color-black)",
          margin: "0 3rem 3rem 0",
        }}
      >
        <span style={{ color: "var(--color-academy-green)" }}>{multipleActivities.number}</span> — {multipleActivities.label}
      </p>

      <h2
        id="multiple-activities-title"
        style={{
          fontFamily: "var(--font-nursery-hero)",
          fontWeight: 600,
          fontSize: "clamp(2.35rem, 4vw, 4.45rem)",
          lineHeight: 0.97,
          letterSpacing: "-0.012em",
          wordSpacing: "0.055em",
          color: "var(--color-black)",
          margin: "0 0 1.65rem",
          maxWidth: "1100px",
        }}
      >
        {multipleActivities.headingLines.map((line) => <span key={line} className="block">{line}</span>)}
      </h2>

      <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-6 lg:gap-x-3">
        {MULTIPLE_ACTIVITIES_CHIPS.filter((activity) => activity.image).map((activity) => (
          <div key={activity.label}>
            <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: "var(--color-nursery-off-white)" }}>
              <Image src={activity.image!} alt={activity.label} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" className="object-cover" />
            </div>
            <p className="text-center" style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.72rem", letterSpacing: "0.08em", color: "var(--color-black)", margin: "0.8rem 0 0" }}>
              {activity.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
