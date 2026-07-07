import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] bg-white px-6 py-24 text-ink">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold text-industrial">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-navy">页面未找到</h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-ink/75">
          当前页面不存在或已移动。您可以返回首页，继续查看中欣自动化的直驱电机与精密运动平台方案。
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-industrial px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-navy active:translate-y-0"
        >
          返回首页
        </Link>
      </div>
    </main>
  );
}
