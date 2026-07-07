import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
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

      <Section id="selection-form" title="产品选型入口" intro="请填写负载、行程、速度、加速度、安装空间和应用行业信息。当前表单为前端校验与提交成功演示，不会发送真实网络请求。">
        <InquiryForm variant="selection" />
      </Section>

      <Section id="drawing-request" className="bg-blueprint/60" title="图纸 / CAD 申请" intro="如需产品尺寸图、CAD、安装接口资料，请提交需求，由工程人员确认后提供。">
        <ResourceCard resource={resourceCards[2]} />
      </Section>
    </>
  );
}
