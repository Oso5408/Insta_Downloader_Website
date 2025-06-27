import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
    }

    // Validate URL format
    if (!imageUrl.startsWith('http')) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    console.log(`Proxy GET: Fetching ${imageUrl}`)

    // Fetch the image from Instagram CDN
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      },
    })

    if (!response.ok) {
      console.error(`Proxy GET failed: ${response.status} ${response.statusText}`)
      return NextResponse.json({ 
        error: `Failed to fetch image: ${response.status} ${response.statusText}` 
      }, { status: response.status })
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer()
    
    if (imageBuffer.byteLength === 0) {
      return NextResponse.json({ error: 'Downloaded image is empty' }, { status: 400 })
    }
    
    const contentType = response.headers.get('content-type') || 'image/jpeg'

    console.log(`Proxy GET success: ${imageBuffer.byteLength} bytes, type: ${contentType}`)

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Proxy GET error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, filename } = body
    
    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
    }

    // Validate URL format
    if (!url.startsWith('http')) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    console.log(`Proxy POST: Fetching ${url}`)

    // Fetch the media from Instagram CDN
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      },
    })

    if (!response.ok) {
      console.error(`Proxy POST failed: ${response.status} ${response.statusText}`)
      return NextResponse.json({ 
        error: `Failed to fetch media: ${response.status} ${response.statusText}` 
      }, { status: response.status })
    }

    // Get the media data
    const mediaBuffer = await response.arrayBuffer()
    
    if (mediaBuffer.byteLength === 0) {
      return NextResponse.json({ error: 'Downloaded file is empty' }, { status: 400 })
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    
    console.log(`Proxy POST success: ${mediaBuffer.byteLength} bytes, type: ${contentType}`)

    // Return the media with proper headers for download
    return new NextResponse(mediaBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename || 'download'}"`,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Proxy POST error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { status: 500 })
  }
} 