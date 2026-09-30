# BBCC church website (Astro)

    npm install
    npm run dev      # local preview
    npm run build    # output in /dist, upload to any host (Netlify, Vercel, Cloudflare Pages)

1. Edit `src/config.ts` for phone, paybill, PayPal username, contact-form URL, staff and books.
2. All photos are local files in `public/img/`. The site never loads images from the internet.

## Photos
- Which file goes where is set in `src/pages/index.astro` (hero, gallery, pillars), `src/pages/ministries.astro`, and `staff` in `src/config.ts`.
- Use the exact file name, including spaces (e.g. `children 1.jpg`). Keep photos around 2000px wide or less so pages load quickly.
- There are no placeholder boxes. If a photo is missing, that block drops its image and the text lays out on its own.
- Renewed Hearts and Hybells currently have no photo. To add one, put the file in `public/img/` and set it in `pillars` (index.astro) and add a `<Photo src="your-file.jpg" class="mimg"/>` to its section in ministries.astro (and remove `single` from that section's class).
