import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint:{
    ignoreDuringBuilds:process.env.NODE_ENV === "production" ? false : true,
  },
  typescript:{
    ignoreBuildErrors:true,
  }
};

export default nextConfig;
