// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   eslint:{
//     ignoreDuringBuilds:process.env.NODE_ENV === "production" ? false : true,
//   },
//   typescript:{
//     ignoreBuildErrors:true,
//   }
// };

// export default nextConfig;


// next.config.js
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // ✅ skips lint errors
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ skips TS errors
  },
};

module.exports = nextConfig;
