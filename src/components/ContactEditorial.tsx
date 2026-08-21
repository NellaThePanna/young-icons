"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { FOOTER_NAP } from "@/content/home"

const WHATSAPP_HREF = `https://wa.me/${FOOTER_NAP.whatsappNumber}?text=${encodeURIComponent(FOOTER_NAP.whatsappMessage)}`

const displayStyle = { fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }

type ContactState = { name: string; email: string; phone: string; message: string }
type Status = "idle" | "submitting" | "success" | "error"
const emptyForm: ContactState = { name: "", email: "", phone: "", message: "" }

function ChatIcon() { return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20 15.5a3 3 0 0 1-3 3H9l-4 3v-3.6a3 3 0 0 1-2-2.8v-8a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z"/><path d="M7 10h10M7 13.5h6"/></svg> }
function WhatsAppIcon() { return <svg width="30" height="30" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg> }
function PhoneIcon() { return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 5c0 8.28 6.72 15 15 15l2-4-5-3-2 2c-2.5-1.2-4.3-3-5.5-5.5l2-2-3-5-4 2Z"/></svg> }
function Arrow() { return <span aria-hidden="true" style={{ fontSize: "2rem", fontWeight: 300, lineHeight: 1 }}>→</span> }

export default function ContactEditorial() {
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState<ContactState>(emptyForm)
  const [status, setStatus] = useState<Status>("idle")
  const openerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    const returnFocusTo = openerRef.current
    document.body.style.overflow = "hidden"
    window.setTimeout(() => closeRef.current?.focus(), 0)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIsOpen(false); return }
      if (event.key !== "Tab" || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'))
      if (!focusable.length) return
      const first = focusable[0]; const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); returnFocusTo?.focus() }
  }, [isOpen])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setStatus("submitting")
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error("submit failed")
      setStatus("success"); setForm(emptyForm)
    } catch { setStatus("error") }
  }
  const close = () => setIsOpen(false)

  return (
    <main style={{ backgroundColor: "var(--color-warm-off-white)", color: "var(--color-near-black)" }}>
      <section className="relative isolate overflow-hidden border-b px-6 pb-8 pt-24 sm:px-10 sm:pb-12 lg:px-12 lg:pb-0 lg:pt-28" style={{ borderColor: "rgba(12,14,12,0.15)", minHeight: "clamp(565px, 52vw, 795px)" }}>
        <Image src="/images/placeholder/contact-football-editorial-hero.jpg" alt="Young football player controlling a ball on a bright court" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "center" }} />
        <div className="relative z-10 flex min-h-[520px] flex-col justify-end pb-10 sm:min-h-[610px] sm:pb-14 lg:min-h-[675px] lg:pb-20">
          <div style={{ maxWidth: "min(48vw, 650px)" }} className="max-w-[92%]">
            <h1 style={{ ...displayStyle, color: "#06452f", fontSize: "clamp(4.15rem, 8.45vw, 9.6rem)", lineHeight: 0.83, margin: 0 }}>
              <span className="block">LET&apos;S GET</span>
              <span className="block" style={{ marginTop: "0.095em" }}>THINGS</span>
              <span className="block" style={{ marginTop: "0.095em" }}>MOVING.</span>
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem, 1.25vw, 1.2rem)", lineHeight: 1.5, margin: "1.55rem 0 0", maxWidth: "360px", color: "var(--color-near-black)" }}>
              <span className="block">Nurseries. Schools. Clubs.</span>
              <span className="block">Tell us what you&apos;re looking for</span>
              <span className="block">and we&apos;ll take it from there.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="border-b px-6 py-8 sm:px-10 sm:py-9 lg:px-12 lg:py-10" style={{ borderColor: "rgba(12,14,12,0.15)" }} aria-label="Ways to contact Young Icons">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0" style={{ borderColor: "rgba(12,14,12,0.18)" }}>
          <ContactMethod icon={<ChatIcon />} heading={<>START A<br />CONVERSATION</>} description={<>Fill out a quick form<br />and we&apos;ll be in touch.</>} as="button" buttonRef={openerRef} onClick={() => { setStatus("idle"); setIsOpen(true) }} />
          <ContactMethod icon={<WhatsAppIcon />} heading={<>WHATSAPP US</>} description={<>Chat with our team<br />on WhatsApp.</>} as="link" href={WHATSAPP_HREF} external />
          <ContactMethod icon={<PhoneIcon />} heading={<>CALL US</>} description={<>Speak to our team<br />directly.</>} as="link" href={`tel:${FOOTER_NAP.phone}`} />
        </div>
      </section>

      <section className="px-6 py-14 sm:px-10 sm:py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1260px] grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(340px,0.85fr)] lg:items-end lg:gap-24">
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.08em", margin: 0 }}>DUBAI • ABU DHABI</p>
            <h2 style={{ ...displayStyle, color: "#06452f", fontSize: "clamp(3.4rem, 5.8vw, 6.5rem)", lineHeight: 0.86, margin: "1rem 0 0" }}>
              <span className="block">PROGRAMMES</span>
              <span className="block" style={{ marginTop: "0.1em" }}>ACROSS THE UAE.</span>
            </h2>
          </div>
          <div className="border-t" style={{ borderColor: "rgba(12,14,12,0.18)" }}>
            <ContactDetail icon={<PhoneIcon />} label="CALL" value={FOOTER_NAP.phone} href={`tel:${FOOTER_NAP.phone}`} />
            <ContactDetail icon={<WhatsAppIcon />} label="WHATSAPP" value={FOOTER_NAP.phone} href={WHATSAPP_HREF} external />
          </div>
        </div>
      </section>

      {isOpen && <div role="presentation" className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8" style={{ backgroundColor: "rgba(12,14,12,0.68)" }} onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" className="relative max-h-full w-full overflow-y-auto p-6 sm:p-10" style={{ maxWidth: "760px", backgroundColor: "var(--color-warm-off-white)" }}>
          <button ref={closeRef} type="button" aria-label="Close contact form" onClick={close} className="absolute right-5 top-5 text-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]" style={{ border: 0, background: "transparent", color: "var(--color-academy-green)", cursor: "pointer" }}>×</button>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", color: "var(--color-academy-green)", margin: 0 }}>CONTACT YOUNG ICONS</p>
          <h2 id="contact-modal-title" style={{ ...displayStyle, color: "var(--color-near-black)", fontSize: "clamp(3rem, 6vw, 5.6rem)", lineHeight: 0.86, margin: "1rem 0 2rem" }}>START A CONVERSATION.</h2>
          {status === "success" ? <div role="status"><p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.55, margin: 0 }}>Your form was accepted. For an immediate response, please use WhatsApp or call us directly.</p></div> :
            <form onSubmit={submit} className="grid grid-cols-1 gap-7 sm:grid-cols-2" noValidate>
              <Field label="YOUR NAME" name="name" value={form.name} onChange={handleChange} required />
              <Field label="EMAIL ADDRESS" name="email" type="email" value={form.email} onChange={handleChange} required />
              <Field label="PHONE NUMBER" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
              <label className="sm:col-span-2" style={labelStyle}>MESSAGE (OPTIONAL)<textarea name="message" value={form.message} onChange={handleChange} rows={3} style={{ ...fieldStyle, resize: "vertical", marginTop: "0.45rem" }} /></label>
              <div className="sm:col-span-2 flex flex-col items-start gap-4"><button type="submit" disabled={status === "submitting"} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]" style={{ border: 0, backgroundColor: "var(--color-academy-green)", color: "var(--color-white)", cursor: status === "submitting" ? "wait" : "pointer", fontFamily: "var(--font-body)", fontSize: "0.84rem", fontWeight: 700, letterSpacing: "0.08em", padding: "1rem 1.35rem" }}>{status === "submitting" ? "SENDING…" : "SEND MESSAGE"}</button>{status === "error" && <p role="alert" style={{ color: "#9c2a2a", fontFamily: "var(--font-body)", margin: 0 }}>Something went wrong. Please try again, or use WhatsApp.</p>}</div>
            </form>}
        </div>
      </div>}
    </main>
  )
}

const labelStyle: React.CSSProperties = { display: "block", color: "var(--color-near-black)", fontFamily: "var(--font-body)", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em" }
const fieldStyle: React.CSSProperties = { width: "100%", border: 0, borderBottom: "1px solid rgba(12,14,12,0.35)", background: "transparent", borderRadius: 0, color: "var(--color-near-black)", fontFamily: "var(--font-body)", fontSize: "1rem", outline: "none", padding: "0.7rem 0" }

function Field({ label, name, value, onChange, type = "text", required = false }: { label: string; name: keyof ContactState; value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; type?: string; required?: boolean }) { return <label style={labelStyle}>{label}<input name={name} type={type} value={value} onChange={onChange} required={required} style={{ ...fieldStyle, marginTop: "0.45rem" }} /></label> }

function ContactMethod({ icon, heading, description, as, onClick, buttonRef, href, external }: { icon: React.ReactNode; heading: React.ReactNode; description: React.ReactNode; as: "button" | "link"; onClick?: () => void; buttonRef?: React.RefObject<HTMLButtonElement | null>; href?: string; external?: boolean }) {
  const content = <>
    <span className="inline-flex h-[82px] w-[82px] items-center justify-center rounded-full border" style={{ borderColor: "rgba(12,14,12,0.45)", color: "#06452f" }}>{icon}</span>
    <span className="flex h-[76px] w-full items-start justify-center" style={{ fontFamily: "var(--font-nursery-hero)", fontWeight: 700, letterSpacing: "0.005em", color: "var(--color-near-black)", fontSize: "clamp(2rem, 2.35vw, 2.75rem)", lineHeight: 0.88, textAlign: "center" }}>{heading}</span>
    <span className="flex h-[48px] w-full items-start justify-center" style={{ color: "var(--color-near-black)", fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.5, textAlign: "center" }}>{description}</span>
    <span className="flex h-8 items-start justify-center" style={{ color: "var(--color-near-black)" }}><Arrow /></span>
  </>
  const classes = "grid min-h-[320px] grid-rows-[82px_76px_48px_32px] content-center justify-items-center gap-y-4 px-6 py-6 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#1a7a47]"
  if (as === "button") return <button ref={buttonRef} type="button" onClick={onClick} className={classes} style={{ border: 0, background: "transparent", cursor: "pointer" }}>{content}</button>
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={classes} style={{ textDecoration: "none" }}>{content}</a>
}

function ContactDetail({ icon, label, value, href, external = false }: { icon: React.ReactNode; label: string; value: string; href: string; external?: boolean }) { return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="flex items-center gap-5 border-b py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]" style={{ borderColor: "rgba(12,14,12,0.18)", color: "var(--color-near-black)", textDecoration: "none" }}><span aria-hidden="true" style={{ color: "#06452f" }}>{icon}</span><span style={{ fontFamily: "var(--font-body)", fontSize: "0.77rem", fontWeight: 700, letterSpacing: "0.08em", minWidth: 105 }}>{label}</span><span style={{ fontFamily: "var(--font-body)", fontSize: "0.96rem" }}>{value}</span></a> }
