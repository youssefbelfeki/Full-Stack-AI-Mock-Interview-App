/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  productionBrowserSourceMaps: false,
  generateEtags: false,
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
