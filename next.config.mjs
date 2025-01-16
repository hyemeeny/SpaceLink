/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "codeit-assets.codeit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s.pstatic.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
