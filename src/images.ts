// Optional: paste a public image or video URL for any slot to use it before you have your own file.
// A file with the same name in public/images or public/videos always wins. Check each photo's licence before using it.
// Sources: Unsplash (free, no attribution required) and Pexels (free licence). Credits are listed in MEDIA-CREDITS.md.
const u = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const remoteImages: Record<string, string> = {
  // Hero poster / fallback: frame from the Pexels gospel choir video below
  "hero.jpg": "https://images.pexels.com/videos/16863297/african-american-african-american-culture-african-american-females-african-american-group-16863297.jpeg?auto=compress&w=1800",

  // Home page gallery
  "gallery/worship.jpg": u("photo-1647957902647-0337913440fc"),     // woman leading worship with a microphone
  "gallery/fellowship.jpg": u("photo-1604072424771-7300bc5de457"),  // woman and boy seated in church
  "gallery/community.jpg": u("photo-1707159760934-59f1640586c0"),   // man and woman before a crowd

  // Nuru Toto children
  "children/children-1.jpg": u("photo-1543689604-6fe8dbcd1f59"),    // smiling boy surrounded by children
  "children/children-2.jpg": u("photo-1521493959102-bdd6677fdd81"), // children at a window
  "children/children-3.jpg": u("photo-1473649085228-583485e6e4d7"), // children in a classroom

  // Hybells Christian School
  "hybells-students.jpg": u("photo-1567057420215-0afa9aa9253a"),    // children writing in books

  // Still to fill (no verified free link yet): use `npm run media` or your own photos
  // "lawrence-baptising.jpg": "",
  // "water-drilling-truck.jpg": "",
  // "renewed-hearts.jpg": "",
};
export const remoteVideos: Record<string, string> = {
  // Pexels, "Gospel Choir" by Shout! Productions (20s, 1080p, free licence)
  "hero.mp4": "https://videos.pexels.com/video-files/16863297/16863297-hd_1920_1080_30fps.mp4",
};
