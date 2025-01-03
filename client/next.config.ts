import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@zilliz/milvus2-sdk-node'],
  },
  images: {
    domains: ['image.tmdb.org'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.themoviedb.org",
        pathname: "/t/p/w1280/**",
      },
    ],
  },
};

export default nextConfig;
