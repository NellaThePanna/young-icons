import { SCHOOLS_TRUSTED_PARTNERS } from "@/content/schools-activities"

export default function SchoolsTrustedPartners() {
  return (
    <section>
      <div className="px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-7" style={{ backgroundColor: "var(--color-warm-off-white)" }}>
        <div className="mx-auto" style={{ maxWidth: "1320px" }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.76rem", letterSpacing: "0.12em", color: "var(--color-near-black)", margin: "0 0 0.7rem" }}>
            {SCHOOLS_TRUSTED_PARTNERS.label}
          </p>
          <div aria-hidden="true" style={{ width: "24px", height: "2px", backgroundColor: "var(--color-academy-green)" }} />
        </div>
      </div>

      <div style={{ backgroundColor: "#0f2b1c", color: "var(--color-white)" }}>
        <div className="mx-auto px-5 py-8 sm:px-8 sm:py-9 lg:px-12 lg:py-10" style={{ maxWidth: "1320px" }}>
          <div className="grid grid-cols-1 divide-y divide-white/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {SCHOOLS_TRUSTED_PARTNERS.stats.map((stat) => (
              <div key={stat.primary} className="flex flex-col items-center justify-center px-4 py-6 text-center sm:px-6 sm:py-7">
                <p className="flex items-center justify-center" style={{ height: "clamp(3.45rem, 4.6vw, 4.7rem)", fontFamily: "var(--font-display)", fontSize: stat.primary === "ACROSS THE UAE" ? "clamp(2.15rem, 3.15vw, 3.5rem)" : "clamp(3.15rem, 4.5vw, 4.65rem)", lineHeight: 0.9, letterSpacing: "-0.025em", color: "var(--color-white)", margin: 0 }}>
                  {stat.primary}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.72rem", letterSpacing: "0.16em", lineHeight: 1.45, color: "rgba(255,255,255,0.88)", margin: "0.7rem 0 0" }}>
                  {stat.secondary.map((line) => <span className="block" key={line}>{line}</span>)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-white/20 pt-6 sm:mt-7 sm:pt-7">
            <p className="text-center" style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.76rem", letterSpacing: "0.16em", color: "rgba(255,255,255,0.9)", margin: 0 }}>
              {SCHOOLS_TRUSTED_PARTNERS.heading}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
