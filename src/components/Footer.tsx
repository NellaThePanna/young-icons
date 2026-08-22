"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { FOOTER_NAP, FOOTER_BRAND, FOOTER_LINKS, FOOTER_SOCIAL } from "@/content/home"

function IconRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="footer-contact-row flex items-center gap-3">
      <span style={{ color: "var(--color-academy-green)", flexShrink: 0 }}>{icon}</span>
      {children}
    </div>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6 8 7 8-7" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 5c0 8.28 6.72 15 15 15l2-4-5-3-2 2c-2.5-1.2-4.3-3-5.5-5.5l2-2-3-5-4 2Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M20.5 3.5A10 10 0 0 0 3.9 15.6L2.5 21.5l6-1.4A10 10 0 1 0 20.5 3.5Z" />
      <path d="M8.3 8.6c.3-.7.6-.7 1-.7h.6c.2 0 .5 0 .7.5l.8 1.9c.1.3 0 .5-.1.7l-.5.6c-.2.2-.2.4-.1.7.4.9 1.6 2.1 2.5 2.5.3.1.5 0 .7-.1l.6-.5c.2-.2.4-.2.7-.1l1.9.8c.4.2.5.5.5.7v.6c0 .4 0 .7-.7 1-1.2.6-3 .3-5-1.7s-2.3-3.8-1.7-5Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M14 21v-7h2.5l.5-3H14V9c0-.9.3-1.5 1.7-1.5H17V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.7 1.4-3.7 3.9V11H8.5v3H11v7Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="6.8" r="0.2" fill="currentColor" />
      <path d="M11.5 16.5V12.5c0-1.2.8-2 2-2s2 .8 2 2v4" />
    </svg>
  )
}

const linkRowStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.875rem",
}

export default function Footer({ compact = false, hideUnverifiedContact = false }: { compact?: boolean; hideUnverifiedContact?: boolean }) {
  const footerRef = useRef<HTMLElement>(null)
  const whatsappHref = `https://wa.me/${FOOTER_NAP.whatsappNumber}?text=${encodeURIComponent(FOOTER_NAP.whatsappMessage)}`
  const year = new Date().getFullYear()
  const hasVerifiedEmail = !FOOTER_NAP.email.startsWith("[")
  const visibleSocials = hideUnverifiedContact
    ? FOOTER_SOCIAL.filter((social) => !social.href.startsWith("["))
    : FOOTER_SOCIAL

  const socialIcons: Record<string, React.ReactNode> = {
    Instagram: <InstagramIcon />,
    Facebook: <FacebookIcon />,
    LinkedIn: <LinkedInIcon />,
  }

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 92%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = footerRef.current?.querySelectorAll(".footer-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 24,
          duration: prefersReduced ? 0.01 : 0.6,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.08,
        })
      },
    })
  }, { scope: footerRef })

  return (
    <footer ref={footerRef} style={{ backgroundColor: "var(--color-near-black)" }}>
      <div className={compact ? "mx-auto px-6 py-10 sm:py-12" : "mx-auto px-6 py-16"} style={{ maxWidth: "1280px" }}>
        <div className={compact ? "grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-8 mb-7" : "grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"}>

          {/* Brand */}
          <div className="footer-item">
            <div className="mb-3 flex items-center gap-4">
              <Image
                src="/images/brand/young-icons-seal-white.png"
                alt=""
                width={906}
                height={905}
                className="h-24 w-auto md:h-28"
              />
              <Image
                src="/images/brand/young-icons-wordmark-white.png"
                alt="Young Icons"
                width={844}
                height={680}
                className="h-24 w-auto md:h-28"
              />
            </div>
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                fontSize: "0.75rem",
                color: "var(--color-academy-green)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {FOOTER_BRAND.motto}
            </p>
            <div
              aria-hidden="true"
              className="mb-4"
              style={{ width: 40, height: 2, backgroundColor: "var(--color-academy-green)" }}
            />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.6,
                maxWidth: "320px",
              }}
            >
              {FOOTER_BRAND.tagline}
            </p>
          </div>

          {/* Pages */}
          <nav className="footer-item" aria-label="Footer navigation">
            <p
              className="mb-2"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                fontSize: "0.75rem",
                color: "var(--color-academy-green)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              Pages
            </p>
            <ul className="list-none m-0 p-0">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link-row" style={linkRowStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer-item">
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                fontSize: "0.75rem",
                color: "var(--color-academy-green)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              Contact
            </p>
            <div className="flex flex-col gap-4">
              <IconRow icon={<LocationIcon />}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>
                  {FOOTER_NAP.locationLine}
                </span>
              </IconRow>
              {(!hideUnverifiedContact || hasVerifiedEmail) && (
                <IconRow icon={<MailIcon />}>
                  <a
                    href={hasVerifiedEmail ? `mailto:${FOOTER_NAP.email}` : undefined}
                    className="footer-contact-link"
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem" }}
                  >
                    {FOOTER_NAP.email}
                  </a>
                </IconRow>
              )}
              <IconRow icon={<PhoneIcon />}>
                <a
                  href={`tel:${FOOTER_NAP.phone}`}
                  className="footer-contact-link"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem" }}
                >
                  {FOOTER_NAP.phone}
                </a>
              </IconRow>
              <IconRow icon={<WhatsAppIcon />}>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem" }}
                >
                  {FOOTER_NAP.phone}
                </a>
              </IconRow>
            </div>
          </div>
        </div>

        {/* Follow us */}
        <div className={compact ? "footer-item mb-7" : "footer-item mb-12"}>
          <p
            className="mb-4"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-medium)",
              fontSize: "0.75rem",
              color: "var(--color-academy-green)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            Follow Us
          </p>
          <div className="flex items-center gap-4">
            {visibleSocials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="footer-social-icon"
              >
                {socialIcons[social.label]}
              </a>
            ))}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-social-icon">
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <div
          className={compact ? "footer-item pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm" : "footer-item pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm"}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          <span>© {year} Young Icons Sports Academy. All rights reserved.</span>
          <span>
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            {" | "}
            <a href="#" className="footer-legal-link">Terms &amp; Conditions</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
