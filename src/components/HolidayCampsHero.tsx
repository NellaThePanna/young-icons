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
            x={182}
            y={100}
            width={1357}
            height={1018}
            preserveAspectRatio="xMidYMid slice"
          />
          <clipPath id="hc-right-block">
            <rect x={759} y={0} width={525} height={720} />
          </clipPath>
          <clipPath id="hc-camps-clip">
            <text x={191} y={550} fontFamily="Anton" fontSize={166}>
              {SCHOOLS_CAMPS_HERO.headingLine2}
            </text>
          </clipPath>
        </defs>

        <rect x={0} y={0} width={1280} height={720} fill="var(--color-warm-off-white)" />

        <image
          href={SCHOOLS_CAMPS_HERO.image}
          x={787}
          y={-66}
          width={583}
          height={799}
          preserveAspectRatio="xMinYMid slice"
          clipPath="url(#hc-right-block)"
        />

        <text x={43} y={362} fontFamily="Anton" fontSize={181} fill="var(--color-black)">
          {SCHOOLS_CAMPS_HERO.headingLine1}
        </text>

        <use href="#hc-camps-photo" clipPath="url(#hc-camps-clip)" />
      </svg>
    </section>
  )
}
