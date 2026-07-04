"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Link from "next/link"
import { CLASSCARD_URL } from "@/lib/config"
import { NAV_LINKS } from "@/content/home"

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    gsap.from(headerRef.current, {
      opacity: 0,
      y: prefersReduced ? 0 : -16,
      duration: prefersReduced ? 0.01 : 0.6,
      ease: "power2.out",
    })
  }, { scope: headerRef })

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "var(--color-black)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <nav
        className="mx-auto flex items-center justify-between h-16 px-6"
        style={{ maxWidth: "1280px" }}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-lg tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-white)",
            textDecoration: "none",
          }}
        >
          Young Icons
        </Link>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={CLASSCARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block text-sm px-5 py-2 rounded-full"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-white)",
            backgroundColor: "var(--color-academy-green)",
            textDecoration: "none",
          }}
        >
          Book Free Trial
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden p-2"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-white)",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          className="md:hidden px-6 pb-8 pt-6"
          style={{
            backgroundColor: "var(--color-black)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <ul className="flex flex-col gap-6 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--color-white)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={CLASSCARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block mt-8 text-center rounded-full py-4 px-6"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              textDecoration: "none",
            }}
          >
            Book Free Trial
          </a>
        </div>
      )}
    </header>
  )
}
