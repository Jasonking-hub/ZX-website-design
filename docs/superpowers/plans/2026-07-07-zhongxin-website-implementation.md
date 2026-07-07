# Zhongxin Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Simplified Chinese Next.js website for 深圳中欣自动化科技有限公司 based on the approved “精密蓝图” design spec and brochure-backed content.

**Architecture:** Use a data-first Next.js App Router site: brochure-backed content lives in `data/`, shared UI lives in focused `components/`, and each `app/` route composes those pieces. Client-only behavior is isolated to small components for navigation, motion, filtering, counters, and forms; core content stays server-rendered for clarity, SEO, and maintainability.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, Framer Motion, Node verification scripts, browser visual QA.

## Global Constraints

- 全站只做中文简体，不做中英文切换。
- 技术栈必须包含 Next.js 14 或以上、TypeScript、Tailwind CSS、Framer Motion。
- 视觉方向使用 A「精密蓝图」：深蓝、工业蓝、白色、浅灰、电光蓝，克制专业，工程感强。
- 内容必须以宣传册为依据；无法确认的数据不编造，显示“请参考产品手册或联系工程师获取完整参数。”。
- 必须覆盖页面：`/`、`/products`、`/products/izu`、`/products/db`、`/products/wb`、`/products/ddr`、`/products/izu7`、`/products/custom-stage`、`/industries`、`/capabilities`、`/resources`、`/about`、`/contact`。
- 联系信息必须使用宣传册信息：地址“深圳市宝安区沙井街道新桥第二工业区白沙路39号二楼”、电话“15973130940”、邮箱“21711708@qq.com”。
- 首页 SEO title 必须为“深圳中欣自动化科技有限公司｜直驱电机与精密运动平台”。
- 首页 SEO description 必须为“深圳中欣自动化科技有限公司专注直驱电机、无铁芯直线电机、DDR 直驱旋转电机、管型直线电机和定制高精度平台，为半导体检测、固晶、精密贴合和高速自动化设备提供高性能运动解决方案。”。
- 表单只做前端校验与提交成功演示，不接真实后端。
- 不复制 Aerotech 中国站代码、图片、商标、文案、字体文件或具体视觉元素。
- 本会话未获用户明确要求时不启动子代理；若用户仅说“继续”，执行方式为 Inline Execution。

---

## File Structure

### Project setup

- Create `package.json` — npm scripts and dependencies.
- Create `tsconfig.json` — strict TypeScript configuration compatible with Next.js.
- Create `next-env.d.ts` — Next.js generated type reference.
- Create `next.config.mjs` — Next.js config.
- Create `postcss.config.mjs` — Tailwind PostCSS config.
- Create `tailwind.config.ts` — design tokens and content paths.
- Create `app/globals.css` — base CSS, Tailwind layers, blueprint grid utilities, focus state, table scrolling.
- Create `app/layout.tsx` — root metadata, shared header/footer shell.
- Create `app/not-found.tsx` — Chinese 404 page.

### Verification scripts

- Create `scripts/verify-files.mjs` — required file existence checks.
- Create `scripts/verify-content.mjs` — required Chinese content and forbidden-claim checks.
- Create `scripts/verify-routes.mjs` — route file and product slug checks.
- Create `scripts/verify-assets.mjs` — generated public asset checks.
- Create `scripts/verify-form-validation.ts` — pure form validation checks via `tsx`.

### Data and library files

- Create `data/site.ts` — company info, navigation, SEO, stats, CTAs.
- Create `data/products.ts` — product model, six product entries, parameter fallback rule, source notes.
- Create `data/industries.ts` — six industry scenarios, pain points, matching solutions.
- Create `data/resources.ts` — resource cards and selection form option data.
- Create `lib/cn.ts` — class name join helper.
- Create `lib/form-validation.ts` — reusable pure validation for contact and resource forms.

### Components

- Create `components/site-header.tsx` — fixed responsive navigation.
- Create `components/site-footer.tsx` — footer navigation and contact info.
- Create `components/section.tsx` — consistent section spacing and headings.
- Create `components/motion-reveal.tsx` — Framer Motion scroll reveal.
- Create `components/animated-number.tsx` — Framer Motion count-up.
- Create `components/hero-visual.tsx` — product/blueprint hero composition.
- Create `components/product-card.tsx` — product overview card.
- Create `components/product-filter.tsx` — client-side category filter.
- Create `components/spec-table.tsx` — mobile-scrollable parameter table.
- Create `components/industry-card.tsx` — industry pain/solution card.
- Create `components/inquiry-form.tsx` — shared client form with validation and success demo.
- Create `components/cta-band.tsx` — final conversion CTA.
- Create `components/resource-card.tsx` — resource center card.

### Pages

- Create `app/page.tsx` — homepage.
- Create `app/products/page.tsx` — product center with filter.
- Create `app/products/[slug]/page.tsx` — product detail template and `generateStaticParams`.
- Create `app/industries/page.tsx` — industry applications.
- Create `app/capabilities/page.tsx` — customization capabilities.
- Create `app/resources/page.tsx` — resources, manual download, selection form.
- Create `app/about/page.tsx` — company profile.
- Create `app/contact/page.tsx` — contact info, QR image, contact form.

### Assets

- Create `scripts/prepare-assets.py` — copy/crop brochure-derived images into `public/`.
- Create `public/images/products/` — six product images.
- Create `public/images/drawings/` — brochure dimension screenshots.
- Create `public/images/contact/qr-code.png` — brochure QR crop or clearly labeled visual placeholder.
- Create `public/images/brand/hero-composite.jpg` — homepage visual.
- Create `public/downloads/zhongxin-direct-drive-product-manual.pdf` — brochure download.

---

### Task 1: Scaffold Next.js project shell

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/not-found.tsx`
- Create: `lib/cn.ts`
- Create: `scripts/verify-files.mjs`

**Interfaces:**
- Produces: `cn(...classes: Array<string | false | null | undefined>): string`
- Produces: npm scripts `dev`, `build`, `start`, `lint`, `typecheck`, `verify:files`
- Consumes: approved design tokens from `docs/superpowers/specs/2026-07-07-zhongxin-website-design.md`

- [ ] **Step 1: Create the failing file-existence verification**

Create `scripts/verify-files.mjs`:

```js
import { existsSync } from "node:fs";

const requiredFiles = [
  "package.json",
  "tsconfig.json",
  "next.config.mjs",
  "postcss.config.mjs",
  "tailwind.config.ts",
  "app/globals.css",
  "app/layout.tsx",
  "app/not-found.tsx",
  "lib/cn.ts",
];

const missing = requiredFiles.filter((file) => !existsSync(file));

if (missing.length > 0) {
  console.error(`Missing required files:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

console.log(`verify-files: ${requiredFiles.length} files present`);
```

- [ ] **Step 2: Run verification and confirm it fails before scaffold exists**

Run: `node scripts/verify-files.mjs`

Expected: FAIL listing at least `package.json`, `app/layout.tsx`, and `tailwind.config.ts`.

- [ ] **Step 3: Create minimal project files**

Create `package.json` with these scripts and dependency families:

```json
{
  "name": "zhongxin-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "verify:files": "node scripts/verify-files.mjs",
    "verify:content": "node scripts/verify-content.mjs",
    "verify:routes": "node scripts/verify-routes.mjs",
    "verify:assets": "node scripts/verify-assets.mjs",
    "verify:forms": "tsx scripts/verify-form-validation.ts",
    "verify": "npm run typecheck && npm run verify:files && npm run verify:content && npm run verify:routes && npm run verify:assets && npm run verify:forms"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "tsx": "^4.16.0",
    "typescript": "^5.5.0"
  }
}
```

Create `tailwind.config.ts` with color tokens:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071A2F",
        industrial: "#086ACB",
        electric: "#24A8F4",
        blueprint: "#EDF3F7",
        ink: "#263341",
      },
      boxShadow: {
        blueprint: "0 24px 80px rgba(7, 26, 47, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
```

Create `lib/cn.ts`:

```ts
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
```

Create `app/layout.tsx` as a root shell that imports `./globals.css`, sets `lang="zh-CN"`, and renders `children`.

Create `app/globals.css` with Tailwind layers, system Chinese font stack, blueprint grid utility, visible focus ring, smooth scroll, and reduced-motion override.

- [ ] **Step 4: Install dependencies**

Run: `npm install`

Expected: PASS and create `package-lock.json`. If network or registry access fails, rerun with approved escalation for dependency download.

- [ ] **Step 5: Verify scaffold**

Run: `npm run verify:files`

Expected: PASS with `verify-files: 9 files present`.

Run: `npm run typecheck`

Expected: PASS with no TypeScript errors.

- [ ] **Step 6: Commit scaffold**

Run:

```bash
git add package.json package-lock.json tsconfig.json next-env.d.ts next.config.mjs postcss.config.mjs tailwind.config.ts app/globals.css app/layout.tsx app/not-found.tsx lib/cn.ts scripts/verify-files.mjs
git commit -m "chore: scaffold next website"
```

---

### Task 2: Prepare brochure-derived assets

**Files:**
- Create: `scripts/prepare-assets.py`
- Create: `scripts/verify-assets.mjs`
- Create: `public/images/products/izu.jpg`
- Create: `public/images/products/db.jpg`
- Create: `public/images/products/wb.jpg`
- Create: `public/images/products/ddr.jpg`
- Create: `public/images/products/izu7.jpg`
- Create: `public/images/products/custom-stage.jpg`
- Create: `public/images/drawings/izu-drawing.jpg`
- Create: `public/images/drawings/db-drawing.jpg`
- Create: `public/images/drawings/wb-drawing.jpg`
- Create: `public/images/drawings/ddr-drawing.jpg`
- Create: `public/images/drawings/izu7-drawing.jpg`
- Create: `public/images/drawings/custom-stage-drawing.jpg`
- Create: `public/images/contact/qr-code.png`
- Create: `public/images/brand/hero-composite.jpg`
- Create: `public/downloads/zhongxin-direct-drive-product-manual.pdf`

**Interfaces:**
- Consumes: brochure PDF at `C:\Users\Administrator\OneDrive\Desktop\扫描全能王 2026-07-06 10.56.pdf`
- Consumes: rendered pages under `tmp/pdfs/` when available
- Produces: stable public asset paths consumed by `data/products.ts` and page components

- [ ] **Step 1: Create the failing asset verification**

Create `scripts/verify-assets.mjs`:

```js
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
  "public/downloads/zhongxin-direct-drive-product-manual.pdf",
];

const missing = assets.filter((file) => !existsSync(file));
const tiny = assets.filter((file) => existsSync(file) && statSync(file).size < 4096);

if (missing.length > 0 || tiny.length > 0) {
  if (missing.length > 0) console.error(`Missing assets:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  if (tiny.length > 0) console.error(`Suspiciously small assets:\n${tiny.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

console.log(`verify-assets: ${assets.length} assets present`);
```

- [ ] **Step 2: Run asset verification and confirm it fails**

Run: `npm run verify:assets`

Expected: FAIL listing missing public images and PDF.

- [ ] **Step 3: Create asset preparation script**

Create `scripts/prepare-assets.py` that:

1. Creates `public/images/products`, `public/images/drawings`, `public/images/contact`, `public/images/brand`, and `public/downloads`.
2. Copies the brochure PDF to `public/downloads/zhongxin-direct-drive-product-manual.pdf`.
3. Uses existing `tmp/pdfs/brochure-*.png` page renders when present.
4. Crops or full-frame exports these source pages into stable website assets:
   - IZU from page 4;
   - DB from page 10;
   - WB from page 15;
   - DDR from page 20 or the clearest DDR page;
   - IZU7 from page 24 or the clearest IZU7 page;
   - custom platform from page 26;
   - QR from page 28.
5. Creates `hero-composite.jpg` from the cleanest available product/source page combination.

The script must fail with a readable message if neither the PDF copy nor rendered page images are accessible.

- [ ] **Step 4: Generate assets**

Run: `python scripts/prepare-assets.py`

Expected: PASS and print each generated target path.

- [ ] **Step 5: Verify assets**

Run: `npm run verify:assets`

Expected: PASS with `verify-assets: 15 assets present`.

- [ ] **Step 6: Visual spot-check key assets**

Inspect:

```text
public/images/products/izu.jpg
public/images/products/ddr.jpg
public/images/products/custom-stage.jpg
public/images/contact/qr-code.png
```

Expected:

- Product images visibly correspond to the named product series.
- QR image is square-ish and readable enough for a web placeholder.
- No screenshot includes private desktop UI.

- [ ] **Step 7: Commit assets**

Run:

```bash
git add scripts/prepare-assets.py scripts/verify-assets.mjs public/images public/downloads
git commit -m "feat: add brochure-derived website assets"
```

---

### Task 3: Add brochure-backed data model and content verification

**Files:**
- Create: `data/site.ts`
- Create: `data/products.ts`
- Create: `data/industries.ts`
- Create: `data/resources.ts`
- Create: `scripts/verify-content.mjs`

**Interfaces:**
- Produces: `siteInfo`, `navigation`, `homeStats`, `seo`
- Produces: `products`, `getProductBySlug(slug: string)`, `productSlugs`
- Produces: `industries`
- Produces: `resourceCards`, `industryOptions`, `productTypeOptions`
- Consumes: public asset paths from Task 2

- [ ] **Step 1: Create failing content verification**

Create `scripts/verify-content.mjs`:

```js
import { readFileSync } from "node:fs";

const files = ["data/site.ts", "data/products.ts", "data/industries.ts", "data/resources.ts"];
const text = files.map((file) => readFileSync(file, "utf8")).join("\n");

const required = [
  "深圳中欣自动化科技有限公司",
  "15973130940",
  "21711708@qq.com",
  "深圳市宝安区沙井街道新桥第二工业区白沙路39号二楼",
  "IZU 系列无铁芯直线电机",
  "DB 专用无铁芯直线电机",
  "WB 专用高加速电机",
  "DDR 系列直驱旋转电机",
  "IZU7 管型直线电机",
  "定制平台系列",
  "请参考产品手册或联系工程师获取完整参数。",
  "以上数据根据公司产品手册整理，具体参数以正式规格书和双方确认方案为准。",
];

const forbidden = ["世界第一", "行业第一", "绝对领先", "唯一", "打破国外垄断", "完全替代进口", "纳米级精度", "全球服务网络"];

const missing = required.filter((item) => !text.includes(item));
const violations = forbidden.filter((item) => text.includes(item));

if (missing.length > 0 || violations.length > 0) {
  if (missing.length > 0) console.error(`Missing required content:\n${missing.map((item) => `- ${item}`).join("\n")}`);
  if (violations.length > 0) console.error(`Forbidden claims found:\n${violations.map((item) => `- ${item}`).join("\n")}`);
  process.exit(1);
}

console.log("verify-content: brochure-backed content present and forbidden claims absent");
```

- [ ] **Step 2: Run content verification and confirm it fails before data files exist**

Run: `npm run verify:content`

Expected: FAIL because `data/site.ts` and related files are missing.

- [ ] **Step 3: Create data files**

Create `data/products.ts` with this TypeScript interface:

```ts
export type ProductSpecRow = {
  model: string;
  continuousForce: string;
  peakForce: string;
  motorConstant: string;
  resistance: string;
  inductance: string;
  mass: string;
  size: string;
  recommendedUse: string;
};

export type Product = {
  slug: "izu" | "db" | "wb" | "ddr" | "izu7" | "custom-stage";
  name: string;
  shortName: string;
  category: "standard" | "high-acceleration" | "rotary" | "tubular" | "custom";
  tagline: string;
  summary: string;
  image: string;
  drawing: string;
  features: string[];
  applications: string[];
  specs: ProductSpecRow[];
  sourceNote: string;
};
```

Each product must include at least one spec row. Unknown parameter cells use exactly:

```ts
const PARAMETER_FALLBACK = "请参考产品手册或联系工程师获取完整参数。";
```

Create `data/site.ts` with `siteInfo`, `navigation`, `homeStats`, and `seo.home` using the exact contact and SEO strings from Global Constraints.

Create `data/industries.ts` with six industry entries:

- 半导体检测
- IC / LED 固晶
- 精密贴合
- 高速自动化
- 精密检测与测量
- 电子制造设备

Create `data/resources.ts` with four resource cards and form option arrays.

- [ ] **Step 4: Verify content**

Run: `npm run verify:content`

Expected: PASS with `verify-content: brochure-backed content present and forbidden claims absent`.

- [ ] **Step 5: Type-check data**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit data**

Run:

```bash
git add data scripts/verify-content.mjs
git commit -m "feat: add brochure backed content data"
```

---

### Task 4: Build reusable UI components

**Files:**
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Create: `components/section.tsx`
- Create: `components/motion-reveal.tsx`
- Create: `components/animated-number.tsx`
- Create: `components/hero-visual.tsx`
- Create: `components/product-card.tsx`
- Create: `components/spec-table.tsx`
- Create: `components/industry-card.tsx`
- Create: `components/cta-band.tsx`
- Create: `components/resource-card.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `navigation`, `siteInfo` from `data/site.ts`
- Consumes: `Product` from `data/products.ts`
- Produces: server-safe presentational components except `site-header.tsx`, `motion-reveal.tsx`, and `animated-number.tsx`, which use `"use client"`

- [ ] **Step 1: Write component expectations into route-independent checks**

Append these component file paths to `requiredFiles` in `scripts/verify-files.mjs`:

```js
"components/site-header.tsx",
"components/site-footer.tsx",
"components/section.tsx",
"components/motion-reveal.tsx",
"components/animated-number.tsx",
"components/hero-visual.tsx",
"components/product-card.tsx",
"components/spec-table.tsx",
"components/industry-card.tsx",
"components/cta-band.tsx",
"components/resource-card.tsx",
```

- [ ] **Step 2: Run file verification and confirm it fails**

Run: `npm run verify:files`

Expected: FAIL listing missing component files.

- [ ] **Step 3: Implement components**

Implement:

- `SiteHeader` with fixed top navigation, active link styling, mobile hamburger, and CTA link to `/contact`.
- `SiteFooter` with product links, resource links, address, phone, email.
- `Section` with optional eyebrow, title, intro, and children.
- `MotionReveal` as a Framer Motion wrapper using `viewport={{ once: true, margin: "-80px" }}`.
- `AnimatedNumber` with reduced-motion-friendly count animation.
- `HeroVisual` using `public/images/brand/hero-composite.jpg` and blueprint line overlays.
- `ProductCard` consuming a `Product`.
- `SpecTable` with horizontal overflow and Chinese fallback cells.
- `IndustryCard` with pain point, solution, recommended products.
- `CtaBand` for final conversion blocks.
- `ResourceCard` for resource center actions.

Use the `cn()` helper for class merging and Tailwind tokens from Task 1.

- [ ] **Step 4: Wire header and footer into root layout**

Modify `app/layout.tsx` so every page renders:

```tsx
<body>
  <SiteHeader />
  <main>{children}</main>
  <SiteFooter />
</body>
```

Set the global metadata title and description from `seo.home`.

- [ ] **Step 5: Verify components**

Run: `npm run verify:files`

Expected: PASS and count includes the component files.

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit components**

Run:

```bash
git add app/layout.tsx components scripts/verify-files.mjs
git commit -m "feat: add shared website components"
```

---

### Task 5: Create all public routes

**Files:**
- Create: `scripts/verify-routes.mjs`
- Create: `app/page.tsx`
- Create: `app/products/page.tsx`
- Create: `app/products/[slug]/page.tsx`
- Create: `app/industries/page.tsx`
- Create: `app/capabilities/page.tsx`
- Create: `app/resources/page.tsx`
- Create: `app/about/page.tsx`
- Create: `app/contact/page.tsx`

**Interfaces:**
- Consumes: data files from Task 3
- Consumes: components from Task 4
- Produces: all required Chinese routes
- Produces: `generateStaticParams()` for product slugs

- [ ] **Step 1: Create failing route verification**

Create `scripts/verify-routes.mjs`:

```js
import { existsSync, readFileSync } from "node:fs";

const routeFiles = [
  "app/page.tsx",
  "app/products/page.tsx",
  "app/products/[slug]/page.tsx",
  "app/industries/page.tsx",
  "app/capabilities/page.tsx",
  "app/resources/page.tsx",
  "app/about/page.tsx",
  "app/contact/page.tsx",
];

const requiredSlugs = ['"izu"', '"db"', '"wb"', '"ddr"', '"izu7"', '"custom-stage"'];
const missingRoutes = routeFiles.filter((file) => !existsSync(file));
const productText = existsSync("data/products.ts") ? readFileSync("data/products.ts", "utf8") : "";
const missingSlugs = requiredSlugs.filter((slug) => !productText.includes(slug));

if (missingRoutes.length > 0 || missingSlugs.length > 0) {
  if (missingRoutes.length > 0) console.error(`Missing routes:\n${missingRoutes.map((file) => `- ${file}`).join("\n")}`);
  if (missingSlugs.length > 0) console.error(`Missing product slugs:\n${missingSlugs.map((slug) => `- ${slug}`).join("\n")}`);
  process.exit(1);
}

console.log(`verify-routes: ${routeFiles.length} route files and ${requiredSlugs.length} product slugs present`);
```

- [ ] **Step 2: Run route verification and confirm it fails**

Run: `npm run verify:routes`

Expected: FAIL listing missing route files.

- [ ] **Step 3: Implement homepage**

Create `app/page.tsx` with these sections in order:

1. Hero;
2. “您正在寻找什么？” quick-entry cards;
3. “专注直驱运动核心部件” company capability intro;
4. six-product overview;
5. six-industry overview;
6. data stats with product manual disclaimer;
7. resource cards;
8. final CTA.

Use `AnimatedNumber` for 2017, 60G, and 7800N display. Keep visible disclaimer below stats.

- [ ] **Step 4: Implement product center**

Create `app/products/page.tsx` using a `ProductFilter` component from Task 6, or render all product cards first and add the filter in Task 6. The page must show all six products and link to each detail page.

- [ ] **Step 5: Implement product details**

Create `app/products/[slug]/page.tsx`:

- `generateStaticParams()` returns all `productSlugs`.
- `generateMetadata()` uses product name and summary.
- Unknown slug calls `notFound()`.
- Page renders hero, features, applications, `SpecTable`, drawing image, and CTA buttons “申请 CAD 图纸” and “咨询安装尺寸”.

- [ ] **Step 6: Implement static content pages**

Create:

- `app/industries/page.tsx` using all six industries with pain/solution cards.
- `app/capabilities/page.tsx` with custom capability modules and process flow.
- `app/resources/page.tsx` with manual download card and form placeholder area.
- `app/about/page.tsx` with company intro, product direction, service capability, vision.
- `app/contact/page.tsx` with contact information and form placeholder area.

- [ ] **Step 7: Verify routes**

Run: `npm run verify:routes`

Expected: PASS with `verify-routes: 8 route files and 6 product slugs present`.

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 8: Commit routes**

Run:

```bash
git add app scripts/verify-routes.mjs
git commit -m "feat: add chinese website routes"
```

---

### Task 6: Add product filtering and form validation demo

**Files:**
- Create: `components/product-filter.tsx`
- Create: `components/inquiry-form.tsx`
- Create: `lib/form-validation.ts`
- Create: `scripts/verify-form-validation.ts`
- Modify: `app/products/page.tsx`
- Modify: `app/resources/page.tsx`
- Modify: `app/contact/page.tsx`

**Interfaces:**
- Produces: `validateContactForm(values: ContactFormValues): FormValidationResult`
- Produces: `validateSelectionForm(values: SelectionFormValues): FormValidationResult`
- Produces: `InquiryForm` client component with `variant: "contact" | "selection"`
- Produces: `ProductFilter` client component accepting `products: Product[]`

- [ ] **Step 1: Write failing validation checks**

Create `scripts/verify-form-validation.ts`:

```ts
import { validateContactForm, validateSelectionForm } from "../lib/form-validation";

const invalidContact = validateContactForm({
  name: "",
  company: "",
  phone: "123",
  email: "bad-email",
  demandType: "",
  industry: "",
  message: "",
});

if (!invalidContact.errors.name || !invalidContact.errors.phone || !invalidContact.errors.email || invalidContact.isValid) {
  throw new Error("Contact validation did not catch required, phone, and email errors");
}

const validContact = validateContactForm({
  name: "张工",
  company: "深圳测试设备有限公司",
  phone: "15973130940",
  email: "21711708@qq.com",
  demandType: "选型咨询",
  industry: "半导体检测",
  message: "负载 2kg，行程 300mm，需要确认直线电机型号。",
});

if (!validContact.isValid || Object.keys(validContact.errors).length !== 0) {
  throw new Error("Valid contact form should pass");
}

const invalidSelection = validateSelectionForm({
  name: "",
  company: "",
  phone: "",
  email: "bad-email",
  industry: "",
  load: "",
  stroke: "",
  speed: "",
  productType: "",
  message: "",
});

if (!invalidSelection.errors.load || !invalidSelection.errors.stroke || !invalidSelection.errors.productType || invalidSelection.isValid) {
  throw new Error("Selection validation did not catch engineering fields");
}

console.log("verify-forms: validation rules pass");
```

- [ ] **Step 2: Run form verification and confirm it fails**

Run: `npm run verify:forms`

Expected: FAIL because `lib/form-validation.ts` is missing.

- [ ] **Step 3: Implement pure validation**

Create `lib/form-validation.ts` with:

- `ContactFormValues`;
- `SelectionFormValues`;
- `FormValidationResult`;
- `validateContactForm`;
- `validateSelectionForm`;
- Chinese error messages;
- phone regex accepting Mainland China mobile numbers such as `15973130940`;
- email regex accepting `21711708@qq.com`.

- [ ] **Step 4: Verify pure validation**

Run: `npm run verify:forms`

Expected: PASS with `verify-forms: validation rules pass`.

- [ ] **Step 5: Implement product filter**

Create `components/product-filter.tsx` as a `"use client"` component:

- category tabs: 全部、标准直驱电机、高加速度、旋转直驱、管型电机、定制平台；
- default shows all products;
- click filters without navigation;
- keeps product cards accessible and keyboard clickable.

Modify `app/products/page.tsx` to use `ProductFilter`.

- [ ] **Step 6: Implement inquiry forms**

Create `components/inquiry-form.tsx` as a `"use client"` component:

- supports `variant="contact"` and `variant="selection"`;
- renders exact fields from the spec for each variant;
- uses pure validation from Step 3;
- shows field-level Chinese errors;
- on valid submit, prevents network request and shows success text:

```text
需求已记录演示，后续可接入真实提交接口。
```

Modify:

- `app/resources/page.tsx` to render `InquiryForm variant="selection"`;
- `app/contact/page.tsx` to render `InquiryForm variant="contact"`.

- [ ] **Step 7: Verify forms and routes**

Run: `npm run verify:forms`

Expected: PASS.

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 8: Commit interactivity**

Run:

```bash
git add components/product-filter.tsx components/inquiry-form.tsx lib/form-validation.ts scripts/verify-form-validation.ts app/products/page.tsx app/resources/page.tsx app/contact/page.tsx
git commit -m "feat: add filtering and form demo validation"
```

---

### Task 7: Polish SEO, responsive behavior, and motion

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/products/page.tsx`
- Modify: `app/products/[slug]/page.tsx`
- Modify: `app/industries/page.tsx`
- Modify: `app/capabilities/page.tsx`
- Modify: `app/resources/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/globals.css`
- Modify: `components/*`

**Interfaces:**
- Consumes: all prior routes/components
- Produces: finished “精密蓝图” visual language, page metadata, reduced-motion-safe animation, mobile readiness

- [ ] **Step 1: Add page-level metadata**

For every page, export `metadata` or `generateMetadata`:

- Home: exact title and description from Global Constraints.
- Products: “产品中心｜深圳中欣自动化科技有限公司”.
- Industries: “应用行业｜直驱运动解决方案”.
- Capabilities: “定制能力｜高加速度平台与直驱电机定制”.
- Resources: “资源中心｜产品手册与选型支持”.
- About: “关于中欣自动化｜直驱电机与精密运动平台”.
- Contact: “联系中欣自动化｜工程选型咨询”.

- [ ] **Step 2: Apply motion consistently**

Wrap major homepage and page sections in `MotionReveal`.

Rules:

- section fade distance no more than 24px;
- animation duration no more than 0.7s;
- card hover uses slight translate only;
- no particle effect, no 3D scene, no autoplay video.

- [ ] **Step 3: Complete responsive polish**

Check and adjust:

- header mobile menu opens/closes;
- hero stacks on mobile;
- product grid uses 1/2/3 column breakpoints;
- stats stay readable on mobile;
- parameter tables scroll horizontally;
- form fields stack on mobile and become two columns on desktop.

- [ ] **Step 4: Verify source rules**

Run: `npm run verify:content`

Expected: PASS, especially forbidden claim scan.

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 5: Build**

Run: `npm run build`

Expected: PASS. The output should include static generation for product detail pages.

- [ ] **Step 6: Commit polish**

Run:

```bash
git add app components data app/globals.css
git commit -m "feat: polish industrial blueprint website"
```

---

### Task 8: Final browser QA and completion evidence

**Files:**
- Modify only if browser QA finds concrete issues in existing files.

**Interfaces:**
- Consumes: completed site from Tasks 1-7
- Produces: verified local website ready for user review

- [ ] **Step 1: Run full local verification**

Run: `npm run verify`

Expected: PASS for typecheck, files, content, routes, assets, and forms.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 2: Start dev server**

Run: `npm run dev`

Expected: local URL printed by Next.js, usually `http://localhost:3000`.

- [ ] **Step 3: Browser check required routes**

Open:

- `/`
- `/products`
- `/products/izu`
- `/products/db`
- `/products/wb`
- `/products/ddr`
- `/products/izu7`
- `/products/custom-stage`
- `/industries`
- `/capabilities`
- `/resources`
- `/about`
- `/contact`

Expected:

- each page loads without console-breaking errors;
- no English language toggle appears;
- all navigation labels are Simplified Chinese;
- product details show fallback text for unknown parameters;
- contact page shows exact phone, email, and address.

- [ ] **Step 4: Browser check interactions**

Check:

- mobile hamburger opens and closes;
- product filter changes visible product cards;
- contact form shows errors on empty submit;
- contact form shows success demo text on valid submit;
- resource selection form shows errors on empty submit;
- resource selection form shows success demo text on valid submit;
- parameter table scrolls horizontally on narrow viewport.

- [ ] **Step 5: Browser visual check**

Use desktop and mobile widths.

Expected:

- visual direction reads as “精密蓝图”;
- hero product visual is clean;
- no cheap gradients, cartoon icon clutter, particle effects, or red/gold theme;
- CTAs are visible but not noisy;
- page rhythm moves from brand positioning to products, industries, resources, and contact.

- [ ] **Step 6: Fix any QA issue with one focused commit**

If QA finds issues, modify only the relevant file, rerun the failing check, then run:

```bash
git add <changed-files>
git commit -m "fix: resolve website qa issues"
```

- [ ] **Step 7: Final handoff**

Report:

- local dev URL;
- verification commands and results;
- key files created;
- any known asset-quality caveat, if a brochure crop is visibly low-resolution;
- next recommended step for real deployment or backend form integration.

---

## Self-Review

### Spec coverage

- Required pages: covered by Task 5.
- Required product families: covered by Task 3 and Task 5.
- Contact information: covered by Task 3, Task 5, and Task 8.
- Brochure-backed content rule: covered by Task 3 verification and Task 7 forbidden-claim scan.
- Frontend validation and success demo: covered by Task 6.
- “精密蓝图” visual direction: covered by Task 1 design tokens, Task 4 components, Task 7 polish, Task 8 visual QA.
- Product filtering: covered by Task 6.
- Motion and reduced-motion restraint: covered by Task 4 and Task 7.
- Responsive navigation and tables: covered by Task 4, Task 7, Task 8.
- SEO: covered by Task 5 and Task 7.
- Asset extraction and download file: covered by Task 2.

### Placeholder scan

This plan avoids undefined implementation markers and uses exact route paths, data interfaces, contact strings, SEO strings, validation messages, commands, and expected outcomes.

### Type consistency

- Product slugs are consistently `"izu" | "db" | "wb" | "ddr" | "izu7" | "custom-stage"`.
- Product categories are consistently `"standard" | "high-acceleration" | "rotary" | "tubular" | "custom"`.
- Form validation exports are consistently `validateContactForm`, `validateSelectionForm`, `ContactFormValues`, `SelectionFormValues`, and `FormValidationResult`.
- Public asset paths in Task 2 are the paths consumed by Task 3 data.

## Execution Handoff

Plan complete. Because current developer instruction says not to spawn sub-agents unless the user explicitly asks, the default execution path after this plan is Inline Execution with `superpowers:executing-plans`.

If the user explicitly requests parallel/subagent execution, use `superpowers:subagent-driven-development` instead.
