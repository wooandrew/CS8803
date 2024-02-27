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
            destination: `${GAMEFORGE_URL}/gameforge`,
          },
          {
            source: "/gameforge/:path*",
            destination: `${GAMEFORGE_URL}/gameforge/:path*`,
          },
        ];
      },
};

export default nextConfig;
