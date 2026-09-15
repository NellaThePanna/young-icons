"use client"

import { CLASSCARD_URL } from "@/lib/config"
import { SCHOOLS_CAMPS_INTRO } from "@/content/schools-holiday-camps"
import CampCards from "@/components/CampCards"
import HolidayCampsHero from "@/components/HolidayCampsHero"

const displayStyle = {
  fontFamily: "var(--font-holiday-display), Impact, sans-serif",
  fontWeight: 400,
  letterSpacing: "-0.025em",
} as const

function BellIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

export default function HolidayCampsEditorial() {
  return (
    <main style={{ backgroundColor: "var(--color-warm-off-white)" }}>
      <section className="relative pt-16" style={{ backgroundColor: "var(--color-warm-off-white)" }}>
        <HolidayCampsHero />
      </section>

      <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20" style={{ backgroundColor: "#06351f" }}>
        <div className="relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,auto)_1px_minmax(0,1fr)] lg:items-center lg:gap-20">
          <h2 style={{ ...displayStyle, color: "var(--color-warm-off-white)", fontSize: "clamp(4rem, 6.75vw, 8.5rem)", lineHeight: 0.8, margin: 0 }}><span className="block">SPORT. GAMES.</span><span className="block" style={{ marginTop: "0.12em" }}>CREATIVITY.</span><span className="block lg:whitespace-nowrap" style={{ marginTop: "0.12em" }}>NEW FRIENDSHIPS.</span></h2>
          <div className="hidden h-full min-h-44 lg:block" style={{ backgroundColor: "rgba(245,245,242,0.58)" }} />
          <p style={{ color: "var(--color-warm-off-white)", fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.45vw, 1.2rem)", lineHeight: 1.55, maxWidth: "27rem", margin: 0 }}>{SCHOOLS_CAMPS_INTRO.body}</p>
        </div>
      </section>

      <CampCards />

      <section
        className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(4,55,37,0.42), rgba(4,55,37,0.28)), url(/images/holiday-camps/sports-court-banner-background.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#06351f",
        }}
      >
        <div className="relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 gap-6 sm:grid-cols-[auto_1px_auto] sm:items-center sm:gap-16">
          <div className="flex items-center gap-4">
            <span style={{ color: "var(--color-warm-off-white)", flexShrink: 0 }}>
              <BellIcon />
            </span>
            <div><h2 style={{ color: "var(--color-warm-off-white)", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", letterSpacing: "0.045em", margin: 0 }}>BE THE FIRST TO KNOW.</h2><p style={{ color: "rgba(245,245,242,0.9)", fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.55, margin: "0.45rem 0 0", maxWidth: "19rem" }}>Register your interest and we&apos;ll notify you when new camps open for booking.</p></div>
          </div>
          <div className="hidden h-full min-h-16 sm:block" style={{ backgroundColor: "rgba(245,245,242,0.35)" }} />
          <a href={CLASSCARD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between gap-8 border px-5 py-3 sm:min-w-72" style={{ borderColor: "rgba(245,245,242,0.7)", color: "var(--color-warm-off-white)", fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.07em", textDecoration: "none" }}><span>REGISTER YOUR INTEREST</span><span aria-hidden="true" style={{ fontSize: "1.2rem", lineHeight: 1 }}>→</span></a>
        </div>
      </section>
    </main>
  )
}
