export const canonicalSite = 'https://www.orbitworks.co.kr';
export const canonicalRoutes = ['/', '/company', '/business', '/updates'] as const;
export const isProduction = () => process.env.VERCEL_ENV === 'production';
