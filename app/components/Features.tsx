'use client'

import { motion } from 'framer-motion'
import { 
  Download, 
  Shield, 
  Zap, 
  Globe, 
  Smartphone, 
  Monitor,
  Image,
  Video,
  User,
  Camera,
  Play,
  Star
} from 'lucide-react'

const features = [
  {
    icon: Download,
    title: 'Multiple Content Types',
    description: 'Download posts, stories, reels, highlights, and profile pictures in one place',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Shield,
    title: '100% Anonymous',
    description: 'No login required, no personal data collected, complete privacy protection',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Download content instantly with our optimized servers and CDN',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    description: 'Access from any device - mobile, tablet, or desktop browser',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Star,
    title: 'HD Quality',
    description: 'Download content in original high-definition quality without watermarks',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Optimized for mobile devices with touch-friendly interface',
    color: 'from-indigo-500 to-purple-500'
  }
]

const downloadTypes = [
  {
    icon: Image,
    title: 'Posts & Carousels',
    description: 'Download single photos or multiple image carousels',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Camera,
    title: 'Stories',
    description: 'Download stories from public Instagram accounts',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Play,
    title: 'Reels',
    description: 'Download Instagram reels in original video quality',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: User,
    title: 'Profile Pictures',
    description: 'Download profile pictures in full resolution',
    color: 'from-green-500 to-emerald-500'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
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
            Why Choose Our{' '}
            <span className="gradient-text">Instagram Downloader</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide the most reliable and user-friendly Instagram downloader with advanced features
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Download Types Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Download Any Type of{' '}
            <span className="gradient-text">Instagram Content</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From single posts to entire profiles, we support all Instagram content types
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {downloadTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{type.title}</h4>
              <p className="text-sm text-gray-600">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-purple-100">Downloads Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-purple-100">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-purple-100">Customer Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 