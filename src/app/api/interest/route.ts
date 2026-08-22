import { NextRequest, NextResponse } from 'next/server'
import { createRateLimiter } from '@/lib/rate-limit'

const checkRateLimit = createRateLimiter()

function requireString(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

function isValidEmail(value: string): boolean {
  return value.includes('@') && value.includes('.')
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const data = body as Record<string, unknown>

  const parentName = data.parentName
  const email = data.email
  const phone = data.phone
  const childAge = data.childAge
  const location = data.location

  if (
    !requireString(parentName) ||
    !requireString(email) ||
    !requireString(phone) ||
    !requireString(childAge) ||
    !requireString(location)
  ) {
    return NextResponse.json(
      { error: 'Please check your details and try again.' },
      { status: 422 }
    )
  }

  if (!isValidEmail(email as string)) {
    return NextResponse.json(
      { error: 'Please check your details and try again.' },
      { status: 422 }
    )
  }

  try {
    console.log('[interest/route] new interest submission', {
      parentName,
      email,
      phone,
      childAge,
      location,
    })

    // TODO: wire Resend here when RESEND_API_KEY is available in environment.
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({ from: '...', to: '...', subject: '...', ... })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    // Full error is logged server-side only — never exposed to client.
    console.error('[interest/route] submission failed')
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
