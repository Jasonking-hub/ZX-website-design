import Link from "next/link";
import { AnimatedNumber } from "@/components/animated-number";
import { CtaBand } from "@/components/cta-band";
import { HeroVisual } from "@/components/hero-visual";
import { IndustryCard } from "@/components/industry-card";
import { MotionReveal } from "@/components/motion-reveal";
import { ProductCard } from "@/components/product-card";
import { ResourceCard } from "@/components/resource-card";
import { Section } from "@/components/section";
import { industries } from "@/data/industries";
import { products } from "@/data/products";
import { resourceCards } from "@/data/resources";
import { capabilityHighlights, homeStats, quickEntries, siteInfo, statsDisclaimer } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blueprint to-white px-4 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 blueprint-grid opacity-60" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-semibold text-industrial">高端精密直驱运动解决方案供应商</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-navy sm:text-6xl">
              面向高端装备的精密直驱运动解决方案
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ink/72">
              专注无铁芯直线电机、DDR 直驱旋转电机、管型直线电机与定制高精度平台，为半导体检测、固晶、精密贴合和高速自动化设备提供高性能运动核心部件。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="rounded-full bg-industrial px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-navy active:translate-y-0">
                查看产品中心
              </Link>
              <Link href="/contact" className="rounded-full border border-navy/15 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:border-industrial active:translate-y-0">
                联系工程师
              </Link>
              <Link href={siteInfo.manualHref} className="rounded-full border border-navy/15 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:border-industrial active:translate-y-0">
                下载产品手册
              </Link>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <HeroVisual />
          </MotionReveal>
        </div>
      </section>

      <Section title="您正在寻找什么？" intro="从标准直驱电机、高加速度方案、定制平台到工程选型支持，快速进入合适路径。">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickEntries.map((entry) => (
            <MotionReveal key={entry.title}>
              <Link href={entry.href} className="block h-full rounded-[28px] border border-navy/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-blueprint">
                <p className="text-lg font-semibold text-navy">{entry.title}</p>
                <p className="mt-3 text-sm leading-7 text-ink/70">{entry.description}</p>
              </Link>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section
        className="bg-blueprint/60"
        eyebrow="专注直驱运动核心部件"
        title="为精密设备提供稳定、高速、可定制的运动能力"
        intro="深圳中欣自动化科技有限公司专注于直驱电机及相关运动平台的研发、生产、销售与服务，面向半导体、电子制造、精密检测和高速自动化等行业应用。"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {capabilityHighlights.map((item) => (
            <MotionReveal key={item.title}>
              <div className="h-full rounded-[28px] border border-navy/10 bg-white p-6">
                <p className="text-lg font-semibold text-navy">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-ink/70">{item.description}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section title="产品与解决方案" intro="覆盖直线、旋转、管型与定制平台的直驱产品体系。">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <MotionReveal key={product.slug}>
              <ProductCard product={product} />
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section className="bg-blueprint/60" title="服务于高精度、高速度设备行业" intro="围绕设备痛点匹配直驱电机、旋转直驱和定制平台方案。">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <MotionReveal key={industry.title}>
              <IndustryCard industry={industry} />
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section title="以产品参数支撑工程选型" intro={statsDisclaimer}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {homeStats.map((stat) => (
            <MotionReveal key={stat.label}>
              <div className="rounded-[28px] border border-navy/10 bg-white p-6 shadow-sm">
                <p className="font-mono text-4xl font-semibold tracking-tight text-navy">
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-4 text-sm font-semibold text-navy">{stat.label}</p>
                <p className="mt-2 text-xs leading-6 text-ink/60">{stat.note}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section className="bg-blueprint/60" title="工程资料与产品选型支持" intro="获取产品手册、选型建议、尺寸图和技术咨询入口。">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {resourceCards.map((resource) => (
            <MotionReveal key={resource.title}>
              <ResourceCard resource={resource} />
            </MotionReveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="正在为设备寻找合适的直驱运动方案？"
        description="告诉我们您的负载、行程、速度、加速度、安装空间和应用场景，中欣工程团队将协助您确认合适的电机或定制平台方案。"
        primaryLabel="提交需求"
        primaryHref="/contact"
        secondaryLabel="联系我们"
        secondaryHref="/contact"
      />
    </>
  );
}
