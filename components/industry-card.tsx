import Link from "next/link";
import type { Industry } from "@/data/industries";

type IndustryCardProps = {
  industry: Industry;
};

export function IndustryCard({ industry }: IndustryCardProps) {
  return (
    <article className="rounded-[28px] border border-navy/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-blueprint">
      <p className="text-sm font-semibold text-industrial">{industry.title}</p>
      <div className="mt-5 grid gap-4">
        <div>
          <p className="text-xs font-semibold text-navy/55">设备痛点</p>
          <p className="mt-2 text-sm leading-7 text-ink/72">{industry.painPoint}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-navy/55">对应方案</p>
          <p className="mt-2 text-sm leading-7 text-ink/72">{industry.solution}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {industry.recommendedProducts.map((product) => (
          <span key={product} className="rounded-full bg-blueprint px-3 py-1 text-xs font-medium text-navy">
            {product}
          </span>
        ))}
      </div>
      <Link href={industry.href} className="mt-6 inline-flex text-sm font-semibold text-industrial hover:text-navy">
        查看应用说明
      </Link>
    </article>
  );
}
