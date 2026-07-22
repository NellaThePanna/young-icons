"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import {
  WHY_YOUNG_ICONS,
  WHY_YOUNG_ICONS_PHOTO,
  WHY_CHOOSE_US,
  WHY_PROOF_ROW,
  MULTIPLE_ACTIVITIES_TAB,
  MULTIPLE_ACTIVITIES_CHIPS,
} from "@/content/nurseries-about"

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="var(--color-academy-green)"
      stroke="none"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 2l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.7z" />
    </svg>
  )
}

export default function WhyYoungIcons() {
  const sectionRef = useRef<HTMLElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(WHY_YOUNG_ICONS.length - 1)

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
            fontSize: "clamp(2rem, 4.2vw, 3.125rem)",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          <span style={{ color: "var(--color-black)" }}>WHY </span>
          <span style={{ color: "var(--color-academy-green)" }}>YOUNG ICONS.</span>
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
                    backgroundColor: isActive ? "var(--color-academy-green)" : "var(--color-white)",
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

          <div className="why-content">
            {active.id === "multiple-activities" ? (
              <div
                id="why-panel"
                ref={detailRef}
                role="tabpanel"
                aria-labelledby={`why-tab-${active.id}`}
                className="why-multi rounded-lg"
                style={{ backgroundColor: "var(--color-white)", padding: "40px" }}
              >
                <div className="why-multi-hero-row">
                  <div className="why-multi-hero relative">
                    <Image
                      src={MULTIPLE_ACTIVITIES_TAB.heroImage}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 279px"
                      className="object-cover"
                    />
                  </div>
                  <div className="why-multi-detail">
                    <p
                      className="mb-3"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: "var(--font-weight-medium)",
                        fontSize: "11px",
                        color: "var(--color-academy-green)",
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
                        fontSize: "clamp(1.375rem, 2.3vw, 1.875rem)",
                        color: "var(--color-black)",
                        textTransform: "uppercase",
                        lineHeight: 1.15,
                      }}
                    >
                      {active.heading}
                    </h3>
                    <div style={{ width: 32, height: 4, backgroundColor: "var(--color-academy-green)", marginBottom: 20 }} />
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color: "#5a584f",
                        lineHeight: 1.7,
                      }}
                    >
                      {active.body}
                    </p>
                  </div>
                </div>

                <div className="why-multi-chip-row">
                  {MULTIPLE_ACTIVITIES_CHIPS.map((chip) => (
                    <div key={chip.label} className="why-multi-chip">
                      <div className="why-multi-chip-photo relative">
                        <Image
                          src={chip.image}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 33vw, 160px"
                          className="object-cover"
                        />
                        {chip.comingSoon && (
                          <span
                            className="absolute"
                            style={{
                              top: 6,
                              left: 6,
                              zIndex: 1,
                              fontFamily: "var(--font-body)",
                              fontWeight: "var(--font-weight-bold)",
                              fontSize: "9px",
                              color: "var(--color-white)",
                              backgroundColor: "var(--color-black)",
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                              padding: "3px 7px",
                              borderRadius: "999px",
                            }}
                          >
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p
                        className="mt-3"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: "var(--font-weight-bold)",
                          fontSize: "13px",
                          color: "var(--color-black)",
                          textTransform: "uppercase",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {chip.label}
                      </p>
                      <p className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#5a584f", lineHeight: 1.5 }}>
                        {chip.caption}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="why-multi-footer">
                  <StarIcon />
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#5a584f", lineHeight: 1.6 }}>
                    {MULTIPLE_ACTIVITIES_TAB.footerNote}
                  </p>
                </div>
              </div>
            ) : (
              <div className="why-detail-grid">
                <div
                  id="why-panel"
                  ref={detailRef}
                  role="tabpanel"
                  aria-labelledby={`why-tab-${active.id}`}
                  className="why-panel-text rounded-lg"
                  style={{ backgroundColor: "var(--color-white)", padding: "40px" }}
                >
                  <p
                    className="mb-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: "var(--font-weight-medium)",
                      fontSize: "11px",
                      color: "var(--color-academy-green)",
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
                      fontSize: "clamp(1.375rem, 2.3vw, 1.875rem)",
                      color: "var(--color-black)",
                      textTransform: "uppercase",
                      lineHeight: 1.15,
                    }}
                  >
                    {active.heading}
                  </h3>
                  <div style={{ width: 32, height: 4, backgroundColor: "var(--color-academy-green)", marginBottom: 20 }} />
                  <p
                    className="mb-8"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "#5a584f",
                      lineHeight: 1.7,
                      maxWidth: "480px",
                    }}
                  >
                    {active.body}
                  </p>

                  <h4
                    className="mb-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "16px",
                      color: "var(--color-black)",
                      textTransform: "uppercase",
                    }}
                  >
                    {WHY_CHOOSE_US.heading}
                  </h4>
                  <ul className="flex flex-col gap-3 mb-8">
                    {WHY_CHOOSE_US.checklist.map((line) => (
                      <li key={line} className="flex items-center gap-3">
                        <span
                          className="flex-shrink-0 inline-flex items-center justify-center rounded-full"
                          style={{
                            width: 20,
                            height: 20,
                            backgroundColor: "var(--color-academy-green)",
                            color: "var(--color-white)",
                          }}
                        >
                          <CheckIcon />
                        </span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#5a584f" }}>
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#enquiry"
                    className="btn-cta inline-flex items-center"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "13px",
                      color: "var(--color-white)",
                      backgroundColor: "var(--color-academy-green)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "14px 28px",
                      borderRadius: "6px",
                      textDecoration: "none",
                    }}
                  >
                    {WHY_CHOOSE_US.cta} →
                  </a>
                </div>

                <div className="why-photo relative" style={{ aspectRatio: "330 / 430", borderRadius: "12px", overflow: "hidden" }}>
                  <Image
                    src={WHY_YOUNG_ICONS_PHOTO}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 330px"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div className="why-proof-row grid grid-cols-2 lg:grid-cols-4 gap-8" style={{ borderTop: "1px solid #e3e1d8", marginTop: "48px", paddingTop: "32px" }}>
              {WHY_PROOF_ROW.map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center gap-3">
                  <span
                    className="inline-flex items-center justify-center rounded-full"
                    style={{
                      width: 44,
                      height: 44,
                      border: "1.5px solid var(--color-academy-green)",
                      color: "var(--color-academy-green)",
                    }}
                  >
                    <CheckIcon />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "13px",
                      color: "var(--color-black)",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#5a584f", lineHeight: 1.5 }}>
                    {item.caption}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
