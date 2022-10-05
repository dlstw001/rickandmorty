/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API: "https://rickandmortyapi.com/api",
  },
  images: {
    domains: ["rickandmortyapi.com"],
  },
};

module.exports = nextConfig
