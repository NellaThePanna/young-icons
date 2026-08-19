"use client"

import { MULTI_FOOTER } from "@/content/multi-sports"

function InstagramIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3h3v4h-3c-1.2 0-2 .8-2 2v3h5l-1 4h-4v5H8v-5H5v-4h3V8c0-3 2-5 6-5Z" />
    </svg>
  )
}

export default function MultiFooter() {
  return (
    <footer style={{ backgroundColor: "var(--color-academy-green)" }}>
      <div className="mx-auto flex flex-col items-center justify-between gap-7 px-6 py-7 sm:px-10 md:flex-row lg:px-16" style={{ maxWidth: "1280px" }}>
        <div className="flex items-center gap-3" style={{ color: "var(--color-white)" }}>
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border"
            style={{ borderColor: "rgba(255,255,255,0.72)", fontFamily: "var(--font-display)", fontSize: "1.05rem" }}
          >
            Y
          </span>
          <span className="leading-none">
            <span className="block uppercase" style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-bold)", fontSize: "0.9rem", letterSpacing: "0.08em" }}>YOUNG ICONS</span>
            <span className="block mt-1 uppercase" style={{ fontFamily: "var(--font-body)", fontSize: "0.52rem", letterSpacing: "0.16em", opacity: 0.82 }}>SPORTS ACADEMY</span>
          </span>
        </div>

        <p className="uppercase" style={{ margin: 0, color: "var(--color-white)", fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-bold)", fontSize: "0.78rem", letterSpacing: "0.12em" }}>
          {MULTI_FOOTER.motto}
        </p>

        <div className="flex items-center gap-4" style={{ color: "var(--color-white)" }}>
          <a href="#" aria-label="Instagram" className="transition-opacity hover:opacity-70"><InstagramIcon /></a>
          <a href="#" aria-label="Facebook" className="transition-opacity hover:opacity-70"><FacebookIcon /></a>
        </div>
      </div>
    </footer>
  )
}
