'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, Link, Image, Video, User, Camera, Play } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import MediaPreview from './MediaPreview'
import { useAppTranslation } from './useAppTranslation'

interface DownloadFormProps {
  onDownload: (url: string, type: string) => void
  isLoading: boolean
}

interface DownloadResponse {
  success: boolean
  data?: {
    media: Array<{
      url: string
      type: 'image' | 'video'
      quality: 'hd' | 'sd'
      filename: string
      width?: number
      height?: number
    }>
    type: string
    originalUrl: string
    shortcode?: string
    downloadUrl: string
    quality: string
    filename: string
    isRealContent?: boolean
    mediaCount?: number
    hasMultipleMedia?: boolean
  }
  error?: string
}

export default function DownloadForm({ onDownload, isLoading }: DownloadFormProps) {
  const { t } = useAppTranslation();
  const [url, setUrl] = useState('')
  const [selectedType, setSelectedType] = useState('post')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [mediaItems, setMediaItems] = useState<any[]>([])
  const lastRequestTime = useRef(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Debounce: Only allow one request per 1.2 seconds
    const now = Date.now()
    if (now - lastRequestTime.current < 1200) {
      toast.error('Please wait a second before trying again.')
      return
    }
    lastRequestTime.current = now

    if (!url.trim()) {
      toast.error('Please enter a valid Instagram URL')
      return
    }

    if (!url.includes('instagram.com')) {
      toast.error('Please enter a valid Instagram URL')
      return
    }

    // Check if profile type is selected (disabled feature)
    if (selectedType === 'profile') {
      toast.error('Profile downloads are coming soon! Please try another content type.')
      return
    }

    setIsProcessing(true)

    try {
      // Call the API to get download information
      const response = await axios.post<DownloadResponse>('/api/download', {
        url: url.trim(),
        type: selectedType
      })

      if (response.data.success && response.data.data) {
        const { media, isRealContent, mediaCount } = response.data.data
        
        if (media && media.length > 0) {
          setMediaItems(media)
          setShowPreview(true)
          
          if (isRealContent) {
            toast.success(`Found ${mediaCount || media.length} Instagram media item${mediaCount !== 1 ? 's' : ''}! Select which ones to download.`)
          } else {
            toast.success(`Found ${mediaCount || media.length} demo item${mediaCount !== 1 ? 's' : ''}! Select which ones to download.`)
          }
        } else {
          toast.error('No media found for this content')
        }
      } else {
        toast.error(response.data.error || 'Download failed')
      }
    } catch (error: any) {
      if (error.response?.status === 429) {
        toast.error('You are making requests too quickly. Please wait a few seconds and try again.')
        return
      }
      console.error('Download error:', error)
      
      if (error.response?.data?.error) {
        toast.error(error.response.data.error)
      } else if (error.message) {
        toast.error(error.message)
      } else {
        toast.error('Failed to download content. Please try again.')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadSelected = async (selectedItems: any[]) => {
    setIsProcessing(true)
    
    try {
      for (const item of selectedItems) {
        await downloadFile(item.url, item.filename)
      }
      
      toast.success(`${selectedItems.length} file(s) downloaded successfully!`)
      setShowPreview(false)
      setUrl('') // Clear the form after successful download
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Some files failed to download')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadFile = async (fileUrl: string, filename: string) => {
    try {
      // Use the proxy endpoint for direct download with correct headers
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(fileUrl)}&download=1&filename=${encodeURIComponent(filename)}`
      const link = document.createElement('a')
      link.href = proxyUrl
      link.download = filename
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
      toast.error(`Failed to download ${filename}`)
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
      toast.success('URL pasted from clipboard')
    } catch (error) {
      toast.error('Could not access clipboard')
    }
  }

  const downloadTypes = [
    {
      id: 'post',
      name: t('post'),
      icon: Image,
      description: t('post_desc'),
      color: 'from-blue-500 to-cyan-500',
      disabled: false
    },
    {
      id: 'story',
      name: t('story'),
      icon: Camera,
      description: t('story_desc'),
      color: 'from-purple-500 to-pink-500',
      disabled: false
    },
    {
      id: 'reel',
      name: t('reel'),
      icon: Play,
      description: t('reel_desc'),
      color: 'from-orange-500 to-red-500',
      disabled: false
    },
    {
      id: 'profile',
      name: t('profile_highlights'),
      icon: User,
      description: t('profile_highlights_desc'),
      color: 'from-green-500 to-emerald-500',
      disabled: true
    }
  ]

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                {t('instagram_url')}
              </label>
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={
                      selectedType === 'story' ? "https://www.instagram.com/stories/username/..." :
                      selectedType === 'reel' ? "https://www.instagram.com/reel/..." :
                      selectedType === 'profile' ? "https://www.instagram.com/username" :
                      "https://www.instagram.com/p/..."
                    }
                    className="input-field pr-12"
                    required
                    disabled={isProcessing}
                  />
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    disabled={isProcessing}
                  >
                    <Link size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Type Selector - Icon Grid */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('content_type')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {downloadTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => !type.disabled && setSelectedType(type.id)}
                    className={`download-type-btn p-4 rounded-lg border-2 ${selectedType === type.id ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'} ${type.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    data-type={type.id}
                    disabled={type.disabled}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <type.icon size={24} className="text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{type.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <button
              type="submit"
              id="downloadBtn"
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Download size={16} />
              <span>{t('preview_download')}</span>
            </button>
          </form>
        </motion.div>
      </div>

      {/* Media Preview Modal */}
      {showPreview && (
        <MediaPreview
          media={mediaItems}
          onClose={() => setShowPreview(false)}
          onDownload={handleDownloadSelected}
          isLoading={isProcessing}
        />
      )}
    </>
  )
} 