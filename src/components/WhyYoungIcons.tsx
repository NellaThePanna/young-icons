"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import { WHY_YOUNG_ICONS } from "@/content/nurseries-about"

const DEEP_GREEN = "#04291A"
const ECRU = "#F4F2EC"
const HAIRLINE = "#d8d5cc"
const LIME = "#9ad64d"

type CardItem = typeof WHY_YOUNG_ICONS[number]

// nova-debt: real "teacher and children" photo (referenced as
// 04-fully-managed-teacher-and-children.png in the handoff doc) was never supplied —
// reusing the existing obstacle-course.jpg placeholder until it arrives.
const FULLY_MANAGED_IMAGE = "/images/placeholder/obstacle-course.jpg"

// Approved One Partner selected-state copy (one-partner-handoff package, 2026-08-25).
// AI-generated photograph explicitly approved by the client for this state only.
const ONE_PARTNER_IMAGE = "/images/nursery/one-partner-coach-huddle.jpg"
const ONE_PARTNER_COPY = {
  headingLines: ["EVERY ACTIVITY.", "ONE RELATIONSHIP."],
  bodyPrimary: "One trusted provider for your nursery's sports and physical activity programmes.",
  bodySecondary:
    "We take care of everything — planning, delivery, payment and communication — so you can focus on what matters most.",
  values: [
    { icon: "partner" as const, label: "One trusted provider" },
    { icon: "clipboard" as const, label: "Multiple programmes" },
    { icon: "target" as const, label: "Consistent quality" },
    { icon: "clock" as const, label: "Saves you time" },
  ],
}

// Approved Music selected-state copy (music-handoff package, 2026-08-25).
// The "20-MINUTE SESSION" title vs "30-minute" body wording is a known inconsistency
// in the supplied copy — the handoff explicitly says not to silently correct it.
const MUSIC_IMAGE = "/images/placeholder/Music_Teacher_Children_Web.webp"
const MUSIC_COPY = {
  headingLines: ["MUSIC.", "MOVEMENT.", "DISCOVERY."],
  body: "A playful early-years music programme where children explore rhythm, sound, instruments, singing and movement through specialist-led sessions.",
  railEyebrow: "NURSERY-FUNDED PROGRAMMES",
  programmes: [
    {
      icon: "note" as const,
      title: "20-MINUTE SESSION",
      bodyPrimary: "A standalone 30-minute music experience designed especially for early years.",
      bodySecondary: "Perfect for enrichment days, special events, themed weeks or as an introduction to Icons in Rhythm.",
    },
    {
      icon: "calendar" as const,
      title: "4-WEEK PROGRAMME",
      bodyPrimary: "A short progressive introduction to music with one 30-minute specialist-led session each week.",
      bodySecondary: "Children explore a different element of music each week.",
    },
    {
      icon: "infinity" as const,
      title: "ONGOING / TERM PROGRAMME",
      bodyPrimary: "A progressive early-years music programme with weekly specialist-led sessions throughout the term.",
      bodySecondary: "Progressive music learning tailored to your nursery.",
    },
  ],
}

// Approved Tailored Programmes selected-state copy and geometry
// (tailored-programmes-handoff package, 2026-08-25, tailored-programmes-final-settings.json).
// Footer cell widths (34% / 25% / 41%) are a deliberate approved asymmetry — the drag-editor's
// default is equal thirds, but the exported settings moved the boundary off-center.
const TAILORED_PROGRAMMES_IMAGE = "/images/placeholder/tailored-programmes-classroom-clean.png"
const TAILORED_PROGRAMMES_COPY = {
  headingLines: ["DESIGNED", "AROUND YOUR", "NURSERY", "YOUR CHILDREN", "AND YOUR GOALS."],
  body: "Programmes built around your nursery's needs, aligned with early years development and learning goals.",
  railEyebrow: "NURSERY-FUNDED PROGRAMMES",
  programmes: [
    { icon: "clipboard" as const, title: "PE CURRICULUM", body: "Structured lesson plans with clear learning objectives." },
    { icon: "target" as const, title: "LEARNING OUTCOMES", body: "Every programme has measurable developmental goals." },
    { icon: "bars" as const, title: "PROGRESS REPORTS", body: "Track each child's progress throughout the year." },
    { icon: "card" as const, title: "DIGITAL REGISTRATION & ATTENDANCE", body: "Simple online registration and live attendance tracking." },
  ],
  footerCells: [
    { icon: "note" as const, label: "PLAY", width: 34 },
    { icon: "smile" as const, label: "LEARN", width: 25 },
    { icon: "star" as const, label: "GROW", width: 41 },
  ],
}

// Approved selected-state copy for the Movement & Sport mosaic (nursery-movement-sport-final-handoff,
// FINAL_SETTINGS.json). Kept local here rather than in nurseries-about.ts per that handoff's scope.
const MOVEMENT_SPORT_COPY = {
  headingLines: ["MOVEMENT.", "SPORT.", "SKILLS FOR LIFE."],
  body: "Specialist-led programmes that build confidence, coordination and character through movement and sport.",
}

type MosaicTileData = { src: string; cropX: number; cropY: number; bubbleX: number; icon: IconKey; title: string; subtitle?: string }

const MOVEMENT_TOP_TILES: (MosaicTileData & { widthFr: number })[] = [
  { src: "/images/nursery/movement-sport/play-in-motion.jpg", cropX: 40, cropY: 18, bubbleX: 50, icon: "motion", title: "Play in Motion", subtitle: "Multi-Sport Movement", widthFr: 2.2 },
  { src: "/images/nursery/movement-sport/move-and-groove.jpg", cropX: 50, cropY: 15, bubbleX: 57, icon: "ribbon", title: "Move & Groove", subtitle: "Ballet · Dance · Gymnastics", widthFr: 2.3 },
  { src: "/images/nursery/movement-sport/little-warriors.jpg", cropX: 48, cropY: 22, bubbleX: 59, icon: "target", title: "Little Warriors", subtitle: "Martial Arts", widthFr: 3 },
]

const MOVEMENT_BOTTOM_TILES: MosaicTileData[] = [
  { src: "/images/nursery/movement-sport/football.jpg", cropX: 55, cropY: 38, bubbleX: 46, icon: "ball", title: "Football" },
  { src: "/images/nursery/movement-sport/ballet.jpg", cropX: 50, cropY: 25, bubbleX: 50, icon: "ribbon", title: "Ballet" },
  { src: "/images/nursery/movement-sport/karate.jpg", cropX: 50, cropY: 18, bubbleX: 49, icon: "target", title: "Karate" },
  { src: "/images/nursery/movement-sport/gymnastics.jpg", cropX: 50, cropY: 28, bubbleX: 47, icon: "ribbon", title: "Gymnastics" },
]

type IconKey = "clipboard" | "chat" | "calendar" | "bars" | "partner" | "people" | "clock" | "note" | "target" | "card" | "smile" | "star" | "ball" | "ribbon" | "motion" | "infinity"

const ICON_PATHS: Record<IconKey, ReactNode> = {
  clipboard: (
    <>
      <rect x="7" y="6" width="18" height="22" rx="2" />
      <path d="M12 6V4h8v2M11 13h10M11 18h10M11 23h6M21 22l1.5 1.5L26 19" />
    </>
  ),
  chat: (
    <>
      <path d="M5 7h17a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4H13l-6 5v-5.3A4 4 0 0 1 5 18V7Z" />
      <path d="M10 14h11M10 18h7" />
    </>
  ),
  calendar: (
    <>
      <rect x="5" y="7" width="22" height="20" rx="2" />
      <path d="M10 4v6M22 4v6M5 13h22M11 19h4M11 23h8" />
    </>
  ),
  bars: <path d="M5 27h22M8 27V18h4v9M15 27V12h4v15M22 27V6h4v21" />,
  partner: (
    <path d="M4 15.5 9.2 10l4 4M28 15.5 22.8 10l-4 4M9.2 14l4 4 2.8-2.8L18.8 18l-2.2 2.2 1.8 1.8c-1.1 1.1-2.6 1.1-3.7 0l-1.1-1.1M13.2 18l-1.1 1.1c-1.1 1.1-2.6 1.1-3.7 0M11 16l-1 1c-1.1 1.1-2.6 1.1-3.7 0" />
  ),
  people: (
    <>
      <circle cx="16" cy="11" r="4" />
      <path d="M8 27c.7-5 3.3-7 8-7s7.3 2 8 7M6.5 17.5a3.5 3.5 0 1 1 2.2-6.2M25.5 17.5a3.5 3.5 0 1 0-2.2-6.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 9v7l5 3" />
    </>
  ),
  note: (
    <>
      <path d="M13 25V9l13-3v15M13 13l13-3" />
      <circle cx="9" cy="25" r="4" />
      <circle cx="22" cy="21" r="4" />
    </>
  ),
  target: (
    <>
      <circle cx="15" cy="17" r="10" />
      <circle cx="15" cy="17" r="5" />
      <circle cx="15" cy="17" r="1.5" />
      <path d="m20 12 8-8M23 4h5v5" />
    </>
  ),
  card: (
    <>
      <rect x="4" y="7" width="24" height="18" rx="2" />
      <circle cx="11" cy="14" r="2.5" />
      <path d="M7.5 21c.8-2.2 2-3.2 3.5-3.2s2.7 1 3.5 3.2M18 13h6M18 18h6" />
    </>
  ),
  smile: (
    <>
      <circle cx="16" cy="16" r="11" />
      <path d="M11.5 19c1.2 2 2.8 3 4.5 3s3.3-1 4.5-3M12 12h.1M20 12h.1" />
    </>
  ),
  star: <path d="m16 4 3.5 8 8.5.7-6.5 5.5 2 8.3-7.5-4.5-7.5 4.5 2-8.3-6.5-5.5 8.5-.7L16 4Z" />,
  ball: (
    <>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 10.5 19.5 13l-1.3 4.3h-4.4L12.5 13Z M16 10.5V7 M19.5 13l3.3-1.2 M12.5 13l-3.3-1.2 M14.2 17.3l-1.8 3.9 M17.8 17.3l1.8 3.9" />
    </>
  ),
  ribbon: (
    <path d="M6 11c4.5 0 4.5 6.5 9 6.5S18.5 11 23 11M6 21c4.5 0 4.5-6.5 9-6.5s4.5 6.5 9 6.5" />
  ),
  motion: <path d="M7 22 14 15 7 8M15 22l7-7-7-7" />,
  infinity: (
    <>
      <circle cx="11" cy="16" r="6" />
      <circle cx="21" cy="16" r="6" />
    </>
  ),
}

function Icon({ icon, className }: { icon: IconKey; className: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth={1.65} strokeLinecap="round" strokeLinejoin="round">
      {ICON_PATHS[icon]}
    </svg>
  )
}

export default function WhyYoungIcons() {
  const [selectedId, setSelectedId] = useState<string | null>("one-partner")
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const skipFocusRef = useRef(true)

  const activeItem = selectedId ? WHY_YOUNG_ICONS.find((item) => item.id === selectedId) ?? null : null

  useEffect(() => {
    if (!selectedId) return
    if (skipFocusRef.current) {
      skipFocusRef.current = false
      return
    }
    closeButtonRef.current?.focus()
  }, [selectedId])

  useEffect(() => {
    if (!selectedId) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  function handleClose() {
    if (selectedId) cardRefs.current[selectedId]?.focus()
    setSelectedId(null)
  }

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

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {WHY_YOUNG_ICONS.map((item) => (
            <CardTab
              key={item.id}
              item={item}
              isActive={selectedId === item.id}
              onSelect={() => setSelectedId(item.id)}
              buttonRef={(el) => {
                cardRefs.current[item.id] = el
              }}
            />
          ))}
        </div>

        {activeItem && <DetailPanel item={activeItem} onClose={handleClose} closeButtonRef={closeButtonRef} />}
      </div>
    </section>
  )
}

function CardTab({
  item,
  isActive,
  onSelect,
  buttonRef,
}: {
  item: CardItem
  isActive: boolean
  onSelect: () => void
  buttonRef: (el: HTMLButtonElement | null) => void
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onSelect}
      aria-expanded={isActive}
      aria-controls="why-young-icons-panel"
      className="group relative min-h-[92px] rounded p-4 text-left transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:min-h-[104px] sm:p-5"
      style={{
        backgroundColor: isActive ? DEEP_GREEN : "#f8f7f2",
        color: isActive ? "#fff" : "var(--color-black)",
        border: 0,
        cursor: "pointer",
      }}
    >
      <span style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-bold)", fontSize: "0.68rem" }}>{item.number}</span>
      <span
        className="mt-2.5 block pr-6"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(0.92rem, 1.4vw, 1.2rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
        }}
      >
        {item.label}
      </span>
      <span
        aria-hidden="true"
        className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-sm sm:right-4 sm:top-4"
        style={{ border: "1px solid currentColor" }}
      >
        {isActive ? "−" : "+"}
      </span>
    </button>
  )
}

function DetailPanel({
  item,
  onClose,
  closeButtonRef,
}: {
  item: CardItem
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
}) {
  if (item.id === "one-partner") {
    return <OnePartnerPanel onClose={onClose} closeButtonRef={closeButtonRef} />
  }

  if (item.id === "multiple-activities") {
    return <MovementSportPanel onClose={onClose} closeButtonRef={closeButtonRef} />
  }

  if (item.id === "music") {
    return <MusicPanel onClose={onClose} closeButtonRef={closeButtonRef} />
  }

  if (item.id === "tailored-programmes") {
    return <TailoredProgrammesPanel onClose={onClose} closeButtonRef={closeButtonRef} />
  }

  if (item.id === "fully-managed" && "points" in item) {
    return <FullyManagedPanel item={item} onClose={onClose} closeButtonRef={closeButtonRef} />
  }

  return null
}

function PlayLearnGrowRail({ floating = false }: { floating?: boolean }) {
  const items: { icon: IconKey; label: string }[] = [
    { icon: "note", label: "PLAY" },
    { icon: "smile", label: "LEARN" },
    { icon: "star", label: "GROW" },
  ]

  return (
    <div
      className={floating ? "absolute inset-x-0 bottom-0 z-20 flex" : "flex"}
      style={{ width: floating ? "68%" : "100%", height: "76px", backgroundColor: DEEP_GREEN, color: "#fff" }}
    >
      {items.map((rowItem, index) => (
        <span
          key={rowItem.label}
          className="flex flex-1 items-center justify-center gap-2 px-2"
          style={{ borderRight: index < items.length - 1 ? "1px solid rgba(255,255,255,0.35)" : undefined, fontSize: "0.85rem", fontWeight: 700 }}
        >
          <span style={{ color: LIME }}>
            <Icon icon={rowItem.icon} className="h-5 w-5" />
          </span>
          <span>{rowItem.label}</span>
        </span>
      ))}
    </div>
  )
}

function MovementSportPanel({
  onClose,
  closeButtonRef,
}: {
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
}) {
  return (
    <div
      id="why-young-icons-panel"
      role="region"
      aria-label="Multiple Activities"
      className="relative mt-6 overflow-hidden rounded-md sm:mt-8"
      style={{ border: `1px solid ${HAIRLINE}`, backgroundColor: ECRU }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close Multiple Activities detail"
        className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:right-6 sm:top-6"
        style={{ border: "1px solid var(--color-black)", background: "transparent", color: "var(--color-black)", cursor: "pointer" }}
      >
        ×
      </button>

      <div className="flex flex-col lg:flex-row">
        <div
          className="flex flex-col justify-center px-6 py-10 sm:px-9 sm:py-12 lg:w-[35%] lg:justify-start lg:px-10 lg:py-0 lg:pt-[63px]"
          style={{ backgroundColor: DEEP_GREEN, color: "#fff" }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 0.9rem" }}>
            02 — MULTIPLE ACTIVITIES
          </p>
          <h2
            style={{
              fontFamily: "var(--font-anton)",
              fontWeight: 400,
              fontSize: "45px",
              lineHeight: 1.01,
              letterSpacing: "0.001em",
              textAlign: "left",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {MOVEMENT_SPORT_COPY.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <span aria-hidden="true" className="block" style={{ width: "48px", height: "1px", backgroundColor: "rgba(255,255,255,0.55)", margin: "1.1rem 0" }} />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", lineHeight: 1.5, color: "#fff", maxWidth: "360px", margin: 0 }}>
            {MOVEMENT_SPORT_COPY.body}
          </p>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex">
            {MOVEMENT_TOP_TILES.map((tile, index) => (
              <MosaicTile
                key={tile.title}
                tile={tile}
                flexGrow={tile.widthFr}
                heightClass="h-[220px] sm:h-[240px] lg:h-[291px]"
                clipSide={index === 0 ? "right" : index === MOVEMENT_TOP_TILES.length - 1 ? "left" : "both"}
                overlapLeft={index > 0}
              />
            ))}
          </div>
          <div className="flex">
            {MOVEMENT_BOTTOM_TILES.map((tile) => (
              <MosaicTile key={tile.title} tile={tile} flexGrow={1} heightClass="h-[190px] sm:h-[200px] lg:h-[233px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MosaicTile({
  tile,
  flexGrow,
  heightClass,
  clipSide,
  overlapLeft = false,
}: {
  tile: MosaicTileData
  flexGrow: number
  heightClass: string
  clipSide?: "right" | "left" | "both"
  overlapLeft?: boolean
}) {
  const clipClass =
    clipSide === "right"
      ? "lg:[clip-path:polygon(0_0,100%_0,calc(100%-24px)_100%,0_100%)]"
      : clipSide === "left"
        ? "lg:[clip-path:polygon(24px_0,100%_0,100%_100%,0_100%)]"
        : clipSide === "both"
          ? "lg:[clip-path:polygon(24px_0,100%_0,calc(100%-24px)_100%,0_100%)]"
          : ""

  return (
    <div
      className={`relative overflow-hidden ${heightClass} ${clipClass} ${overlapLeft ? "lg:-ml-6" : ""}`}
      style={{
        flexGrow,
        flexBasis: 0,
        backgroundImage: `url(${tile.src})`,
        backgroundSize: "cover",
        backgroundPosition: `${tile.cropX}% ${tile.cropY}%`,
      }}
    >
      <MosaicBubble tile={tile} />
    </div>
  )
}

function MosaicBubble({ tile }: { tile: MosaicTileData }) {
  return (
    <div
      className="absolute z-10 flex max-w-[94%] items-center gap-1 rounded-full px-1.5 py-1 sm:gap-1.5 sm:px-2.5 sm:py-1.5 lg:gap-2 lg:px-3.5 lg:py-2"
      style={{ left: `${tile.bubbleX}%`, bottom: "35px", transform: "translateX(-50%)", width: "max-content", backgroundColor: DEEP_GREEN, color: "#fff" }}
    >
      <span
        aria-hidden="true"
        className="flex shrink-0 items-center justify-center rounded-full h-[13px] w-[13px] sm:h-4 sm:w-4 lg:h-[18px] lg:w-[18px]"
        style={{ border: "1px solid rgba(255,255,255,0.6)" }}
      >
        <Icon icon={tile.icon} className="h-[7px] w-[7px] sm:h-2 sm:w-2 lg:h-2.5 lg:w-2.5" />
      </span>
      <span className="flex min-w-0 flex-col" style={{ lineHeight: 1.2 }}>
        <span
          className="whitespace-nowrap break-words text-[6.5px] sm:whitespace-normal sm:text-[9px] lg:text-[10px]"
          style={{ fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "0.01em", textTransform: "uppercase" }}
        >
          {tile.title}
        </span>
        {tile.subtitle && (
          <span className="break-words text-[7px] sm:text-[7.5px] lg:text-[8px]" style={{ fontFamily: "var(--font-body)", opacity: 0.85 }}>
            {tile.subtitle}
          </span>
        )}
      </span>
    </div>
  )
}

type FullyManagedPoint = { number: string; icon: IconKey; label: string; body: string }

function FullyManagedPanel({
  item,
  onClose,
  closeButtonRef,
}: {
  item: CardItem
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
}) {
  const points: readonly FullyManagedPoint[] = "points" in item ? item.points : []
  const headingLines = ["EVERYTHING,", "TAKEN", "CARE OF."]

  return (
    <div
      id="why-young-icons-panel"
      role="region"
      aria-label={item.label}
      className="relative mt-6 overflow-hidden rounded-md sm:mt-8"
      style={{ border: `1px solid ${HAIRLINE}`, backgroundColor: ECRU }}
    >
      {/* Mobile / tablet — stacked */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${item.label} detail`}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]"
          style={{ border: "1px solid var(--color-black)", background: "transparent", color: "var(--color-black)", cursor: "pointer" }}
        >
          ×
        </button>
        <div className="relative h-[260px] w-full overflow-hidden sm:h-[320px]">
          <Image
            src={FULLY_MANAGED_IMAGE}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "29% 58%", transform: "scale(1.14)" }}
          />
        </div>
        <div className="px-6 py-9 sm:px-8" style={{ backgroundColor: DEEP_GREEN, color: "#fff" }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1rem" }}>
            {item.number} — {item.label}
          </p>
          <h2 style={{ fontFamily: "var(--font-anton)", fontWeight: 400, fontSize: "clamp(2.2rem, 9vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.006em", margin: 0, textTransform: "uppercase" }}>
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <span aria-hidden="true" className="block" style={{ width: "min(300px, 100%)", height: "1px", backgroundColor: "rgba(255,255,255,0.55)", margin: "1.2rem 0" }} />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.5, color: "#fff", margin: 0 }}>{item.body}</p>
        </div>
        <div className="px-6 py-6 sm:px-8" style={{ backgroundColor: DEEP_GREEN }}>
          <FullyManagedRail />
        </div>
        <div className="px-6 py-8 sm:px-8">
          <FullyManagedRows points={points} />
        </div>
      </div>

      {/* Desktop — exact 530px three-field composition */}
      <div className="hidden lg:flex" style={{ height: "530px" }}>
        <div
          className="relative flex flex-col justify-start"
          style={{
            flex: "0 0 30%",
            backgroundColor: DEEP_GREEN,
            color: "#fff",
            zIndex: 2,
            clipPath: "polygon(0 0, 100% 0, calc(100% - 72px) 100%, 0 100%)",
            paddingTop: "55px",
          }}
        >
          <div className="px-10" style={{ transform: "translate(-20px, 8px)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1rem" }}>
              {item.number} — {item.label}
            </p>
            <h2 style={{ fontFamily: "var(--font-anton)", fontWeight: 400, fontSize: "62px", lineHeight: 1.08, letterSpacing: "-0.006em", margin: 0, textTransform: "uppercase" }}>
              {headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <span aria-hidden="true" className="block" style={{ width: "300px", height: "1px", backgroundColor: "rgba(255,255,255,0.55)", margin: "1.3rem 0" }} />
            <p style={{ fontFamily: "var(--font-body)", fontSize: "16.5px", lineHeight: 1.5, color: "#fff", maxWidth: "300px", margin: 0 }}>{item.body}</p>
          </div>
          <div className="absolute inset-x-0 px-10" style={{ bottom: "24px" }}>
            <FullyManagedRail />
          </div>
        </div>

        <div className="relative overflow-hidden" style={{ flex: "0 0 41%", marginLeft: "-72px", zIndex: 1 }}>
          <Image
            src={FULLY_MANAGED_IMAGE}
            alt=""
            fill
            sizes="41vw"
            className="object-cover"
            style={{ objectPosition: "29% 58%", transform: "scale(1.14)" }}
          />
        </div>

        <div className="relative overflow-y-auto px-9 pb-8 pt-16" style={{ flex: "1 1 0%", backgroundColor: ECRU }}>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={`Close ${item.label} detail`}
            className="absolute right-6 top-6 z-30 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]"
            style={{ border: "1px solid var(--color-black)", background: "transparent", color: "var(--color-black)", cursor: "pointer" }}
          >
            ×
          </button>
          <div style={{ transform: "translate(-7px, -2px)" }}>
            <FullyManagedRows points={points} />
          </div>
        </div>
      </div>
    </div>
  )
}

function FullyManagedRail() {
  const items: { icon: IconKey; label: string }[] = [
    { icon: "note", label: "PLAY" },
    { icon: "smile", label: "LEARN" },
    { icon: "star", label: "GROW" },
  ]

  return (
    <div className="flex items-center justify-center">
      {items.map((rowItem, index) => (
        <div
          key={rowItem.label}
          className="flex flex-1 flex-col items-center gap-2 px-2"
          style={{ borderRight: index < items.length - 1 ? "1px solid rgba(255,255,255,0.3)" : undefined, color: "#fff" }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ border: "1px solid rgba(255,255,255,0.6)" }}>
            <Icon icon={rowItem.icon} className="h-4 w-4" />
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.08em" }}>{rowItem.label}</span>
        </div>
      ))}
    </div>
  )
}

function FullyManagedRows({ points }: { points: readonly FullyManagedPoint[] }) {
  return (
    <div>
      {points.map((point, index) => (
        <div
          key={point.number}
          className="flex items-start gap-3"
          style={{
            paddingTop: index === 0 ? 0 : "19px",
            paddingBottom: "19px",
            borderBottom: index < points.length - 1 ? `1px solid ${HAIRLINE}` : undefined,
          }}
        >
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: DEEP_GREEN, flexShrink: 0, marginTop: "2px" }}>{point.number}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ border: `1px solid ${DEEP_GREEN}`, color: DEEP_GREEN, flexShrink: 0 }}>
            <Icon icon={point.icon} className="h-4 w-4" />
          </span>
          <div>
            <h3 style={{ fontFamily: "var(--font-nursery-hero)", fontWeight: 600, fontSize: "17px", lineHeight: 1.15, color: "var(--color-black)", margin: "0 0 0.3rem" }}>
              {point.label}
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10.25px", lineHeight: 1.4, color: "var(--color-nursery-stone)", margin: 0 }}>{point.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function OnePartnerPanel({
  onClose,
  closeButtonRef,
}: {
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
}) {
  return (
    <div
      id="why-young-icons-panel"
      role="region"
      aria-label="One Partner"
      className="relative mt-6 overflow-hidden rounded-md sm:mt-8"
      style={{ border: `1px solid ${HAIRLINE}`, minHeight: "560px" }}
    >
      <Image
        src={ONE_PARTNER_IMAGE}
        alt="A Young Icons coach leading a nursery sports session with a circle of children"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "fill" }}
      />

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, #04291A 0%, #04291A 25%, rgba(4,41,26,0) 55%)" }}
        aria-hidden="true"
      />

      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close One Partner detail"
        className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:right-6 sm:top-6"
        style={{ border: "1px solid #fff", background: "transparent", color: "#fff", cursor: "pointer" }}
      >
        ×
      </button>

      <div
        className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-9 lg:px-12"
        style={{ minHeight: "560px" }}
      >
        <div style={{ maxWidth: "325px" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#fff",
              margin: "0 0 1.1rem",
            }}
          >
            01 — One Partner
          </p>
          <h2
            style={{
              fontFamily: "var(--font-anton)",
              fontWeight: 400,
              fontSize: "clamp(2.05rem, 9vw, 51px)",
              lineHeight: 1.04,
              letterSpacing: "-0.031em",
              color: "#fff",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {ONE_PARTNER_COPY.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <span aria-hidden="true" className="block" style={{ width: "325px", maxWidth: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.6)", margin: "1.3rem 0" }} />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "12.75px", lineHeight: 1.48, color: "#fff", maxWidth: "325px", margin: "0 0 0.9rem" }}>
            {ONE_PARTNER_COPY.bodyPrimary}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "12.75px", lineHeight: 1.48, color: "rgba(255,255,255,0.85)", maxWidth: "325px", margin: "0 0 1.6rem" }}>
            {ONE_PARTNER_COPY.bodySecondary}
          </p>
          <div className="grid grid-cols-4 gap-3">
            {ONE_PARTNER_COPY.values.map((value) => (
              <div key={value.label} className="flex flex-col items-start gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ border: `1.5px solid ${LIME}`, color: LIME }}
                >
                  <Icon icon={value.icon} className="h-4 w-4" />
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", lineHeight: 1.25, color: "#fff" }}>{value.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MusicPanel({
  onClose,
  closeButtonRef,
}: {
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
}) {
  return (
    <div
      id="why-young-icons-panel"
      role="region"
      aria-label="Music"
      className="relative mt-6 overflow-hidden rounded-md sm:mt-8"
      style={{ border: `1px solid ${HAIRLINE}`, backgroundColor: ECRU }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close Music detail"
        className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:right-6 sm:top-6"
        style={{ border: "1px solid var(--color-black)", background: "transparent", color: "var(--color-black)", cursor: "pointer" }}
      >
        ×
      </button>

      {/* Mobile / tablet — stacked */}
      <div className="lg:hidden">
        <div className="px-6 py-9 sm:px-8" style={{ backgroundColor: DEEP_GREEN, color: "#fff" }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1.1rem" }}>
            03 — Music
          </p>
          <h2 style={{ fontFamily: "var(--font-anton)", fontWeight: 400, fontSize: "clamp(1.9rem, 9vw, 2.8rem)", lineHeight: 0.98, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>
            {MUSIC_COPY.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.45, color: "#fff", maxWidth: "420px", margin: "1.35rem 0 0", borderTop: "1px solid rgba(255,255,255,0.35)", paddingTop: "1.1rem" }}>
            {MUSIC_COPY.body}
          </p>
        </div>
        <div className="relative h-[240px] w-full overflow-hidden sm:h-[300px]">
          <Image src={MUSIC_IMAGE} alt="Early-years music teacher playing instruments with four nursery children." fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 37%" }} />
        </div>
        <PlayLearnGrowRail />
        <div className="px-6 py-8 sm:px-8">
          <MusicRail />
        </div>
      </div>

      {/* Desktop — 520px composition */}
      <div className="hidden lg:flex" style={{ height: "520px" }}>
        <div className="relative flex flex-1 flex-col" style={{ flex: "0 0 69%" }}>
          <div className="relative flex" style={{ height: "434px" }}>
            <div
              className="relative flex flex-col justify-center px-9 xl:px-11"
              style={{
                flex: "0 0 40%",
                zIndex: 2,
                backgroundColor: DEEP_GREEN,
                color: "#fff",
                clipPath: "polygon(0 0, 100% 0, calc(100% - 39px) 100%, 0 100%)",
              }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1.1rem" }}>
                03 — Music
              </p>
              <h2 style={{ fontFamily: "var(--font-anton)", fontWeight: 400, fontSize: "clamp(2.2rem, 3.2vw, 59px)", lineHeight: 0.98, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase", maxWidth: "212px" }}>
                {MUSIC_COPY.headingLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <span aria-hidden="true" className="block" style={{ width: "78%", height: "1px", backgroundColor: "rgba(255,255,255,0.55)", margin: "1.2rem 0" }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.45, color: "#fff", maxWidth: "230px", margin: 0 }}>
                {MUSIC_COPY.body}
              </p>
            </div>
            <div className="relative overflow-hidden" style={{ flex: "1 1 0%", marginLeft: "-39px", zIndex: 1 }}>
              <Image
                src={MUSIC_IMAGE}
                alt="Early-years music teacher playing instruments with four nursery children."
                fill
                sizes="69vw"
                className="object-cover"
                style={{ objectPosition: "50% 37%" }}
              />
            </div>
          </div>
          <div style={{ height: "86px" }}>
            <PlayLearnGrowRail />
          </div>
        </div>

        <div className="relative overflow-y-auto px-7 py-5 xl:px-8" style={{ flex: "0 0 31%", backgroundColor: ECRU }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: DEEP_GREEN, margin: "0 0 0.4rem" }}>
            {MUSIC_COPY.railEyebrow}
          </p>
          <span aria-hidden="true" className="mb-3 block" style={{ width: "40px", height: "2px", backgroundColor: LIME }} />
          <MusicRail />
        </div>
      </div>
    </div>
  )
}

function MusicRail() {
  return (
    <div className="flex flex-col" style={{ gap: "6px" }}>
      {MUSIC_COPY.programmes.map((programme) => (
        <div
          key={programme.title}
          className="rounded-md"
          style={{ border: `1px solid ${HAIRLINE}`, backgroundColor: "#fff", padding: "8px" }}
        >
          <div className="flex items-start gap-2">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: DEEP_GREEN, color: "#fff" }}
            >
              <Icon icon={programme.icon} className="h-3.5 w-3.5" />
            </span>
            <div>
              <h3 style={{ fontFamily: "var(--font-nursery-hero)", fontWeight: 600, fontSize: "0.76rem", lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--color-black)", margin: "0.1rem 0 0.25rem" }}>
                {programme.title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", lineHeight: 1.3, color: "var(--color-nursery-stone)", margin: 0 }}>
                {programme.bodyPrimary}
              </p>
              <span aria-hidden="true" className="my-1 block" style={{ width: "20px", height: "1.5px", backgroundColor: "var(--color-academy-green)" }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", lineHeight: 1.3, color: "var(--color-nursery-stone)", margin: 0 }}>
                {programme.bodySecondary}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TailoredProgrammesPanel({
  onClose,
  closeButtonRef,
}: {
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
}) {
  return (
    <div
      id="why-young-icons-panel"
      role="region"
      aria-label="Tailored Programmes"
      className="relative mt-6 overflow-hidden rounded-md sm:mt-8"
      style={{ border: `1px solid ${HAIRLINE}`, backgroundColor: ECRU }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close Tailored Programmes detail"
        className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:right-6 sm:top-6"
        style={{ border: "1px solid var(--color-black)", background: "transparent", color: "var(--color-black)", cursor: "pointer" }}
      >
        ×
      </button>

      {/* Mobile / tablet — stacked */}
      <div className="lg:hidden">
        <div className="px-6 py-9 sm:px-8" style={{ backgroundColor: DEEP_GREEN, color: "#fff" }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1.1rem" }}>
            04 — Tailored Programmes
          </p>
          <h2 style={{ fontFamily: "var(--font-anton)", fontWeight: 400, fontSize: "clamp(1.9rem, 9vw, 2.8rem)", lineHeight: 0.94, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>
            {TAILORED_PROGRAMMES_COPY.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.45, color: "#fff", maxWidth: "420px", margin: "1.35rem 0 0", borderTop: "1px solid rgba(255,255,255,0.35)", paddingTop: "1.1rem" }}>
            {TAILORED_PROGRAMMES_COPY.body}
          </p>
        </div>
        <div className="relative h-[240px] w-full overflow-hidden sm:h-[300px]" style={{ aspectRatio: "4 / 3" }}>
          <Image
            src={TAILORED_PROGRAMMES_IMAGE}
            alt="Teacher guiding five nursery children through a classroom learning activity"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "100% 8.182888761355988%" }}
          />
        </div>
        <TailoredProgrammesFooter />
        <div className="px-6 py-8 sm:px-8">
          <TailoredProgrammesRail />
        </div>
      </div>

      {/* Desktop — 654px composition */}
      <div className="hidden lg:flex" style={{ height: "654px" }}>
        <div className="relative flex flex-1 flex-col" style={{ flex: "0 0 75%" }}>
          <div className="relative flex" style={{ height: "559.375px" }}>
            <div
              className="relative flex flex-col justify-start px-2 pt-[63px] xl:px-11"
              style={{
                flex: "0 0 42.6667%",
                zIndex: 2,
                backgroundColor: DEEP_GREEN,
                color: "#fff",
                clipPath: "polygon(0 0, 100% 0, calc(100% - 44px) 100%, 0 100%)",
              }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1.1rem" }}>
                04 — Tailored Programmes
              </p>
              <h2 style={{ fontFamily: "var(--font-anton)", fontWeight: 400, fontSize: "44px", lineHeight: 0.94, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>
                {TAILORED_PROGRAMMES_COPY.headingLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <span aria-hidden="true" className="block" style={{ width: "72%", height: "1px", backgroundColor: "rgba(154,214,77,0.65)", margin: "1.2rem 0" }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.45, color: "#fff", maxWidth: "214px", margin: 0 }}>
                {TAILORED_PROGRAMMES_COPY.body}
              </p>
            </div>
            <div className="relative overflow-hidden" style={{ flex: "1 1 0%", marginLeft: "-44px", zIndex: 1 }}>
              <Image
                src={TAILORED_PROGRAMMES_IMAGE}
                alt="Teacher guiding five nursery children through a classroom learning activity"
                fill
                sizes="43vw"
                className="object-cover"
                style={{ objectPosition: "100% 8.182888761355988%" }}
              />
            </div>
          </div>
          <TailoredProgrammesFooter />
        </div>

        <div className="relative flex flex-col overflow-y-auto px-3 py-7 xl:px-9" style={{ flex: "0 0 25%", backgroundColor: ECRU }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: DEEP_GREEN, margin: "0 0 0.4rem" }}>
            {TAILORED_PROGRAMMES_COPY.railEyebrow}
          </p>
          <span aria-hidden="true" className="mb-4 block" style={{ width: "36px", height: "2px", backgroundColor: DEEP_GREEN }} />
          <TailoredProgrammesRail />
        </div>
      </div>
    </div>
  )
}

function TailoredProgrammesFooter() {
  return (
    <div className="flex" style={{ height: "94.6249885559082px", backgroundColor: DEEP_GREEN, color: "#fff" }}>
      {TAILORED_PROGRAMMES_COPY.footerCells.map((cell, index) => (
        <div
          key={cell.label}
          className="flex items-center justify-center gap-1.5 sm:gap-2"
          style={{
            flex: `0 0 ${cell.width}%`,
            borderRight: index < TAILORED_PROGRAMMES_COPY.footerCells.length - 1 ? "1px solid rgba(154,214,77,0.55)" : undefined,
            transform: "translateY(20px)",
          }}
        >
          <span style={{ color: LIME }}>
            <Icon icon={cell.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
          </span>
          <span className="text-base sm:text-lg" style={{ fontFamily: "var(--font-body)", fontWeight: 800, letterSpacing: "0.02em" }}>{cell.label}</span>
        </div>
      ))}
    </div>
  )
}

function TailoredProgrammesRail() {
  return (
    <div className="flex flex-1 flex-col justify-between">
      {TAILORED_PROGRAMMES_COPY.programmes.map((programme, index) => (
        <div
          key={programme.title}
          className="grid items-start grid-cols-[30px_68px_minmax(0,1fr)] gap-4 py-6 lg:grid-cols-[26px_52px_minmax(0,1fr)] lg:gap-2 lg:py-3"
          style={{
            borderBottom: `1px solid ${HAIRLINE}`,
            borderTop: index === 0 ? `1px solid ${HAIRLINE}` : undefined,
          }}
        >
          <span
            className="flex h-[27px] w-[27px] items-center justify-center rounded-full"
            style={{ border: `1px solid ${DEEP_GREEN}`, color: DEEP_GREEN, fontFamily: "var(--font-body)", fontSize: "0.68rem" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl lg:h-[52px] lg:w-[52px]"
            style={{ backgroundColor: "#ECEBE4", color: DEEP_GREEN }}
          >
            <Icon icon={programme.icon} className="h-[34px] w-[34px] lg:h-[26px] lg:w-[26px]" />
          </span>
          <div className="min-w-0">
            <h3 className="mb-2 lg:mb-1" style={{ fontFamily: "var(--font-nursery-hero)", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--color-black)", marginTop: "0.1rem", textTransform: "uppercase", overflowWrap: "break-word" }}>
              {programme.title}
            </h3>
            <p className="text-[0.81rem] leading-[1.45] lg:text-[0.76rem] lg:leading-[1.3]" style={{ fontFamily: "var(--font-body)", color: "var(--color-nursery-stone)", margin: 0, overflowWrap: "break-word" }}>
              {programme.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
