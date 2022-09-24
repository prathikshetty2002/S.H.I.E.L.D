/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'})
// const nextConfig = withPWA({
//   reactStrictMode: true,
//   pwa: {
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
//     swSrc: 'service-worker.js'
//   }
// })

module.exports = withPWA({
  // next.js config
  reactStrictMode: true,
  images:{
    domains: ['firebasestorage.googleapis.com']
  }
})