import type { Metadata, Viewport } from 'next';
import { Inter, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { siteConfig, generateLocalBusinessSchema } from '@/lib/seo';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import MobileActionBar from '@/components/layout/MobileActionBar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#08090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Off The Grid Gym | Premier Strength & Fitness in Ropar, Punjab',
    template: '%s | Off The Grid Gym Ropar',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'Off The Grid Gym' }],
  creator: 'Off The Grid Gym Ropar',
  publisher: 'Off The Grid Gym',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: 'Off The Grid Gym | Premier Strength & Fitness in Ropar, Punjab',
    description: siteConfig.description,
    siteName: 'Off The Grid Gym Ropar',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Off The Grid Gym Ropar Training Floor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Off The Grid Gym Ropar | Pure Strength & Performance',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateLocalBusinessSchema();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable} dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#08090b] text-[#f3f4f6] selection:bg-[#00ff66] selection:text-black">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileActionBar />
      </body>
    </html>
  );
}
