"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Image,
  Video,
  User,
  Sparkles,
  Shield,
  Zap,
  Globe,
  Instagram,
  Play,
  Camera,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import DownloadForm from '../components/DownloadForm';
import Features from '../components/Features';
import HowToUse from '../components/HowToUse';
import Footer from '../components/Footer';
import UpdateNotice from '../components/UpdateNotice';
import { useAppTranslation } from '../components/useAppTranslation';

export default function Home({ params }: { params: { lang: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, lang } = useAppTranslation();

  const handleDownload = async (url: string, type: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${type} downloaded successfully!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">InstaDownloader</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#how-to" className="text-gray-600 hover:text-purple-600 transition-colors">{t('how_to_use')}</a>
                <Link href="/faq" className="text-gray-600 hover:text-purple-600 transition-colors">{t('faq')}</Link>
              </nav>
            </div>
            <div className="relative ml-auto">
              <button
                onClick={() => setLangOpen(v => !v)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <Globe className="w-5 h-5" />
                <span>{t('language')}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a href="/en" className="block px-4 py-2 hover:bg-gray-100">English</a>
                    </li>
                    <li>
                      <a href="/zh" className="block px-4 py-2 hover:bg-gray-100">中文 (简体)</a>
                    </li>
                    <li>
                      <a href="/hi" className="block px-4 py-2 hover:bg-gray-100">हिन्दी</a>
                    </li>
                    <li>
                      <a href="/ne" className="block px-4 py-2 hover:bg-gray-100">नेपाली</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <UpdateNotice />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                {t('title')}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {t('subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <DownloadForm onDownload={handleDownload} isLoading={isLoading} />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('feature_fast_title')}</h3>
                <p className="text-gray-600">{t('feature_fast_desc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('feature_anon_title')}</h3>
                <p className="text-gray-600">{t('feature_anon_desc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('feature_hd_title')}</h3>
                <p className="text-gray-600">{t('feature_hd_desc')}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('why_choose')}</h2>
            <p className="text-xl text-gray-600">{t('why_choose_desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('feature_types_title')}</h3>
              <p className="text-gray-600">{t('feature_types_desc')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('feature_anon_title')}</h3>
              <p className="text-gray-600">{t('feature_anon_desc')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('feature_fast_title')}</h3>
              <p className="text-gray-600">{t('feature_fast_desc')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('feature_everywhere_title')}</h3>
              <p className="text-gray-600">{t('feature_everywhere_desc')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('feature_hd_title')}</h3>
              <p className="text-gray-600">{t('feature_hd_desc')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('feature_mobile_title')}</h3>
              <p className="text-gray-600">{t('feature_mobile_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <HowToUse />

      {/* Footer */}
      <Footer />
    </div>
  );
} 