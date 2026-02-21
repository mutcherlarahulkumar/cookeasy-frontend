import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  output: "export",
  basePath: "/cookeasy-frontend",
  // added coz hithub pages need this to work (unoptimized: true,)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
