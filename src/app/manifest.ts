import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Image Optimizer App',
    short_name: 'Image Optimizer',
    description: 'Free tool to process images, remove metadata, and convert to WebP',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0070f3',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/logo.webp',
        sizes: '500x500',
        type: 'image/webp',
      },
    ],
  }
}
