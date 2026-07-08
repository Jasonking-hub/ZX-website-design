import { existsSync, readFileSync } from "node:fs";

const files = ["data/site.ts", "data/products.ts", "data/industries.ts", "data/resources.ts"];
const missingFiles = files.filter((file) => !existsSync(file));

if (missingFiles.length > 0) {
  console.error(`Missing content files:\n${missingFiles.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

const text = files.map((file) => readFileSync(file, "utf8")).join("\n");

const required = [
  "深圳中欣自动化科技有限公司",
  "15973130940",
  "21711708@qq.com",
  "深圳市光明区马田街道新庄社区将富路10号C栋701",
  "IZU 系列无铁芯直线电机",
  "DB 专用无铁芯直线电机",
  "WB 专用高加速电机",
  "DDR 系列直驱旋转电机",
  "IZU7 管型直线电机",
  "定制平台系列",
  "请参考产品手册或联系工程师获取完整参数。",
  "以上数据根据公司产品手册整理，具体参数以正式规格书和双方确认方案为准。",
];

const forbidden = [
  "世界第一",
  "行业第一",
  "绝对领先",
  "唯一",
  "打破国外垄断",
  "完全替代进口",
  "纳米级精度",
  "全球服务网络",
];

const missing = required.filter((item) => !text.includes(item));
const violations = forbidden.filter((item) => text.includes(item));

if (missing.length > 0 || violations.length > 0) {
  if (missing.length > 0) {
    console.error(`Missing required content:\n${missing.map((item) => `- ${item}`).join("\n")}`);
  }
  if (violations.length > 0) {
    console.error(`Forbidden claims found:\n${violations.map((item) => `- ${item}`).join("\n")}`);
  }
  process.exit(1);
}

console.log("verify-content: brochure-backed content present and forbidden claims absent");
