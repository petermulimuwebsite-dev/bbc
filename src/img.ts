// All site photos come from public/img. Nothing is fetched from the internet.
import fs from "node:fs";
import path from "node:path";

/** URL for a file inside public/img (handles spaces and other odd characters in file names). */
export const imgUrl = (src: string) => "/img/" + src.split("/").map(encodeURIComponent).join("/");

/** True only if the file really exists in public/img, so a slot can drop its image block instead of showing an empty box. */
export const hasImg = (src?: string): boolean =>
  !!src && fs.existsSync(path.join(process.cwd(), "public", "img", src));
