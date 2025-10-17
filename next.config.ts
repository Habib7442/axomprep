import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: "img.clerk.com" },
      { hostname: "ebzjisaqomoombvmbyyb.supabase.co" } // Add Supabase storage domain
    ],
  },
};

export default nextConfig;