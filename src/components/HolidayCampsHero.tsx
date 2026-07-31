"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SCHOOLS_CAMPS_HERO } from "@/content/schools-holiday-camps"

export default function HolidayCampsHero() {
  const svgRef = useRef<SVGSVGElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    gsap.from(svgRef.current, {
      opacity: 0,
      y: prefersReduced ? 0 : 24,
      duration: prefersReduced ? 0.01 : 0.9,
      ease: "power2.out",
    })
  }, { scope: svgRef })

  return (
    <section className="w-full" style={{ backgroundColor: "var(--color-warm-off-white)" }}>
      <svg
        ref={svgRef}
        viewBox="0 150 1280 420"
        width="100%"
        style={{ display: "block", height: "auto" }}
      >
        <defs>
          <image
            id="hc-camps-photo"
            href={SCHOOLS_CAMPS_HERO.image}
            x={0}
            y={-120}
            width={1280}
            height={960}
            preserveAspectRatio="xMidYMid slice"
          />
          <clipPath id="hc-right-block">
            <rect x={759} y={0} width={525} height={720} />
          </clipPath>
          <clipPath id="hc-camps-clip">
            <text x={106} y={553} fontFamily="Anton" fontSize={215}>
              {SCHOOLS_CAMPS_HERO.headingLine2}
            </text>
          </clipPath>
        </defs>

        <rect x={0} y={0} width={1280} height={720} fill="var(--color-warm-off-white)" />

        <image
          href={SCHOOLS_CAMPS_HERO.image}
          x={759}
          y={0}
          width={525}
          height={720}
          preserveAspectRatio="xMinYMid slice"
          clipPath="url(#hc-right-block)"
        />

        <text x={106} y={348} fontFamily="Anton" fontSize={215} fill="var(--color-black)">
          {SCHOOLS_CAMPS_HERO.headingLine1}
        </text>

        <use href="#hc-camps-photo" clipPath="url(#hc-camps-clip)" />
      </svg>
    </section>
  )
}
