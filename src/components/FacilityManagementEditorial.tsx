import Image from "next/image"
import Link from "next/link"

const displayStyle = {
  fontFamily: "var(--font-display)",
  letterSpacing: "-0.025em",
}

function Arrow() {
  return <span aria-hidden="true" style={{ fontSize: "2rem", fontWeight: 300, lineHeight: 1 }}>→</span>
}

function OperationsIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7h5M15 7h5M4 12h10M20 12h0M4 17h3M13 17h7"/><circle cx="12" cy="7" r="3"/><circle cx="17" cy="12" r="3"/><circle cx="10" cy="17" r="3"/></svg>
}
function StaffingIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="7.25" r="3.25"/><path d="M5.5 20c.8-4 3-6 6.5-6s5.7 2 6.5 6"/></svg>
}
function MaintenanceIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.8 5.2a4.5 4.5 0 0 0-5.45 5.72L4.7 15.57a1.9 1.9 0 0 0 2.69 2.69l4.65-4.65a4.5 4.5 0 0 0 5.72-5.45l-2.7 2.7-2.65-2.65z"/></svg>
}
function ProgrammingIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.75" y="5.5" width="16.5" height="15" rx="0.5"/><path d="M7.5 3.5v4M16.5 3.5v4M3.75 10h16.5"/></svg>
}

const services = [
  { label: "OPERATIONS", icon: <OperationsIcon /> },
  { label: "STAFFING", icon: <StaffingIcon /> },
  { label: "MAINTENANCE", icon: <MaintenanceIcon /> },
  { label: "PROGRAMMING", icon: <ProgrammingIcon /> },
]

export default function FacilityManagementEditorial() {
  return (
    <main style={{ backgroundColor: "var(--color-warm-off-white)", color: "var(--color-near-black)" }}>
      <section className="relative isolate overflow-hidden" style={{ minHeight: "clamp(430px, 47vw, 685px)", backgroundColor: "#0c0e0c" }}>
        <Image src="/images/placeholder/facility-indoor-hall-hero.jpg" alt="Empty modern indoor sports hall with a football goal" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "center" }} />
        <div className="absolute inset-y-0 left-0 w-full" style={{ background: "linear-gradient(90deg, rgba(4,7,6,0.85) 0%, rgba(4,7,6,0.62) 31%, rgba(4,7,6,0.12) 59%, rgba(4,7,6,0) 78%)" }} />
        <div className="relative z-10 flex h-full min-h-[430px] items-end px-6 pb-12 pt-24 sm:px-10 sm:pb-16 lg:min-h-[685px] lg:px-20 lg:pb-20">
          <div style={{ maxWidth: "670px" }}>
            <h1 style={{ ...displayStyle, color: "var(--color-white)", fontSize: "clamp(4.15rem, 8.4vw, 9rem)", lineHeight: 0.84, margin: 0 }}>
              <span className="block">FACILITY</span>
              <span className="block" style={{ marginTop: "0.11em" }}>MANAGEMENT</span>
            </h1>
            <p style={{ color: "var(--color-white)", fontFamily: "var(--font-body)", fontSize: "clamp(0.78rem, 1.2vw, 1rem)", fontWeight: 600, letterSpacing: "0.09em", lineHeight: 1.6, margin: "2rem 0 0" }}>
              <span className="block">PROFESSIONAL MANAGEMENT.</span>
              <span className="block">EXCEPTIONAL FACILITIES.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1375px] grid-cols-1 gap-9 lg:grid-cols-[minmax(0,1.48fr)_minmax(300px,0.82fr)] lg:items-center lg:gap-16">
          <div className="relative overflow-hidden" style={{ aspectRatio: "1.35 / 1" }}>
            <Image src="/images/placeholder/facility-dusk-field.jpg" alt="Professionally maintained football field at dusk" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" style={{ objectPosition: "center" }} />
          </div>
          <div className="lg:pr-8">
            <div className="mb-6 flex items-center gap-5" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.06em" }}><span>01</span><span aria-hidden="true" style={{ display: "block", height: 1, width: 70, backgroundColor: "var(--color-near-black)" }} /></div>
            <h2 style={{ ...displayStyle, color: "var(--color-near-black)", fontSize: "clamp(3.5rem, 5vw, 6.05rem)", lineHeight: 0.86, margin: 0 }}>
              <span className="block">COMPLETE</span>
              <span className="block" style={{ marginTop: "0.08em" }}>FACILITY</span>
              <span className="block" style={{ marginTop: "0.08em" }}>MANAGEMENT</span>
            </h2>
            <p style={{ color: "var(--color-near-black)", fontFamily: "var(--font-body)", fontSize: "0.98rem", lineHeight: 1.62, margin: "1.65rem 0 0", maxWidth: "405px" }}>We provide complete sports facility management across the UAE, overseeing operations, staffing, maintenance and sports programming to ensure every venue runs safely and professionally.</p>
            <span className="mt-8 inline-flex" aria-hidden="true"><Arrow /></span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 pt-3 sm:px-10 sm:pb-20 lg:px-12 lg:pb-24 lg:pt-4">
        <div className="mx-auto grid max-w-[1375px] grid-cols-1 gap-9 lg:grid-cols-[minmax(300px,0.82fr)_minmax(0,1.48fr)] lg:items-center lg:gap-16">
          <div className="lg:pl-8">
            <div className="mb-6 flex items-center gap-5" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.06em" }}><span>02</span><span aria-hidden="true" style={{ display: "block", height: 1, width: 70, backgroundColor: "var(--color-near-black)" }} /></div>
            <h2 style={{ ...displayStyle, color: "var(--color-near-black)", fontSize: "clamp(3.5rem, 5vw, 6.05rem)", lineHeight: 0.86, margin: 0 }}>
              <span className="block">EVERY PART.</span>
              <span className="block" style={{ marginTop: "0.11em" }}>ONE TEAM.</span>
            </h2>
            <ul className="m-0 mt-8 list-none space-y-5 p-0" aria-label="Facility management services">
              {services.map((service) => <li key={service.label} className="flex items-center gap-4" style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 600, letterSpacing: "0.08em" }}><span aria-hidden="true" style={{ color: "var(--color-near-black)" }}>{service.icon}</span>{service.label}</li>)}
            </ul>
            <span className="mt-8 inline-flex" aria-hidden="true"><Arrow /></span>
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "1.35 / 1" }}>
            <Image src="/images/placeholder/facility-indoor-pool.jpg" alt="Empty indoor lap pool with windows and palm trees" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" style={{ objectPosition: "center" }} />
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-10 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="mx-auto max-w-[1460px] border-t pt-12 text-center sm:pt-16" style={{ borderColor: "rgba(12,14,12,0.18)" }}>
          <span aria-hidden="true" className="mb-5 inline-block" style={{ width: 42, height: 3, backgroundColor: "var(--color-academy-green)" }} />
          <h2 style={{ ...displayStyle, color: "var(--color-academy-green)", fontSize: "clamp(3.4rem, 5.2vw, 6.3rem)", lineHeight: 0.86, margin: 0 }}>
            <span className="block">READY TO TRANSFORM</span>
            <span className="block" style={{ marginTop: "0.1em" }}>YOUR SPORTS FACILITY?</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.55, margin: "1.45rem auto 1.85rem", maxWidth: "440px" }}>Let&apos;s discuss how we can manage and elevate<br className="hidden sm:block" /> your facility to the highest standard.</p>
          <Link href="/contact?programme=Facility%20Management" className="inline-flex items-center gap-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]" style={{ backgroundColor: "var(--color-academy-green)", color: "var(--color-white)", fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.08em", padding: "1rem 1.3rem", textDecoration: "none" }}>REQUEST A CONSULTATION <span aria-hidden="true" style={{ fontSize: "1.25rem", lineHeight: 0 }}>→</span></Link>
        </div>
      </section>
    </main>
  )
}
