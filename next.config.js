// @ts-check
 
export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    allowedDevOrigins: [
      'local-origin.dev', 
      '*.local-origin.dev',
      '172.17.5.55',
      '172.17.5.55:3000',
      'localhost',
    ],
    
    // Redirect root to default locale
    async redirects() {
      return [
        {
          source: '/',
          destination: '/en',
          permanent: false,
        },
      ];
    },

  }
  return nextConfig
}