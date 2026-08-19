import Image from "next/image"
import { NURSERY_EDITORIAL_PHOTO } from "@/content/nurseries-about"

export default function NurseryEditorialPhoto() {
  return (
    <section
      className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12"
      style={{ backgroundColor: "#f4f2ec" }}
      aria-label="Nursery movement in action"
    >
      <div className="relative mx-auto overflow-hidden" style={{ maxWidth: "1360px", aspectRatio: "16 / 8", minHeight: "300px" }}>
        <Image
          src={NURSERY_EDITORIAL_PHOTO.image}
          alt={NURSERY_EDITORIAL_PHOTO.alt}
          fill
          sizes="(max-width: 768px) 100vw, 94vw"
          className="object-cover"
          style={{ objectPosition: "50% 38%" }}
        />
      </div>
    </section>
  )
}
