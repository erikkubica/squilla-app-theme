// Documentation page — sidebar nav + content area + code samples + search

const DOCS = [
  { sec: 'Getting Started', items: [
    { id: 'install', label: 'Installation (Docker)' },
    { id: 'coolify', label: 'Coolify one-click deploy' },
    { id: 'first-node', label: 'Your first content node' },
    { id: 'theme-activate', label: 'Activating a theme' },
  ]},
  { sec: 'Architecture', items: [
    { id: 'kernel-ext', label: 'Kernel + extensions' },
    { id: 'coreapi', label: 'CoreAPI overview' },
    { id: 'event-bus', label: 'Event bus and filter chain' },
    { id: 'capabilities', label: 'The capability system' },
  ]},
  { sec: 'Theme Development', items: [
    { id: 'theme-json', label: 'theme.json manifest' },
    { id: 'layouts', label: 'Layouts, partials, blocks' },
    { id: 'theme-tengo', label: 'The seed script (theme.tengo)' },
    { id: 'asset-refs', label: 'Asset references' },
    { id: 'field-types', label: 'Field types and seeding' },
    { id: 'forms-handshake', label: 'Forms-extension handshake' },
  ]},
  { sec: 'Extension Development', items: [
    { id: 'manifest', label: 'Manifest schema' },
    { id: 'grpc-plugin', label: 'gRPC plugin (5 methods)' },
    { id: 'tengo-only', label: 'Tengo-only extensions' },
    { id: 'cap-matrix', label: 'The 24 capabilities' },
    { id: 'admin-ui', label: 'Admin UI micro-frontend' },
    { id: 'migrations', label: 'SQL migrations' },
    { id: 'route-proxy', label: 'Public route proxy' },
  ]},
  { sec: 'Tengo Reference', items: [
    { id: 'tengo-modules', label: 'core/* modules' },
    { id: 'sandbox', label: 'Sandbox semantics' },
    { id: 'tengo-events', label: 'Event hooks · HTTP routes' },
  ]},
  { sec: 'AI / MCP Reference', items: [
    { id: 'mcp-tools', label: 'All ~50 MCP tools' },
    { id: 'core-guide', label: 'The core.guide meta-tool' },
    { id: 'resource-uris', label: 'Resource URIs' },
  ]},
  { sec: 'Server-Driven UI', items: [
    { id: 'vdus-boot', label: 'Boot manifest, layout trees, SSE' },
    { id: 'vdus-action', label: 'Action handler' },
    { id: 'vdus-registry', label: 'Component registry' },
  ]},
  { sec: 'Database Schema', items: [
    { id: 'gorm-models', label: '27 GORM models' },
    { id: 'jsonb', label: 'JSONB conventions' },
    { id: 'migration-system', label: 'Migration system' },
  ]},
  { sec: 'Security', items: [
    { id: 'cap-perms', label: 'Capability-based permissions' },
    { id: 'license', label: 'Ed25519 license verification' },
    { id: 'encryption', label: 'At-rest encryption for secrets' },
    { id: 'pr-checklist', label: 'PR-time security checklist' },
  ]},
  { sec: 'Deployment', items: [
    { id: 'docker-compose', label: 'Docker Compose' },
    { id: 'coolify-deploy', label: 'Coolify' },
    { id: 'multi-arch', label: 'Multi-arch images' },
    { id: 'env-vars', label: 'Environment variables' },
  ]},
];

const DocsPage = () => {
  const [active, setActive] = React.useState('install');
  const [search, setSearch] = React.useState('');
  const [openSec, setOpenSec] = React.useState(() => Object.fromEntries(DOCS.map(d => [d.sec, true])));

  const allItems = DOCS.flatMap(s => s.items.map(it => ({ ...it, sec: s.sec })));
  const filtered = search
    ? allItems.filter(i => i.label.toLowerCase().includes(search.toLowerCase()) || i.sec.toLowerCase().includes(search.toLowerCase()))
    : null;

  return (
    <section style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="container container-wide docs-shell" style={{
        display: 'grid', gridTemplateColumns: '280px 1fr 220px',
        gap: 'var(--space-7)', minHeight: 'calc(100vh - 56px - 320px)',
      }}>
        {/* SIDEBAR */}
        <aside className="docs-sidebar" style={{
          borderRight: '1px solid var(--line)',
          paddingTop: 'var(--space-6)', paddingRight: 'var(--space-5)',
          paddingBottom: 'var(--space-6)',
          position: 'sticky', top: 56, height: 'calc(100vh - 56px)',
          overflowY: 'auto',
        }}>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search docs · ⌘K"
              style={{
                width: '100%', padding: '8px 12px 8px 32px',
                background: 'var(--bg-2)', border: '1px solid var(--line)',
                borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 12,
                color: 'var(--ink-0)', outline: 'none',
              }}
            />
            <span style={{ position: 'absolute', left: 10, top: 8, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>⌕</span>
          </div>

          {filtered ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {filtered.length === 0 && <div style={{ padding: 12, color: 'var(--ink-3)', fontSize: 12, fontStyle: 'italic' }}>No results — the kernel is fine. The search is sus.</div>}
              {filtered.map(it => (
                <button key={it.id} onClick={() => { setActive(it.id); setSearch(''); }} style={{
                  textAlign: 'left', padding: '6px 10px', fontSize: 12,
                  fontFamily: 'var(--font-mono)', borderRadius: 3,
                  color: 'var(--ink-1)', background: 'transparent',
                }}>
                  <div>{it.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>{it.sec}</div>
                </button>
              ))}
            </div>
          ) : (
            DOCS.map(group => (
              <div key={group.sec} style={{ marginBottom: 14 }}>
                <button
                  onClick={() => setOpenSec(s => ({ ...s, [group.sec]: !s[group.sec] }))}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '100%', padding: '4px 0',
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--ink-2)',
                  }}
                >
                  <span>{group.sec}</span>
                  <span style={{ color: 'var(--ink-3)' }}>{openSec[group.sec] ? '−' : '+'}</span>
                </button>
                {openSec[group.sec] && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--line)', marginLeft: 2, marginTop: 6 }}>
                    {group.items.map(it => (
                      <li key={it.id}>
                        <button onClick={() => setActive(it.id)} style={{
                          display: 'block', width: '100%', textAlign: 'left',
                          padding: '5px 12px', fontSize: 13,
                          color: active === it.id ? 'var(--accent)' : 'var(--ink-1)',
                          borderLeft: active === it.id ? '2px solid var(--accent)' : '2px solid transparent',
                          marginLeft: -1,
                          background: active === it.id ? 'color-mix(in srgb, var(--accent) 5%, transparent)' : 'transparent',
                        }}
                        onMouseEnter={e => { if (active !== it.id) e.currentTarget.style.color = 'var(--ink-0)'; }}
                        onMouseLeave={e => { if (active !== it.id) e.currentTarget.style.color = 'var(--ink-1)'; }}
                        >{it.label}</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </aside>

        {/* CONTENT */}
        <main style={{ paddingTop: 'var(--space-7)', paddingBottom: 'var(--space-9)', minWidth: 0 }}>
          <DocContent id={active} />
        </main>

        {/* TOC */}
        <aside className="docs-toc" style={{
          paddingTop: 'var(--space-7)',
          paddingLeft: 'var(--space-4)',
          borderLeft: '1px solid var(--line)',
          position: 'sticky', top: 56, height: 'calc(100vh - 56px)',
          overflowY: 'auto',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 12 }}>On this page</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
            {['Overview', 'Prerequisites', 'Quickstart', 'Configuration', 'Verifying', 'Troubleshooting'].map((h, i) => (
              <li key={h}>
                <a style={{
                  color: i === 0 ? 'var(--accent)' : 'var(--ink-2)',
                  borderLeft: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
                  paddingLeft: 8, marginLeft: -2,
                  display: 'block',
                }}>{h}</a>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 'var(--space-6)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 10 }}>Edit this page</div>
            <a style={{ fontSize: 12, color: 'var(--ink-1)', display: 'block', marginBottom: 6 }}>↗ on github</a>
            <a style={{ fontSize: 12, color: 'var(--ink-1)', display: 'block' }}>↗ open issue</a>
          </div>
        </aside>
      </div>
    </section>
  );
};

const DOC_CONTENT = {
  install: {
    breadcrumb: ['Docs', 'Getting Started', 'Installation'],
    title: 'Installation (Docker)',
    body: 'Squilla ships as a multi-stage Alpine Docker image (amd64 + arm64). The fastest path to a running kernel is docker compose. The compose file boots PostgreSQL 16, the Squilla core, and five extensions. App is at localhost:3000. The default admin login is printed once to the logs — copy it before it scrolls away.',
  },
  coolify:    { breadcrumb: ['Docs', 'Getting Started', 'Coolify'], title: 'Coolify one-click deploy', body: 'Squilla ships a coolify-compose.yml. Point Coolify at the repo, click deploy, walk away. Coolify handles TLS, multi-arch builds, and zero-downtime restarts.' },
  'first-node': { breadcrumb: ['Docs', 'Getting Started', 'First node'], title: 'Your first content node', body: 'Two paths: the admin UI, or core.node.create from the MCP console. Both write the same row. The MCP path is preferred for agents and for repeatable seeds.' },
  'theme-activate': { breadcrumb: ['Docs', 'Getting Started', 'Theme activation'], title: 'Activating a theme', body: 'Activation is non-destructive. The kernel runs theme.tengo in a sandboxed VM, registers node types, seeds content, and atomically swaps the layout tree. Existing nodes are untouched.' },
  'kernel-ext': { breadcrumb: ['Docs', 'Architecture'], title: 'Kernel + extensions', body: 'The kernel is the only Go binary that\'s always running. Extensions are gRPC plugin processes (HashiCorp go-plugin) launched on activation. Communication is bidirectional through a GRPCBroker.' },
  coreapi:    { breadcrumb: ['Docs', 'Architecture', 'CoreAPI'], title: 'CoreAPI overview', body: 'The CoreAPI is the kernel\'s public surface. Extensions, the MCP server, and admin UI all consume it. It exposes nodes, settings, events, filters, capability checks, and the rendering pipeline.' },
  'event-bus': { breadcrumb: ['Docs', 'Architecture', 'Events'], title: 'Event bus and filter chain', body: 'Events are fire-and-forget. Filters are synchronous, ordered, and can mutate payloads. Subscribe declaratively in the manifest. The kernel emits node.created, node.updated, theme.activated, and ~30 more.' },
  'mcp-tools': { breadcrumb: ['Docs', 'AI / MCP', 'Tools'], title: 'All ~50 MCP tools', body: 'Grouped by domain: content, theme, extension, settings, media, forms, users, menus, filters, events, mcp-meta. Each tool returns structured JSON; errors are typed; auth is per-capability.' },
};

const DocContent = ({ id }) => {
  const c = DOC_CONTENT[id] || { breadcrumb: ['Docs'], title: 'Resolving layout tree…', body: 'This page is unrendered. Pick a doc from the sidebar.' };
  return (
    <article>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', marginBottom: 14 }}>
        {c.breadcrumb.map((b, i) => (
          <span key={i}>
            {b}{i < c.breadcrumb.length - 1 && <span style={{ margin: '0 8px', color: 'var(--ink-3)' }}>/</span>}
          </span>
        ))}
      </div>
      <h1 style={{ fontSize: 'clamp(28px, 3vw, 44px)', marginBottom: 'var(--space-4)' }}>{c.title}</h1>
      <p style={{ fontSize: 17, lineHeight: 1.6, marginBottom: 'var(--space-6)', color: 'var(--ink-1)', maxWidth: '64ch' }}>{c.body}</p>

      <h2 id="prereq" style={{ fontSize: 22, marginBottom: 'var(--space-3)', marginTop: 'var(--space-6)', fontFamily: 'var(--font-mono)' }}>Prerequisites</h2>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 'var(--space-6)', maxWidth: '64ch' }}>
        {[
          'Docker 24+ with Compose v2',
          'PostgreSQL 16 (or use the bundled compose service)',
          'Optional: an MCP-aware AI client (Claude Desktop, Cursor, …)',
        ].map(b => (
          <li key={b} style={{ fontSize: 14, color: 'var(--ink-1)', display: 'flex', gap: 10 }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>▸</span> {b}
          </li>
        ))}
      </ul>

      <h2 id="quickstart" style={{ fontSize: 22, marginBottom: 'var(--space-3)', marginTop: 'var(--space-6)', fontFamily: 'var(--font-mono)' }}>Quickstart</h2>
      <div className="code" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="code-header">
          <span style={{ color: 'var(--ink-2)' }}>$ shell</span>
          <span style={{ marginLeft: 'auto', color: 'var(--ink-3)' }}>copy</span>
        </div>
        <div className="code-body">
{`git clone https://github.com/squilla-cms/squilla.git
cd squilla
docker compose up --build

`}<span className="tok-com"># open http://localhost:3000</span>{`
`}<span className="tok-com"># admin login is printed once on first boot</span>
        </div>
      </div>

      <div style={{
        padding: 'var(--space-4) var(--space-5)',
        background: 'color-mix(in srgb, var(--coral) 5%, transparent)',
        border: '1px solid color-mix(in srgb, var(--coral) 30%, var(--line))',
        borderLeft: '3px solid var(--coral)',
        borderRadius: 4,
        marginBottom: 'var(--space-6)',
        maxWidth: '64ch',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--coral)', marginBottom: 6 }}>HEADS UP</div>
        <p style={{ color: 'var(--ink-0)', fontSize: 14 }}>
          The default admin password is printed exactly once, to the container's stdout, on first boot.
          Capture it. There's no recovery flow short of <code>core.user.set_password</code> via MCP.
        </p>
      </div>

      <h2 id="config" style={{ fontSize: 22, marginBottom: 'var(--space-3)', marginTop: 'var(--space-6)', fontFamily: 'var(--font-mono)' }}>Configuration</h2>
      <p style={{ marginBottom: 'var(--space-4)', maxWidth: '64ch' }}>
        Squilla reads <code style={{ color: 'var(--accent)' }}>config.yaml</code> from the working directory,
        with environment variable overrides. The full env reference is at <a style={{ color: 'var(--accent)' }}>Deployment / Environment variables</a>.
      </p>

      <div className="code" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="code-header">
          <span style={{ width: 8, height: 8, background: 'var(--coral)', borderRadius: '50%' }} />
          <span style={{ width: 8, height: 8, background: 'var(--amber)', borderRadius: '50%' }} />
          <span style={{ width: 8, height: 8, background: 'var(--lime)',  borderRadius: '50%' }} />
          <span style={{ marginLeft: 8 }}>config.yaml</span>
        </div>
        <div className="code-body">
{`server:
  bind: `}<span className="tok-str">":3000"</span>{`
  ttfb_budget_ms: `}<span className="tok-num">50</span>{`

database:
  url: `}<span className="tok-str">"postgres://squilla:squilla@db:5432/squilla"</span>{`
  pool_max: `}<span className="tok-num">25</span>{`

mcp:
  enabled: `}<span className="tok-num">true</span>{`
  transport: `}<span className="tok-str">"stdio"</span>{`        `}<span className="tok-com"># or "http"</span>{`

extensions:
  - media-manager
  - forms
  - email-manager
  - sitemap-generator
  - content-blocks`}
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        paddingTop: 'var(--space-5)', borderTop: '1px solid var(--line)',
        fontFamily: 'var(--font-mono)', fontSize: 13,
      }}>
        <a style={{ color: 'var(--ink-1)' }}>← Previous · Overview</a>
        <a style={{ color: 'var(--accent)' }}>Coolify deploy →</a>
      </div>
    </article>
  );
};

Object.assign(window, { DocsPage });
