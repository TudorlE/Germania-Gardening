'use client';

import { useRef, useState } from 'react';

export function CompareSlider({
  before,
  after,
  alt,
  beforeLabel,
  afterLabel,
}: {
  before: string;
  after: string;
  alt: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  function setFromClientX(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.buttons === 0) return;
    setFromClientX(e.clientX);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
  }

  return (
    <div
      ref={ref}
      role="slider"
      aria-label={alt}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onKeyDown={onKeyDown}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-bg-card cursor-ew-resize select-none touch-pan-y focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {/* After (full, beneath) */}
      <img
        src={after}
        alt={`${alt} — ${afterLabel}`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
        loading="lazy"
      />
      {/* Before (clipped, on top) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${alt} — ${beforeLabel}`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          loading="lazy"
        />
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 text-[10px] font-medium uppercase tracking-[0.22em] px-2.5 py-1 rounded-full bg-bg/80 backdrop-blur border border-border-strong text-fg/90 pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 text-[10px] font-medium uppercase tracking-[0.22em] px-2.5 py-1 rounded-full bg-bg/80 backdrop-blur border border-leaf/40 text-leaf pointer-events-none">
        {afterLabel}
      </span>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-leaf via-leaf to-gold shadow-[0_0_12px_rgba(168,224,82,0.55)] pointer-events-none"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-leaf flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.5)] ring-2 ring-bg pointer-events-none transition-transform duration-300 group-hover:scale-110"
        style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M5.5 4L2 8l3.5 4M10.5 4L14 8l-3.5 4"
            stroke="#07120c"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
