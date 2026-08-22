// In-memory, per-instance only. On Vercel, each serverless instance holds its own
// Map — under concurrent/scaled traffic the real limit is 5/hour per instance, not
// a true global 5/hour per IP. Fine for current low-volume form traffic; if that
// changes, replace with a shared store (see nova-debt below).
// nova-debt: no distributed store (Redis/Upstash/Vercel KV) — deferred as an infra/cost decision, not built here.

const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5

const ipLog = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(ip: string): boolean {
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
