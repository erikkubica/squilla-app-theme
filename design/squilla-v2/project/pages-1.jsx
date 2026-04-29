// Sub-pages: Features, Architecture, Extensions gallery, Themes gallery, About, Blog, Showcase, Pricing, Docs

const PageHeader = ({ eyebrow, title, sub }) => (
  <section style={{ paddingTop: 'var(--space-7)', paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--line)' }}>
    <div className="container container-wide">
      <div className="h-eyebrow">{eyebrow}</div>
      <h1 style={{ fontSize: 'clamp(36px, 4vw, 56px)', maxWidth: '20ch', marginBottom: 'var(--space-4)' }}>{title}</h1>
      {sub && <p style={{ fontSize: 16, maxWidth: '64ch' }}>{sub}</p>}
    </div>
  </section>
);

// ========== FEATURES ==========

const FEATURES = [
  { cat: 'Content', items: [
    { name: 'Node types', desc: 'Custom post types via MCP or Tengo. JSONB storage, GIN-indexed.', stat: '7 fields/avg' },
    { name: 'Versioning', desc: 'Per-node history with diff view, restore, draft/publish.', stat: 'unlimited revs' },
    { name: 'Taxonomies', desc: 'Hierarchical + flat. Term metadata. Faceted query API.', stat: 'JSON facets' },
    { name: 'Menus', desc: 'Tree menus with deep-link tracking and route validation.', stat: 'route-aware' },
  ]},
  { cat: 'Editor', items: [
    { name: 'VDUS admin', desc: 'Server-driven UI. Boot manifest, layout trees, SSE updates.', stat: 'no client routing' },
    { name: 'Live preview', desc: 'Renders the actual layout tree, not an iframe simulation.', stat: 'real DOM' },
    { name: 'Capability gates', desc: '24 fine-grained permissions; per-extension required set.', stat: '24 caps' },
  ]},
  { cat: 'AI', items: [
    { name: 'MCP server', desc: 'stdio + http. ~50 tools across 15 domains. core.guide meta-tool.', stat: '~50 tools' },
    { name: 'Resource URIs', desc: 'squilla://guidelines/themes, …/extensions for agent self-onboarding.', stat: '12 URIs' },
    { name: 'Decision tree', desc: 'core.guide returns next-action hints based on current state.', stat: 'state-aware' },
  ]},
  { cat: 'Performance', items: [
    { name: 'Atomic config', desc: 'Hot-swapped maps. Reads never block. No lock contention.', stat: 'lock-free' },
    { name: 'Pre-resolved layouts', desc: 'Layout tree compiled at activation, not request time.', stat: '0ms lookup' },
    { name: 'Connection pooling', desc: 'pgxpool. Saturated under load. Per-tenant scoping.', stat: 'pgxpool' },
  ]},
];

const FeaturesPage = () => (
  <>
    <PageHeader eyebrow="§ features"
      title="Every capability, with the receipts."
      sub="Squilla isn't a wishlist. Each feature here is wired into the kernel or a built-in extension you can read on GitHub. The list is short on purpose." />
    <section>
      <div className="container container-wide" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
        {FEATURES.map(group => (
          <div key={group.cat}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 'var(--space-4)' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{group.cat}</h3>
              <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>{group.items.length} features</span>
            </div>
            <div data-grid="4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-2)' }}>
              {group.items.map((it, i) => (
                <div key={it.name} style={{
                  padding: 'var(--space-5)',
                  borderRight: i < group.items.length - 1 ? '1px solid var(--line)' : 'none',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ink-0)', marginBottom: 8 }}>{it.name}</div>
                  <p style={{ fontSize: 13, marginBottom: 14, color: 'var(--ink-1)' }}>{it.desc}</p>
                  <span className="tag" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>{it.stat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

// ========== ARCHITECTURE PAGE ==========

const ArchitecturePage = () => (
  <>
    <PageHeader eyebrow="§ architecture"
      title="The kernel does six things. The extensions do everything else."
      sub="Squilla borrows from operating-system design. The kernel manages content nodes, rendering, auth, the CoreAPI, the event bus, and the MCP server. Anything feature-specific is a sovereign gRPC extension. " />
    <ArchDiagram />

    <section>
      <div className="container container-wide">
        <div className="h-eyebrow">§ request lifecycle</div>
        <h2 style={{ marginBottom: 'var(--space-6)' }}>From URL to bytes, in 23ms.</h2>
        <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-2)' }}>
          {[
            ['00ms', 'Fiber receives request', 'router resolves to node handler'],
            ['01ms', 'Layout tree lookup', 'pre-resolved at activation; no DB query'],
            ['03ms', 'Node fetch', 'JSONB query · GIN index hit · 1 round-trip'],
            ['09ms', 'Filter chain', 'extensions hook into filter.apply'],
            ['14ms', 'Template render', 'html/template with custom funcs'],
            ['18ms', 'Response flush', 'compressed · 4.1KB · TTFB recorded'],
            ['23ms', 'Done', 'event.emit("page.served") · async'],
          ].map(([t, k, v], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 220px 1fr', padding: '14px 20px', borderTop: i ? '1px solid var(--line)' : 'none', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              <span style={{ color: 'var(--accent)' }}>{t}</span>
              <span style={{ color: 'var(--ink-0)' }}>{k}</span>
              <span style={{ color: 'var(--ink-2)', fontSize: 12 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

// ========== EXTENSIONS GALLERY ==========

const ALL_EXTS = [
  ...EXTS,
  { name: 'redirects', kind: 'Tengo only', tag: 'community', color: 'var(--teal-2)', desc: 'Bulk URL redirect manager with regex support and import/export.', tables: ['redirects'], routes: 3, ver: '0.4.0' },
  { name: 'analytics-lite', kind: 'gRPC plugin', tag: 'community', color: 'var(--violet)', desc: 'Privacy-first page-view tracking. No cookies. No fingerprinting. PostgreSQL-backed.', tables: ['analytics_events'], routes: 5, ver: '0.2.1' },
  { name: 'algolia-sync', kind: 'gRPC plugin', tag: 'partner', color: 'var(--coral)', desc: 'Stream node create/update/delete events into Algolia. Configurable index mapping.', tables: [], routes: 2, ver: '1.0.0' },
  { name: 'commerce-stripe', kind: 'gRPC plugin', tag: 'partner', color: 'var(--lime)', desc: 'Products, carts, checkouts, webhooks. Stripe-only by design — keep the kernel small.', tables: ['products', 'orders', 'carts'], routes: 22, ver: '0.7.3' },
  { name: 'i18n', kind: 'gRPC plugin', tag: 'core', color: 'var(--magenta)', desc: 'Locale-aware routing, per-field translations, fallback chains, glossary import.', tables: ['translations', 'locales'], routes: 8, ver: '1.1.0' },
  { name: 'webhooks', kind: 'Tengo only', tag: 'core', color: 'var(--amber)', desc: 'Outbound webhooks for any event. HMAC signing. Retry with exponential backoff.', tables: ['webhook_logs'], routes: 4, ver: '0.6.2' },
];

const ExtensionsPage = () => {
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? ALL_EXTS : ALL_EXTS.filter(e => e.tag === filter);
  return (
    <>
      <PageHeader eyebrow="§ extensions"
        title="A package manager, but the packages are sovereign."
        sub="Each extension is a Go plugin binary, a React micro-frontend, SQL migrations, and a manifest — bundled together. The kernel never reaches inside." />
      <section>
        <div className="container container-wide">
          <div style={{ display: 'flex', gap: 4, marginBottom: 'var(--space-5)', flexWrap: 'wrap' }}>
            {['all', 'core', 'community', 'partner'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '6px 14px',
                fontFamily: 'var(--font-mono)', fontSize: 12,
                background: filter === f ? 'var(--accent)' : 'var(--bg-2)',
                color: filter === f ? 'var(--accent-ink)' : 'var(--ink-1)',
                border: '1px solid ' + (filter === f ? 'var(--accent)' : 'var(--line)'),
                borderRadius: 4,
                cursor: 'pointer',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>{f} {filter === f && `(${filtered.length})`}</button>
            ))}
            <div style={{ flex: 1 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)', alignSelf: 'center' }}>
              {filtered.length} extensions · sorted by downloads
            </span>
          </div>

          <div data-grid="3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-2)' }}>
            {filtered.map((e, i) => (
              <div key={e.name} style={{
                padding: 'var(--space-5)',
                borderRight: (i % 3 !== 2) ? '1px solid var(--line)' : 'none',
                borderTop: i >= 3 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 10, height: 10, background: e.color, borderRadius: 2, boxShadow: `0 0 10px ${e.color}` }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>{e.name}</span>
                  </div>
                  <span className="tag" style={{ color: e.color, borderColor: e.color }}>{e.tag}</span>
                </div>
                <p style={{ fontSize: 13, marginBottom: 12, minHeight: 50 }}>{e.desc}</p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{e.kind}</span>
                  <span>v{e.ver}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// ========== THEMES GALLERY ==========

const THEMES = [
  { name: 'hello-vietnam', desc: 'Editorial recipe magazine. Bold typography, generous imagery.', stack: 'recipe + glossary', ver: '1.2.0', color: 'var(--coral)' },
  { name: 'default', desc: 'Minimal docs + blog. The reference theme — read its source.', stack: 'page + post', ver: '1.0.0', color: 'var(--teal)' },
  { name: 'manuscript', desc: 'Long-form writing. Footnotes, sidenotes, hyphenation.', stack: 'essay + note', ver: '0.9.1', color: 'var(--violet)' },
  { name: 'gallery-noir', desc: 'Photography portfolio. Full-bleed images, EXIF metadata.', stack: 'photo + series', ver: '0.7.2', color: 'var(--magenta)' },
  { name: 'changelog', desc: 'Release-focused product blog. Versioned entries, RSS.', stack: 'release + entry', ver: '0.6.0', color: 'var(--lime)' },
  { name: 'kernel-zero', desc: 'Brutal monospace tech blog. The theme this site uses.', stack: 'post + project', ver: '0.4.3', color: 'var(--amber)' },
];

const ThemesPage = () => (
  <>
    <PageHeader eyebrow="§ themes"
      title="Self-contained presentation packages. Activate to install."
      sub="Themes ship layouts, partials, content blocks, assets, and a theme.tengo seed script. Activating runs the script — registering node types, taxonomies, settings, and seeding pages — without restart." />
    <section>
      <div className="container container-wide">
        <div data-grid="3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          {THEMES.map(t => (
            <div key={t.name} style={{
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-2)',
              overflow: 'hidden',
              transition: 'transform 0.2s, border-color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = t.color; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--line)'; }}
            >
              <div style={{
                aspectRatio: '16/10', position: 'relative',
                background: `linear-gradient(135deg, ${t.color}22, var(--bg-0))`,
                borderBottom: '1px solid var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <div className="eyegrid" style={{ position: 'absolute', inset: 0, opacity: 0.22 }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--bg-0) 55%, transparent), transparent 70%)',
                }} />
                <div style={{ position: 'relative', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ fontSize: 11, color: 'var(--ink-2)', letterSpacing: '0.16em', marginBottom: 6 }}>THEME PREVIEW</div>
                  <div style={{ fontSize: 22, color: t.color, letterSpacing: '-0.02em', textShadow: '0 0 16px var(--bg-0)' }}>{t.name}</div>
                </div>
              </div>
              <div style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-0)' }}>{t.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>v{t.ver}</span>
                </div>
                <p style={{ fontSize: 13, marginBottom: 12 }}>{t.desc}</p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>
                  registers: <span style={{ color: 'var(--accent)' }}>{t.stack}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

Object.assign(window, { FeaturesPage, ArchitecturePage, ExtensionsPage, ThemesPage, PageHeader });
