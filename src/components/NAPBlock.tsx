"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface NAPBlockProps {
  name: string
  address: string
  phone: string
  email: string
  whatsappNumber: string
  whatsappMessage: string
  mapsEmbedUrl: string
  cta: string
  bg?: "black" | "off-white"
}

export default function NAPBlock({
  name,
  address,
  phone,
  email,
  whatsappNumber,
  whatsappMessage,
  mapsEmbedUrl,
  cta,
  bg = "off-white",
}: NAPBlockProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const targets = [leftRef.current, rightRef.current].filter(Boolean)

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.from(targets, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.8,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.15,
        })
      },
    })
  }, { scope: sectionRef })

  const isBlack = bg === "black"
  const textPrimary = isBlack ? "var(--color-white)" : "var(--color-black)"
  const textSecondary = isBlack ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)"
  const isMapReady = !mapsEmbedUrl.startsWith("[CLIENT:")
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{
        backgroundColor: isBlack ? "var(--color-black)" : "var(--color-warm-off-white)",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start"
        style={{ maxWidth: "1120px" }}
      >
        <div ref={leftRef} className="flex flex-col gap-8">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              color: textPrimary,
            }}
          >
            {name}
          </h2>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "var(--font-body)", color: textSecondary }}
              >
                Address
              </span>
              <address
                className="not-italic text-base md:text-lg"
                style={{ fontFamily: "var(--font-body)", color: textPrimary }}
              >
                {address}
              </address>
            </div>

            <div className="flex flex-col gap-1">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "var(--font-body)", color: textSecondary }}
              >
                Phone
              </span>
              <a
                href={`tel:${phone}`}
                className="text-base md:text-lg"
                style={{ fontFamily: "var(--font-body)", color: textPrimary, textDecoration: "none" }}
              >
                {phone}
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "var(--font-body)", color: textSecondary }}
              >
                Email
              </span>
              <a
                href={`mailto:${email}`}
                className="text-base md:text-lg"
                style={{ fontFamily: "var(--font-body)", color: textPrimary, textDecoration: "none" }}
              >
                {email}
              </a>
            </div>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-4 text-base inline-block text-center w-full sm:w-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              textDecoration: "none",
            }}
          >
            {cta}
          </a>
        </div>

        <div
          ref={rightRef}
          className="relative rounded-lg overflow-hidden"
          style={{ aspectRatio: "4 / 3" }}
        >
          {isMapReady ? (
            <iframe
              src={mapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${name} — map`}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                backgroundColor: isBlack ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
              }}
            >
              <span
                className="text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  color: isBlack ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                }}
              >
                [MAP PLACEHOLDER]
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
