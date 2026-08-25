import type { Metadata } from 'next'
import { Urbanist, Inter, Anton } from 'next/font/google'
import './globals.css'
import '@/styles/tokens.css'
import LenisProvider from '@/components/providers/LenisProvider'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nursery-hero',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
})

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Young Icons Sports Academy Dubai | Free Trial',
  description:
    "Dubai's trusted kids sports academy. Qualified coaches, structured programmes for ages 3–14. Book your child's free trial session today.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject data-gr-* attributes on body before React hydrates */}
      <body
        className={`${urbanist.variable} ${inter.variable} ${anton.variable}`}
        style={{ '--font-display': 'var(--font-nursery-hero)', '--font-holiday-display': 'var(--font-nursery-hero)' } as React.CSSProperties}
        suppressHydrationWarning
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
