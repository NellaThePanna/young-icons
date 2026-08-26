"use client"

import Image from "next/image"
import { useState, type ReactNode } from "react"
import { CLASSCARD_URL } from "@/lib/config"
import { SCHOOLS_CAMPS_INTRO } from "@/content/schools-holiday-camps"
import HolidayCampsHero from "@/components/HolidayCampsHero"

const displayStyle = {
  fontFamily: "var(--font-holiday-display), Impact, sans-serif",
  fontWeight: 400,
  letterSpacing: "-0.025em",
} as const

const CAMPS = [
  {
    id: "summer",
    label: <>SUMMER<br />CAMP</>,
    image: "/images/placeholder/holiday-camps-summer-basketball.jpg",
    alt: "Children running on a sunlit grass field during Summer Camp, with a boy dribbling a basketball",
    dates: "14 JULY – 1 AUGUST 2025",
    venue: "CEDAR SCHOOL",
    ages: "AGES 4 – 12",
    time: "8:30 AM – 2:00 PM",
  },
  {
    id: "october",
    label: <>OCTOBER<br />CAMP</>,
    image: "/images/placeholder/holiday-camps-october-creative.jpg",
    alt: "Girl painting a colourful craft in a warm classroom during October Camp",
    dates: "6 OCTOBER – 17 OCTOBER 2025",
    venue: "CEDAR SCHOOL",
    ages: "AGES 4 – 12",
    time: "8:30 AM – 2:00 PM",
  },
  {
    id: "winter",
    label: <>WINTER<br />CAMP</>,
    image: "/images/placeholder/holiday-camps-winter-tug-of-war.jpg",
    alt: "Children playing tug of war on a sunlit grass field during Winter Camp",
    dates: "5 JANUARY – 16 JANUARY 2026",
    venue: "CEDAR SCHOOL",
    ages: "AGES 4 – 12",
    time: "8:30 AM – 2:00 PM",
  },
] as const

type Camp = (typeof CAMPS)[number]

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="16" rx="1" /><path d="M8 3v4M16 3v4M4 10h16" /></svg>
}

function PinIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-7.1-7-12a7 7 0 1 1 14 0c0 4.9-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
}

function PersonIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
}

function ClockIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
}

function InfoRow({ icon, children }: { icon: ReactNode; children: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="block h-4 w-4 shrink-0 text-black">{icon}</span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.025em", color: "var(--color-black)" }}>{children}</span>
    </div>
  )
}

function CampCard({ camp }: { camp: Camp }) {
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden" style={{ backgroundColor: "#efeee8" }}>
      <div className="relative" style={{ aspectRatio: "16 / 9" }}>
        <Image src={camp.image} alt={camp.alt} fill className="object-cover" sizes="(max-width: 767px) 100vw, 33vw" />
        <span className="absolute left-0 top-0 px-3 py-2" style={{ backgroundColor: "#06351f", color: "var(--color-warm-off-white)", fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.035em", lineHeight: 1.05 }}>
          {camp.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5" style={{ minHeight: "11.75rem" }}>
        <div className="flex flex-col gap-3.5">
          <InfoRow icon={<CalendarIcon />}>{camp.dates}</InfoRow>
          <InfoRow icon={<PinIcon />}>{camp.venue}</InfoRow>
          <InfoRow icon={<PersonIcon />}>{camp.ages}</InfoRow>
          <InfoRow icon={<ClockIcon />}>{camp.time}</InfoRow>
        </div>
      </div>
      <a href={CLASSCARD_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-between px-4 sm:px-5" style={{ backgroundColor: "var(--color-black)", color: "var(--color-warm-off-white)", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.035em", textDecoration: "none" }}>
        <span>REGISTER NOW</span><span aria-hidden="true" style={{ fontSize: "1.35rem", fontWeight: 400, lineHeight: 1 }}>→</span>
      </a>
    </article>
  )
}

function ArrowButton({ direction, onClick }: { direction: "previous" | "next"; onClick: () => void }) {
  const isPrevious = direction === "previous"
  return (
    <button type="button" aria-label={`${isPrevious ? "Previous" : "Next"} camp`} onClick={onClick} className="flex h-10 w-10 items-center justify-center rounded-full" style={{ border: "1px solid rgba(12,14,12,0.75)", backgroundColor: "transparent", color: "var(--color-black)", fontFamily: "var(--font-body)", fontSize: "1.15rem", lineHeight: 1, cursor: "pointer" }}>
      {isPrevious ? "←" : "→"}
    </button>
  )
}

export default function HolidayCampsEditorial() {
  const [activeCamp, setActiveCamp] = useState(0)
  const previousCamp = () => setActiveCamp((current) => (current - 1 + CAMPS.length) % CAMPS.length)
  const nextCamp = () => setActiveCamp((current) => (current + 1) % CAMPS.length)

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

      <section className="px-5 pb-8 pt-12 sm:px-8 sm:pb-9 sm:pt-14 lg:px-12 lg:pb-10 lg:pt-16" style={{ backgroundColor: "var(--color-warm-off-white)" }} aria-labelledby="upcoming-camps-heading">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p style={{ color: "var(--color-academy-green)", fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.075em", margin: "0 0 0.35rem" }}>UPCOMING CAMPS</p>
              <h2 id="upcoming-camps-heading" style={{ ...displayStyle, color: "var(--color-black)", fontSize: "clamp(2.85rem, 5.4vw, 6.45rem)", lineHeight: 0.88, margin: 0 }}><span className="block lg:inline">FIND YOUR NEXT</span><span className="block lg:ml-[0.16em] lg:inline" style={{ marginTop: "0.12em" }}>ADVENTURE.</span></h2>
            </div>
            <div className="mb-0.5 flex shrink-0 gap-2 sm:mb-1 md:hidden"><ArrowButton direction="previous" onClick={previousCamp} /><ArrowButton direction="next" onClick={nextCamp} /></div>
          </div>

          <div className="mt-6 hidden grid-cols-3 gap-5 md:grid">
            {CAMPS.map((camp) => <CampCard key={camp.id} camp={camp} />)}
          </div>
          <div className="mt-6 md:hidden"><CampCard camp={CAMPS[activeCamp]} /></div>
        </div>
      </section>

      <section
        className="relative overflow-hidden px-5 py-7 sm:px-8 sm:py-8 lg:px-12 lg:py-9"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(4,55,37,0.62), rgba(4,55,37,0.45)), url(/images/holiday-camps/sports-court-banner-background.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#06351f",
        }}
      >
        <div className="relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_1px_auto] sm:items-center sm:gap-10">
          <div><h2 style={{ color: "var(--color-warm-off-white)", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", letterSpacing: "0.045em", margin: 0 }}>BE THE FIRST TO KNOW.</h2><p style={{ color: "rgba(245,245,242,0.9)", fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.55, margin: "0.45rem 0 0", maxWidth: "33rem" }}>Register your interest and we&apos;ll notify you when new camps open for booking.</p></div>
          <div className="hidden h-full min-h-16 sm:block" style={{ backgroundColor: "rgba(245,245,242,0.35)" }} />
          <a href={CLASSCARD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between gap-8 border px-5 py-3 sm:min-w-72" style={{ borderColor: "rgba(245,245,242,0.7)", color: "var(--color-warm-off-white)", fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.07em", textDecoration: "none" }}><span>REGISTER YOUR INTEREST</span><span aria-hidden="true" style={{ fontSize: "1.2rem", lineHeight: 1 }}>→</span></a>
        </div>
      </section>
    </main>
  )
}
