import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | PDF Tools Global',
    default: 'PDF Tools Global - Professional PDF Tools Online',
  },
  description:
    '全球领先的PDF处理器，为美国、中国、香港、英国等全球用户提供免费的PDF合并、Word转换、JPG转PDF及安全加密服务。支持29种PDF工具，完全免费无需注册。',
  keywords: [
    'PDF tools',
    'PDF merger',
    'PDF converter',
    'free PDF tools',
    'PDF compressor',
    'Word to PDF',
    'JPG to PDF',
    'PDF to Word',
    'PDF security',
    '美国PDF工具',
    '中国PDF工具',
    '香港PDF工具',
    '英国PDF工具',
    'PDF merge free',
    'PDF split',
  ],
  authors: [{ name: 'PDF Tools Global' }],
  creator: 'PDF Tools Global',
  publisher: 'PDF Tools Global',
  metadataBase: new URL('https://pdf.toolsglobal.com'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      zh: '/zh',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    siteName: 'PDF Tools Global',
    title: 'PDF Tools Global - Professional PDF Tools Online',
    description:
      'The world\'s leading free PDF processor serving users in USA, China, Hong Kong, UK, Canada, Singapore and beyond.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PDF Tools Global',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Tools Global - Professional PDF Tools Online',
    description:
      'Free PDF tools for users worldwide. Merge, split, convert, compress, and secure your PDFs.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
