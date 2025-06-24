# Instagram Downloader Website

A modern, responsive website for downloading Instagram posts, stories, reels, and profile pictures. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🖼️ **Multiple Content Types**: Download posts, stories, reels, highlights, and profile pictures
- 🔒 **100% Anonymous**: No login required, complete privacy protection
- ⚡ **Lightning Fast**: Optimized for speed with modern web technologies
- 📱 **Mobile Friendly**: Responsive design that works on all devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 🛡️ **Safe & Secure**: Only downloads public content, respects privacy

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd instagram-downloader
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
instagram-downloader/
├── app/
│   ├── api/
│   │   └── download/
│   │       └── route.ts          # API endpoint for downloads
│   ├── components/
│   │   ├── DownloadForm.tsx      # Main download form
│   │   ├── Features.tsx          # Features section
│   │   ├── HowToUse.tsx          # How to use guide
│   │   └── Footer.tsx            # Footer component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── public/                       # Static assets
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Usage

### For Users

1. **Copy Instagram URL**: Open Instagram and find the content you want to download. Tap the three dots (...) and select "Copy link".

2. **Paste URL**: Paste the copied URL into the input field on the website.

3. **Select Content Type**: Choose the type of content (Post, Story, Reel, or Profile).

4. **Download**: Click the download button and wait for the process to complete.

### For Developers

The website includes:

- **API Route**: `/api/download` - Handles download requests
- **Form Validation**: Client-side validation for URLs and content types
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Smooth animations using Framer Motion

## API Endpoints

### POST /api/download

Downloads Instagram content.

**Request Body:**
```json
{
  "url": "https://www.instagram.com/p/...",
  "type": "post"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "media": [
      {
        "url": "https://example.com/media.jpg",
        "type": "image",
        "quality": "hd"
      }
    ],
    "type": "post",
    "originalUrl": "https://www.instagram.com/p/...",
    "downloadUrl": "https://example.com/media.jpg",
    "quality": "hd"
  }
}
```

## Customization

### Styling

The website uses Tailwind CSS with custom configurations:

- **Colors**: Custom gradient colors for Instagram theme
- **Animations**: Custom keyframes and transitions
- **Components**: Reusable component classes

### Content Types

To add new content types, modify the `downloadTypes` array in `DownloadForm.tsx`:

```typescript
const downloadTypes = [
  {
    id: 'new-type',
    name: 'New Type',
    icon: NewIcon,
    description: 'Description of new type',
    color: 'from-color-500 to-color-500'
  }
]
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The website can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Legal Notice

This tool is for educational purposes only. Users are responsible for:

- Respecting Instagram's Terms of Service
- Only downloading content they have permission to download
- Complying with copyright laws
- Using the tool responsibly

The website only downloads public content and respects user privacy.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please:

1. Check the FAQ section on the website
2. Open an issue on GitHub
3. Contact the development team

## Acknowledgments

- Instagram for the platform
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- Framer Motion for the smooth animations

---

**Note**: This is a demonstration website. In a production environment, you would need to implement actual Instagram content scraping or use official APIs where available. 