import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Instagram Video Downloader | Download Instagram Videos, Reels & More',
  description: 'Free Instagram video downloader. Download Instagram videos, reels, and stories in HD quality. Fast, anonymous, and easy to use. Try our Instagram video download tool now!',
  keywords: 'instagram video download, instagram video downloader, download instagram video, instagram download video, instagram reel download, free, HD, online',
  authors: [{ name: 'Instagram Downloader' }],
  openGraph: {
    title: 'Instagram Video Downloader | Download Instagram Videos, Reels & More',
    description: 'Free Instagram video downloader. Download Instagram videos, reels, and stories in HD quality. Fast, anonymous, and easy to use. Try our Instagram video download tool now!',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instagram Video Downloader | Download Instagram Videos, Reels & More',
    description: 'Free Instagram video downloader. Download Instagram videos, reels, and stories in HD quality.',
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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WK4TPDYS40"
          async
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
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