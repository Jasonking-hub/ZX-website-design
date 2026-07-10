import { existsSync, readFileSync } from "node:fs";

const outputFile = "out/index.html";

if (!existsSync(outputFile)) {
  console.error("Missing out/index.html; run the production build first");
  process.exit(1);
}

const html = readFileSync(outputFile, "utf8");
const mediaComponent = readFileSync("components/hero-video-media.tsx", "utf8");
const renderedHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
const videoCount = (renderedHtml.match(/<video\b/g) ?? []).length;
const failures = [];

if (!renderedHtml.includes("/videos/zhongxin-motion-primary-v2.mp4")) {
  failures.push("optimized primary video is missing from initial HTML");
}
if (!renderedHtml.includes("/images/brand/hero-video-primary-v2.jpg")) {
  failures.push("primary poster is missing from initial HTML");
}
if (!renderedHtml.includes("/images/brand/hero-video-secondary-v2.jpg")) {
  failures.push("secondary poster is missing from initial HTML");
}
if (renderedHtml.includes("/videos/zhongxin-motion-secondary-v2.mp4")) {
  failures.push("secondary video must not be present in initial HTML");
}
if (videoCount !== 1) {
  failures.push(`expected one initial video element, found ${videoCount}`);
}
if (!/<video\b[^>]*preload="auto"/.test(renderedHtml)) {
  failures.push("primary video must use preload=auto");
}
if (!mediaComponent.includes("onTimeUpdate") || !mediaComponent.includes("currentTime > 0")) {
  failures.push("primary video needs a timeupdate fallback when playing fires before hydration");
}

if (failures.length > 0) {
  console.error(`Hero video verification failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

console.log("verify-hero-video: primary video prioritized and secondary video deferred");
