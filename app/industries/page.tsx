import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { IndustryCard } from "@/components/industry-card";
import { Section } from "@/components/section";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "应用行业｜直驱运动解决方案",
  description: "中欣自动化直驱电机与定制平台面向半导体检测、固晶、精密贴合、高速自动化等行业应用。",
};

export default function IndustriesPage() {
  return (
    <>
      <Section
        className="bg-blueprint/60 pt-32"
        eyebrow="应用行业"
        title="服务于高精度、高速度设备行业"
        intro="从设备运动挑战出发，匹配直线、旋转、管型和定制平台类直驱产品。"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <IndustryCard key={industry.title} industry={industry} />
          ))}
        </div>
      </Section>

      <Section title="行业运动挑战与产品匹配">
        <div className="grid gap-5">
          {industries.map((industry) => (
            <article key={industry.title} id={industry.href.split("#")[1]} className="rounded-[28px] border border-navy/10 bg-white p-6 shadow-sm">
              <div className="grid gap-6 lg:grid-cols-[0.7fr_1fr_1fr]">
                <h2 className="text-2xl font-semibold text-navy">{industry.title}</h2>
                <div>
                  <p className="text-xs font-semibold text-industrial">运动挑战</p>
                  <p className="mt-2 text-sm leading-7 text-ink/72">{industry.painPoint}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-industrial">推荐方向</p>
                  <p className="mt-2 text-sm leading-7 text-ink/72">{industry.solution}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand
        title="让工程人员协助判断适用产品系列"
        description="如果您无法确认应选择标准电机、高加速电机还是定制平台，可以先提交设备运动需求。"
        primaryLabel="提交应用需求"
        primaryHref="/contact"
      />
    </>
  );
}
