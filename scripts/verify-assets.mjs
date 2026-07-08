import { existsSync, statSync } from "node:fs";

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
  "public/videos/zhongxin-motion-primary.mp4",
  "public/videos/zhongxin-motion-secondary.mp4",
  "public/downloads/zhongxin-direct-drive-product-manual.pdf",
];

const missing = assets.filter((file) => !existsSync(file));
const tiny = assets.filter((file) => existsSync(file) && statSync(file).size < 4096);

if (missing.length > 0 || tiny.length > 0) {
  if (missing.length > 0) {
    console.error(`Missing assets:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  }
  if (tiny.length > 0) {
    console.error(`Suspiciously small assets:\n${tiny.map((file) => `- ${file}`).join("\n")}`);
  }
  process.exit(1);
}

console.log(`verify-assets: ${assets.length} assets present`);
