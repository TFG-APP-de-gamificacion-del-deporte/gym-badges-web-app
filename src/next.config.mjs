/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3.5mb",
    },
  },
};

export default nextConfig;
