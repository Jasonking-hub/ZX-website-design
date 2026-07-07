import type { Metadata } from "next";
import { ResourceCard } from "@/components/resource-card";
import { Section } from "@/components/section";
import { resourceCards } from "@/data/resources";

export const metadata: Metadata = {
  title: "资源中心｜产品手册与选型支持",
  description: "下载中欣自动化直驱电机产品手册，获取选型建议、产品参数表、尺寸图和技术咨询入口。",
};

export default function ResourcesPage() {
  return (
    <>
      <Section
        className="bg-blueprint/60 pt-32"
        eyebrow="资源中心"
        title="工程资料与产品选型支持"
        intro="获取产品手册、选型建议、尺寸图和技术咨询入口。表单在本项目中先做前端校验与提交成功演示。"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {resourceCards.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))}
        </div>
      </Section>

      <Section id="selection-form" title="产品选型入口" intro="请准备负载、行程、速度、加速度、安装空间和应用行业信息，下一步表单组件将提供前端校验与成功演示。">
        <div className="rounded-[28px] border border-dashed border-industrial/35 bg-white p-8 text-sm leading-7 text-ink/70">
          选型表单区域：姓名、公司、手机、邮箱、应用行业、负载、行程、速度 / 加速度要求、需要的产品类型、备注。
        </div>
      </Section>

      <Section id="drawing-request" className="bg-blueprint/60" title="图纸 / CAD 申请" intro="如需产品尺寸图、CAD、安装接口资料，请提交需求，由工程人员确认后提供。">
        <div className="rounded-[28px] border border-navy/10 bg-white p-8 text-sm leading-7 text-ink/70">
          图纸申请将通过资源中心表单或联系页面提交，当前阶段展示前端流程。
        </div>
      </Section>
    </>
  );
}
