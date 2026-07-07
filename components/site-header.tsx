"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, siteInfo } from "@/data/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-navy/10 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-navy text-sm font-semibold text-white shadow-blueprint">
            ZX
          </span>
          <span>
            <span className="block text-base font-semibold tracking-tight text-navy">{siteInfo.shortName}</span>
            <span className="block text-xs text-ink/60">精密直驱运动方案</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="主导航">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-ink/72 transition hover:bg-blueprint hover:text-navy",
                isActive(pathname, item.href) && "bg-blueprint text-navy",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="rounded-full bg-industrial px-5 py-2.5 text-sm font-semibold text-white shadow-blueprint transition hover:-translate-y-0.5 hover:bg-navy active:translate-y-0"
          >
            联系工程师
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={open}
          className="inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-2xl border border-navy/10 bg-white text-navy lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <span className={cn("h-0.5 w-5 rounded-full bg-current transition", open && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-5 rounded-full bg-current transition", open && "opacity-0")} />
          <span className={cn("h-0.5 w-5 rounded-full bg-current transition", open && "-translate-y-2 -rotate-45")} />
        </button>
      </div>

      {open ? (
        <div className="border-t border-navy/10 bg-white px-4 py-4 shadow-blueprint lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="移动端导航">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium text-ink/72",
                  isActive(pathname, item.href) && "bg-blueprint text-navy",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-2xl bg-industrial px-4 py-3 text-center text-sm font-semibold text-white"
            >
              联系工程师
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
