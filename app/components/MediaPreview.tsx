'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Image, Video, Check, X, Play, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

interface MediaItem {
  url: string
  type: 'image' | 'video'
  quality: 'hd' | 'sd'
  filename: string
  width?: number
  height?: number
}

interface MediaPreviewProps {
  media: MediaItem[]
  onClose: () => void
  onDownload: (selectedItems: MediaItem[]) => void
  isLoading: boolean
}

export default function MediaPreview({ media, onClose, onDownload, isLoading }: MediaPreviewProps) {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const toggleItem = (index: number) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedItems(newSelected)
  }

  const selectAll = () => {
    setSelectedItems(new Set(media.map((_, index) => index)))
  }

  const deselectAll = () => {
    setSelectedItems(new Set())
  }

  const downloadSelected = async () => {
    if (selectedItems.size === 0) return

    const selectedMedia = media.filter((_, index) => selectedItems.has(index))
    
    try {
      setIsDownloading(true)
      
      // For profile highlights, use ZIP download
      if (selectedMedia.length > 1 && selectedMedia[0].filename.includes('highlight')) {
        const highlightTitle = selectedMedia[0].filename.split('-')[2] // Extract highlight title
        const response = await fetch('/api/download', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mediaItems: selectedMedia,
            highlightTitle: highlightTitle
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to create ZIP file')
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `instagram-highlights-${highlightTitle}-${Date.now()}.zip`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } else {
        // Individual downloads for single items or non-highlights
        for (const item of selectedMedia) {
          const response = await fetch('/api/proxy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: item.url,
              filename: item.filename,
            }),
          })

          if (!response.ok) {
            throw new Error(`Failed to download ${item.filename}`)
          }

          const blob = await response.blob()
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = item.filename
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
        }
      }

      setSelectedItems(new Set())
      toast.success(`Downloaded ${selectedItems.size} item(s) successfully!`)
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download selected items')
    } finally {
      setIsDownloading(false)
    }
  }

  const getSelectedCount = () => selectedItems.size

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Preview & Select Media</h2>
            <p className="text-gray-600 mt-1">
              Found {media.length} item{media.length !== 1 ? 's' : ''} • {getSelectedCount()} selected
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={selectAll}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Select All
            </button>
            <button
              onClick={deselectAll}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700"
            >
              Deselect All
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedItems.has(index)
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleItem(index)
                    }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      selectedItems.has(index)
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {selectedItems.has(index) && <Check size={14} />}
                  </button>
                </div>

                {/* Media Type Badge */}
                <div className="absolute top-2 right-2 z-10">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                    item.type === 'video'
                      ? 'bg-red-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}>
                    {item.type === 'video' ? <Video size={12} /> : <Image size={12} />}
                    <span className="capitalize">{item.type}</span>
                  </div>
                </div>

                {/* Media Preview */}
                <div
                  className="aspect-square bg-gray-100 relative overflow-hidden"
                >
                  {item.type === 'image' ? (
                    <img
                      src={`/api/proxy?url=${encodeURIComponent(item.url)}`}
                      alt={`Media ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA5MEwxMDAgNjVMNzUgNDBWNzBIMTI1VjkwSDc1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <Play size={32} className="text-white mx-auto mb-2" />
                        <p className="text-white text-sm">Video</p>
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Eye size={24} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Item Info */}
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.filename}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.width} × {item.height} • {item.quality.toUpperCase()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {getSelectedCount()} of {media.length} items selected
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={downloadSelected}
              disabled={selectedItems.size === 0 || isDownloading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Download Selected ({getSelectedCount()})</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 