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
        {/* SEO Meta Tags */}
        <title>Instagram Downloader | Download IG Posts, Stories, Reels in HD</title>
        <meta name="description" content="Download Instagram posts, stories, reels, and profile pictures in HD quality. Free, fast, and anonymous Instagram downloader." />
        <meta name="keywords" content="instagram downloader, download instagram, ig stories, reels, profile pictures, save instagram, igdownloader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Instagram Downloader" />
        <meta property="og:description" content="Download Instagram posts, stories, reels, and profile pictures in HD quality." />
        <meta property="og:url" content="https://www.igdownloader24.com" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Instagram Downloader" />
        <meta name="twitter:description" content="Download Instagram posts, stories, reels, and profile pictures in HD quality." />
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
        {/* Google AdSense */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7753715221598603"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
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