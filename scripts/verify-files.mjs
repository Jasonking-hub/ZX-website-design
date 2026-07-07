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
];

const missing = requiredFiles.filter((file) => !existsSync(file));

if (missing.length > 0) {
  console.error(`Missing required files:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

console.log(`verify-files: ${requiredFiles.length} files present`);
