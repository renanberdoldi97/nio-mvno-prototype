/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgo: true,
          svgoConfig: {
            plugins: [
              { name: 'removeViewBox', active: false },
              // Força currentColor pra permitir controle via CSS
              {
                name: 'convertColors',
                params: { currentColor: true }
              }
            ]
          }
        }
      }],
    });
    return config;
  },
};

export default nextConfig;
