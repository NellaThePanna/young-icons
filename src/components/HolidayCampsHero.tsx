"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import Image from "next/image"
import { SCHOOLS_CAMPS_HERO } from "@/content/schools-holiday-camps"

const HEADING_FONT_SIZE = "168px"

export default function HolidayCampsHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const mediaRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const lines = lineRefs.current.filter((el): el is HTMLSpanElement => el !== null)
    const splits = lines.map((el) => new SplitText(el, { type: "words" }))
    const allWords = splits.flatMap((split) => split.words)

    const tl = gsap.timeline()
    tl.from(allWords, {
      opacity: 0,
      y: prefersReduced ? 0 : 24,
      duration: prefersReduced ? 0.01 : 0.8,
      ease: "power2.out",
      stagger: prefersReduced ? 0 : { amount: 0.3, from: "start" },
    })

    tl.from(
      mediaRef.current,
      {
        opacity: 0,
        y: prefersReduced ? 0 : 32,
        duration: prefersReduced ? 0.01 : 0.8,
        ease: "power2.out",
      },
      prefersReduced ? "<" : "-=0.4"
    )

    return () => splits.forEach((split) => split.revert())
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative w-full mx-auto"
      style={{ maxWidth: "1440px", backgroundColor: "var(--color-warm-off-white)" }}
    >
      <div className="flex flex-col lg:h-[573px]">
        <div className="px-6 pt-24 pb-8 lg:absolute lg:px-0 lg:py-0">
          <h1
            aria-label={`${SCHOOLS_CAMPS_HERO.headingLine1} ${SCHOOLS_CAMPS_HERO.headingLine2}`}
            className="lg:absolute lg:left-[60px] lg:top-[148px] lg:w-[508px]"
            style={{
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              lineHeight: 0.86,
              color: "var(--color-black)",
            }}
          >
            <span
              ref={(el) => { lineRefs.current[0] = el }}
              className="block"
              style={{ fontSize: HEADING_FONT_SIZE, whiteSpace: "nowrap" }}
            >
              {SCHOOLS_CAMPS_HERO.headingLine1}
            </span>
            <span
              ref={(el) => { lineRefs.current[1] = el }}
              className="block"
              style={{ fontSize: HEADING_FONT_SIZE, whiteSpace: "nowrap" }}
            >
              {SCHOOLS_CAMPS_HERO.headingLine2}
            </span>
          </h1>
        </div>

        <div
          ref={mediaRef}
          className="relative w-full h-[280px] lg:absolute lg:right-[45px] lg:top-[19px] lg:w-[540px] lg:h-[522px]"
          style={{ overflow: "hidden" }}
        >
          <Image
            src={SCHOOLS_CAMPS_HERO.image}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 540px"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </div>
      </div>
    </section>
  )
}
