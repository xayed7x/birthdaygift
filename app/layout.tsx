import type { Metadata } from 'next'
import { Geist, Geist_Mono, Great_Vibes, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });
const cormorantGaramond = Cormorant_Garamond({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-cormorant" });

export const metadata: Metadata = {
  title: 'For My Bestu',
  description: 'A special gift for a special person',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
