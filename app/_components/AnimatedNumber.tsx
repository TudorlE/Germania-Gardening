'use client';

import { useEffect, useRef, useState } from 'react';

export function AnimatedNumber({
  value,
  duration = 1600,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parse: prefix-numeric-suffix (e.g. "15.000+", "10+", "500+")
    const match = value.match(/^(\D*)([\d.,]+)(\D*)$/);
    if (!match) return;
    const [, prefix, numStr, suffix] = match;
    const sep = numStr.includes('.') && !numStr.includes(',') ? '.' : numStr.includes(',') ? ',' : '';
    const target = parseInt(numStr.replace(/[.,]/g, ''), 10);
    if (!isFinite(target)) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplay(value);
      return;
    }

    setDisplay(`${prefix}0${suffix}`);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const current = Math.round(target * eased);
              const formatted = sep
                ? current.toLocaleString('de-DE').replace(/\./g, sep)
                : current.toString();
              setDisplay(`${prefix}${formatted}${suffix}`);
              if (t < 1) requestAnimationFrame(step);
              else setDisplay(value);
            };
            requestAnimationFrame(step);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
