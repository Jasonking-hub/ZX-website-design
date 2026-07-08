import Link from "next/link";
import { siteInfo } from "@/data/site";

export function HeroVideoShowcase() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-navy px-4 pt-28 text-white sm:px-6 lg:px-8">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.72]"
        poster="/images/brand/hero-composite.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/zhongxin-motion-primary.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/78 to-navy/24" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,47,0.2),rgba(7,26,47,0.58))]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100dvh-7rem)] max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[0.92fr_1.08fr]">
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

        <div className="hidden lg:block">
          <div className="relative ml-auto aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/20 bg-white/8 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur">
            <video
              className="h-full w-full object-cover"
              poster="/images/brand/hero-composite.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="中欣自动化设备运动实拍"
            >
              <source src="/videos/zhongxin-motion-secondary.mp4" type="video/mp4" media="(min-width: 1024px)" />
            </video>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/84 to-transparent p-6">
              <p className="text-sm font-semibold text-white">高速响应与稳定运动</p>
              <p className="mt-2 max-w-md text-xs leading-6 text-white/68">实拍素材展示直驱运动部件在设备中的连续运行状态。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
