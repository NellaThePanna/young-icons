import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://[domain-TBC]'

  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about/who-we-are`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about/what-we-do`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about/meet-the-team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/nurseries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/nurseries/what-we-offer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/schools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/schools/holiday-camps`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/schools/facility-management`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/clubs/ballet`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/clubs/multi-sports`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
