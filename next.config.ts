import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [{source:'/about',destination:'/company',permanent:true}];
  },
};

export default nextConfig;
