'use client'

import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // General Questions
  {
    question: "What is this Instagram downloader?",
    answer: "Our Instagram downloader is a free online tool that allows you to download Instagram posts, stories, reels, and profile pictures in high quality. It's completely anonymous and doesn't require any registration.",
    category: "general"
  },
  {
    question: "Is it free to use?",
    answer: "Yes, our Instagram downloader is completely free to use. There are no hidden fees, subscriptions, or premium features. You can download unlimited content without any cost.",
    category: "general"
  },
  {
    question: "Do I need to create an account?",
    answer: "No, you don't need to create an account or provide any personal information. Our service is designed to be completely anonymous and user-friendly.",
    category: "general"
  },
  {
    question: "Is this service legal to use?",
    answer: "Yes, our service is legal to use. We only allow downloading of content from public Instagram accounts, and we respect copyright laws. Users are responsible for ensuring they have the right to download and use the content.",
    category: "general"
  },

  // Download Questions
  {
    question: "What types of content can I download?",
    answer: "You can download Instagram posts (single images and carousels), stories, reels, and profile pictures. All content is downloaded in the highest available quality.",
    category: "download"
  },
  {
    question: "How do I download Instagram posts?",
    answer: "1. Copy the Instagram post URL from your browser\n2. Paste it into our download form\n3. Select 'Post' as the content type\n4. Click 'Download' and wait for processing\n5. Click the download button to save the file",
    category: "download"
  },
  {
    question: "How do I download Instagram stories?",
    answer: "1. Make sure the story is from a public account\n2. Copy the story URL (you may need to use a story viewer service first)\n3. Paste the URL into our download form\n4. Select 'Story' as the content type\n5. Click 'Download' to save the story",
    category: "download"
  },
  {
    question: "How do I download Instagram reels?",
    answer: "1. Go to the Instagram reel you want to download\n2. Copy the reel URL from your browser address bar\n3. Paste the URL into our download form\n4. Select 'Reel' as the content type\n5. Click 'Download' to save the video",
    category: "download"
  },
  {
    question: "Can I download from private accounts?",
    answer: "No, we can only download content from public Instagram accounts. This is a limitation set by Instagram's terms of service and privacy policies. Private account content is not accessible.",
    category: "download"
  },
  {
    question: "What quality will my downloads be?",
    answer: "We download content in the highest available quality that Instagram provides. The actual quality depends on what was originally uploaded to Instagram. We don't compress or reduce the quality of your downloads.",
    category: "download"
  },

  // Technical Questions
  {
    question: "Why isn't my download working?",
    answer: "Common reasons include: the Instagram account is private, the URL is incorrect, the content has been deleted, or there's a temporary issue. Try refreshing the page and ensuring the account is public.",
    category: "technical"
  },
  {
    question: "The download is taking too long, what should I do?",
    answer: "Large files or high-traffic periods may cause slower downloads. Try refreshing the page or waiting a few minutes. If the issue persists, the content might be temporarily unavailable.",
    category: "technical"
  },
  {
    question: "Can I download multiple files at once?",
    answer: "Currently, you can download one file at a time. For carousel posts with multiple images, you'll need to download each image separately.",
    category: "technical"
  },
  {
    question: "What file formats are supported?",
    answer: "Images are downloaded as JPG/JPEG files, and videos are downloaded as MP4 files. These are the standard formats that Instagram uses.",
    category: "technical"
  },
  {
    question: "Do you support mobile devices?",
    answer: "Yes, our website is fully responsive and works on all devices including smartphones and tablets. You can download Instagram content directly from your mobile browser.",
    category: "technical"
  },

  // Privacy & Security
  {
    question: "Is my data safe?",
    answer: "Yes, we take your privacy seriously. We don't store your personal information, download history, or the content you download. All data is processed temporarily and deleted immediately.",
    category: "privacy"
  },
  {
    question: "Do you track my downloads?",
    answer: "No, we don't track or store information about what you download. Your download activity is completely private and anonymous.",
    category: "privacy"
  },
  {
    question: "Will Instagram know I'm downloading content?",
    answer: "No, Instagram cannot detect when you download content through our service. The downloads are processed through our servers, not directly from Instagram.",
    category: "privacy"
  },
  {
    question: "Do you use cookies?",
    answer: "We use minimal cookies for essential site functionality and analytics. You can disable cookies in your browser settings if you prefer.",
    category: "privacy"
  },

  // Troubleshooting
  {
    question: "I'm getting an error message, what does it mean?",
    answer: "Error messages usually indicate that the content is unavailable, the account is private, or there's a temporary issue. Try checking the URL and ensuring the account is public.",
    category: "troubleshooting"
  },
  {
    question: "The video quality seems low, why?",
    answer: "Video quality depends on what was originally uploaded to Instagram. Some older content or content uploaded with lower quality settings may appear lower resolution.",
    category: "troubleshooting"
  },
  {
    question: "Can I download stories that have expired?",
    answer: "No, once a story has expired (after 24 hours), it's no longer available for download. You can only download active stories from public accounts.",
    category: "troubleshooting"
  },
  {
    question: "The download button isn't working, what should I do?",
    answer: "Try refreshing the page, clearing your browser cache, or using a different browser. If the issue persists, the content might be temporarily unavailable.",
    category: "troubleshooting"
  }
];

const categories = [
  { id: "all", name: "All Questions", count: faqData.length },
  { id: "general", name: "General", count: faqData.filter(item => item.category === "general").length },
  { id: "download", name: "Download", count: faqData.filter(item => item.category === "download").length },
  { id: "technical", name: "Technical", count: faqData.filter(item => item.category === "technical").length },
  { id: "privacy", name: "Privacy & Security", count: faqData.filter(item => item.category === "privacy").length },
  { id: "troubleshooting", name: "Troubleshooting", count: faqData.filter(item => item.category === "troubleshooting").length }
];

// Generate FAQPage JSON-LD
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer.replace(/\n/g, '<br/>')
    }
  }))
};

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
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
              <span className="text-xl font-bold gradient-text">FAQ</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions about our Instagram downloader service
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQ.length > 0 ? (
            filteredFAQ.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">{item.question}</h3>
                  {expandedItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <div className="text-gray-600 whitespace-pre-line">{item.answer}</div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No questions found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-purple-100 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact-us"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </Link>
            <Link 
              href="/help-center"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 