import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { ProductFilter } from "@/components/product-filter";
import { Section } from "@/components/section";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "产品中心｜深圳中欣自动化科技有限公司",
  description: "查看中欣自动化 IZU、DB、WB、DDR、IZU7 与定制平台系列直驱产品。",
};

export default function ProductsPage() {
  return (
    <>
      <Section
        className="bg-blueprint/60 pt-32"
        eyebrow="产品中心"
        title="覆盖直线、旋转、管型与定制平台的直驱产品体系"
        intro="产品内容依据公司产品手册整理。无法确认的参数不做编造，详情页会提示参考产品手册或联系工程师。"
      >
        <ProductFilter products={products} />
      </Section>
      <CtaBand
        title="需要确认具体型号、推力或安装尺寸？"
        description="提交您的负载、行程、速度、加速度和设备空间信息，由工程人员协助完成初步选型。"
        primaryLabel="联系工程师"
        primaryHref="/contact"
      />
    </>
  );
}
