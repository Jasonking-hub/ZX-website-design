import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, intro, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("px-4 py-20 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        {title ? (
          <div className="mb-10 max-w-3xl">
            {eyebrow ? <p className="mb-3 text-sm font-semibold text-industrial">{eyebrow}</p> : null}
            <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title}</h2>
            {intro ? <p className="mt-5 text-base leading-8 text-ink/70">{intro}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
