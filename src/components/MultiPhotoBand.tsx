import Image from "next/image"
import { MULTI_PHOTO_BAND } from "@/content/multi-sports"

export default function MultiPhotoBand() {
  return (
    <section className="relative overflow-hidden" style={{ height: "340px" }}>
      <Image
        src={MULTI_PHOTO_BAND.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "61.09% 40.88%" }}
      />
    </section>
  )
}
