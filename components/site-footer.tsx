import Link from "next/link";
import { products } from "@/data/products";
import { resourceCards } from "@/data/resources";
import { navigation, siteInfo } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sm font-semibold text-navy">
              ZX
            </span>
            <div>
              <p className="font-semibold">{siteInfo.name}</p>
              <p className="mt-1 text-sm text-white/60">高端精密直驱运动解决方案供应商</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/68">
            专注无铁芯直线电机、DDR 直驱旋转电机、管型直线电机与定制高精度平台，为精密设备提供稳定、高速、可定制的运动能力。
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">网站导航</p>
          <div className="mt-4 grid gap-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/62 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">产品系列</p>
          <div className="mt-4 grid gap-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="text-sm text-white/62 transition hover:text-white"
              >
                {product.shortName}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">联系信息</p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-white/68">
            <p>电话：{siteInfo.phone}</p>
            <p>邮箱：{siteInfo.email}</p>
            <p>地址：{siteInfo.address}</p>
          </div>
          <div className="mt-6 grid gap-3">
            {resourceCards.slice(0, 2).map((card) => (
              <Link key={card.title} href={card.href} className="text-sm font-medium text-electric transition hover:text-white">
                {card.action}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {siteInfo.name}。网站内容依据公司产品手册整理。
      </div>
    </footer>
  );
}
