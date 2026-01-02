import type { Metadata } from 'next'
import { Geist, Geist_Mono, Great_Vibes, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });
const cormorantGaramond = Cormorant_Garamond({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-cormorant" });

export const metadata: Metadata = {
  title: 'For Athoy 🤍 Happy 19th Birthday',
  description: 'A special journey through our story. Created with love by Zayed.',
  generator: 'v0.app',
  openGraph: {
    title: 'For Athoy - Happy 19th Birthday',
    description: 'A special journey through our story. Created with love by Zayed.',
    url: 'https://for-athoy.vercel.app',
    siteName: 'For Athoy',
    images: [
      {
        url: '/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'For Athoy - Happy 19th Birthday',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Athoy - Happy 19th Birthday',
    description: 'A special journey through our story. Created with love by Zayed.',
    images: ['/opengraph.png'],
  },
  icons: {
    icon: [
      {
        url: '/favicon-a.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: '/favicon-a.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} ${greatVibes.variable} ${cormorantGaramond.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
