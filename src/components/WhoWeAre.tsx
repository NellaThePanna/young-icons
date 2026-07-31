"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Image from "next/image"
import Link from "next/link"
import { WHO_WE_ARE } from "@/content/home"

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const split = headingRef.current
          ? new SplitText(headingRef.current, { type: "words" })
          : null
        const items = sectionRef.current?.querySelectorAll(".who-item") ?? []
        const tl = gsap.timeline()

        if (split) {
          tl.from(split.words, {
            opacity: 0,
            y: prefersReduced ? 0 : 24,
            duration: prefersReduced ? 0.01 : 0.8,
            ease: "power2.out",
            stagger: prefersReduced ? 0 : { amount: 0.35, from: "start" },
          })
        }

        tl.from(
          items,
          {
            opacity: 0,
            y: prefersReduced ? 0 : 40,
            duration: prefersReduced ? 0.01 : 0.8,
            ease: "power2.out",
            stagger: prefersReduced ? 0 : 0.1,
          },
          prefersReduced ? "<" : "-=0.4"
        )
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
        perspective: "1000px",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
        style={{ maxWidth: "1280px" }}
      >
        <div className="flex flex-col justify-center">
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
            {WHO_WE_ARE.smallHeading}
          </p>
          <h2
            ref={headingRef}
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "var(--color-black)",
              textTransform: "uppercase",
              lineHeight: 1.05,
            }}
          >
            {WHO_WE_ARE.headingWhite}{" "}
            <span style={{ color: "var(--color-academy-green)" }}>
              {WHO_WE_ARE.headingGreen}
            </span>
          </h2>
          <p
            className="who-item mb-8"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(0,0,0,0.7)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            {WHO_WE_ARE.body}
          </p>
          <Link
            href={WHO_WE_ARE.ctaHref}
            className="who-item link-arrow"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-academy-green)",
              textDecoration: "none",
            }}
          >
            {WHO_WE_ARE.cta} →
          </Link>
        </div>

        <div className="who-item relative">
          <div className="relative w-full" style={{ height: "400px" }}>
            <Image
              src={WHO_WE_ARE.imageLarge}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: "center 25%" }}
            />
          </div>
          <div
            className="absolute"
            style={{
              width: "45%",
              height: "240px",
              bottom: "-40px",
              left: "-30px",
              zIndex: 2,
            }}
          >
            <Image
              src={WHO_WE_ARE.imageSmall}
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
