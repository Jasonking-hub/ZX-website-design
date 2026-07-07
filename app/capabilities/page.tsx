import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Section } from "@/components/section";
import { capabilityHighlights, processSteps, statsDisclaimer } from "@/data/site";

export const metadata: Metadata = {
  title: "定制能力｜高加速度平台与直驱电机定制",
  description: "中欣自动化可围绕电机、运动平台、结构尺寸、推力、行程、安装方式和工程选型提供定制支持。",
};

const customInputs = ["负载", "行程", "速度", "加速度", "安装空间", "节拍", "安装接口"];

export default function CapabilitiesPage() {
  return (
    <>
      <Section
        className="bg-blueprint/60 pt-32"
        eyebrow="定制能力"
        title="围绕设备结构和运动指标进行定制化设计"
        intro="从电机定制、运动平台定制、高加速度平台设计到工程选型支持，中欣自动化面向设备开发阶段提供协同服务。"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {capabilityHighlights.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-navy/10 bg-white p-6">
              <p className="text-lg font-semibold text-navy">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-ink/70">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="定制需求输入维度" intro="越早明确运动指标与结构边界，越容易完成可靠的产品选型和平台设计。">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {customInputs.map((item) => (
            <div key={item} className="rounded-[24px] border border-navy/10 bg-white p-5 text-center text-sm font-semibold text-navy shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-blueprint/60" title="高加速度平台能力" intro={statsDisclaimer}>
        <div className="grid gap-6 lg:grid-cols-4">
          {[
            ["60G", "最高加速度"],
            ["7800N", "峰值推力"],
            ["2.3kg", "动子重量"],
            ["< 1%", "加速度跟随曲线误差"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[28px] border border-navy/10 bg-white p-6">
              <p className="font-mono text-4xl font-semibold text-navy">{value}</p>
              <p className="mt-3 text-sm font-semibold text-ink/72">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="工程协作流程">
        <div className="grid gap-4 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-[28px] border border-navy/10 bg-white p-6 shadow-sm">
              <p className="font-mono text-sm text-industrial">0{index + 1}</p>
              <p className="mt-4 text-lg font-semibold text-navy">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="有非标结构或高加速度平台需求？"
        description="提交设备空间、负载、行程、速度和加速度要求，我们将协助判断电机或平台定制方向。"
        primaryLabel="提交定制需求"
        primaryHref="/contact"
      />
    </>
  );
}
