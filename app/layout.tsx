import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "深圳中欣自动化科技有限公司｜直驱电机与精密运动平台",
  description:
    "深圳中欣自动化科技有限公司专注直驱电机、无铁芯直线电机、DDR 直驱旋转电机、管型直线电机和定制高精度平台，为半导体检测、固晶、精密贴合和高速自动化设备提供高性能运动解决方案。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
