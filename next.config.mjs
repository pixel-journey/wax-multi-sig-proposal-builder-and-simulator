/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // WharfKit wallet plugins are browser-oriented; keep server external where needed
  transpilePackages: [
    "@wharfkit/session",
    "@wharfkit/antelope",
    "@wharfkit/wallet-plugin-anchor",
    "@wharfkit/wallet-plugin-cloudwallet",
    "@wharfkit/web-renderer",
  ],
};

export default nextConfig;
