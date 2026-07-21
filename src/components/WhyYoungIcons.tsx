"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { WHY_YOUNG_ICONS } from "@/content/nurseries-about"

export default function WhyYoungIcons() {
  const sectionRef = useRef<HTMLElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.from(sectionRef.current?.querySelectorAll(".why-item") ?? [], {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
        })
      },
    })
  }, { scope: sectionRef })

  const selectItem = (i: number) => {
    if (i === activeIndex) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      setActiveIndex(i)
      return
    }

    gsap.to(detailRef.current, {
      opacity: 0,
      duration: 0.12,
      ease: "power1.in",
      onComplete: () => {
        setActiveIndex(i)
        gsap.fromTo(detailRef.current, { opacity: 0 }, { opacity: 1, duration: 0.13, ease: "power1.out" })
      },
    })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowRight" && e.key !== "ArrowUp" && e.key !== "ArrowLeft") return
    e.preventDefault()
    const forward = e.key === "ArrowDown" || e.key === "ArrowRight"
    const next = forward
      ? (i + 1) % WHY_YOUNG_ICONS.length
      : (i - 1 + WHY_YOUNG_ICONS.length) % WHY_YOUNG_ICONS.length
    selectItem(next)
    cardRefs.current[next]?.focus()
  }

  const active = WHY_YOUNG_ICONS[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-nursery-off-white)",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1120px" }}>
        <h2
          className="why-item mb-10"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          <span style={{ color: "var(--color-black)" }}>WHY </span>
          <span style={{ color: "var(--color-nursery-green)" }}>YOUNG ICONS.</span>
        </h2>

        <div className="why-item why-grid">
          <div className="why-rail no-scrollbar" role="tablist" aria-label="Why Young Icons">
            {WHY_YOUNG_ICONS.map((item, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={item.id}
                  ref={(el) => { cardRefs.current[i] = el }}
                  role="tab"
                  id={`why-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls="why-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectItem(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="why-card flex-shrink-0 text-left rounded-lg"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.03em",
                    padding: "16px 20px",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    backgroundColor: isActive ? "var(--color-nursery-green)" : "var(--color-white)",
                    color: isActive ? "var(--color-white)" : "var(--color-black)",
                    opacity: isActive ? 1 : 0.75,
                    transform: isActive ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  {item.number} {item.label}
                </button>
              )
            })}
          </div>

          <div
            id="why-panel"
            ref={detailRef}
            role="tabpanel"
            aria-labelledby={`why-tab-${active.id}`}
            className="rounded-lg"
            style={{ backgroundColor: "var(--color-white)", padding: "40px" }}
          >
            <p
              className="mb-3"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                fontSize: "0.8rem",
                color: "var(--color-nursery-green)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {active.eyebrow}
            </p>
            <h3
              className="mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--color-black)",
                textTransform: "uppercase",
                lineHeight: 1.15,
              }}
            >
              {active.heading}
            </h3>
            <div style={{ width: 48, height: 2, backgroundColor: "var(--color-nursery-green)", marginBottom: 20 }} />
            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(0,0,0,0.7)",
                lineHeight: 1.7,
                maxWidth: "520px",
              }}
            >
              {active.body}
            </p>
            <div className="flex flex-wrap gap-2">
              {active.chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-medium)",
                    fontSize: "0.7rem",
                    color: "var(--color-black)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    border: "1.5px solid rgba(0,0,0,0.15)",
                    padding: "8px 16px",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
