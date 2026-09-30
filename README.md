# BBCC church website (Astro)
    npm install
    npm run dev      # local preview
    npm run build    # output in /dist, upload to any host (Netlify, Vercel, Cloudflare Pages)

1. Edit `src/config.ts` for phone, paybill, PayPal username and contact-form URL.
2. Drop photos into `public/images/` using the file names shown on each grey placeholder:
   hero.jpg (optional), lawrence-baptising.jpg, water-drilling-truck.jpg,
   children/children-1.jpg, -2, -3, staff/peter-milimo.jpg, felix-matuvwi.jpg,
   lawrence-odada.jpg, judith-kanini.jpg, harriet-karemi.jpg

Also add (all optional; each slot shows a labelled placeholder until the file exists):
   gallery/worship.jpg, gallery/fellowship.jpg, gallery/community.jpg, renewed-hearts.jpg, hybells-students.jpg
   Hero video: public/videos/hero.mp4 (muted, looping, ~10-20s, under 8 MB). hero.jpg is used as its poster and as the fallback.

Books: edit `books` and `bookInfo` in `src/config.ts`. Photos or video from a public URL: paste it into `src/images.ts` (your own file in public/ always wins).

Fill in photos and the hero video automatically (free Unsplash + Pexels libraries):
1. Get a free Unsplash key (unsplash.com/developers, "New Application", copy the Access Key) and a free Pexels key (pexels.com/api).
2. PowerShell:  $env:UNSPLASH_ACCESS_KEY="your-key"; $env:PEXELS_API_KEY="your-key"; npm run media
   Mac/Linux:   UNSPLASH_ACCESS_KEY=your-key PEXELS_API_KEY=your-key npm run media
3. Files land in public/images and public/videos, and credits are written to MEDIA-CREDITS.md.
   Searches favour Kenyan / Black African subjects first, then fall back to broader African, then anything relevant.
   It fills every slot except staff portraits, and skips files you already have (use --force to redo all).
4. Look at each result. To swap one, run e.g.  npm run media -- gallery/worship.jpg 3  (3 = the 4th search result).
5. Stock photos are stand-ins. Replace the baptism, Nuru Toto children and staff slots with your real photos before launch.
