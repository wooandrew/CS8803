/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
      return [
        {
          source: "/:path*",
          destination: `/:path*`,
        },
        {
          source: "/gameforge",
          destination: `${process.env.GAMEFORGE_URL}/gameforge`,
        },
        {
          source: "/gameforge/:path*",
          destination: `${process.env.GAMEFORGE_URL}/gameforge/:path*`,
        },
        {
          source: "/criticalcartography",
          destination: `${process.env.CRITICALCARTOGRAPHY_URL}/criticalcartography`,
        },
        {
          source: "/criticalcartography/:path*",
          destination: `${process.env.CRITICALCARTOGRAPHY_URL}/criticalcartography/:path*`,
        },
      ];
    },
};

export default nextConfig;
