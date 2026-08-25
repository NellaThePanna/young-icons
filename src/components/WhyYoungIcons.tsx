"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { WHY_YOUNG_ICONS, WHY_YOUNG_ICONS_PHOTO } from "@/content/nurseries-about"
import MultipleActivities from "@/components/MultipleActivities"

const DEEP_GREEN = "#04291A"
const ECRU = "#F4F2EC"
const HAIRLINE = "#d8d5cc"
const LIME = "#9ad64d"

type CardItem = typeof WHY_YOUNG_ICONS[number]

// nova-debt: no dedicated Tailored Programmes / Fully Managed photography exists yet —
// reusing existing site placeholders until real Young Icons photography arrives.
const CARD_IMAGE: Record<string, string | null> = {
  "one-partner": "/images/nursery/one-partner-genuine-young-icons-wordmark.png",
  "multiple-activities": WHY_YOUNG_ICONS_PHOTO,
  music: null,
  "tailored-programmes": "/images/placeholder/obstacle-course.jpg",
  "fully-managed": "/images/placeholder/facility-indoor-hall-hero.jpg",
}

const CARD_IMAGE_POSITION: Record<string, string> = {
  "one-partner": "80% 22%",
  "multiple-activities": "50% 30%",
  "tailored-programmes": "50% 30%",
  "fully-managed": "55% 78%",
}

type IconKey = "clipboard" | "chat" | "calendar" | "bars" | "partner" | "people" | "clock" | "note" | "target" | "card" | "smile" | "star"

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
}

function Icon({ icon, className }: { icon: IconKey; className: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth={1.65} strokeLinecap="round" strokeLinejoin="round">
      {ICON_PATHS[icon]}
    </svg>
  )
}

const panelHeadingStyle = {
  fontFamily: "var(--font-nursery-hero)",
  fontWeight: 600,
  fontSize: "clamp(2.05rem, 3.5vw, 3.85rem)",
  lineHeight: 0.97,
  letterSpacing: "-0.012em",
  wordSpacing: "0.05em",
  color: "#fff",
  margin: 0,
} as const

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
  const image = CARD_IMAGE[item.id]
  const imagePosition = CARD_IMAGE_POSITION[item.id] ?? "50% 50%"
  const points = "points" in item ? item.points : undefined
  const isMovement = item.id === "multiple-activities"

  return (
    <div
      id="why-young-icons-panel"
      role="region"
      aria-label={item.label}
      className="relative mt-6 overflow-hidden rounded-md sm:mt-8"
      style={{ border: `1px solid ${HAIRLINE}`, backgroundColor: ECRU }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label={`Close ${item.label} detail`}
        className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:right-6 sm:top-6"
        style={{ border: "1px solid var(--color-black)", background: "transparent", color: "var(--color-black)", cursor: "pointer" }}
      >
        ×
      </button>

      {/* Mobile / tablet — stacked */}
      <div className="lg:hidden">
        {image && (
          <div
            className="relative h-[280px] w-full sm:h-[340px]"
            style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: imagePosition }}
          />
        )}
        <div className="px-6 py-9 sm:px-8" style={{ backgroundColor: DEEP_GREEN, color: "#fff" }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1.1rem" }}>
            {item.number} — {item.label}
          </p>
          <h2 style={{ ...panelHeadingStyle, fontSize: "clamp(1.9rem, 9vw, 3rem)" }}>
            {item.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          {"body" in item && item.body && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                lineHeight: 1.45,
                color: "#fff",
                maxWidth: "420px",
                margin: "1.35rem 0 0",
                borderTop: "1px solid rgba(255,255,255,0.35)",
                paddingTop: "1.1rem",
              }}
            >
              {item.body}
            </p>
          )}
        </div>
        <div className="px-6 py-8 sm:px-8">{isMovement ? <MultipleActivities /> : points && <DetailList points={points} />}</div>
        <PlayLearnGrowRail />
      </div>

      {/* Desktop — overlay layout */}
      <div className="hidden lg:flex" style={{ minHeight: "620px" }}>
        <div className="relative flex-[68]">
          {image && (
            <div className="absolute inset-0" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: imagePosition }} />
          )}
          <div
            className="absolute inset-y-0 left-0 z-10 flex flex-col justify-between px-9 pb-[108px] pt-11 xl:px-12"
            style={{
              width: image ? "58%" : "100%",
              backgroundColor: DEEP_GREEN,
              color: "#fff",
              clipPath: image ? "polygon(0 0, 92% 0, 80% 100%, 0 100%)" : "none",
            }}
          >
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1.4rem" }}>
                {item.number} — {item.label}
              </p>
              <h2 style={panelHeadingStyle}>
                {item.headingLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            {"body" in item && item.body && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                  lineHeight: 1.45,
                  color: "#fff",
                  maxWidth: image ? "300px" : "460px",
                  margin: 0,
                  borderTop: "1px solid rgba(255,255,255,0.35)",
                  paddingTop: "1.1rem",
                }}
              >
                {item.body}
              </p>
            )}
          </div>
          <PlayLearnGrowRail floating />
        </div>

        <div className="relative flex-[32] px-8 pb-8 pt-16 xl:px-9">{isMovement ? <MultipleActivities /> : points && <DetailList points={points} />}</div>
      </div>
    </div>
  )
}

function DetailList({ points }: { points: ReadonlyArray<{ number: string; icon: IconKey; label: string; body: string }> }) {
  return (
    <div>
      {points.map((point, index) => (
        <div
          key={point.number}
          className="grid items-start gap-3 py-4"
          style={{ gridTemplateColumns: "26px 44px minmax(0,1fr)", borderBottom: `1px solid ${HAIRLINE}`, borderTop: index === 0 ? `1px solid ${HAIRLINE}` : undefined }}
        >
          <span
            className="flex h-[25px] w-[25px] items-center justify-center rounded-full"
            style={{ border: "1px solid #8cae9c", color: DEEP_GREEN, fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
          >
            {point.number}
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded" style={{ backgroundColor: "#eeeee8", color: DEEP_GREEN }}>
            <Icon icon={point.icon} className="h-6 w-6" />
          </span>
          <div>
            <h3 style={{ fontFamily: "var(--font-nursery-hero)", fontWeight: 600, fontSize: "0.92rem", lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--color-black)", margin: "0.1rem 0 0.35rem" }}>
              {point.label}
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.35, color: "var(--color-nursery-stone)", margin: 0 }}>{point.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
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
