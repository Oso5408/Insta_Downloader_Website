'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, Link, Image, Video, User, Camera, Play } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import MediaPreview from './MediaPreview'

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

const downloadTypes = [
  {
    id: 'post',
    name: 'Post',
    icon: Image,
    description: 'Download single posts or carousels',
    color: 'from-blue-500 to-cyan-500',
    disabled: false
  },
  {
    id: 'story',
    name: 'Story',
    icon: Camera,
    description: 'Download stories from public accounts',
    color: 'from-purple-500 to-pink-500',
    disabled: false
  },
  {
    id: 'reel',
    name: 'Reel',
    icon: Play,
    description: 'Download reels in HD quality',
    color: 'from-orange-500 to-red-500',
    disabled: false
  },
  {
    id: 'profile',
    name: 'Profile',
    icon: User,
    description: 'Download profile pictures and highlights',
    color: 'from-green-500 to-emerald-500',
    disabled: true
  }
]

export default function DownloadForm({ onDownload, isLoading }: DownloadFormProps) {
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
                Instagram URL
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
            <div className="mt-6">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {downloadTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => !type.disabled && setSelectedType(type.id)}
                      disabled={type.disabled}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                        type.disabled
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                          : selectedType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center ${type.disabled ? 'opacity-50' : ''}`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-gray-900">{type.name === 'Profile' ? 'Profile Highlights' : type.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{type.name === 'Profile' ? 'Download highlights from public profiles' : type.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Download Button */}
            <button
              type="submit"
              disabled={isProcessing || !url.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Download size={20} />
                  <span>Preview & Download</span>
                </>
              )}
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