# Jasify AI Marketplace

A modern Next.js application for discovering and exploring AI tools with intelligent recommendations powered by Hugging Face's DeepSeek-V3 model.

## Features

- **AI-Powered Search** - Get intelligent overviews of any AI topic using real AI
- **Smart Recommendations** - Discover relevant AI tools based on your search
- **22+ AI Products** - Curated catalog across 10 categories
- **Works Out of the Box** - Uses mock data by default, real AI when API key is added
- **Responsive Design** - Beautiful interface that works on all devices
- **Production Ready** - Deployed to Vercel with zero configuration

## Quick Start

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### 3. Open in Browser
Visit `http://localhost:3000` and start searching!

## Using Real AI (Optional)

To get real AI-generated overviews instead of mock data:

1. Get a free API key from [Hugging Face](https://huggingface.co/settings/tokens)
2. Create `.env.local` file:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`
3. Add your API key:
   \`\`\`
   HUGGING_FACE_API_KEY=your_api_key_here
   \`\`\`
4. Restart the dev server

## Try These Searches

- "content creation"
- "automation"
- "customer support"
- "image generation"
- "video editing"
- "seo tools"
- "education"
- "analytics"

## Project Structure

\`\`\`
.
├── app/
│   ├── page.tsx              # Main search interface
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Styling
│   └── api/
│       ├── ai-overview/      # AI overview endpoint
│       ├── recommendations/  # Recommendations endpoint
│       └── health/           # Health check endpoint
├── components/ui/            # shadcn/ui components
├── lib/
│   ├── products.ts           # Product catalog
│   └── utils.ts              # Utilities
├── public/                   # Static assets
├── package.json              # Dependencies
└── README.md                 # This file
\`\`\`

## API Endpoints

All endpoints are available at `/api`:

- `GET /api/health` - Health check
- `GET /api/ai-overview?query=...` - Get AI overview
- `GET /api/recommendations?query=...` - Get product recommendations

## Environment Variables

Create `.env.local` file (copy from `.env.local.example`):

\`\`\`
# Optional: Hugging Face API key for real AI overviews
HUGGING_FACE_API_KEY=your_api_key_here

# Optional: Custom backend URL
BACKEND_URL=http://localhost:8000
\`\`\`

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables (optional):
   - `HUGGING_FACE_API_KEY` - For real AI overviews
5. Click "Deploy"

## Customization

### Add More Products

Edit `lib/products.ts` to add or modify products in the catalog.

### Change Styling

Edit `app/globals.css` to customize colors and styling.

### Modify Search Behavior

Edit `app/api/recommendations/route.ts` to change recommendation logic.

## Troubleshooting

**Q: Search returns no results**
- A: Try one of the suggested search terms above

**Q: Want real AI instead of mock data**
- A: Add your Hugging Face API key to `.env.local`

**Q: How do I deploy?**
- A: Push to GitHub and connect to Vercel (see Deployment section)

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **AI**: Hugging Face Inference API
- **Deployment**: Vercel

## License

MIT
