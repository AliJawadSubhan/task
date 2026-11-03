"use client";

import { useEffect, useRef, useState } from "react";

function parseStat(value: string): { prefix: string; target: number; suffix: string } {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: value };
  const [, prefix, digits, suffix] = match;
  return { prefix, target: Number(digits), suffix };
}

export function StatCounter({ value, className }: { value: string; className?: string }) {
  const { prefix, target, suffix } = parseStat(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame: number;
    const animate = () => {
      const duration = 1200;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * target));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDisplay(0);
          animate();
        } else {
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </div>
  );
}
