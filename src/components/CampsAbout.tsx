"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { CAMPS_ABOUT } from "@/content/camps"

export default function CampsAbout() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".camps-about-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : { amount: 0.4, from: "start" },
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-warm-off-white)",
        overflow: "visible",
        paddingTop: "80px",
        paddingBottom: "60px",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
        style={{ maxWidth: "1280px" }}
      >
        <div className="camps-about-item flex flex-col justify-center">
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-medium)",
              fontSize: "0.875rem",
              color: "var(--color-academy-green)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            {CAMPS_ABOUT.smallHeading}
          </p>
          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              textTransform: "uppercase",
              lineHeight: 1.05,
            }}
          >
            <span className="block" style={{ color: "var(--color-black)" }}>
              {CAMPS_ABOUT.headingBlack}
            </span>
            <span className="block" style={{ color: "var(--color-academy-green)" }}>
              {CAMPS_ABOUT.headingGreen}
            </span>
          </h2>
          <p
            className="mb-4"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(0,0,0,0.7)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            {CAMPS_ABOUT.body}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(0,0,0,0.7)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            {CAMPS_ABOUT.body2}
          </p>
        </div>

        <div className="camps-about-item relative">
          <div className="relative w-full" style={{ height: "400px" }}>
            <Image
              src={CAMPS_ABOUT.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute"
            style={{
              width: "50%",
              height: "240px",
              bottom: "-30px",
              left: "-30px",
              zIndex: 2,
            }}
          >
            <Image
              src={CAMPS_ABOUT.imageOverlap}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
