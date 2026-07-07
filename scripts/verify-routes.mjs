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
  if (missingRoutes.length > 0) {
    console.error(`Missing routes:\n${missingRoutes.map((file) => `- ${file}`).join("\n")}`);
  }
  if (missingSlugs.length > 0) {
    console.error(`Missing product slugs:\n${missingSlugs.map((slug) => `- ${slug}`).join("\n")}`);
  }
  process.exit(1);
}

console.log(`verify-routes: ${routeFiles.length} route files and ${requiredSlugs.length} product slugs present`);
