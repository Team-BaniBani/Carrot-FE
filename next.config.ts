// next.config.js
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,  // ✅ 개발환경에서 이미지 최적화 끄기
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/assets/**',
      },
    ],
  },
}

module.exports = nextConfig