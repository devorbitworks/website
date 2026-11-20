import type { MetadataRoute } from 'next';
import {canonicalRoutes,canonicalSite} from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return canonicalRoutes.map(path=>({url:new URL(path,canonicalSite).href}));
}
