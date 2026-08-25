"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { APPROACH_ROWS } from "@/content/nurseries-about"

const GREEN = "#166136"
const HAIRLINE = "#d8d5cc"

type RowItem = typeof APPROACH_ROWS[number]

export default function ApproachRows() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const activeItem = activeId ? APPROACH_ROWS.find((row) => row.id === activeId) ?? null : null

  useEffect(() => {
    if (activeId) closeButtonRef.current?.focus()
  }, [activeId])

  useEffect(() => {
    if (!activeId) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  function handleClose() {
    if (activeId) rowRefs.current[activeId]?.focus()
    setActiveId(null)
  }

  return (
    <section className="px-5 pt-8 pb-10 sm:px-8 sm:pt-10 sm:pb-12 lg:px-12 lg:pt-10 lg:pb-12" style={{ backgroundColor: "#f4f2ec" }}>
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
          OUR APPROACH
        </p>

        <div style={{ borderTop: `1px solid ${HAIRLINE}` }}>
          {APPROACH_ROWS.map((row) => {
            const isActive = activeId === row.id
            return (
              <button
                key={row.id}
                ref={(el) => {
                  rowRefs.current[row.id] = el
                }}
                type="button"
                onClick={() => setActiveId(isActive ? null : row.id)}
                aria-expanded={isActive}
                aria-controls="approach-spread"
                className="group flex w-full items-baseline justify-between gap-5 py-3 text-left transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:py-5"
                style={{ borderTop: 0, borderLeft: 0, borderRight: 0, borderBottom: `1px solid ${HAIRLINE}`, backgroundColor: isActive ? "#fff" : "transparent", cursor: "pointer" }}
              >
                <span className="flex items-baseline gap-4 sm:gap-7">
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: "var(--font-weight-medium)", color: GREEN }}>{row.number}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.15rem, calc(6vw - 4px), 5.55rem)", lineHeight: 0.85, letterSpacing: "-0.025em", color: "var(--color-black)" }}>
                    {row.word}.
                  </span>
                </span>
                <span aria-hidden="true" className="pt-2 transition-transform duration-200 group-hover:translate-x-1" style={{ fontFamily: "var(--font-body)", color: GREEN, fontSize: "1.15rem" }}>
                  {isActive ? "↑" : "+"}
                </span>
              </button>
            )
          })}
        </div>

        {activeItem && <Spread item={activeItem} onClose={handleClose} closeButtonRef={closeButtonRef} />}
      </div>
    </section>
  )
}

function Spread({
  item,
  onClose,
  closeButtonRef,
}: {
  item: RowItem
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
}) {
  const isLearn = item.id === "learn"

  return (
    <div
      id="approach-spread"
      role="region"
      aria-label={`${item.word} approach detail`}
      className="relative mt-6 grid grid-cols-1 overflow-hidden sm:mt-8 lg:grid-cols-2"
      style={{ border: `1px solid ${HAIRLINE}`, backgroundColor: "#fff" }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label={`Close ${item.word} approach detail`}
        className="absolute right-4 top-4 z-10 text-2xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:right-6 sm:top-6"
        style={{ border: 0, background: "transparent", color: GREEN, cursor: "pointer" }}
      >
        ×
      </button>

      <div className="flex flex-col px-6 py-9 sm:px-9 sm:py-11 lg:px-12 lg:py-14" style={{ order: isLearn ? 2 : 1 }}>
        <div className="flex items-center justify-between" style={{ color: GREEN, fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-bold)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <span>Our Approach</span>
          <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: GREEN }} />
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.6rem, 2.4vw, 2.6rem)", lineHeight: 1, letterSpacing: "-0.025em", color: GREEN, margin: "0 0 0.4rem" }}>
            {item.number}
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(3.6rem, 9vw, 8.5rem)", lineHeight: 0.82, letterSpacing: "-0.03em", color: GREEN, margin: "0 0 0.9rem", textTransform: "uppercase" }}>
            {item.word}.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)", color: GREEN, margin: 0 }}>{item.ages}</p>
          <span aria-hidden="true" className="mt-5 block" style={{ width: "40px", height: "2px", backgroundColor: GREEN }} />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.3vw, 1.2rem)", lineHeight: 1.5, color: "var(--color-black)", maxWidth: "480px", margin: "1.5rem 0 0" }}>
            {item.body}
          </p>
        </div>
      </div>

      <div className="relative" style={{ order: isLearn ? 1 : 2, minHeight: "clamp(320px, 44vw, 620px)" }}>
        <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: "50% 35%" }} />
      </div>
    </div>
  )
}
