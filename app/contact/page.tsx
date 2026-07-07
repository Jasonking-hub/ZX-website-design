import type { Metadata } from "next";
import Image from "next/image";
import { InquiryForm } from "@/components/inquiry-form";
import { Section } from "@/components/section";
import { siteInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "联系中欣自动化｜工程选型咨询",
  description: "联系深圳中欣自动化科技有限公司，获取直驱电机、精密运动平台、图纸申请和工程选型咨询。",
};

export default function ContactPage() {
  return (
    <Section
      className="bg-blueprint/60 pt-32"
      eyebrow="联系我们"
      title="联系中欣自动化"
      intro="如果您正在为设备寻找合适的直驱运动方案，请提交应用场景、负载、行程、速度、加速度和安装空间信息。"
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[32px] border border-navy/10 bg-white p-8 shadow-sm">
          <p className="text-xl font-semibold text-navy">{siteInfo.name}</p>
          <div className="mt-6 space-y-4 text-sm leading-7 text-ink/72">
            <p>地址：{siteInfo.address}</p>
            <p>电话：{siteInfo.phone}</p>
            <p>邮箱：{siteInfo.email}</p>
          </div>
          <div className="mt-8 w-44 rounded-[28px] border border-navy/10 bg-white p-3">
            <Image src={siteInfo.qrCode} alt="中欣自动化联系二维码" width={520} height={520} className="rounded-2xl" />
          </div>
        </div>
        <InquiryForm variant="contact" />
      </div>
    </Section>
  );
}
