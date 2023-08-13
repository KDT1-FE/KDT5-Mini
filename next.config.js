/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

const apiIP = `${process.env.NEXT_PUBLIC_API_IP}`;

module.exports = {
  ...nextConfig,
  images: {
    domains: [`${apiIP}`],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**'
      }
    ]
  }
};
