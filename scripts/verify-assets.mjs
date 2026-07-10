import { existsSync, readFileSync, statSync } from "node:fs";

const heroVideos = [
  "public/videos/zhongxin-motion-primary-v2.mp4",
  "public/videos/zhongxin-motion-secondary-v2.mp4",
];

const heroPosters = [
  "public/images/brand/hero-video-primary-v2.jpg",
  "public/images/brand/hero-video-secondary-v2.jpg",
];

const assets = [
  "public/images/products/izu.jpg",
  "public/images/products/db.jpg",
  "public/images/products/wb.jpg",
  "public/images/products/ddr.jpg",
  "public/images/products/izu7.jpg",
  "public/images/products/custom-stage.jpg",
  "public/images/drawings/izu-drawing.jpg",
  "public/images/drawings/db-drawing.jpg",
  "public/images/drawings/wb-drawing.jpg",
  "public/images/drawings/ddr-drawing.jpg",
  "public/images/drawings/izu7-drawing.jpg",
  "public/images/drawings/custom-stage-drawing.jpg",
  "public/images/contact/qr-code.png",
  "public/images/brand/hero-composite.jpg",
  ...heroPosters,
  ...heroVideos,
  "public/downloads/zhongxin-direct-drive-product-manual.pdf",
];

const MAX_VIDEO_BYTES = 4 * 1024 * 1024;
const MAX_POSTER_BYTES = 150 * 1024;
const missing = assets.filter((file) => !existsSync(file));
const tiny = assets.filter((file) => existsSync(file) && statSync(file).size < 4096);
const oversizedVideos = heroVideos.filter(
  (file) => existsSync(file) && statSync(file).size > MAX_VIDEO_BYTES,
);
const oversizedPosters = heroPosters.filter(
  (file) => existsSync(file) && statSync(file).size > MAX_POSTER_BYTES,
);

const invalidVideos = heroVideos.flatMap((file) => {
  if (!existsSync(file)) return [];

  const bytes = readFileSync(file);
  const moov = bytes.indexOf(Buffer.from("moov"));
  const mdat = bytes.indexOf(Buffer.from("mdat"));
  const avc1 = bytes.indexOf(Buffer.from("avc1"));
  const problems = [];

  if (avc1 < 0) problems.push("missing avc1 codec marker");
  if (moov < 0 || mdat < 0 || moov > mdat) problems.push("moov atom is not before mdat");

  return problems.map((problem) => `${file}: ${problem}`);
});

if (
  missing.length > 0 ||
  tiny.length > 0 ||
  oversizedVideos.length > 0 ||
  oversizedPosters.length > 0 ||
  invalidVideos.length > 0
) {
  if (missing.length > 0) {
    console.error(`Missing assets:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  }
  if (tiny.length > 0) {
    console.error(`Suspiciously small assets:\n${tiny.map((file) => `- ${file}`).join("\n")}`);
  }
  if (oversizedVideos.length > 0) {
    console.error(`Hero videos exceed 4 MB:\n${oversizedVideos.map((file) => `- ${file}`).join("\n")}`);
  }
  if (oversizedPosters.length > 0) {
    console.error(`Hero posters exceed 150 KB:\n${oversizedPosters.map((file) => `- ${file}`).join("\n")}`);
  }
  if (invalidVideos.length > 0) {
    console.error(`Invalid hero video encoding:\n${invalidVideos.map((item) => `- ${item}`).join("\n")}`);
  }
  process.exit(1);
}

console.log(`verify-assets: ${assets.length} assets present and hero media optimized`);
