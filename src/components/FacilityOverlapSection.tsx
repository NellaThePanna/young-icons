"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

interface FacilityOverlapSectionProps {
  reverse?: boolean
  wrapperPaddingTop?: number
  imagePlaceholder: string
  number?: string
  heading: string
  body: string
  cta?: { label: string; href: string }
}

export default function FacilityOverlapSection({
  reverse = false,
  wrapperPaddingTop = 100,
  imagePlaceholder,
  number,
  heading,
  body,
  cta,
}: FacilityOverlapSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.8,
          ease: "power2.out",
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <div
      className="px-6"
      style={{ backgroundColor: "var(--fm-off-white)", paddingTop: wrapperPaddingTop, paddingBottom: "100px" }}
    >
      <div
        ref={sectionRef}
        className={`mx-auto flex flex-col ${
          reverse ? "min-[901px]:flex-row-reverse" : "min-[901px]:flex-row"
        } items-center relative`}
        style={{ maxWidth: "1200px" }}
      >
        <div
          className="w-full flex-none min-[901px]:flex-[0_0_62%] relative overflow-hidden flex items-center justify-center"
          style={{
            aspectRatio: "4 / 3",
            borderRadius: "2px",
            backgroundColor: "rgba(0,0,0,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          }}
        >
          <span
            className="text-center px-6"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "rgba(0,0,0,0.35)",
              maxWidth: "220px",
              lineHeight: 1.6,
            }}
          >
            {imagePlaceholder}
          </span>
        </div>

        <div
          ref={cardRef}
          className={`w-full flex-none min-[901px]:flex-[0_0_42%] relative z-[2] mt-[-40px] mx-5 min-[901px]:mt-0 min-[901px]:mx-0 ${
            reverse ? "min-[901px]:mr-[-8%]" : "min-[901px]:ml-[-8%]"
          }`}
          style={{
            backgroundColor: "var(--fm-charcoal)",
            color: "var(--color-white)",
            padding: "47px 39px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          }}
        >
          {number && (
            <span
              className="block"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-academy-green)",
                fontSize: "47px",
                marginBottom: "12px",
              }}
            >
              {number}
            </span>
          )}
          <h2
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "27px",
              lineHeight: 1.1,
              margin: "0 0 18px",
              color: "var(--color-white)",
            }}
          >
            {heading}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              lineHeight: 1.7,
              color: "var(--fm-body-grey)",
              margin: cta ? "0 0 24px" : 0,
            }}
          >
            {body}
          </p>
          {cta && (
            <Link
              href={cta.href}
              className="inline-block uppercase"
              style={{
                backgroundColor: "var(--color-academy-green)",
                color: "var(--color-white)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.05em",
                padding: "15px 32px",
                borderRadius: "2px",
                textDecoration: "none",
              }}
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
