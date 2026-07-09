const MARQUEE_WORDS = ["PLAY", "LEARN", "GROW"]
const MARQUEE_REPEATS = Array.from({ length: 8 })

function MarqueeTrack() {
  return (
    <div className="marquee-track flex shrink-0 items-center">
      {MARQUEE_REPEATS.flatMap((_, repeatIndex) =>
        MARQUEE_WORDS.map((word, wordIndex) => (
          <span
            key={`${repeatIndex}-${wordIndex}`}
            className="flex items-center whitespace-nowrap"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              color: "var(--color-black)",
              textTransform: "uppercase",
            }}
          >
            {word}
            <span style={{ margin: "0 1rem" }}>•</span>
          </span>
        ))
      )}
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <div
      className="overflow-hidden"
      style={{ backgroundColor: "var(--color-academy-green)", padding: "20px 0" }}
      aria-hidden="true"
    >
      <div className="flex">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  )
}
