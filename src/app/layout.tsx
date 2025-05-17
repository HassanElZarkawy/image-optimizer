import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { StructuredData } from '@/components/structured-data';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Image Optimizer - Free Online Tool to Optimize, Convert & Remove Metadata',
  description: 'Free online tool to strip metadata, resize images, and convert to WebP format with our privacy-focused image optimizer. No account required, all processing done in your browser.',
  keywords: ['image processor', 'webp converter', 'image optimizer', 'metadata removal', 'image resizer', 'privacy', 'free image tool'],
  authors: [{ name: 'Hassan El-Zarkawy' }],
  creator: 'Hassan El-Zarkawy',
  publisher: 'Global Soft',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-us',
    },
  },
  openGraph: {
    title: 'Image Optimizer - Free Online Tool to Optimize, Convert & Remove Metadata',
    description: 'Free online tool to strip metadata, resize images, and convert to WebP format with our privacy-focused image optimizer. No account required, all processing done in your browser.',
    url: 'https://your-domain.com',
    siteName: 'Image Optimizer',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://your-domain.com/images/logo.webp',
      width: 1200,
      height: 630,
      alt: 'Image Optimizer - Free privacy-focused image optimization tool',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Optimizer - Free Online Tool to Optimize, Convert & Remove Metadata',
    description: 'Free online tool to strip metadata, resize images, and convert to WebP format with our privacy-focused image optimizer.',
    creator: '@yourusername',
    images: ['https://your-domain.com/images/logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#0070f3" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      <body className="min-h-screen bg-gray-50">
        <StructuredData />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="py-6 px-4 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Image Optimizer. All rights reserved.
              </p>
              <div className="mt-3 sm:mt-0 flex space-x-4">
                <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
                <a href="/terms" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a>
                <a href="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact</a>
              </div>
            </div>
          </footer>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            function updateVH() {
              let vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', \`\${vh}px\`);
            }
            window.addEventListener('resize', updateVH);
            updateVH();
          `
        }} />
      </body>
    </html>
  );
}
