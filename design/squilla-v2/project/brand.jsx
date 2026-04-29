// Squilla brand primitives — wordmark, mark, ornaments

const SquillaMark = ({ size = 28, animate = false }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    {/* Compound-eye dot cluster — three ommatidial bands */}
    <g style={{ transformOrigin: 'center', animation: animate ? 'pulse-dot 3s ease-in-out infinite' : 'none' }}>
      <circle cx="8"  cy="10" r="2"   fill="var(--teal)" />
      <circle cx="14" cy="8"  r="1.6" fill="var(--violet)" />
      <circle cx="20" cy="9"  r="1.6" fill="var(--magenta)" />
      <circle cx="25" cy="11" r="1.4" fill="var(--coral)" />

      <circle cx="6"  cy="16" r="1.6" fill="var(--lime)"  opacity="0.85" />
      <circle cx="12" cy="16" r="2.2" fill="var(--teal)" />
      <circle cx="19" cy="16" r="1.8" fill="var(--violet)" />
      <circle cx="26" cy="16" r="1.4" fill="var(--magenta)" />

      <circle cx="8"  cy="22" r="1.4" fill="var(--coral)"  opacity="0.85" />
      <circle cx="15" cy="23" r="1.6" fill="var(--lime)"   opacity="0.85" />
      <circle cx="22" cy="22" r="1.6" fill="var(--teal)" />
    </g>
  </svg>
);

const SquillaWordmark = ({ size = 18 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
    <SquillaMark size={size + 10} />
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: size,
      fontWeight: 500,
      letterSpacing: '-0.02em',
      color: 'var(--ink-0)'
    }}>
      squilla
      <span style={{ color: 'var(--accent)' }}>/</span>
    </span>
  </span>
);

// Segmented-bar separator — mimics carapace plates
const Carapace = ({ segments = 12, height = 6 }) => (
  <div style={{ display: 'flex', gap: 2, height }}>
    {Array.from({ length: segments }).map((_, i) => {
      const colors = ['var(--teal)', 'var(--violet)', 'var(--magenta)', 'var(--coral)', 'var(--lime)', 'var(--amber)'];
      const c = colors[i % colors.length];
      const op = 0.4 + (i / segments) * 0.6;
      return (
        <div key={i} style={{
          flex: 1,
          background: c,
          opacity: op,
          borderRadius: 1,
        }} />
      );
    })}
  </div>
);

// Compound-eye motif: hexagonal-feel mosaic on rectangular grid
const CompoundEye = ({ size = 240, density = 'normal' }) => {
  const cols = density === 'dense' ? 14 : 10;
  const rows = density === 'dense' ? 14 : 10;
  const palette = ['var(--teal)', 'var(--violet)', 'var(--magenta)', 'var(--coral)', 'var(--lime)', 'var(--amber)', 'var(--teal-2)'];
  const cells = [];
  const cx = cols / 2, cy = rows / 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c + (r % 2 ? 0.5 : 0);
      const dx = x - cx, dy = r - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > cols / 2) continue;
      const idx = (Math.floor(dist) + c + r) % palette.length;
      const opacity = 1 - dist / (cols / 2) * 0.7;
      cells.push({ x, y: r, c: palette[idx], opacity, r: 0.32 + Math.random() * 0.1 });
    }
  }
  const cell = size / cols;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${cols} ${rows}`} aria-hidden="true">
      {cells.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={d.opacity} />
      ))}
    </svg>
  );
};

// Animated punch indicator — micro-references the mantis-shrimp strike
const StrikePulse = ({ active }) => (
  <div style={{
    position: 'relative', width: 12, height: 12,
  }}>
    <div style={{
      position: 'absolute', inset: 0,
      borderRadius: '50%',
      background: 'var(--accent)',
      boxShadow: active ? '0 0 0 0 var(--accent-glow), 0 0 0 6px transparent' : 'none',
      animation: active ? 'strike 1.2s ease-out infinite' : 'none',
    }} />
    <style>{`
      @keyframes strike {
        0% { transform: scale(1); box-shadow: 0 0 0 0 var(--accent-glow); }
        100% { transform: scale(2.2); box-shadow: 0 0 0 12px transparent; opacity: 0; }
      }
    `}</style>
  </div>
);

Object.assign(window, { SquillaMark, SquillaWordmark, Carapace, CompoundEye, StrikePulse });
