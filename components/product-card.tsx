import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-navy/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-blueprint">
      <div className="relative border-b border-navy/8 bg-blueprint/60 p-4">
        <Image
          src={product.image}
          alt={product.name}
          width={1200}
          height={720}
          className="aspect-[5/3] w-full rounded-3xl object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold text-industrial">{product.shortName}</p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-navy">{product.name}</h3>
        <p className="mt-3 text-sm leading-7 text-ink/70">{product.summary}</p>
        <div className="mt-5 grid gap-2">
          {product.features.slice(0, 3).map((feature) => (
            <p key={feature} className="border-l border-electric/70 pl-3 text-sm text-ink/72">
              {feature}
            </p>
          ))}
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="mt-6 inline-flex w-fit rounded-full border border-industrial/25 px-4 py-2 text-sm font-semibold text-industrial transition hover:bg-industrial hover:text-white active:translate-y-px"
        >
          查看详情
        </Link>
      </div>
    </article>
  );
}
