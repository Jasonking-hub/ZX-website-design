import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Section } from "@/components/section";
import { companyProfile, siteInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "关于中欣自动化｜直驱电机与精密运动平台",
  description: "深圳中欣自动化科技有限公司成立于 2017 年，专注直驱电机及相关运动平台的研发、定制、生产、销售与服务。",
};

export default function AboutPage() {
  return (
    <>
      <Section
        className="bg-blueprint/60 pt-32"
        eyebrow="关于中欣自动化"
        title="专注直驱电机及精密运动平台的技术型企业"
        intro={`${siteInfo.name}位于深圳，成立于 2017 年，面向高端装备提供直驱运动核心部件与定制化方案。`}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {companyProfile.map((paragraph) => (
            <div key={paragraph} className="rounded-[28px] border border-navy/10 bg-white p-6 text-sm leading-7 text-ink/72">
              {paragraph}
            </div>
          ))}
        </div>
      </Section>

      <Section title="产品方向">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {["直线电机", "力矩电机", "音圈电机", "高精密大理石平台"].map((item) => (
            <div key={item} className="rounded-[28px] border border-navy/10 bg-white p-6 shadow-sm">
              <p className="text-lg font-semibold text-navy">{item}</p>
              <p className="mt-3 text-sm leading-7 text-ink/70">依据宣传册整理，完整规格请参考产品手册或联系工程师确认。</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-blueprint/60" title="服务理念与公司愿景">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-navy/10 bg-white p-8">
            <p className="text-xl font-semibold text-navy">专业协同</p>
            <p className="mt-4 text-sm leading-7 text-ink/72">以专业的工程沟通方式，协助客户完成型号选择、结构匹配、参数确认与方案验证。</p>
          </div>
          <div className="rounded-[28px] border border-navy/10 bg-white p-8">
            <p className="text-xl font-semibold text-navy">追求卓越</p>
            <p className="mt-4 text-sm leading-7 text-ink/72">围绕高加速度直驱领域持续积累，在工业设备升级过程中体现运动核心部件的价值。</p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="了解中欣直驱产品与定制方案"
        description="欢迎联系工程人员，结合设备需求确认产品系列、安装尺寸和定制可行性。"
        primaryLabel="联系我们"
        primaryHref="/contact"
      />
    </>
  );
}
