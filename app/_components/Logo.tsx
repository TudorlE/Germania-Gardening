export function Logo({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f6d57a" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#8a6913" />
          </linearGradient>
          <linearGradient id="leaf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bdf25b" />
            <stop offset="100%" stopColor="#6aa823" />
          </linearGradient>
        </defs>
        {/* Ring */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="url(#goldRing)"
          strokeWidth="3"
        />
        {/* M */}
        <path
          d="M22 70 V36 L36 56 L50 36 V70"
          fill="none"
          stroke="url(#goldRing)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* P */}
        <path
          d="M56 70 V36 H70 a8 8 0 0 1 0 16 H56"
          fill="none"
          stroke="url(#goldRing)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Leaves on top of M */}
        <path
          d="M36 38 C 30 28, 30 22, 36 18 C 42 22, 42 28, 36 38 Z"
          fill="url(#leaf)"
        />
        <path
          d="M36 38 C 42 30, 50 28, 56 30 C 52 38, 44 40, 36 38 Z"
          fill="url(#leaf)"
          opacity="0.9"
        />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-lg tracking-wide gold-gradient">
          MP GALABAU
        </span>
        <span className="text-[10px] tracking-[0.18em] text-muted uppercase">
          Garten &amp; Landschaftsbau
        </span>
      </div>
    </div>
  );
}
