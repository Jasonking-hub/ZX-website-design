import Link from "next/link";
import { HeroVideoMedia } from "@/components/hero-video-media";
import { siteInfo } from "@/data/site";

export function HeroVideoShowcase() {
  return (
    <HeroVideoMedia>
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
    </HeroVideoMedia>
  );
}
