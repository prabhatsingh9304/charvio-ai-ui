import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: "https://waspx-e55b2.firebaseapp.com/__/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
