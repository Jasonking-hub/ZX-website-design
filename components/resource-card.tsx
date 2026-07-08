import Link from "next/link";
import type { ResourceCard as ResourceCardType } from "@/data/resources";

type ResourceCardProps = {
  resource: ResourceCardType;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[28px] border border-navy/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-blueprint">
      <p className="text-lg font-semibold text-navy">{resource.title}</p>
      <p className="mt-3 text-sm leading-7 text-ink/70">{resource.description}</p>
      <div className="mt-auto pt-6">
        <Link
          href={resource.href}
          className="inline-flex w-fit rounded-full bg-industrial px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy active:translate-y-px"
        >
          {resource.action}
        </Link>
      </div>
    </article>
  );
}
