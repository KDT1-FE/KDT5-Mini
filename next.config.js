/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "http://54.79.60.180:8080/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
