/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.snapshot = {
      ...(config.snapshot ?? {}),
      managedPaths: [
        /^(.+?[\\/]node_modules[\\/](?!(@privy-io[\\/]wagmi-connector|@next|@swc))(@.+?[\\/])?.+?)[\\/]/,
      ],
    };

     // Add rules for fonts and video files
     config.module.rules.push(
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        type: "asset/resource",
      }
    );

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
