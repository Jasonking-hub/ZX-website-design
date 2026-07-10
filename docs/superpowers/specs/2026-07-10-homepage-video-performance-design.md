# Homepage Video Performance Design

## Goal

Make the homepage feel video-first on a cold visit while preserving the approved two-video hero layout. The page must show a matching video frame immediately and start the background video as soon as the connection permits.

## Current Root Cause

- The primary video is 63.5 MB and the secondary video is 82.8 MB.
- Both sources are 3840x2160, 120 fps HEVC files at roughly 100 Mbps.
- Each MP4 stores its `moov` metadata atom after `mdat`, delaying startup.
- Both autoplay videos compete for bandwidth during the initial visit.
- Netlify currently serves the files with `Cache-Control: public,max-age=0,must-revalidate`.

The static image seen during loading is the poster fallback. It remains visible until the browser has fetched and decoded enough video data.

## Approved Design

### Optimized Media

Create deployment copies from the untouched source files in `material/`:

- H.264/AVC in MP4
- 1920x1080
- 30 fps
- `yuv420p` pixel format
- no audio track
- MP4 Fast Start, with `moov` before `mdat`
- no more than 4 MB per video

Use versioned public filenames so long-lived browser caching is safe. Extract an optimized poster from the first visible frame of each deployment video. Each poster must remain below 150 KB.

### Loading Order

1. Server-render all hero text, controls, layout, and posters.
2. Mount the primary background video immediately with `autoplay`, `muted`, `playsinline`, `loop`, and `preload="auto"`.
3. Keep the secondary video source out of the initial HTML request path.
4. Mount the secondary video only after the primary video fires `playing`.
5. Keep each poster behind its video so a failed or blocked autoplay still leaves a complete hero.

Only the media layer needs client-side state. The hero content remains server-rendered.

### Caching

Add Netlify headers for the versioned hero videos and posters:

```text
Cache-Control: public, max-age=31536000, immutable
```

Future media replacements must use a new versioned filename.

## Failure Behavior

- If the primary video cannot play, its matching poster remains visible.
- If the secondary video cannot play, the right-hand poster remains visible.
- Video errors must not hide hero text, links, or navigation.
- H.264 is the only video format required for this change; no external video service is introduced.

## Verification

Automated checks must fail before implementation and pass afterward:

- each deployment video exists and is at most 4 MB;
- each deployment video contains `avc1` and has `moov` before `mdat`;
- each deployment poster exists and is at most 150 KB;
- TypeScript checks and the production build pass.

Browser checks on desktop and mobile viewports must confirm:

- hero layout and calls to action remain unchanged;
- the poster is visible immediately;
- the primary video autoplays muted and inline;
- only the primary video is requested before it starts playing;
- the secondary video loads and plays after the primary starts;
- no media or console errors appear.

## Non-Goals

- Redesigning the hero or changing its copy
- Adding controls or audio
- Introducing HLS, a video CDN, or a third-party player
- Editing the raw source files in `material/`
