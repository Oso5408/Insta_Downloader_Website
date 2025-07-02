'use client'

import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageCircle, Phone, MapPin, Send, CheckCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.error || 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:bg-gray-900 dark:bg-none">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-600 dark:text-gray-300">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-gray-700 dark:to-gray-900 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Contact Us</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions about our Instagram downloader? Need help with a download? 
            We're here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Choose the best way to reach us. Our support team typically responds within 24 hours.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-gray-700 dark:to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Email Support</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">For general inquiries and support</p>
                  <a 
                    href="mailto:support24@igdownloader24.com"
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>support24@igdownloader24.com</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-gray-700 dark:to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Live Chat</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Get instant help with your downloads</p>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Start Chat (Coming Soon)
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-gray-700 dark:to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Response Time</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">We aim to respond to all inquiries within 24 hours</p>
                  <p className="text-sm text-gray-500">Monday - Friday: 9 AM - 6 PM EST</p>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Quick Help</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Before contacting us, you might find the answer to your question in our FAQ section.
              </p>
              <Link 
                href="/faq"
                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                <span>View FAQ</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full appearance-none px-4 py-3 pr-12 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white text-gray-700"
                      >
                        <option value="">Choose a topic…</option>
                        <option value="general-inquiry">General Inquiry</option>
                        <option value="download-issue">Download Issue</option>
                        <option value="technical-support">Technical Support</option>
                        <option value="feature-request">Feature Request</option>
                        <option value="bug-report">Report a Bug</option>
                        <option value="partnership">Partnership / Business</option>
                        <option value="feedback">Feedback</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Please describe your issue or question in detail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Thank you for contacting us. We've received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Why Contact Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-gray-700 dark:to-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Technical Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Get help with download issues, quality problems, or technical difficulties</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-gray-700 dark:to-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Feature Requests</h3>
              <p className="text-gray-600 dark:text-gray-300">Suggest new features or improvements for our Instagram downloader</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-gray-700 dark:to-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">General Inquiries</h3>
              <p className="text-gray-600 dark:text-gray-300">Ask questions about our service, privacy policy, or terms of use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 