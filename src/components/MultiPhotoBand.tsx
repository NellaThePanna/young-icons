"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { MULTI_PHOTO_BAND } from "@/content/multi-sports"

export default function MultiPhotoBand() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 82%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.from(sectionRef.current, {
          opacity: 0,
          y: prefersReduced ? 0 : 24,
          duration: prefersReduced ? 0.01 : 0.6,
          ease: "power2.out",
        })
      },
    })

    return () => trigger.kill()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "clamp(270px, 28vw, 420px)" }}
    >
      <style jsx global>{`
        .multi-photo-band-image {
          object-position: center 22%;
        }

        @media (max-width: 767px) {
          .multi-photo-band-image {
            object-position: center 18%;
          }
        }
      `}</style>
      <Image
        src={MULTI_PHOTO_BAND.image}
        alt="Children taking part in a Young Icons multi-sports activity session"
        fill
        sizes="100vw"
        className="multi-photo-band-image object-cover"
      />
    </section>
  )
}
