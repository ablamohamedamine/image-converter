import { MetadataRoute } from 'next';
import { conversionPages } from '@/app/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with your actual production domain
  const baseUrl = 'https://convertino.xyz';

  // 1. Define your static pages
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0, // Homepage gets the highest priority
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // 2. Dynamically generate routes for all your conversion pages
  const dynamicRoutes = conversionPages.map((page) => ({
    url: `${baseUrl}/convert/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9, // High priority for your money/tool pages
  }));

  // Combine and return all routes
  return [...staticRoutes, ...dynamicRoutes];
}