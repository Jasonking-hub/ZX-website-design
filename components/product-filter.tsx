"use client";

import { useState } from "react";
import { productCategories, type Product } from "@/data/products";
import { cn } from "@/lib/cn";
import { ProductCard } from "./product-card";

type ProductFilterProps = {
  products: Product[];
};

type ProductCategoryValue = (typeof productCategories)[number]["value"];

export function ProductFilter({ products }: ProductFilterProps) {
  const [category, setCategory] = useState<ProductCategoryValue>("all");
  const visibleProducts = category === "all" ? products : products.filter((product) => product.category === category);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="产品分类筛选">
        {productCategories.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={category === item.value}
            onClick={() => setCategory(item.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition active:translate-y-px",
              category === item.value
                ? "border-industrial bg-industrial text-white"
                : "border-navy/10 bg-white text-ink/72 hover:border-industrial hover:text-navy",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
