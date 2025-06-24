'use client'

import { motion } from 'framer-motion'
import { Copy, Download, Link, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Copy Instagram URL',
    description: 'Open Instagram and find the content you want to download. Tap the three dots (...) and select "Copy link".',
    icon: Copy,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: '02',
    title: 'Paste URL',
    description: 'Paste the copied Instagram URL into the input field above. You can also use the paste button for convenience.',
    icon: Link,
    color: 'from-purple-500 to-pink-500'
  },
  {
    number: '03',
    title: 'Select Content Type',
    description: 'Choose the type of content you want to download: Post, Story, Reel, or Profile picture.',
    icon: CheckCircle,
    color: 'from-green-500 to-emerald-500'
  },
  {
    number: '04',
    title: 'Download',
    description: 'Click the download button and wait for the process to complete. Your file will be saved automatically.',
    icon: Download,
    color: 'from-orange-500 to-red-500'
  }
]

const tips = [
  'Only public Instagram content can be downloaded',
  'No login or account required',
  'Downloads are completely anonymous',
  'All content is downloaded in original quality',
  'Works on mobile, tablet, and desktop',
  'Free to use with no hidden costs'
]

export default function HowToUse() {
  return (
    <section id="how-to" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How to Use Our{' '}
            <span className="gradient-text">Instagram Downloader</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow these simple steps to download any Instagram content in just a few clicks
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card text-center h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Important Tips
            </h3>
            <p className="text-gray-600">
              Keep these things in mind for the best experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{tip}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Check out our frequently asked questions for more information
          </p>
          <a
            href="#faq"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <span>View FAQ</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
} 