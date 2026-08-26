"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SCHOOLS_CAMPS_HERO } from "@/content/schools-holiday-camps"

// Approved exact text placement (percentage of the hero container), from client JSON.
// Reference design ratio: 1569 x 1002 (design width : height).
const DESIGN_ASPECT = "1569 / 1002"

const HOLIDAY_POS = { x: 17.12432864206871, y: 13.161630493485571 }
const CAMPS_POS = { x: 16.058615365153607, y: 45.63412029699881 }
const HEADING_FONT_SIZE = "clamp(48px, 8.4vw, 134px)"
const HEADING_LINE_HEIGHT = 0.82
const HEADING_LETTER_SPACING = "-2px"

const TAGLINE_POS = { x: 3.1, y: 83.5 }

const MASK_URL = "/images/holiday-camps/hero-brush-mask.png"

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18 18 6" />
      <path d="M9 6h9v9" />
    </svg>
  )
}

export default function HolidayCampsHero() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: prefersReduced ? 0 : 24,
      duration: prefersReduced ? 0.01 : 0.9,
      ease: "power2.out",
    })
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden" style={{ backgroundColor: "var(--color-warm-off-white)" }}>
      {/* Desktop/tablet: single template, photo masked to the approved paint-brush edge, live text at exact approved coordinates. */}
      <div className="relative hidden w-full md:block" style={{ aspectRatio: DESIGN_ASPECT }}>
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `url(${MASK_URL})`,
            maskImage: `url(${MASK_URL})`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          <Image
            src={SCHOOLS_CAMPS_HERO.image}
            alt="A child dribbling a football outdoors during a Young Icons holiday camp session"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* CAMPS_POS.y is not used directly: at this font-size a single line only spans
            ~11% of the container height, but the two JSON y-values sit ~32 points apart —
            that gap is frame padding from the design-tool export, not a literal line
            position. The block is anchored at HOLIDAY's y/x and the two lines stack tightly
            via line-height, matching the "close stacked relationship" in the reference;
            each word still gets its own approved x for independent left alignment. */}
        <h1 className="absolute m-0" style={{ top: `${HOLIDAY_POS.y}%`, left: 0, width: "100%" }} aria-label={`${SCHOOLS_CAMPS_HERO.headingLine1} ${SCHOOLS_CAMPS_HERO.headingLine2}`}>
          <span
            className="block"
            style={{
              marginLeft: `${HOLIDAY_POS.x}%`,
              fontFamily: "var(--font-anton)",
              fontWeight: 400,
              fontSize: HEADING_FONT_SIZE,
              lineHeight: HEADING_LINE_HEIGHT,
              letterSpacing: HEADING_LETTER_SPACING,
              textTransform: "uppercase",
              color: "var(--color-black)",
              whiteSpace: "nowrap",
            }}
          >
            {SCHOOLS_CAMPS_HERO.headingLine1}
          </span>
          <span
            className="block"
            style={{
              marginLeft: `${CAMPS_POS.x}%`,
              fontFamily: "var(--font-anton)",
              fontWeight: 400,
              fontSize: HEADING_FONT_SIZE,
              lineHeight: HEADING_LINE_HEIGHT,
              letterSpacing: HEADING_LETTER_SPACING,
              textTransform: "uppercase",
              color: "var(--color-black)",
              whiteSpace: "nowrap",
            }}
          >
            {SCHOOLS_CAMPS_HERO.headingLine2}
          </span>
        </h1>

        <div className="absolute flex items-center gap-3" style={{ left: `${TAGLINE_POS.x}%`, top: `${TAGLINE_POS.y}%` }}>
          <span style={{ color: "var(--color-academy-green)", flexShrink: 0 }}>
            <ArrowIcon />
          </span>
          <p
            className="m-0"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "14px",
              lineHeight: 1.35,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              color: "var(--color-academy-green)",
            }}
          >
            <span className="block">{SCHOOLS_CAMPS_HERO.taglineLine1}</span>
            <span className="block">{SCHOOLS_CAMPS_HERO.taglineLine2}</span>
          </p>
        </div>
      </div>

      {/* Mobile: the diagonal-mask template doesn't hold up at narrow widths, so this stays
          the simple stacked fallback (full photo, then live heading + tagline below). */}
      <div className="w-full md:hidden">
        <div className="relative w-full" style={{ aspectRatio: "1.4" }}>
          <Image
            src={SCHOOLS_CAMPS_HERO.image}
            alt="A child dribbling a football outdoors during a Young Icons holiday camp session"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="flex flex-col gap-8 px-5 py-8 sm:px-8">
          <h1
            className="m-0"
            style={{
              fontFamily: "var(--font-anton)",
              fontWeight: 400,
              fontSize: "clamp(48px, 14vw, 72px)",
              lineHeight: HEADING_LINE_HEIGHT,
              letterSpacing: HEADING_LETTER_SPACING,
              textTransform: "uppercase",
              color: "var(--color-black)",
            }}
          >
            <span className="block">{SCHOOLS_CAMPS_HERO.headingLine1}</span>
            <span className="block">{SCHOOLS_CAMPS_HERO.headingLine2}</span>
          </h1>
          <div className="flex items-center gap-3">
            <span style={{ color: "var(--color-academy-green)", flexShrink: 0 }}>
              <ArrowIcon />
            </span>
            <p
              className="m-0"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "14px",
                lineHeight: 1.35,
                letterSpacing: "0.01em",
                textTransform: "uppercase",
                color: "var(--color-academy-green)",
              }}
            >
              <span className="block">{SCHOOLS_CAMPS_HERO.taglineLine1}</span>
              <span className="block">{SCHOOLS_CAMPS_HERO.taglineLine2}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
