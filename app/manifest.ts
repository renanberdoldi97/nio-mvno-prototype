import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nio',
    short_name: 'Nio',
    description: 'Nio Fibra + Chip Móvel',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F5F5',
    theme_color: '#0F3D24',
    orientation: 'portrait',
    icons: [
      {
        src: '/logo/Color=Default.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      }
    ],
  };
}
