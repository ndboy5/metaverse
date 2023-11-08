/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "my-metaverse-development-prj.infura-ipfs.io",
      "ipfs.infura.io",
      "infura-ipfs.io",
    ],
    // formats: ["image/webp"],
  },
};

module.exports = nextConfig;
