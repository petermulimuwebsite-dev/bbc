// Fills every photo slot and the hero video from Unsplash and Pexels (both free to use, including commercially).
// Usage:  npm run media                  -> fill everything
//         npm run media -- hero.jpg 3    -> re-pick one slot using the 4th search result (0 = best match)
import fs from "node:fs/promises"; import path from "node:path";
const U = process.env.UNSPLASH_ACCESS_KEY, P = process.env.PEXELS_API_KEY;
const [onlySlot, pickArg] = process.argv.slice(2), pick = Number(pickArg || 0);
const photos = {
  "hero.jpg": "african church worship congregation",
  "gallery/worship.jpg": "african worship service singing",
  "gallery/fellowship.jpg": "african church fellowship smiling people",
  "gallery/community.jpg": "african community gathering together",
  "renewed-hearts.jpg": "african pastor counseling prayer",
  "hybells-students.jpg": "african students vocational training workshop",
};
const video = { "hero.mp4": "african church worship praise" };
const credits = [];
const save = async (file, res) => { await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, Buffer.from(await res.arrayBuffer())); };

async function photo(slot, query) {
  const r = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high&per_page=10`, { headers: { Authorization: `Client-ID ${U}` } });
  if (!r.ok) throw new Error(`Unsplash ${r.status}`);
  const list = (await r.json()).results, p = list[Math.min(pick, list.length - 1)];
  if (!p) return console.log(`  no result for ${slot}`);
  fetch(p.links.download_location, { headers: { Authorization: `Client-ID ${U}` } }).catch(() => {}); // Unsplash asks apps to register downloads
  await save(path.join("public/images", slot), await fetch(`${p.urls.raw}&w=1800&q=75&fm=jpg&fit=crop`));
  credits.push(`- ${slot}: photo by ${p.user.name} on Unsplash (${p.links.html})`); console.log(`  ${slot}  <- ${p.links.html}`);
}
async function clip(slot, query) {
  const r = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15`, { headers: { Authorization: P } });
  if (!r.ok) throw new Error(`Pexels ${r.status}`);
  const list = (await r.json()).videos.filter(v => v.duration <= 40), v = list[Math.min(pick, list.length - 1)];
  if (!v) return console.log(`  no result for ${slot}`);
  const files = v.video_files.filter(f => f.file_type === "video/mp4").sort((a, b) => a.width - b.width);
  const f = [...files].reverse().find(f => f.width <= 1280) || files[0];
  await save(path.join("public/videos", slot), await fetch(f.link));
  credits.push(`- ${slot}: video by ${v.user.name} on Pexels (${v.url})`); console.log(`  ${slot}  <- ${v.url}`);
}
const want = ([s]) => !onlySlot || s === onlySlot;
if (!U && !P) { console.log("Set UNSPLASH_ACCESS_KEY and PEXELS_API_KEY first (free keys; see README)."); process.exit(1); }
if (U) for (const e of Object.entries(photos).filter(want)) await photo(...e); else console.log("Skipping photos: UNSPLASH_ACCESS_KEY not set.");
if (P) for (const e of Object.entries(video).filter(want)) await clip(...e); else console.log("Skipping video: PEXELS_API_KEY not set.");
if (credits.length) await fs.appendFile("MEDIA-CREDITS.md", credits.join("\n") + "\n");
console.log("Done. Open the site and check each photo; re-pick any with: npm run media -- <slot> <n>");
