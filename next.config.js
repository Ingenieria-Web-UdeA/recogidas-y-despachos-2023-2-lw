/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      's.gravatar.com',
      'lh3.googleusercontent.com',
      'recogidas-y-despachos-2023-2-lw-media.s3.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
