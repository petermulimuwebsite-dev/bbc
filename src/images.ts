// Optional: paste a public image or video URL for any slot to use it before you have your own file.
// A file with the same name in public/images or public/videos always wins. Check each photo's licence before using it.
// Sources: Unsplash (free, no attribution required) and Pexels (free licence). Credits are listed in MEDIA-CREDITS.md.
const u = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const px = (id: number, w = 1400) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const av = (name: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=600&background=3a2c1c&color=f5ead6&bold=true&format=png`;

export const remoteImages: Record<string, string> = {
  // Hero poster / fallback: frame from the Pexels hero video below
  "hero.jpg": "https://images.pexels.com/videos/15039379/pexels-photo-15039379.jpeg?auto=compress&w=1800",

  // Home page gallery
  "gallery/worship.jpg": u("photo-1647957902647-0337913440fc"),     // woman leading worship with a microphone
  "gallery/fellowship.jpg": u("photo-1604072424771-7300bc5de457"),  // woman and boy seated in church
  "gallery/community.jpg": u("photo-1707159760934-59f1640586c0"),   // man and woman before a crowd

  // Nuru Toto children
  "children/children-1.jpg": u("photo-1543689604-6fe8dbcd1f59"),    // smiling boy surrounded by children
  "children/children-2.jpg": u("photo-1521493959102-bdd6677fdd81"), // children at a window
  "children/children-3.jpg": u("photo-1473649085228-583485e6e4d7"), // children in a classroom

  // Hybells Christian School: add public/images/hybells-students.jpg (technical school photo), or paste a photo URL here as "hybells-students.jpg": "https://..."

  // Ministries (Pexels, free licence). Swap for your own photos in public/images any time: a local file always wins.
  "lawrence-baptising.jpg": px(28181220),   // pastor baptising a man (stand-in for Lawrence Odada)
  "water-drilling-truck.jpg": px(21047659), // water well drilling rig at work (stand-in for the Jacob's Well rig)
  "renewed-hearts.jpg": u("photo-1604072424771-7300bc5de457"), // stand-in: people seated together in church (same photo as gallery/fellowship)

  // Staff: initials avatars until you have each person's real photo (drop the file in public/images/staff/ and it replaces these)
  "staff/peter-milimo.jpg": av("Peter Milimo"),
  "staff/felix-matuvwi.jpg": av("Felix Matuvwi"),
  "staff/lawrence-odada.jpg": av("Lawrence Odada"),
  "staff/judith-kanini.jpg": av("Judith Kanini"),
  "staff/harriet-karemi.jpg": av("Harriet Karemi"),
};
export const remoteVideos: Record<string, string> = {
  // Pexels, "A group of women worshipping while raising hands" by Luis Quintero (6s loop, 1080p, free licence). To change: paste another direct .mp4 link here.
  "hero.mp4": "https://videos.pexels.com/video-files/15039379/15039379-hd_1920_1080_60fps.mp4",
};
