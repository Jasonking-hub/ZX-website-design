"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";

type HeroVideoMediaProps = {
  children: ReactNode;
};

export function HeroVideoMedia({ children }: HeroVideoMediaProps) {
  const [primaryPlaying, setPrimaryPlaying] = useState(false);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-navy px-4 pt-28 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-[0.72]" aria-hidden="true">
        <Image
          src="/images/brand/hero-video-primary-v2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/images/brand/hero-video-primary-v2.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPrimaryPlaying(true)}
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime > 0) setPrimaryPlaying(true);
          }}
        >
          <source src="/videos/zhongxin-motion-primary-v2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/78 to-navy/24" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,47,0.2),rgba(7,26,47,0.58))]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100dvh-7rem)] max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[0.92fr_1.08fr]">
        {children}

        <div className="hidden lg:block">
          <div className="relative ml-auto aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/20 bg-white/8 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur">
            <Image
              src="/images/brand/hero-video-secondary-v2.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 1px"
              className="object-cover"
            />
            {primaryPlaying ? (
              <video
                className="absolute inset-0 z-10 h-full w-full object-cover"
                poster="/images/brand/hero-video-secondary-v2.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="中欣自动化设备运动实拍"
              >
                <source
                  src="/videos/zhongxin-motion-secondary-v2.mp4"
                  type="video/mp4"
                  media="(min-width: 1024px)"
                />
              </video>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-navy/84 to-transparent p-6">
              <p className="text-sm font-semibold text-white">高速响应与稳定运动</p>
              <p className="mt-2 max-w-md text-xs leading-6 text-white/68">实拍素材展示直驱运动部件在设备中的连续运行状态。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
