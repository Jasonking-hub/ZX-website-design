import { readFileSync } from "node:fs";

const config = readFileSync("netlify.toml", "utf8").replace(/\r\n/g, "\n");
const cacheControl = "Cache-Control = \"public, max-age=31536000, immutable\"";
const requiredBlocks = [
  `[[headers]]\n  for = "/videos/*"\n  [headers.values]\n    ${cacheControl}`,
  `[[headers]]\n  for = "/images/brand/hero-video-primary-v2.jpg"\n  [headers.values]\n    ${cacheControl}`,
  `[[headers]]\n  for = "/images/brand/hero-video-secondary-v2.jpg"\n  [headers.values]\n    ${cacheControl}`,
];
const missing = requiredBlocks.filter((block) => !config.includes(block));

if (missing.length > 0) {
  console.error(`Missing immutable cache rules:\n${missing.map((block) => `- ${block.split("\n")[1].trim()}`).join("\n")}`);
  process.exit(1);
}

console.log("verify-netlify-cache: versioned hero media cached immutably");
