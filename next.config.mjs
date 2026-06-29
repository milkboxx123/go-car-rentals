import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/monthly",
        destination: "/monthly-rentals",
        permanent: true,
      },
      {
        source: "/partner",
        destination: "/list-with-us",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
