import { siteInfo } from "./site";

export type ResourceCard = {
  title: string;
  description: string;
  action: string;
  href: string;
};

export const resourceCards: ResourceCard[] = [
  {
    title: "产品手册",
    description: "查看直驱电机产品系列、参数表和尺寸图。",
    action: "下载手册",
    href: siteInfo.manualHref,
  },
  {
    title: "选型指南",
    description: "根据推力、行程、负载、速度和安装空间初步筛选产品。",
    action: "获取选型建议",
    href: "/resources#selection-form",
  },
  {
    title: "尺寸图 / CAD",
    description: "获取对应产品尺寸图和结构集成资料。",
    action: "申请图纸",
    href: "/resources#drawing-request",
  },
  {
    title: "技术咨询",
    description: "由工程人员协助确认型号和定制方案。",
    action: "联系工程师",
    href: "/contact",
  },
];

export const industryOptions = [
  "半导体检测",
  "IC / LED 固晶",
  "精密贴合",
  "高速自动化",
  "精密检测与测量",
  "电子制造设备",
  "其他设备场景",
];

export const productTypeOptions = [
  "IZU 系列无铁芯直线电机",
  "DB 专用无铁芯直线电机",
  "WB 专用高加速电机",
  "DDR 系列直驱旋转电机",
  "IZU7 管型直线电机",
  "定制平台系列",
  "需要工程师协助判断",
];

export const demandTypeOptions = ["选型咨询", "图纸 / CAD 申请", "定制平台需求", "产品手册", "其他技术问题"];
