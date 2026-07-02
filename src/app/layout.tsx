import type { Metadata } from 'next'
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import '@/styles/tokens.css'
import LenisProvider from '@/components/providers/LenisProvider'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-plus-jakarta-sans',
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
      <body className={`${spaceGrotesk.variable} ${plusJakartaSans.variable}`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
