import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://convertino.xyz';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow any private or API routes if you add them later
      // disallow: '/api/', 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}