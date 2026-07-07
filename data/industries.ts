export type Industry = {
  title: string;
  painPoint: string;
  solution: string;
  recommendedProducts: string[];
  href: string;
};

export const industries: Industry[] = [
  {
    title: "半导体检测",
    painPoint: "高精度定位、高速度扫描和稳定重复运动对运动轴提出更高要求。",
    solution: "通过无铁芯直线电机和定制平台提升运动平稳性、响应速度与长期运行稳定性。",
    recommendedProducts: ["IZU 系列无铁芯直线电机", "定制平台系列"],
    href: "/industries#semiconductor-test",
  },
  {
    title: "IC / LED 固晶",
    painPoint: "设备节拍快、重复定位要求高，长时间运行需要稳定的运动核心部件。",
    solution: "使用专用无铁芯直线电机和高加速运动方案，匹配高速固晶设备的节拍需求。",
    recommendedProducts: ["DB 专用无铁芯直线电机", "WB 专用高加速电机"],
    href: "/industries#ic-led-bonding",
  },
  {
    title: "精密贴合",
    painPoint: "低速平稳性、速度波动和定位稳定性会直接影响贴合质量。",
    solution: "通过无铁芯直线电机实现更平稳的直线运动，并结合工程选型确认推力与行程。",
    recommendedProducts: ["IZU 系列无铁芯直线电机", "DB 专用无铁芯直线电机"],
    href: "/industries#precision-lamination",
  },
  {
    title: "高速自动化",
    painPoint: "高节拍设备需要更高加速度、更短稳定时间和更可靠的运动响应。",
    solution: "通过 WB 高加速电机与定制平台满足高动态响应运动需求。",
    recommendedProducts: ["WB 专用高加速电机", "定制平台系列"],
    href: "/industries#high-speed-automation",
  },
  {
    title: "精密检测与测量",
    painPoint: "运动平稳性、低振动和重复定位稳定性影响检测一致性。",
    solution: "通过直驱结构减少机械传动误差，提升精密检测运动链路的稳定性。",
    recommendedProducts: ["IZU 系列无铁芯直线电机", "DDR 系列直驱旋转电机"],
    href: "/industries#precision-measurement",
  },
  {
    title: "电子制造设备",
    painPoint: "设备空间紧凑、运动轴多、节拍要求高，需要更易集成的运动部件。",
    solution: "提供紧凑型管型直线电机、直驱旋转电机和定制化直驱部件。",
    recommendedProducts: ["IZU7 管型直线电机", "DDR 系列直驱旋转电机"],
    href: "/industries#electronics-manufacturing",
  },
];
