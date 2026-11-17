import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(.*)\\.workers\\.dev",
          },
        ],
        destination: "https://weblirev.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
