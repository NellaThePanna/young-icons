import Image from "next/image"
import { MULTI_HERO } from "@/content/multi-sports"

export default function MultiHero() {
  return (
    <section className="relative" style={{ paddingTop: "64px" }}>
      <Image
        src={MULTI_HERO.image}
        alt="Play. Learn. Grow. Multi-Sports Club — children taking part in an indoor multi-sports session"
        width={MULTI_HERO.imageWidth}
        height={MULTI_HERO.imageHeight}
        priority
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: `${MULTI_HERO.imageWidth} / ${MULTI_HERO.imageHeight}`,
          display: "block",
          objectFit: "contain",
        }}
      />
    </section>
  )
}
