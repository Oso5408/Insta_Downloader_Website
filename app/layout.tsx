import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Instagram Downloader - Download Posts, Stories, Reels & More',
  description: 'Download Instagram posts, stories, reels, highlights, and profile pictures in HD quality. Free, fast, and anonymous Instagram content downloader.',
  keywords: 'instagram downloader, instagram story downloader, instagram post downloader, instagram reels downloader, instagram highlights downloader',
  authors: [{ name: 'Instagram Downloader' }],
  openGraph: {
    title: 'Instagram Downloader - Download Posts, Stories, Reels & More',
    description: 'Download Instagram posts, stories, reels, highlights, and profile pictures in HD quality. Free, fast, and anonymous Instagram content downloader.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instagram Downloader - Download Posts, Stories, Reels & More',
    description: 'Download Instagram posts, stories, reels, highlights, and profile pictures in HD quality.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-WK4TPDYS40`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WK4TPDYS40');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
} 