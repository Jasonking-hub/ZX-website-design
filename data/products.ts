export const PARAMETER_FALLBACK = "请参考产品手册或联系工程师获取完整参数。";

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

export const products: Product[] = [
  {
    slug: "izu",
    name: "IZU 系列无铁芯直线电机",
    shortName: "IZU 无铁芯",
    category: "standard",
    tagline: "适用于高平稳性、高响应直线运动场景的无铁芯直驱电机系列。",
    summary: "适用于半导体检测、轻负载运动、精密贴合和高加速度运动场景。",
    image: "/images/products/izu.jpg",
    drawing: "/images/drawings/izu-drawing.jpg",
    features: ["零磁阻力，运行平稳，易于控制", "高推力尺寸比", "高刚度，宽泛速度调节范围，无磨损免维护", "速度波动小，易于轨迹控制", "超薄尺寸，宣传册标注厚度 12.6mm"],
    applications: ["半导体检测行业", "轻负载", "高加速度，大于 5G 场景", "高精密贴合设备"],
    specs: [
      {
        model: "IZU1 / IZU2 / IZU3 / IZU4",
        continuousForce: PARAMETER_FALLBACK,
        peakForce: PARAMETER_FALLBACK,
        motorConstant: PARAMETER_FALLBACK,
        resistance: PARAMETER_FALLBACK,
        inductance: PARAMETER_FALLBACK,
        mass: PARAMETER_FALLBACK,
        size: "宣传册含对应尺寸图，完整尺寸请参考产品手册。",
        recommendedUse: "半导体检测、轻负载、高平稳性直线运动",
      },
    ],
    sourceNote: "依据产品手册第 03 至 08 页整理。",
  },
  {
    slug: "db",
    name: "DB 专用无铁芯直线电机",
    shortName: "DB 专用无铁芯",
    category: "high-acceleration",
    tagline: "面向半导体封装与高速精密节拍设备的专用无铁芯直线电机。",
    summary: "适合半导体封装制造设备、轻负载、高加速度和高精密贴合设备。",
    image: "/images/products/db.jpg",
    drawing: "/images/drawings/db-drawing.jpg",
    features: ["零磁阻力，运行平稳，易于控制", "采用纤维材料，运动部分质量轻", "宣传册标注高推力重量比可达 2000", "材料刚性强，宽泛速度调节范围，无磨损免维护", "速度波动小，易于轨迹控制"],
    applications: ["半导体封装制造设备", "轻负载", "高加速度，大于 15G 场景", "高精密贴合设备", "IC / LED 相关设备"],
    specs: [
      {
        model: "DB 专用系列",
        continuousForce: PARAMETER_FALLBACK,
        peakForce: PARAMETER_FALLBACK,
        motorConstant: PARAMETER_FALLBACK,
        resistance: PARAMETER_FALLBACK,
        inductance: PARAMETER_FALLBACK,
        mass: "宣传册标注运动部分质量轻，完整质量请参考产品手册。",
        size: "宣传册含对应尺寸图，完整尺寸请参考产品手册。",
        recommendedUse: "半导体封装、固晶、共晶和高节拍贴合设备",
      },
    ],
    sourceNote: "依据产品手册第 09 至 13 页整理，宣传册页面可见 UPH > 19K 信息。",
  },
  {
    slug: "wb",
    name: "WB 专用高加速电机",
    shortName: "WB 高加速",
    category: "high-acceleration",
    tagline: "面向高动态响应、高加速度运动场景的专用电机系列。",
    summary: "宣传册中包含 IZU6 系列 X / Y 电机及碳纤维系列，适合高速自动化设备。",
    image: "/images/products/wb.jpg",
    drawing: "/images/drawings/wb-drawing.jpg",
    features: ["高加速度", "高动态响应", "支持 X / Y 轴方案", "适合高速自动化设备"],
    applications: ["高速自动化", "高动态响应运动轴", "高速固晶", "精密贴合"],
    specs: [
      {
        model: "IZU6-75-NC-0000",
        continuousForce: "660N",
        peakForce: "2640N",
        motorConstant: "43.3 N/√W",
        resistance: "1.4Ω",
        inductance: "9.9mH(L-L)",
        mass: "动子 1.3kg / 定子 7.2kg",
        size: "行程 75mm，完整安装尺寸请参考产品手册。",
        recommendedUse: "高加速度 X 轴运动、高动态响应设备",
      },
    ],
    sourceNote: "依据产品手册第 14 至 17 页整理。",
  },
  {
    slug: "ddr",
    name: "DDR 系列直驱旋转电机",
    shortName: "DDR 直驱旋转",
    category: "rotary",
    tagline: "用于直接驱动旋转定位和精密分度的直驱旋转电机系列。",
    summary: "提供有框和无框系列，可用于旋转平台、分度机构和检测设备。",
    image: "/images/products/ddr.jpg",
    drawing: "/images/drawings/ddr-drawing.jpg",
    features: ["直接驱动", "结构紧凑", "有框 / 无框可选", "适合旋转定位和精密分度"],
    applications: ["旋转平台", "精密分度", "检测设备", "电子制造设备"],
    specs: [
      {
        model: "DDR-03-D112-H65-T0",
        continuousForce: "连续转矩 3Nm",
        peakForce: "峰值转矩 9Nm",
        motorConstant: "1.2 Nm/Arms",
        resistance: "6.3Ω",
        inductance: "7.4mH",
        mass: "电机重量 3.9kg / 转子重量 1.4kg",
        size: "D112 / H65，完整安装尺寸请参考产品手册。",
        recommendedUse: "旋转定位、精密分度、检测设备",
      },
    ],
    sourceNote: "依据产品手册第 18 至 22 页整理。",
  },
  {
    slug: "izu7",
    name: "IZU7 管型直线电机",
    shortName: "IZU7 管型",
    category: "tubular",
    tagline: "适用于紧凑型直线运动轴的小型管型直线电机。",
    summary: "包括 D16 和 D20 管型直线电机，适合小型自动化模组和紧凑空间集成。",
    image: "/images/products/izu7.jpg",
    drawing: "/images/drawings/izu7-drawing.jpg",
    features: ["管型结构", "体积紧凑", "适合小型自动化模组", "易于集成"],
    applications: ["紧凑型直线运动轴", "小型自动化模组", "电子制造设备", "轻负载快速运动"],
    specs: [
      {
        model: "IZU7-D16-40",
        continuousForce: "10N",
        peakForce: "40N",
        motorConstant: "3.7 N/√W",
        resistance: "1.7Ω",
        inductance: "0.6mH",
        mass: PARAMETER_FALLBACK,
        size: "A 40mm / B 30mm / C 17mm / D 32mm / E 20mm",
        recommendedUse: "紧凑型直线轴、小行程轻负载运动",
      },
      {
        model: "IZU7-D16-58",
        continuousForce: "15N",
        peakForce: "60N",
        motorConstant: "4.6 N/√W",
        resistance: "2.6Ω",
        inductance: "0.6mH",
        mass: PARAMETER_FALLBACK,
        size: "A 58mm / B 30mm / C 17mm / D 32mm / E 20mm",
        recommendedUse: "紧凑型直线轴、小行程轻负载运动",
      },
    ],
    sourceNote: "依据产品手册第 23 至 24 页整理。",
  },
  {
    slug: "custom-stage",
    name: "定制平台系列",
    shortName: "定制平台",
    category: "custom",
    tagline: "根据客户设备结构和运动指标定制的高精度运动平台。",
    summary: "面向高端高速装备，可围绕结构、行程、负载、推力和加速度进行平台定制。",
    image: "/images/products/custom-stage.jpg",
    drawing: "/images/drawings/custom-stage-drawing.jpg",
    features: ["支持定制结构", "宣传册标注最高加速度 60G", "宣传册标注峰值推力达 7800N", "宣传册标注动子重量 2.3kg", "宣传册标注加速度跟随曲线误差 < 1%"],
    applications: ["高端高速装备", "高加速度平台", "定制运动平台", "高速自动化设备"],
    specs: [
      {
        model: "定制高加速度平台",
        continuousForce: PARAMETER_FALLBACK,
        peakForce: "7800N",
        motorConstant: PARAMETER_FALLBACK,
        resistance: PARAMETER_FALLBACK,
        inductance: PARAMETER_FALLBACK,
        mass: "动子重量 2.3kg",
        size: "根据客户设备空间与安装接口定制。",
        recommendedUse: "高加速度、高推力、高动态响应定制平台",
      },
    ],
    sourceNote: "依据产品手册第 25 至 26 页整理。",
  },
];

export const productSlugs = products.map((product) => product.slug);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export const productCategories = [
  { label: "全部", value: "all" },
  { label: "标准直驱电机", value: "standard" },
  { label: "高加速度", value: "high-acceleration" },
  { label: "旋转直驱", value: "rotary" },
  { label: "管型电机", value: "tubular" },
  { label: "定制平台", value: "custom" },
] as const;
