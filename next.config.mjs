/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

let internalHost = null

if (!isProd) {
  const { internalIpV4 } = await import('internal-ip')
  internalHost = await internalIpV4()
}

const assetPrefixSpreadable =
  isProd ? {} : { assetPrefix: `http://${internalHost}:3000` }

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  ...assetPrefixSpreadable,
  /*typescript: {
    // Dangerously ignore typescript errors during production build
    // ignoreBuildErrors: true,
  },*/
}

export default nextConfig
