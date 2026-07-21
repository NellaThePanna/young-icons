"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import { NURSERY_EDITORIAL_PHOTO } from "@/content/nurseries-about"

const PARALLAX_TRAVEL_PX = 40
const IMAGE_OVERHANG_PX = 50

export default function NurseryEditorialPhoto() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    gsap.to(imageRef.current, {
      y: PARALLAX_TRAVEL_PX,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "60vh", minHeight: "420px" }}
    >
      <div
        ref={imageRef}
        className="absolute inset-x-0"
        style={{ top: -IMAGE_OVERHANG_PX, bottom: -IMAGE_OVERHANG_PX }}
      >
        <Image
          src={NURSERY_EDITORIAL_PHOTO.image}
          alt={NURSERY_EDITORIAL_PHOTO.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}
