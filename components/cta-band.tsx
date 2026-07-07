import Link from "next/link";

type CtaBandProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBand({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaBandProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-navy px-6 py-12 text-white shadow-blueprint sm:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-electric">联系工程师</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:-translate-y-0.5 active:translate-y-0"
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryHref ? (
              <Link
                href={secondaryHref}
                className="rounded-full border border-white/22 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
