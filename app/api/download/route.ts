import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import AdmZip from 'adm-zip'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface DownloadRequest {
  url: string
  type: 'post' | 'story' | 'reel' | 'profile'
}

interface InstagramMedia {
  url: string
  type: 'image' | 'video'
  quality: 'hd' | 'sd'
  filename: string
  width?: number
  height?: number
  coverUrl?: string
}

interface RapidAPIResponse {
  success?: boolean
  media?: any[]
  url?: string
  data?: any
  error?: string
  [key: string]: any // Allow additional properties
}

// Extract shortcode from Instagram URL
function extractShortcode(url: string): string | null {
  const patterns = [
    /instagram\.com\/p\/([A-Za-z0-9_-]+)/,
    /instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
    /instagram\.com\/tv\/([A-Za-z0-9_-]+)/,
    /instagram\.com\/stories\/[^\/]+\/([A-Za-z0-9_-]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}

// Extract username from Instagram story URL
function extractUsernameFromStoryUrl(url: string): string | null {
  const match = url.match(/instagram\.com\/stories\/([^\/]+)/)
  return match ? match[1] : null
}

// Extract username from Instagram profile URL
function extractUsernameFromProfileUrl(url: string): string | null {
  const match = url.match(/instagram\.com\/([^\/\?]+)/)
  return match ? match[1] : null
}

// Download file and return buffer
async function downloadFileToBuffer(url: string): Promise<Buffer> {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    timeout: 30000,
  })
  return Buffer.from(response.data)
}

// Create ZIP file from media items
async function createZipFromMedia(mediaItems: InstagramMedia[], highlightTitle?: string): Promise<Buffer> {
  const zip = new AdmZip()
  
  for (let i = 0; i < mediaItems.length; i++) {
    const item = mediaItems[i]
    try {
      const fileBuffer = await downloadFileToBuffer(item.url)
      const filename = highlightTitle 
        ? `${highlightTitle}_${i + 1}.${item.type === 'video' ? 'mp4' : 'jpg'}`
        : item.filename
      zip.addFile(filename, fileBuffer)
    } catch (error) {
      console.error(`Failed to download ${item.url}:`, error)
    }
  }
  
  return zip.toBuffer()
}

// Add at the top of the file
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Try multiple RapidAPI endpoints for better success rate
async function getInstagramMedia(url: string, type: string): Promise<InstagramMedia[]> {
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  if (!rapidApiKey) throw new Error('RAPIDAPI_KEY is not set in environment variables');

  const media: InstagramMedia[] = [];
  const timestamp = Date.now();

  if (type === 'story') {
    // 1. Extract username (support both /stories/username/ and /username/ profile URLs)
    let username = extractUsernameFromStoryUrl(url)
    if (!username) {
      // Try to extract from profile URL
      username = extractUsernameFromProfileUrl(url)
      if (username) {
        // Auto-correct: convert profile URL to story URL
        url = `https://www.instagram.com/stories/${username}/`
      }
    }
    if (!username) throw new Error('Could not extract username from story or profile URL')

    // GLOBAL LOCK: Wait for any ongoing RapidAPI story request to finish
    while (await redis.get('rapidapi:story:lock')) {
      console.log('Waiting for global story lock...');
      await sleep(500); // Wait 0.5s and check again
    }
    // Set lock for 3 seconds (adjust as needed)
    await redis.set('rapidapi:story:lock', '1', { ex: 3 });
    console.log('Acquired global story lock. Proceeding with RapidAPI call.');

    // Throttle: wait 2 seconds before making RapidAPI call to avoid rate limit
    await sleep(2000)

    console.log(`Getting user ID for username: ${username}`)

    // 2. Get user ID by username
    const userIdResp = await axios.get(
      'https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/user_id_by_username',
      {
        params: { username },
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com',
        },
        timeout: 15000,
      }
    )
    
    console.log('User ID API response:', JSON.stringify(userIdResp.data, null, 2))
    
    // Try multiple possible response formats
    const userId = userIdResp.data?.user_id || 
                   userIdResp.data?.id || 
                   userIdResp.data?.data?.user_id ||
                   userIdResp.data?.data?.id ||
                   userIdResp.data?.result?.user_id ||
                   userIdResp.data?.result?.id ||
                   userIdResp.data?.UserID ||
                   userIdResp.data?.data?.UserID ||
                   userIdResp.data?.result?.UserID
    
    if (!userId) {
      console.error('User ID not found in response. Full response:', userIdResp.data)
      throw new Error(`Could not get user ID for username ${username}. API response: ${JSON.stringify(userIdResp.data)}`)
    }

    console.log(`Found user ID: ${userId}`)

    // 3. Get stories by user ID
    // Throttle: wait 2 seconds before making RapidAPI call to avoid rate limit
    await sleep(2000)
    const storiesResp = await axios.get(
      'https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/stories_by_user_id',
      {
        params: { user_id: userId },
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com',
        },
        timeout: 15000,
      }
    )
    
    console.log('Stories API response:', JSON.stringify(storiesResp.data, null, 2))
    
    const storiesData = storiesResp.data?.stories || 
                       storiesResp.data?.data?.stories || 
                       storiesResp.data?.result?.stories ||
                       storiesResp.data?.data ||
                       storiesResp.data?.result ||
                       Array.isArray(storiesResp.data) ? storiesResp.data : []
    
    console.log(`Found ${storiesData.length} stories`)
    
    let idx = 1
    for (const story of storiesData) {
      // Image story
      if (story.image_versions2 && story.image_versions2.candidates) {
        const bestImage = story.image_versions2.candidates[0]
        if (bestImage && bestImage.url) {
          media.push({
            url: bestImage.url,
            type: 'image',
            quality: 'hd',
            filename: `instagram-story-${userId}-${timestamp}-${idx++}.jpg`,
            width: bestImage.width,
            height: bestImage.height
          })
        }
      }
      // Video story
      if (story.video_versions && Array.isArray(story.video_versions)) {
        const bestVideo = story.video_versions[0]
        // Try to get a cover image for the video
        let coverUrl = undefined
        if (story.image_versions2 && story.image_versions2.candidates && story.image_versions2.candidates[0]) {
          coverUrl = story.image_versions2.candidates[0].url
        }
        if (bestVideo && bestVideo.url) {
          media.push({
            url: bestVideo.url,
            type: 'video',
            quality: 'hd',
            filename: `instagram-story-${userId}-${timestamp}-${idx++}.mp4`,
            width: bestVideo.width,
            height: bestVideo.height,
            coverUrl // Add cover image for video
          })
        }
      }
    }
    return media
  }

  if (type === 'reel') {
    // Extract shortcode from reel URL
    const shortcode = extractShortcode(url)
    if (!shortcode) throw new Error('Could not extract shortcode from reel URL')

    console.log(`Getting reel by shortcode: ${shortcode}`)

    // Get reel by shortcode
    const reelResp = await axios.get(
      'https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/reel_by_shortcode',
      {
        params: { shortcode },
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com',
        },
        timeout: 15000,
      }
    )
    
    console.log('Reel API response:', JSON.stringify(reelResp.data, null, 2))
    
    const reelData = reelResp.data
    
    // Handle video reels
    let reelCoverUrl: string | undefined = undefined;
    if (reelData.image_versions2 && reelData.image_versions2.candidates) {
      const bestImage = reelData.image_versions2.candidates[0];
      if (bestImage && bestImage.url) {
        reelCoverUrl = bestImage.url;
        // Also push the image as a separate media item if desired (optional)
        media.push({
          url: bestImage.url,
          type: 'image',
          quality: 'hd',
          filename: `instagram-reel-${shortcode}-${timestamp}.jpg`,
          width: bestImage.width,
          height: bestImage.height
        });
      }
    }
    if (reelData.video_versions && Array.isArray(reelData.video_versions)) {
      const bestVideo = reelData.video_versions[0];
      if (bestVideo && bestVideo.url) {
        media.push({
          url: bestVideo.url,
          type: 'video',
          quality: 'hd',
          filename: `instagram-reel-${shortcode}-${timestamp}.mp4`,
          width: bestVideo.width,
          height: bestVideo.height,
          coverUrl: reelCoverUrl // Attach cover image if available
        });
      }
    }
    
    return media
  }

  if (type === 'profile') {
    // 1. Extract username from profile URL
    const username = extractUsernameFromProfileUrl(url)
    if (!username) throw new Error('Could not extract username from profile URL')

    console.log(`Getting user ID for username: ${username}`)

    // 2. Get user ID by username
    const userIdResp = await axios.get(
      'https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/user_id_by_username',
      {
        params: { username },
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com',
        },
        timeout: 15000,
      }
    )
    
    console.log('User ID API response:', JSON.stringify(userIdResp.data, null, 2))
    
    // Try multiple possible response formats
    const userId = userIdResp.data?.user_id || 
                   userIdResp.data?.id || 
                   userIdResp.data?.data?.user_id ||
                   userIdResp.data?.data?.id ||
                   userIdResp.data?.result?.user_id ||
                   userIdResp.data?.result?.id ||
                   userIdResp.data?.UserID ||
                   userIdResp.data?.data?.UserID ||
                   userIdResp.data?.result?.UserID
    
    if (!userId) {
      console.error('User ID not found in response. Full response:', userIdResp.data)
      throw new Error(`Could not get user ID for username ${username}. API response: ${JSON.stringify(userIdResp.data)}`)
    }

    console.log(`Found user ID: ${userId}`)

    // 3. Get highlights by user ID
    const highlightsResp = await axios.get(
      'https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/highlights_by_user_id',
      {
        params: { user_id: userId },
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com',
        },
        timeout: 15000,
      }
    )
    
    console.log('Highlights API response:', JSON.stringify(highlightsResp.data, null, 2))
    
    let highlightsData =
      highlightsResp.data?.highlights ||
      highlightsResp.data?.data?.highlights ||
      highlightsResp.data?.result?.highlights ||
      highlightsResp.data?.tray ||
      highlightsResp.data?.data ||
      highlightsResp.data?.result ||
      (Array.isArray(highlightsResp.data) ? highlightsResp.data : []);

    if (!Array.isArray(highlightsData)) {
      highlightsData = [];
    }

    console.log(`Found ${highlightsData.length} highlights`)
    
    // Throttled fetching of each highlight's media
    for (const highlight of highlightsData) {
      const highlightTitle = highlight.title || highlight.name || `highlight_${highlight.id || Date.now()}`
      const highlightId = highlight.id
      console.log(`Processing highlight: ${highlightTitle} (ID: ${highlightId})`)

      // Fetch actual highlight content (throttled)
      if (highlightId) {
        try {
          const highlightContentResp = await axios.get(
            'https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/highlight_by_id',
            {
              params: { highlight_id: highlightId },
              headers: {
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com',
              },
              timeout: 15000,
            }
          )
          const highlightMedia = highlightContentResp.data?.media || []
          for (const item of highlightMedia) {
            // Image
            if (item.image_versions2 && item.image_versions2.candidates) {
              const bestImage = item.image_versions2.candidates[0]
              if (bestImage && bestImage.url) {
                media.push({
                  url: bestImage.url,
                  type: 'image',
                  quality: 'hd',
                  filename: `instagram-highlight-${highlightTitle}-${timestamp}-${media.length + 1}.jpg`,
                  width: bestImage.width,
                  height: bestImage.height
                })
              }
            }
            // Video
            if (item.video_versions && Array.isArray(item.video_versions)) {
              const bestVideo = item.video_versions[0]
              if (bestVideo && bestVideo.url) {
                media.push({
                  url: bestVideo.url,
                  type: 'video',
                  quality: 'hd',
                  filename: `instagram-highlight-${highlightTitle}-${timestamp}-${media.length + 1}.mp4`,
                  width: bestVideo.width,
                  height: bestVideo.height
                })
              }
            }
          }
        } catch (err) {
          const errorMsg = (err && typeof err === 'object' && 'response' in err)
            ? (err as any).response?.data || (err as any).message
            : (err as any)?.message || String(err)
          console.error(`Failed to fetch highlight content for ${highlightId}:`, errorMsg)
        }
        // Throttle: wait 1.1 seconds before next API call
        await sleep(1100)
      }
    }
    
    return media
  }

  const shortcode = extractShortcode(url);

  // Use the correct Instagram Scrapper API endpoint
  const endpoint = {
    name: 'Instagram Scrapper API',
    url: 'https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/post_by_shortcode',
    method: 'GET',
    params: { shortcode },
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com',
    }
  };

  try {
    console.log(`Trying endpoint: ${endpoint.name}`);
    
    const response = await axios.get(endpoint.url, {
      params: endpoint.params,
      headers: endpoint.headers,
      timeout: 15000,
    });

    const data: any = response.data;
    console.log(`Response from ${endpoint.name}:`, JSON.stringify(data, null, 2));

    // Parse Instagram API response format
    if (data.carousel_media && Array.isArray(data.carousel_media)) {
      // Handle carousel posts (multiple images/videos)
      for (const carouselItem of data.carousel_media) {
        if (carouselItem.image_versions2 && carouselItem.image_versions2.candidates) {
          // Get the highest quality image
          const bestImage = carouselItem.image_versions2.candidates[0];
          if (bestImage && bestImage.url) {
            media.push({
              url: bestImage.url,
              type: 'image',
              quality: 'hd',
              filename: `instagram-${shortcode || 'content'}-${timestamp}-${media.length + 1}.jpg`,
              width: bestImage.width,
              height: bestImage.height
            });
          }
        }
        
        // Handle videos in carousel
        if (carouselItem.video_versions && Array.isArray(carouselItem.video_versions)) {
          const bestVideo = carouselItem.video_versions[0];
          if (bestVideo && bestVideo.url) {
            media.push({
              url: bestVideo.url,
              type: 'video',
              quality: 'hd',
              filename: `instagram-${shortcode || 'content'}-${timestamp}-${media.length + 1}.mp4`,
              width: bestVideo.width,
              height: bestVideo.height
            });
          }
        }
      }
    } else if (data.image_versions2 && data.image_versions2.candidates) {
      // Handle single image posts
      const bestImage = data.image_versions2.candidates[0];
      if (bestImage && bestImage.url) {
        media.push({
          url: bestImage.url,
          type: 'image',
          quality: 'hd',
          filename: `instagram-${shortcode || 'content'}-${timestamp}.jpg`,
          width: bestImage.width,
          height: bestImage.height
        });
      }
    } else if (data.video_versions && Array.isArray(data.video_versions)) {
      // Handle single video posts
      const bestVideo = data.video_versions[0];
      if (bestVideo && bestVideo.url) {
        media.push({
          url: bestVideo.url,
          type: 'video',
          quality: 'hd',
          filename: `instagram-${shortcode || 'content'}-${timestamp}.mp4`,
          width: bestVideo.width,
          height: bestVideo.height
        });
      }
    }

    // Parse different response formats (fallback)
    if (media.length === 0) {
      if (data.success && data.media && Array.isArray(data.media)) {
        // Format: { success: true, media: [{ url, type, ... }] }
        for (const item of data.media) {
          if (item.url) {
            media.push({
              url: item.url,
              type: item.type === 'video' || item.url.includes('.mp4') ? 'video' : 'image',
              quality: item.quality || 'hd',
              filename: `instagram-${shortcode || 'content'}-${timestamp}-${media.length + 1}${item.url.includes('.mp4') ? '.mp4' : '.jpg'}`,
              width: item.width,
              height: item.height
            });
          }
        }
      } else if (data.url) {
        // Format: { url: "direct_url" }
        media.push({
          url: data.url,
          type: data.url.includes('.mp4') ? 'video' : 'image',
          quality: 'hd',
          filename: `instagram-${shortcode || 'content'}-${timestamp}.${data.url.includes('.mp4') ? 'mp4' : 'jpg'}`,
        });
      } else if (data.data && data.data.media) {
        // Format: { data: { media: [...] } }
        for (const item of data.data.media) {
          if (item.url) {
            media.push({
              url: item.url,
              type: item.type === 'video' || item.url.includes('.mp4') ? 'video' : 'image',
              quality: item.quality || 'hd',
              filename: `instagram-${shortcode || 'content'}-${timestamp}-${media.length + 1}${item.url.includes('.mp4') ? '.mp4' : '.jpg'}`,
              width: item.width,
              height: item.height
            });
          }
        }
      } else if (Array.isArray(data)) {
        // Format: [{ url, type, ... }]
        for (const item of data) {
          if (item.url) {
            media.push({
              url: item.url,
              type: item.type === 'video' || item.url.includes('.mp4') ? 'video' : 'image',
              quality: item.quality || 'hd',
              filename: `instagram-${shortcode || 'content'}-${timestamp}-${media.length + 1}${item.url.includes('.mp4') ? '.mp4' : '.jpg'}`,
              width: item.width,
              height: item.height
            });
          }
        }
      } else if (typeof data === 'string' && data.includes('http')) {
        // Format: direct URL string
        media.push({
          url: data,
          type: data.includes('.mp4') ? 'video' : 'image',
          quality: 'hd',
          filename: `instagram-${shortcode || 'content'}-${timestamp}.${data.includes('.mp4') ? 'mp4' : 'jpg'}`,
        });
      }
    }

    // If we got media, return it
    if (media.length > 0) {
      console.log(`Success with ${endpoint.name}: Found ${media.length} media items`);
      return media;
    }

  } catch (error: any) {
    console.error(`Error with ${endpoint.name}:`, error?.response?.data || error.message);
  }

  // If endpoint failed, return empty array
  console.log('Endpoint failed');
  return [];
}

export async function POST(request: NextRequest) {
  try {
    const body: DownloadRequest = await request.json()
    const { url, type } = body

    if (!url || !type) {
      return NextResponse.json({ error: 'URL and type are required' }, { status: 400 })
    }

    // Check if profile type is requested (disabled feature)
    if (type === 'profile') {
      return NextResponse.json({ 
        success: false,
        error: 'Profile downloads are coming soon! This feature is currently under development.' 
      }, { status: 400 })
    }

    const media = await getInstagramMedia(url, type)
    
    if (media.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'No media found for this content' 
      }, { status: 404 })
    }

    // Extract shortcode for filename generation
    const shortcode = extractShortcode(url)
    
    return NextResponse.json({ 
      success: true,
      data: {
        media,
        type,
        originalUrl: url,
        shortcode,
        downloadUrl: media[0]?.url || '',
        quality: 'hd',
        filename: media[0]?.filename || `instagram-${shortcode || 'content'}-${Date.now()}.jpg`,
        isRealContent: true,
        mediaCount: media.length,
        hasMultipleMedia: media.length > 1
      }
    })

  } catch (error: any) {
    let errorMsg = error.message || 'Failed to download media'
    if (error.response && error.response.status === 429) {
      errorMsg = 'You are making requests too quickly. Please wait a few seconds and try again.'
    }
    console.error('Download API error:', error)
    return NextResponse.json({ 
      success: false,
      error: errorMsg
    }, { status: error.response?.status || 500 })
  }
}

// New endpoint for ZIP downloads
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { mediaItems, highlightTitle } = body

    if (!mediaItems || !Array.isArray(mediaItems) || mediaItems.length === 0) {
      return NextResponse.json({ error: 'Media items array is required' }, { status: 400 })
    }

    console.log(`Creating ZIP with ${mediaItems.length} items`)
    
    const zipBuffer = await createZipFromMedia(mediaItems, highlightTitle)
    
    const filename = highlightTitle 
      ? `instagram-highlights-${highlightTitle}-${Date.now()}.zip`
      : `instagram-media-${Date.now()}.zip`

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    })

  } catch (error: any) {
    console.error('ZIP download error:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to create ZIP file' 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}