import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NEXT_EXPORT === "true" ? { output: "export" as const } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
