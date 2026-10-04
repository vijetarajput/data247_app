import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We don't need experimental flags for Tailwind v4 if we import it natively!
  reactStrictMode: true,
};

export default nextConfig;
