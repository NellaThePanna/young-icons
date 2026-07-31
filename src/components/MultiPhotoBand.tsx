"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { MULTI_PHOTO_BAND } from "@/content/multi-sports"

const PARALLAX_TRAVEL_PX = 20
// Overhang must exceed PARALLAX_TRAVEL_PX or the image edge clears the section
// bounds mid-scroll, exposing a gap — same constraint as EditorialMosaic.
const IMAGE_OVERHANG_PX = 60

export default function MultiPhotoBand() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.from(sectionRef.current, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
        })
      },
    })

    if (!prefersReduced) {
      gsap.to(imageWrapRef.current, {
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
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ height: "340px" }}>
      <div
        ref={imageWrapRef}
        className="absolute"
        style={{ top: -IMAGE_OVERHANG_PX, bottom: -IMAGE_OVERHANG_PX, left: 0, right: 0 }}
      >
        <div className="relative w-full h-full">
          <Image
            src={MULTI_PHOTO_BAND.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "61.09% 40.88%" }}
          />
        </div>
      </div>
    </section>
  )
}
