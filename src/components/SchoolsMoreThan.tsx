"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { SCHOOLS_MORE_THAN } from "@/content/schools"

export default function SchoolsMoreThan() {
  const sectionRef = useRef<HTMLElement>(null)
  const greenBlockRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".schools-more-than-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.8,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.15,
        })
      },
    })

    if (!prefersReduced) {
      gsap.from(greenBlockRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: greenBlockRef.current,
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-warm-off-white)",
        paddingTop: "80px",
        paddingBottom: "80px",
        overflow: "visible",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0"
        style={{ maxWidth: "1280px" }}
      >
        <div
          ref={greenBlockRef}
          className="schools-more-than-item"
          style={{
            backgroundColor: "var(--color-academy-green)",
            padding: "56px 48px",
          }}
        >
          <h2
            className="mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(4rem, 9vw, 8rem)",
              color: "var(--color-white)",
              textTransform: "uppercase",
              lineHeight: 0.95,
            }}
          >
            {SCHOOLS_MORE_THAN.word}
          </h2>

          <h3
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            <span className="block" style={{ color: "var(--color-black)" }}>
              {SCHOOLS_MORE_THAN.headingBlack}
            </span>
            <span className="block" style={{ color: "var(--color-white)" }}>
              {SCHOOLS_MORE_THAN.headingGreen}
            </span>
          </h3>

          <p
            className="mb-10"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.7,
              maxWidth: "420px",
            }}
          >
            {SCHOOLS_MORE_THAN.body}
          </p>

          <div>
            <span
              className="block"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--color-black)",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              {SCHOOLS_MORE_THAN.statement1}
            </span>
            <span
              className="block"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--color-white)",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              {SCHOOLS_MORE_THAN.statement2}
            </span>
          </div>
        </div>

        <div
          className="schools-more-than-item relative"
          style={{
            marginTop: "-30px",
            height: "100%",
            minHeight: "480px",
          }}
        >
          <Image
            src={SCHOOLS_MORE_THAN.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </div>
      </div>
    </section>
  )
}
