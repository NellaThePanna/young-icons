"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CLASSCARD_URL } from "@/lib/config"
import { NAV_LINKS, type NavItem } from "@/content/home"

const SCROLL_THRESHOLD = 80

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={className}
      style={{ display: "inline-block", marginLeft: 4, verticalAlign: "middle" }}
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<Record<string, boolean>>({})
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    gsap.from(headerRef.current, {
      opacity: 0,
      y: prefersReduced ? 0 : -16,
      duration: prefersReduced ? 0.01 : 0.6,
      ease: "power2.out",
    })
  }, { scope: headerRef })

  useGSAP(() => {
    if (!isHomepage) {
      setScrolled(false)
      return
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate: (self) => setScrolled(self.scroll() > SCROLL_THRESHOLD),
    })

    return () => trigger.kill()
  }, { scope: headerRef, dependencies: [isHomepage] })

  const isTransparent = isHomepage && !scrolled

  const isActive = (link: NavItem) =>
    pathname === link.href || (link.dropdown?.some((d) => pathname === d.href) ?? false)

  const toggleMobileDropdown = (label: string) =>
    setMobileDropdownOpen((prev) => ({ ...prev, [label]: !prev[label] }))

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: isTransparent ? "transparent" : "var(--color-nav-dark)",
        borderBottom: isTransparent
          ? "1px solid transparent"
          : "1px solid rgba(255,255,255,0.08)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
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
          {NAV_LINKS.map((link) => {
            const active = isActive(link)
            return (
              <li key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="text-sm inline-flex items-center"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-medium)",
                    color: active ? "var(--color-academy-green)" : "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                    borderBottom: active
                      ? "2px solid var(--color-academy-green)"
                      : "2px solid transparent",
                    paddingBottom: 4,
                  }}
                >
                  {link.label}
                  {link.dropdown && (
                    <Chevron className="transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {link.dropdown && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                    <ul
                      className="list-none m-0 p-0"
                      style={{
                        minWidth: 220,
                        paddingTop: 8,
                        paddingBottom: 8,
                        backgroundColor: "var(--color-white)",
                        borderRadius: "var(--radius-md)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      }}
                    >
                      {link.dropdown.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block text-sm hover:text-[var(--color-academy-green)]"
                            style={{
                              padding: "12px 16px",
                              fontFamily: "var(--font-body)",
                              fontWeight: "var(--font-weight-regular)",
                              color: "var(--color-black)",
                              textDecoration: "none",
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
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
          FIND A CLASS
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
            {NAV_LINKS.map((link) => {
              const active = isActive(link)

              if (!link.dropdown) {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-lg"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: "var(--font-weight-medium)",
                        color: active ? "var(--color-academy-green)" : "var(--color-white)",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              }

              const expanded = !!mobileDropdownOpen[link.label]

              return (
                <li key={link.href}>
                  <button
                    onClick={() => toggleMobileDropdown(link.label)}
                    aria-expanded={expanded}
                    className="flex items-center justify-between w-full text-lg"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: "var(--font-weight-medium)",
                      color: active ? "var(--color-academy-green)" : "var(--color-white)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {link.label}
                    <Chevron className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
                  </button>

                  {expanded && (
                    <ul className="flex flex-col gap-4 list-none m-0" style={{ marginTop: 16, paddingLeft: 16 }}>
                      {link.dropdown.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="text-base block"
                            style={{
                              fontFamily: "var(--font-body)",
                              fontWeight: "var(--font-weight-regular)",
                              color: pathname === item.href ? "var(--color-academy-green)" : "rgba(255,255,255,0.75)",
                              textDecoration: "none",
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
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
            FIND A CLASS
          </a>
        </div>
      )}
    </header>
  )
}
