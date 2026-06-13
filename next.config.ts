import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right",
  },

  // QUAN TRỌNG: giúp ổn định LAN + HMR
  allowedDevOrigins: ["192.168.1.34"],
};

export default nextConfig;