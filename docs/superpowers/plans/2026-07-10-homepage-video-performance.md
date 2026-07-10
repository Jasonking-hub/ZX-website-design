# Homepage Video Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace oversized hero media with fast-start H.264 assets and ensure the primary background video starts before the secondary video is requested.

**Architecture:** Keep `HeroVideoShowcase` server-rendered for content and move only the media shell into a small client component. The client component mounts the primary video immediately, mounts the secondary video after the primary fires `playing`, and keeps server-rendered posters behind both videos. Verification scripts enforce media budgets, static HTML loading order, and Netlify caching.

**Tech Stack:** Next.js 14 static export, React 18, TypeScript, Tailwind CSS, Node.js verification scripts, FFmpeg, Netlify.

## Global Constraints

- Preserve the approved two-video hero layout and all existing hero copy.
- Deployment videos: H.264/AVC MP4, 1920x1080, 30 fps, `yuv420p`, no audio, Fast Start.
- Each deployment video must be at most 4 MB.
- Each deployment poster must be at most 150 KB.
- Keep raw files under `material/` unchanged.
- Do not add HLS, a video CDN, audio, controls, or a third-party player.
- Use versioned media filenames and `Cache-Control: public, max-age=31536000, immutable`.

## File Map

- Create `components/hero-video-media.tsx`: client-only media state, posters, primary video, deferred secondary video, and existing hero shell layout.
- Modify `components/hero-video-showcase.tsx`: retain server-rendered hero text and pass it into the media shell.
- Modify `scripts/verify-assets.mjs`: enforce media existence, size, codec marker, and MP4 atom order.
- Create `scripts/verify-hero-video.mjs`: inspect exported homepage HTML for initial loading behavior.
- Create `scripts/verify-netlify-cache.mjs`: verify exact immutable cache rules.
- Modify `package.json`: run exported-HTML verification after build and cache verification in the project verification command.
- Modify `netlify.toml`: add immutable cache headers for versioned media.
- Create `public/videos/zhongxin-motion-primary-v2.mp4` and `public/videos/zhongxin-motion-secondary-v2.mp4`: optimized deployment videos.
- Create `public/images/brand/hero-video-primary-v2.jpg` and `public/images/brand/hero-video-secondary-v2.jpg`: matching poster frames.
- Remove `public/videos/zhongxin-motion-primary.mp4` and `public/videos/zhongxin-motion-secondary.mp4`: obsolete oversized deployment copies.

---

### Task 1: Enforce And Produce Optimized Media

**Files:**
- Modify: `scripts/verify-assets.mjs`
- Create: `public/videos/zhongxin-motion-primary-v2.mp4`
- Create: `public/videos/zhongxin-motion-secondary-v2.mp4`
- Create: `public/images/brand/hero-video-primary-v2.jpg`
- Create: `public/images/brand/hero-video-secondary-v2.jpg`
- Remove: `public/videos/zhongxin-motion-primary.mp4`
- Remove: `public/videos/zhongxin-motion-secondary.mp4`

**Interfaces:**
- Consumes: raw videos `material/VID20260708114704.mp4` and `material/VID20260708114725.mp4`.
- Produces: versioned media paths consumed by `HeroVideoMedia` and enforced by `verify-assets.mjs`.

- [ ] **Step 1: Write failing media-budget checks**

Replace `scripts/verify-assets.mjs` with:

```js
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
```

- [ ] **Step 2: Run the check and verify RED**

Run:

```powershell
node scripts/verify-assets.mjs
```

Expected: exit 1 with all four `*-v2` media files listed under `Missing assets`.

- [ ] **Step 3: Install FFmpeg only if unavailable**

Run:

```powershell
winget install --id Gyan.FFmpeg --exact --accept-package-agreements --accept-source-agreements
```

Expected: FFmpeg installs successfully. Open a fresh shell if `ffmpeg` is not immediately discoverable.

- [ ] **Step 4: Transcode both videos**

Run:

```powershell
ffmpeg -y -i "material/VID20260708114704.mp4" -an -vf "fps=30,scale=1920:1080:flags=lanczos" -c:v libx264 -preset slow -crf 24 -maxrate 4M -bufsize 8M -pix_fmt yuv420p -profile:v high -level 4.0 -movflags +faststart "public/videos/zhongxin-motion-primary-v2.mp4"
ffmpeg -y -i "material/VID20260708114725.mp4" -an -vf "fps=30,scale=1920:1080:flags=lanczos" -c:v libx264 -preset slow -crf 24 -maxrate 4M -bufsize 8M -pix_fmt yuv420p -profile:v high -level 4.0 -movflags +faststart "public/videos/zhongxin-motion-secondary-v2.mp4"
```

Expected: two H.264 1080p30 MP4 files with no audio, each below 4 MB.

- [ ] **Step 5: Extract matching posters**

Run:

```powershell
ffmpeg -y -i "public/videos/zhongxin-motion-primary-v2.mp4" -frames:v 1 -vf "scale=1280:-2:flags=lanczos" -q:v 7 "public/images/brand/hero-video-primary-v2.jpg"
ffmpeg -y -i "public/videos/zhongxin-motion-secondary-v2.mp4" -frames:v 1 -vf "scale=1280:-2:flags=lanczos" -q:v 7 "public/images/brand/hero-video-secondary-v2.jpg"
```

Expected: two 1280x720 JPEG files below 150 KB whose content matches each video's opening frame.

- [ ] **Step 6: Verify GREEN and inspect stream metadata**

Run:

```powershell
node scripts/verify-assets.mjs
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,pix_fmt -show_entries format=size,duration -of json "public/videos/zhongxin-motion-primary-v2.mp4"
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,pix_fmt -show_entries format=size,duration -of json "public/videos/zhongxin-motion-secondary-v2.mp4"
```

Expected: verifier passes; both streams report `h264`, `1920`, `1080`, `30/1`, and `yuv420p`.

- [ ] **Step 7: Remove obsolete deployment copies and commit**

Remove only these verified workspace files:

```powershell
Remove-Item -LiteralPath "public/videos/zhongxin-motion-primary.mp4"
Remove-Item -LiteralPath "public/videos/zhongxin-motion-secondary.mp4"
```

Then run and commit:

```powershell
node scripts/verify-assets.mjs
git add scripts/verify-assets.mjs public/videos public/images/brand
git commit -m "perf: optimize homepage video assets"
```

Expected: verification passes and only versioned deployment videos remain under `public/videos/`.

---

### Task 2: Prioritize The Primary Video

**Files:**
- Create: `scripts/verify-hero-video.mjs`
- Create: `components/hero-video-media.tsx`
- Modify: `components/hero-video-showcase.tsx`
- Modify: `package.json`

**Interfaces:**
- Consumes: optimized media paths from Task 1 and a `children: ReactNode` server-rendered content slot.
- Produces: `HeroVideoMedia({ children }: HeroVideoMediaProps)` and exported homepage HTML containing one initial video request.

- [ ] **Step 1: Write failing exported-HTML verification**

Create `scripts/verify-hero-video.mjs`:

```js
import { existsSync, readFileSync } from "node:fs";

const outputFile = "out/index.html";

if (!existsSync(outputFile)) {
  console.error("Missing out/index.html; run the production build first");
  process.exit(1);
}

const html = readFileSync(outputFile, "utf8");
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

if (failures.length > 0) {
  console.error(`Hero video verification failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

console.log("verify-hero-video: primary video prioritized and secondary video deferred");
```

Change the `build` script in `package.json` to:

```json
"build": "next build && node scripts/verify-hero-video.mjs"
```

- [ ] **Step 2: Run the build and verify RED**

Run:

```powershell
pnpm run build
```

Expected: Next.js export completes, then `verify-hero-video` exits 1 because old hero HTML contains two legacy video elements and no optimized paths.

- [ ] **Step 3: Add the client media shell**

Create `components/hero-video-media.tsx`:

```tsx
"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";

type HeroVideoMediaProps = {
  children: ReactNode;
};

export function HeroVideoMedia({ children }: HeroVideoMediaProps) {
  const [primaryPlaying, setPrimaryPlaying] = useState(false);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-navy px-4 pt-28 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-[0.72]" aria-hidden="true">
        <Image
          src="/images/brand/hero-video-primary-v2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/images/brand/hero-video-primary-v2.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPrimaryPlaying(true)}
        >
          <source src="/videos/zhongxin-motion-primary-v2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/78 to-navy/24" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,47,0.2),rgba(7,26,47,0.58))]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100dvh-7rem)] max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[0.92fr_1.08fr]">
        {children}

        <div className="hidden lg:block">
          <div className="relative ml-auto aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/20 bg-white/8 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur">
            <Image
              src="/images/brand/hero-video-secondary-v2.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 1px"
              className="object-cover"
            />
            {primaryPlaying ? (
              <video
                className="absolute inset-0 z-10 h-full w-full object-cover"
                poster="/images/brand/hero-video-secondary-v2.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="中欣自动化设备运动实拍"
              >
                <source
                  src="/videos/zhongxin-motion-secondary-v2.mp4"
                  type="video/mp4"
                  media="(min-width: 1024px)"
                />
              </video>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-navy/84 to-transparent p-6">
              <p className="text-sm font-semibold text-white">高速响应与稳定运动</p>
              <p className="mt-2 max-w-md text-xs leading-6 text-white/68">实拍素材展示直驱运动部件在设备中的连续运行状态。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Keep hero content server-rendered**

Replace `components/hero-video-showcase.tsx` with:

```tsx
import Link from "next/link";
import { HeroVideoMedia } from "@/components/hero-video-media";
import { siteInfo } from "@/data/site";

export function HeroVideoShowcase() {
  return (
    <HeroVideoMedia>
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-electric">高端精密直驱运动解决方案供应商</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          面向高端装备的精密直驱运动解决方案
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/76">
          专注无铁芯直线电机、DDR 直驱旋转电机、管型直线电机与定制高精度平台，为高速度、高精度设备提供运动核心部件。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-full bg-electric px-6 py-3 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:bg-white active:scale-[0.98] active:translate-y-0"
          >
            查看产品中心
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/28 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-navy active:scale-[0.98] active:translate-y-0"
          >
            联系工程师
          </Link>
          <Link
            href={siteInfo.manualHref}
            className="rounded-full border border-white/28 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-navy active:scale-[0.98] active:translate-y-0"
          >
            下载产品手册
          </Link>
        </div>
      </div>
    </HeroVideoMedia>
  );
}
```

- [ ] **Step 5: Run checks and verify GREEN**

Run:

```powershell
pnpm run typecheck
pnpm run build
```

Expected: TypeScript passes; build ends with `verify-hero-video: primary video prioritized and secondary video deferred`.

- [ ] **Step 6: Commit**

```powershell
git add components/hero-video-media.tsx components/hero-video-showcase.tsx scripts/verify-hero-video.mjs package.json
git commit -m "perf: prioritize homepage background video"
```

---

### Task 3: Cache Versioned Hero Media

**Files:**
- Create: `scripts/verify-netlify-cache.mjs`
- Modify: `netlify.toml`
- Modify: `package.json`

**Interfaces:**
- Consumes: versioned URLs from Tasks 1 and 2.
- Produces: deterministic Netlify browser-cache policy enforced by `pnpm run verify`.

- [ ] **Step 1: Write failing cache verification**

Create `scripts/verify-netlify-cache.mjs`:

```js
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
```

Run:

```powershell
node scripts/verify-netlify-cache.mjs
```

Expected: exit 1 listing all three missing cache rules.

- [ ] **Step 2: Add exact Netlify cache rules**

Append to `netlify.toml`:

```toml
[[headers]]
  for = "/videos/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/brand/hero-video-primary-v2.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/brand/hero-video-secondary-v2.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

Add this package script:

```json
"verify:cache": "node scripts/verify-netlify-cache.mjs"
```

Append it to `verify` after `verify:assets` and before `verify:forms`:

```json
"verify": "tsc --noEmit && node scripts/verify-files.mjs && node scripts/verify-content.mjs && node scripts/verify-routes.mjs && node scripts/verify-assets.mjs && node scripts/verify-netlify-cache.mjs && tsx scripts/verify-form-validation.ts"
```

- [ ] **Step 3: Verify GREEN and commit**

Run:

```powershell
node scripts/verify-netlify-cache.mjs
pnpm run verify
git add netlify.toml package.json scripts/verify-netlify-cache.mjs
git commit -m "chore: cache versioned hero media"
```

Expected: cache verification and full project verification pass.

---

### Task 4: Production And Browser Verification

**Files:**
- Verify: all files changed in Tasks 1-3

**Interfaces:**
- Consumes: production export and local browser.
- Produces: evidence that the optimized loading sequence works at desktop and mobile widths.

- [ ] **Step 1: Run fresh automated verification**

Run:

```powershell
pnpm run verify
pnpm run build
git diff --check
```

Expected: every command exits 0 with no errors.

- [ ] **Step 2: Inspect final asset properties**

Run:

```powershell
Get-ChildItem public/videos,public/images/brand | Where-Object Name -Like "*v2*" | Select-Object Name,Length
```

Expected: each MP4 is at most 4,194,304 bytes; each JPEG is at most 153,600 bytes.

- [ ] **Step 3: Test desktop cold load**

Serve `out/` locally in a separate terminal:

```powershell
python -m http.server 4310 --directory out
```

Open `http://127.0.0.1:4310/` at a desktop viewport. Confirm:

- poster and hero content appear immediately;
- primary video is muted, unpaused, `readyState >= 3`, and advances `currentTime`;
- secondary video appears only after the primary begins playing;
- both video elements remain inside their expected bounds;
- no media or console errors appear.

- [ ] **Step 4: Test mobile load**

Reload at 390x844. Confirm:

- primary video plays inline and fills the hero;
- secondary card is hidden and its MP4 is not requested;
- hero copy, buttons, and navigation do not overlap.

- [ ] **Step 5: Review final diff and repository state**

Run:

```powershell
git status --short
git log -4 --oneline
```

Expected: worktree clean after three implementation commits; recent history contains media optimization, loading priority, and cache policy commits.
