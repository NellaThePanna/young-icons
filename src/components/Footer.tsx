import Link from "next/link"
import { CLASSCARD_URL } from "@/lib/config"
import { NAV_LINKS, FOOTER_NAP } from "@/content/home"

export default function Footer() {
  const whatsappHref = `https://wa.me/${FOOTER_NAP.whatsappNumber}?text=${encodeURIComponent(FOOTER_NAP.whatsappMessage)}`
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: "var(--color-black)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto px-6 py-16" style={{ maxWidth: "1280px" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Logo + machine-readable NAP */}
          <div>
            <Link
              href="/"
              className="block text-lg tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--color-white)",
                textDecoration: "none",
              }}
            >
              Young Icons
            </Link>
            <address
              className="not-italic text-sm leading-loose"
              style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.55)" }}
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <span itemProp="name" style={{ display: "block" }}>
                {FOOTER_NAP.name}
              </span>
              <span
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
                style={{ display: "block" }}
              >
                <span itemProp="streetAddress">{FOOTER_NAP.address}</span>
              </span>
              <a
                href={`tel:${FOOTER_NAP.phone}`}
                itemProp="telephone"
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                }}
              >
                {FOOTER_NAP.phone}
              </a>
              <a
                href={`mailto:${FOOTER_NAP.email}`}
                itemProp="email"
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                }}
              >
                {FOOTER_NAP.email}
              </a>
            </address>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Pages
            </p>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + CTA */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Connect
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <a
                href="[CLIENT: Instagram URL]"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}
              >
                Instagram
              </a>
              <a
                href="[CLIENT: Facebook URL]"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}
              >
                Facebook
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}
              >
                WhatsApp
              </a>
            </div>
            <a
              href={CLASSCARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-5 py-2 text-sm"
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
        </div>

        <div
          className="mt-16 pt-6 text-sm"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          © {year} Young Icons Sports Academy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
