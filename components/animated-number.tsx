"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

export function AnimatedNumber({ value, prefix = "", suffix = "" }: AnimatedNumberProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [shouldReduceMotion, value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString("zh-CN")}
      {suffix}
    </span>
  );
}
