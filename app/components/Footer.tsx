'use client'

import { Instagram, Twitter, Facebook, Mail, Shield, Heart } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  product: [
    { name: 'Instagram Downloader', href: '#' },
    { name: 'Story Downloader', href: '#' },
    { name: 'Reel Downloader', href: '#' },
    { name: 'Profile Downloader', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '/help-center' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'DMCA', href: '/dmca' },
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-gray-700 dark:to-gray-900 rounded-lg flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">InstaDownloader</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Download Instagram posts, stories, reels, and profile pictures in HD quality. 
              Free, fast, and completely anonymous.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4 md:mb-0">
              <Shield className="w-4 h-4" />
              <span>100% Safe & Anonymous Downloads</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for Instagram users</span>
            </div>
          </div>
          <div className="text-center mt-4 text-gray-500 text-xs">
            <p>
              © 2024 InstaDownloader. Not affiliated with Instagram™. All rights belong to their respective owners.
            </p>
            <p className="mt-1">
              We respect privacy — only public content is available for download.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 