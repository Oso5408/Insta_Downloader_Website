import React from 'react';
import { ArrowLeft, Search, Download, Image, Video, User, HelpCircle, Mail, MessageCircle, Camera } from 'lucide-react';
import Link from 'next/link';

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Help Center</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">Find answers to common questions and get support for our Instagram downloader</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Download Issues</h3>
            <p className="text-gray-600 mb-4">Having trouble downloading content? Get step-by-step solutions.</p>
            <Link href="#download-help" className="text-purple-600 hover:text-purple-700 font-medium">
              Learn more →
            </Link>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
            <p className="text-gray-600 mb-4">Can't find what you're looking for? Reach out to our support team.</p>
            <Link href="/contact-us" className="text-purple-600 hover:text-purple-700 font-medium">
              Contact us →
            </Link>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">FAQ</h3>
            <p className="text-gray-600 mb-4">Browse frequently asked questions and quick answers.</p>
            <Link href="/faq" className="text-purple-600 hover:text-purple-700 font-medium">
              View FAQ →
            </Link>
          </div>
        </div>

        {/* Help Categories */}
        <div className="space-y-8">
          {/* Download Help */}
          <section id="download-help" className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Download Help</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">How to download Instagram posts</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                  <li>Copy the Instagram post URL from your browser</li>
                  <li>Paste the URL into our download form</li>
                  <li>Select "Post" as the content type</li>
                  <li>Click "Download" and wait for processing</li>
                  <li>Click on the download button to save the file</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">How to download Instagram stories</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                  <li>Make sure the story is from a public account</li>
                  <li>Copy the story URL (you may need to use a story viewer service first)</li>
                  <li>Paste the URL into our download form</li>
                  <li>Select "Story" as the content type</li>
                  <li>Click "Download" to save the story</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">How to download Instagram reels</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                  <li>Go to the Instagram reel you want to download</li>
                  <li>Copy the reel URL from your browser address bar</li>
                  <li>Paste the URL into our download form</li>
                  <li>Select "Reel" as the content type</li>
                  <li>Click "Download" to save the video</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Troubleshooting</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Download not working?</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Make sure the Instagram account is public</li>
                  <li>Check that the URL is correct and complete</li>
                  <li>Try refreshing the page and trying again</li>
                  <li>Clear your browser cache and cookies</li>
                  <li>Try using a different browser</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Video quality issues</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>We download content in the highest available quality</li>
                  <li>Original quality depends on what was uploaded to Instagram</li>
                  <li>Some older content may have lower resolution</li>
                  <li>Try downloading again if quality seems low</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Private account content</h3>
                <p className="text-gray-600 ml-4">
                  We can only download content from public Instagram accounts. If you're trying to download from a private account, 
                  the download will fail. This is a limitation set by Instagram's terms of service.
                </p>
              </div>
            </div>
          </section>

          {/* Supported Content Types */}
          <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Supported Content Types</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Instagram Posts</h3>
                  <p className="text-gray-600 text-sm">Single images, carousel posts, and captions</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Instagram Reels</h3>
                  <p className="text-gray-600 text-sm">Short-form videos with audio</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Instagram Stories</h3>
                  <p className="text-gray-600 text-sm">24-hour temporary content (public accounts only)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Profile Pictures</h3>
                  <p className="text-gray-600 text-sm">High-resolution profile images</p>
                </div>
              </div>
            </div>
          </section>

          {/* Still Need Help */}
          <section className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-purple-100 mb-6">Our support team is here to help you with any questions or issues.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact-us"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </Link>
              <Link 
                href="/faq"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                View FAQ
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 