// Fills every photo slot and the hero video from Unsplash and Pexels (both free, including commercial use).
// Each slot tries queries in order: first Kenyan / Black African subjects, then broader African, then anything relevant.
// Usage:  npm run media                     -> fill every empty slot (skips files you already have)
//         npm run media -- --force          -> re-download everything
//         npm run media -- hero.jpg 3       -> re-pick one slot using the 4th search result (0 = best match)
import fs from "node:fs/promises"; import path from "node:path";
const U = process.env.UNSPLASH_ACCESS_KEY, P = process.env.PEXELS_API_KEY;
const args = process.argv.slice(2), force = args.includes("--force");
const [onlySlot, pickArg] = args.filter(a => !a.startsWith("--")), pick = Number(pickArg || 0);
const MAX_VIDEO_MB = 8;

// Staff portraits (public/images/staff/*) are deliberately NOT here: use each person's real photo.
const photos = {
  "hero.jpg": ["kenyan church congregation worship", "black african church worship", "african church worship congregation"],
  "gallery/worship.jpg": ["kenyan worship service singing", "black people worship singing church", "african worship service"],
  "gallery/fellowship.jpg": ["kenyan church members smiling", "black african friends fellowship smiling", "african church fellowship"],
  "gallery/community.jpg": ["kenyan community gathering", "black african community together", "african community gathering"],
  "lawrence-baptising.jpg": ["african baptism river", "baptism outdoor water believer", "baptism"],
  "water-drilling-truck.jpg": ["borehole drilling rig africa", "water well drilling truck", "drilling rig water well"],
  "children/children-1.jpg": ["kenyan children smiling", "black african children school", "african children happy"],
  "children/children-2.jpg": ["kenyan children playing", "black african kids playing outdoors", "african children playing"],
  "children/children-3.jpg": ["kenyan children classroom", "black african children learning", "african children learning"],
  "renewed-hearts.jpg": ["black man prayer counseling pastor", "african pastor counseling prayer", "pastor praying with man"],
  "hybells-students.jpg": ["kenyan vocational training students", "black african students workshop trade", "african students vocational training"],
};
const video = { "hero.mp4": ["kenya church worship", "african church worship praise", "black people worship singing", "african community celebration"] };

const credits = [], missing = [];
const exists = f => fs.access(f).then(() => true, () => false);
const save = async (file, buf) => { await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, buf); };

async function photo(slot, queries) {
  const file = path.join("public/images", slot);
  if (!force && !onlySlot && await exists(file)) return console.log(`  ${slot}  (already there, skipped)`);
  for (const q of queries) {
    const r = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&orientation=landscape&content_filter=high&per_page=10`, { headers: { Authorization: `Client-ID ${U}` } });
    if (!r.ok) throw new Error(`Unsplash ${r.status} (check UNSPLASH_ACCESS_KEY; free keys allow 50 requests/hour)`);
    const list = (await r.json()).results, p = list[Math.min(pick, list.length - 1)];
    if (!p) continue;
    fetch(p.links.download_location, { headers: { Authorization: `Client-ID ${U}` } }).catch(() => {}); // Unsplash asks apps to register downloads
    const img = await fetch(`${p.urls.raw}&w=1800&q=75&fm=jpg&fit=crop`);
    await save(file, Buffer.from(await img.arrayBuffer()));
    credits.push(`- ${slot}: photo by ${p.user.name} on Unsplash (${p.links.html}) [search: "${q}"]`);
    return console.log(`  ${slot}  <- ${p.links.html}   ("${q}")`);
  }
  missing.push(slot); console.log(`  ${slot}  no result`);
}

async function clip(slot, queries) {
  const file = path.join("public/videos", slot);
  if (!force && !onlySlot && await exists(file)) return console.log(`  ${slot}  (already there, skipped)`);
  for (const q of queries) {
    const r = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&orientation=landscape&per_page=15`, { headers: { Authorization: P } });
    if (!r.ok) throw new Error(`Pexels ${r.status} (check PEXELS_API_KEY)`);
    const list = (await r.json()).videos.filter(v => v.duration >= 6 && v.duration <= 40), v = list[Math.min(pick, list.length - 1)];
    if (!v) continue;
    // Best quality up to 1280px wide that still fits the size budget; step down if too big.
    const files = v.video_files.filter(f => f.file_type === "video/mp4" && f.width <= 1280).sort((a, b) => b.width - a.width);
    for (const f of files.length ? files : v.video_files.filter(f => f.file_type === "video/mp4")) {
      const buf = Buffer.from(await (await fetch(f.link)).arrayBuffer());
      if (buf.length / 1048576 > MAX_VIDEO_MB && f !== files[files.length - 1]) continue;
      await save(file, buf);
      credits.push(`- ${slot}: video by ${v.user.name} on Pexels (${v.url}) [search: "${q}"]`);
      return console.log(`  ${slot}  <- ${v.url}   ("${q}", ${(buf.length / 1048576).toFixed(1)} MB)`);
    }
  }
  missing.push(slot); console.log(`  ${slot}  no result`);
}

const want = ([s]) => !onlySlot || s === onlySlot;
if (!U && !P) { console.log("Set UNSPLASH_ACCESS_KEY and PEXELS_API_KEY first (free keys; see README)."); process.exit(1); }
if (U) for (const e of Object.entries(photos).filter(want)) await photo(...e); else console.log("Skipping photos: UNSPLASH_ACCESS_KEY not set.");
if (P) for (const e of Object.entries(video).filter(want)) await clip(...e); else console.log("Skipping video: PEXELS_API_KEY not set.");
if (credits.length) await fs.appendFile("MEDIA-CREDITS.md", credits.join("\n") + "\n");
if (missing.length) console.log(`\nNo match for: ${missing.join(", ")}. Drop your own file in public/ for those.`);
console.log("\nDone. Open the site and check each photo; re-pick any with: npm run media -- <slot> <n>");
