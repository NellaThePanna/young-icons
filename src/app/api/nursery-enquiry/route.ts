import { NextRequest, NextResponse } from 'next/server'

const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5

const ipLog = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = ipLog.get(ip)
  if (!entry || now > entry.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_PER_WINDOW) return false
  entry.count += 1
  return true
}

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

  const nurseryName = data.nurseryName
  const contactName = data.contactName
  const jobRole = data.jobRole
  const email = data.email
  const phone = data.phone
  const location = data.location
  const interestedIn = data.interestedIn

  if (
    !requireString(nurseryName) ||
    !requireString(contactName) ||
    !requireString(jobRole) ||
    !requireString(email) ||
    !requireString(phone) ||
    !requireString(location) ||
    !requireString(interestedIn)
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
    // Wire Resend here when RESEND_API_KEY is available in environment.
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({ from: '...', to: '...', subject: '...', ... })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    // Full error is logged server-side only — never exposed to client.
    console.error('[nursery-enquiry/route] email send failed')
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
