import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { Section } from "@/components/section";
import { SpecTable } from "@/components/spec-table";
import { getProductBySlug, productSlugs } from "@/data/products";

type ProductDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProductDetailPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "产品未找到｜深圳中欣自动化科技有限公司",
    };
  }

  return {
    title: `${product.name}｜深圳中欣自动化科技有限公司`,
    description: product.summary,
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <>
      <section className="bg-blueprint/60 px-4 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-industrial">产品详情</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-ink/72">{product.tagline}</p>
            <p className="mt-4 text-sm leading-7 text-ink/60">{product.sourceNote}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-industrial px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy">
                咨询选型
              </Link>
              <Link href="/resources#drawing-request" className="rounded-full border border-navy/15 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-industrial">
                申请 CAD 图纸
              </Link>
            </div>
          </div>
          <div className="rounded-[32px] border border-navy/10 bg-white p-4 shadow-blueprint">
            <Image src={product.image} alt={product.name} width={1200} height={720} className="rounded-3xl object-cover" priority />
          </div>
        </div>
      </section>

      <Section title="产品简介" intro={product.summary}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-navy/10 bg-white p-6">
            <p className="text-sm font-semibold text-industrial">产品特点</p>
            <div className="mt-5 grid gap-3">
              {product.features.map((feature) => (
                <p key={feature} className="border-l border-electric/70 pl-4 text-sm leading-7 text-ink/74">
                  {feature}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-navy/10 bg-white p-6">
            <p className="text-sm font-semibold text-industrial">典型应用</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {product.applications.map((application) => (
                <span key={application} className="rounded-full bg-blueprint px-4 py-2 text-sm font-medium text-navy">
                  {application}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-blueprint/60" title="参数表" intro="宣传册能确认的字段展示具体值。未能确认的字段不做推测，请参考产品手册或联系工程师获取完整参数。">
        <SpecTable rows={product.specs} />
      </Section>

      <Section title="尺寸图" intro="以下图片来自产品手册页面截图，正式 CAD 与安装接口资料请提交图纸申请。">
        <div className="rounded-[32px] border border-navy/10 bg-white p-4 shadow-sm">
          <Image src={product.drawing} alt={`${product.name}尺寸图`} width={1400} height={900} className="w-full rounded-3xl object-cover" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/resources#drawing-request" className="rounded-full bg-industrial px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy">
            申请 CAD 图纸
          </Link>
          <Link href="/contact" className="rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition hover:border-industrial">
            咨询安装尺寸
          </Link>
        </div>
      </Section>

      <CtaBand
        title={`正在评估 ${product.shortName} 的适配性？`}
        description="告诉我们负载、行程、速度、加速度、安装空间和应用场景，工程人员将协助确认型号与定制可能性。"
        primaryLabel="提交选型需求"
        primaryHref="/contact"
      />
    </>
  );
}
