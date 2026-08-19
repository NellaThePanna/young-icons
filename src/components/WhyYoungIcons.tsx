"use client"

import { useState } from "react"
import MultipleActivities from "@/components/MultipleActivities"
import { WHY_YOUNG_ICONS } from "@/content/nurseries-about"

const WHY_OPTIONS = [WHY_YOUNG_ICONS[0], WHY_YOUNG_ICONS[2], WHY_YOUNG_ICONS[3]] as const

const headingStyle = {
  fontFamily: "var(--font-nursery-hero)",
  fontWeight: 600,
  fontSize: "clamp(2.35rem, 4vw, 4.45rem)",
  lineHeight: 0.97,
  letterSpacing: "-0.012em",
  wordSpacing: "0.055em",
  color: "var(--color-black)",
  margin: 0,
} as const

export default function WhyYoungIcons() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isMultipleActivitiesOpen, setIsMultipleActivitiesOpen] = useState(true)

  return (
    <section className="px-5 pt-10 pb-16 sm:px-8 sm:pt-12 sm:pb-20 lg:px-12 lg:pt-14 lg:pb-20" style={{ backgroundColor: "var(--color-nursery-off-white)" }}>
      <div className="mx-auto" style={{ maxWidth: "1360px" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.78rem",
            letterSpacing: "0.16em",
            color: "var(--color-academy-green)",
            margin: "0 0 2rem",
          }}
        >
          WHY YOUNG ICONS
        </p>

        {selectedId === WHY_OPTIONS[0].id ? (
          <OnePartnerPanel selected={WHY_OPTIONS[0]} onClose={() => setSelectedId(null)} />
        ) : (
          <WhyOptionRow item={WHY_OPTIONS[0]} isOpen={false} onToggle={() => setSelectedId(WHY_OPTIONS[0].id)} />
        )}

        <MultipleActivities isOpen={isMultipleActivitiesOpen} onToggle={() => setIsMultipleActivitiesOpen((current) => !current)} />

        {selectedId === WHY_OPTIONS[1].id ? (
          <TailoredProgrammesPanel selected={WHY_OPTIONS[1]} onClose={() => setSelectedId(null)} />
        ) : (
          <WhyOptionRow item={WHY_OPTIONS[1]} isOpen={false} onToggle={() => setSelectedId(WHY_OPTIONS[1].id)} />
        )}

        {selectedId === WHY_OPTIONS[2].id ? (
          <FullyManagedPanel selected={WHY_OPTIONS[2]} onClose={() => setSelectedId(null)} />
        ) : (
          <WhyOptionRow item={WHY_OPTIONS[2]} isOpen={false} onToggle={() => setSelectedId(WHY_OPTIONS[2].id)} />
        )}
      </div>
    </section>
  )
}

function WhyOptionRow({ item, isOpen, onToggle }: { item: typeof WHY_OPTIONS[number]; isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="group flex w-full items-baseline justify-between gap-5 border-b border-[#d8d5cc] py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:py-6"
      style={{ background: "transparent", borderRight: 0, borderBottom: 0, borderLeft: 0, cursor: "pointer" }}
    >
      <span className="flex items-baseline gap-4 sm:gap-7">
        <span style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.78rem", letterSpacing: "0.12em", color: "var(--color-academy-green)" }}>
          {item.number}
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.15rem, calc(6vw - 4px), 5.55rem)", lineHeight: 0.85, letterSpacing: "-0.025em", color: "var(--color-black)" }}>
          {item.label}
        </span>
      </span>
      <span aria-hidden="true" className="pt-2 transition-transform duration-200 group-hover:translate-x-1" style={{ fontFamily: "var(--font-body)", color: "var(--color-academy-green)", fontSize: "1.15rem" }}>
        {isOpen ? "×" : "↗"}
      </span>
    </button>
  )
}

function DetailFrame({ number, label, onClose, children }: { number: string; label: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="relative border-y border-[#d8d5cc] py-7 sm:py-10 lg:py-12" role="region" aria-label={label}>
      <button
        type="button"
        onClick={onClose}
        aria-label={`Close ${label} detail`}
        className="absolute right-0 top-7 z-10 text-2xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:top-10"
        style={{ border: 0, background: "transparent", color: "var(--color-black)", cursor: "pointer" }}
      >
        ×
      </button>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.82rem", letterSpacing: "0.08em", color: "var(--color-black)", margin: "0 3rem 1.65rem 0" }}>
        <span style={{ color: "var(--color-academy-green)" }}>{number}</span> — {label}
      </p>
      {children}
    </div>
  )
}

function TailoredProgrammesPanel({ selected, onClose }: { selected: typeof WHY_YOUNG_ICONS[2]; onClose: () => void }) {
  return (
    <DetailFrame number={selected.number} label={selected.label} onClose={onClose}>
      <h2 style={{ ...headingStyle, fontSize: "clamp(2.15rem, 3.7vw, 4.1rem)", margin: "0 0 1.35rem", maxWidth: "1320px" }}>
        {selected.headingLines.map((line) => <span key={line} className="block">{line}</span>)}
      </h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.35vw, 1.25rem)", lineHeight: 1.45, color: "var(--color-black)", maxWidth: "600px", margin: "0 0 2.2rem" }}>
        {selected.body}
      </p>
      <div className="grid grid-cols-1 border-t border-[#c8c5bc] sm:grid-cols-2 lg:grid-cols-4">
        {selected.points.map((point, index) => (
          <div key={point.number} className={`min-h-[270px] py-7 sm:px-7 sm:py-9 lg:min-h-[310px] lg:py-9 ${index > 0 ? "border-t border-[#d8d5cc] sm:border-l sm:border-t-0" : ""}`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1a7a47]" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-academy-green)" }}>
              {point.number}
            </span>
            <ProgrammeIcon index={index} />
            <span aria-hidden="true" className="block" style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--color-nursery-stone)", margin: "0.05rem 0 0.55rem" }}>—</span>
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "clamp(1rem, 1.3vw, 1.35rem)", lineHeight: 1.12, letterSpacing: "-0.025em", color: "var(--color-black)", margin: "0 0 0.9rem", maxWidth: "240px" }}>
              {point.label}
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.94rem", lineHeight: 1.45, color: "var(--color-nursery-stone)", margin: 0, maxWidth: "235px" }}>
              {point.body}
            </p>
          </div>
        ))}
      </div>
    </DetailFrame>
  )
}

function ProgrammeIcon({ index }: { index: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

  return (
    <span aria-hidden="true" className="mt-5 block h-12 w-12" style={{ color: "var(--color-academy-green)" }}>
      {index === 0 && (
        <svg viewBox="0 0 48 48" className="h-full w-full"><rect x="12" y="10" width="24" height="29" rx="2" {...common} /><path d="M19 8h10v5H19zM18 20h12M18 26h12M18 32h7M30 31l2 2 5-6" {...common} /></svg>
      )}
      {index === 1 && (
        <svg viewBox="0 0 48 48" className="h-full w-full"><circle cx="23" cy="25" r="13" {...common} /><circle cx="23" cy="25" r="7" {...common} /><circle cx="23" cy="25" r="2" {...common} /><path d="M28 20l10-10M33 10h5v5M34 14l5 1" {...common} /></svg>
      )}
      {index === 2 && (
        <svg viewBox="0 0 48 48" className="h-full w-full"><path d="M10 38V25h8v13M20 38V17h8v21M30 38V9h8v29M8 39h32" {...common} /></svg>
      )}
      {index === 3 && (
        <svg viewBox="0 0 48 48" className="h-full w-full"><rect x="7" y="10" width="34" height="24" rx="2" {...common} /><path d="M3 39h42M19 18h12M19 23h9M13 18h2M13 23h2M23 34v5M17 39h12" {...common} /><circle cx="13" cy="18" r="3" {...common} /></svg>
      )}
    </span>
  )
}

function FullyManagedPanel({ selected, onClose }: { selected: typeof WHY_YOUNG_ICONS[3]; onClose: () => void }) {
  return (
    <DetailFrame number={selected.number} label={selected.label} onClose={onClose}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end lg:gap-8">
        <h2 style={headingStyle}>
          {selected.headingLines.map((line) => <span key={line} className="block">{line}</span>)}
        </h2>
        <p className="lg:pb-3" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.25vw, 1.2rem)", lineHeight: 1.5, color: "var(--color-black)", margin: 0, maxWidth: "260px" }}>
          {selected.body}
        </p>
      </div>
      <div className="mt-8 border-t border-[#d8d5cc]">
        {selected.points.map((point) => (
          <div key={point.number} className="grid grid-cols-[48px_minmax(0,1fr)] gap-5 border-b border-[#d8d5cc] py-4 sm:grid-cols-[72px_minmax(0,1fr)] sm:py-5">
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-academy-green)" }}>{point.number}</span>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.25rem, 2.1vw, 2.25rem)", lineHeight: 1.12, color: "var(--color-black)", margin: 0 }}>
              {point.label}
            </p>
          </div>
        ))}
      </div>
    </DetailFrame>
  )
}

function OnePartnerPanel({ selected, onClose }: { selected: typeof WHY_YOUNG_ICONS[0]; onClose: () => void }) {
  return (
    <DetailFrame number={selected.number} label={selected.label} onClose={onClose}>
      <div className="max-w-[980px]">
        <h2 style={{ ...headingStyle, marginBottom: "1.5rem" }}>
          {selected.headingLines.map((line) => <span key={line} className="block">{line}</span>)}
        </h2>
        <p style={{ borderTop: "1px solid #d8d5cc", paddingTop: "1.15rem", fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.4vw, 1.3rem)", lineHeight: 1.55, color: "var(--color-nursery-stone)", maxWidth: "520px", margin: 0 }}>
          {selected.body}
        </p>
      </div>
    </DetailFrame>
  )
}
