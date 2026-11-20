import type { MetadataRoute } from 'next';
import {canonicalSite,isProduction} from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return isProduction() ? {
    rules: {userAgent:'*',allow:'/'},
    sitemap: `${canonicalSite}/sitemap.xml`,
  } : {rules:{userAgent:'*',disallow:'/'}};
}
