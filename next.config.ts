import path from 'path'
import type { NextConfig } from 'next'

// R3F RULE: All Three.js / React Three Fiber canvas components must be loaded with
// next/dynamic and ssr: false — never import them directly in Server Components.
//
//   const MyCanvas = dynamic(() => import('@/components/canvas/MyCanvas'), { ssr: false })
//
// Violating this causes "document is not defined" SSR crashes at build time.

const nextConfig: NextConfig = {
  // Explicitly set tracing root to this project directory.
  // Prevents "multiple lockfiles" warning caused by C:\Dev\NOVA\package-lock.json.
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: '/camps',
        destination: '/schools/holiday-camps',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
