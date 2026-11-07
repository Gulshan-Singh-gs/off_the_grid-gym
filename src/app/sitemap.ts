import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/facilities',
    '/pricing',
    '/offers',
    '/trainers',
    '/gallery',
    '/contact',
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === '' || route === '/offers' || route === '/pricing' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/pricing' || route === '/facilities' ? 0.9 : 0.8,
  }));
}

