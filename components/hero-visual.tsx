import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-navy/10 bg-white shadow-blueprint">
      <div className="absolute inset-0 blueprint-grid opacity-70" aria-hidden="true" />
      <div className="absolute left-8 top-8 h-px w-40 bg-industrial/60" aria-hidden="true" />
      <div className="absolute left-8 top-12 h-px w-24 bg-electric/70" aria-hidden="true" />
      <div className="relative p-6 sm:p-8">
        <Image
          src="/images/brand/hero-composite.jpg"
          alt="中欣自动化直驱电机产品组合"
          width={1400}
          height={820}
          priority
          className="rounded-3xl border border-navy/8 object-cover"
        />
        <div className="absolute bottom-10 left-10 right-10 grid gap-3 rounded-3xl border border-white/15 bg-navy/88 p-5 text-white backdrop-blur md:grid-cols-3">
          {["直线运动", "旋转定位", "定制平台"].map((item) => (
            <div key={item} className="border-l border-electric/50 pl-4">
              <p className="text-xs text-white/58">运动轨迹</p>
              <p className="mt-1 text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
