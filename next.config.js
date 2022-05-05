/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  basePath: isProd ? '/threejs-mmd' : '',
  assetPrefix: isProd ? '/threejs-mmd/' : '',
  env: {
    basePath: isProd ? '/threejs-mmd/' : '',
    siteName: isProd ? 'tic40/threejs-mmd' : '[dev] tic40/threejs-mmd',
    ogImage: 'https://avatars.githubusercontent.com/u/739402?v=4?s=400',
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config
  },
  reactStrictMode: true,
}
