// Homepage — hero + pillars

const HERO_VARIANTS = {
  ai:     'The CMS where AI does the work.',
  speed:  'Sub-50ms publishing. AI-first. Open source.',
  kernel: 'Kernel + extensions. Like Linux, for content.',
};

const Hero = ({ variant = 'ai', motif = 'heavy' }) => {
  const headline = HERO_VARIANTS[variant] || HERO_VARIANTS.ai;
  return (
    <section style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)', position: 'relative', overflow: 'hidden' }}>
      {motif !== 'none' && (
        <div style={{
          position: 'absolute', right: '-80px', top: '40px',
          opacity: motif === 'heavy' ? 0.55 : 0.25,
          pointerEvents: 'none',
          filter: 'blur(0.3px)',
        }}>
          <CompoundEye size={460} density={motif === 'heavy' ? 'dense' : 'normal'} />
        </div>
      )}

      <div className="container container-wide" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-5)' }}>
          <span className="eyebrow">AI-native · kernel-class · mantis-shrimp-fast</span>
        </div>

        <h1 style={{ maxWidth: '14ch', marginBottom: 'var(--space-5)' }}>
          {headline.split(' ').map((w, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <span key={i} style={{
                background: isLast ? 'linear-gradient(92deg, var(--teal), var(--violet) 40%, var(--magenta) 70%, var(--coral))' : 'none',
                WebkitBackgroundClip: isLast ? 'text' : 'unset',
                backgroundClip: isLast ? 'text' : 'unset',
                color: isLast ? 'transparent' : 'inherit',
              }}>
                {w}{i < arr.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </h1>

        <p style={{ fontSize: 18, lineHeight: 1.55, maxWidth: '62ch', marginBottom: 'var(--space-6)', color: 'var(--ink-1)' }}>
          Squilla is an open-source, Go-based content management system built around one idea:
          an AI agent should be able to build, populate, and operate an entire website with zero
          human intervention. Every operation is exposed as an <span style={{ color: 'var(--accent)' }}>MCP tool</span>.
          Every feature lives in a sovereign gRPC extension. The kernel stays small, the system stays fast.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 'var(--space-7)' }}>
          <button className="btn btn-primary">
            <span style={{ opacity: 0.6 }}>$</span>
            <span>docker compose up</span>
            <span style={{ opacity: 0.6, marginLeft: 4 }}>→</span>
          </button>
          <button className="btn">
            <span>View on GitHub</span>
            <span style={{ color: 'var(--ink-3)' }}>↗</span>
          </button>
          <button className="btn btn-ghost" style={{ borderColor: 'transparent' }}>
            <span style={{ color: 'var(--ink-2)' }}>read the brief →</span>
          </button>
        </div>

        <div style={{ marginTop: 'var(--space-7)' }}>
          <Carapace segments={32} height={5} />
        </div>
      </div>
    </section>
  );
};

const PILLARS = [
  {
    n: '01',
    color: 'var(--teal)',
    title: 'AI-Native, MCP-First',
    body: '~50 MCP tools across 15 domains. An agent can register custom node types, seed content, activate themes, manage extensions, render previews — all through structured calls. No filesystem access required.',
    code: 'core.node.create({\n  type: "recipe",\n  fields: {…}\n})',
  },
  {
    n: '02',
    color: 'var(--violet)',
    title: 'Kernel + Extensions',
    body: 'The core is a minimal kernel: nodes, rendering, auth, CoreAPI. Everything feature-specific (media, email, forms, SEO) is a gRPC plugin extension that owns its full stack — database tables, business logic, admin UI, migrations.',
    code: '$ ls extensions/\nforms/        media/\nemail/        sitemap/',
  },
  {
    n: '03',
    color: 'var(--coral)',
    title: 'Sub-50ms TTFB',
    body: 'Atomic operations for hot-swapped config maps. Pre-resolved layouts. JSONB + GIN indexes. PostgreSQL connection pooling. No N+1 queries. The CMS gets out of the way.',
    code: 'GET /recipes/scallops\n→ 23ms · 200 OK\n  ttfb=18ms render=5ms',
  },
];

const Pillars = () => (
  <section className="hairline-x" style={{ borderTop: '1px solid var(--line)' }}>
    <div className="container container-wide">
      <div data-grid="3" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
        border: '1px solid var(--line)', borderRadius: 'var(--radius-md)',
        background: 'var(--bg-2)',
        overflow: 'hidden',
      }}>
        {PILLARS.map((p, i) => (
          <div key={p.n} style={{
            padding: 'var(--space-6)',
            borderRight: i < 2 ? '1px solid var(--line)' : 'none',
            position: 'relative',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              marginBottom: 'var(--space-5)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
                color: 'var(--ink-3)',
              }}>{p.n} / 03</span>
              <span style={{
                width: 8, height: 8, borderRadius: 2,
                background: p.color, boxShadow: `0 0 12px ${p.color}`,
              }} />
            </div>
            <h3 style={{ marginBottom: 'var(--space-3)', fontFamily: 'var(--font-mono)' }}>{p.title}</h3>
            <p style={{ fontSize: 14, marginBottom: 'var(--space-5)' }}>{p.body}</p>
            <pre style={{
              fontFamily: 'var(--font-mono)', fontSize: 11.5,
              background: 'var(--bg-0)', padding: 'var(--space-3) var(--space-4)',
              borderRadius: 4, color: 'var(--ink-1)',
              borderLeft: `2px solid ${p.color}`,
              whiteSpace: 'pre',
              overflowX: 'auto',
            }}>{p.code}</pre>
          </div>
        ))}
      </div>
    </div>
  </section>
);

Object.assign(window, { Hero, Pillars, HERO_VARIANTS });
