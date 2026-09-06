import Image from "next/image"
import styles from "./MultiHero.module.css"

const HERO_IMAGE = "/images/clubs/multi-sports-hero-clean.png"

export default function MultiHero() {
  return (
    <section className="multi-sports-hero" style={{ paddingTop: "64px", backgroundColor: "#050505" }}>
      <div className={styles.frame}>
        <Image
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />

        <div className={styles.copy}>
          <h1 className={styles.title} aria-label="PLAY. LEARN. GROW.">
            <span>PLAY.</span>
            <span>LEARN.</span>
            <span>GROW.</span>
          </h1>
          <p className={styles.subtitle}>MULTI-SPORTS CLUB</p>
        </div>
      </div>
    </section>
  )
}