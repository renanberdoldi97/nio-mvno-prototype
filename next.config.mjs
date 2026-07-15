/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Remove o loader padrão de SVGs do Next
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push(
      // SVGs importados via "import Foo from './foo.svg'" → componente React
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                { name: 'removeViewBox', active: false },
                { name: 'convertColors', params: { currentColor: true } },
              ],
            },
          },
        }],
      },
    );
    return config;
  },
  // Permite <Image> buscar SVGs de /public sem otimização
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
