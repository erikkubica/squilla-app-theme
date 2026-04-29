// Architecture diagram + code section + extensions grid + theme + perf

const ArchDiagram = () => {
  const [hover, setHover] = React.useState(null);
  const layers = [
    { id: 'public', label: 'PUBLIC WEB', desc: 'Fiber HTTP · pre-resolved layouts · cached', color: 'var(--ink-3)', y: 0 },
    { id: 'mcp',    label: 'MCP SERVER', desc: 'Model Context Protocol · ~50 tools · stdio + http', color: 'var(--coral)', y: 1 },
    { id: 'core',   label: 'KERNEL (CoreAPI)', desc: 'nodes · rendering · auth · event bus · capability gates', color: 'var(--teal)', y: 2 },
    { id: 'grpc',   label: 'gRPC PLUGIN BUS', desc: 'HashiCorp go-plugin · bidirectional · GRPCBroker', color: 'var(--violet)', y: 3 },
    { id: 'ext',    label: 'EXTENSIONS', desc: 'media · forms · email · sitemap · blocks · providers', color: 'var(--magenta)', y: 4 },
    { id: 'db',     label: 'POSTGRESQL 16', desc: 'JSONB · GIN indexes · per-extension migrations · pooling', color: 'var(--lime)', y: 5 },
  ];

  return (
    <section>
      <div className="container container-wide">
        <div data-cols="2-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'var(--space-8)', alignItems: 'start' }}>
          <div>
            <div className="h-eyebrow">§ architecture</div>
            <h2 style={{ marginBottom: 'var(--space-5)' }}>A kernel<br/>for kernels.</h2>
            <p style={{ marginBottom: 'var(--space-5)' }}>
              Squilla's architecture is borrowed from operating systems: the kernel does the
              minimum required to be a CMS, and everything else is a sovereign extension.
              Disable an extension and there is no dead code in core. Add a new extension and
              it brings its own database tables, HTTP routes, admin UI pages, scripts, and migrations.
            </p>
            <div style={{
              padding: 'var(--space-5)',
              border: '1px solid var(--accent)',
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--accent) 6%, transparent)',
              position: 'relative',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.16em', color: 'var(--accent)', marginBottom: 8,
              }}>HARD RULE</div>
              <p style={{ color: 'var(--ink-0)', fontSize: 15, fontStyle: 'italic', maxWidth: '38ch' }}>
                If disabling an extension would leave dead code in core,
                that code belongs in the extension, not the core.
              </p>
            </div>
          </div>

          <div style={{
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-2)',
            padding: 'var(--space-5)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div className="eyegrid" style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }} />
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {layers.map((l, i) => {
                const isHover = hover === l.id;
                return (
                  <div
                    key={l.id}
                    onMouseEnter={() => setHover(l.id)}
                    onMouseLeave={() => setHover(null)}
                    style={{
                      display: 'grid', gridTemplateColumns: '14px 1fr auto', gap: 14,
                      padding: '14px 16px',
                      background: isHover ? 'var(--bg-3)' : 'var(--bg-1)',
                      border: `1px solid ${isHover ? l.color : 'var(--line)'}`,
                      borderRadius: 6,
                      transition: 'all 0.15s',
                      cursor: 'default',
                    }}
                  >
                    <div style={{
                      width: 8, height: 8, borderRadius: 2,
                      background: l.color, marginTop: 6,
                      boxShadow: isHover ? `0 0 12px ${l.color}` : 'none',
                    }} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-0)', letterSpacing: '0.04em' }}>
                        {l.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-2)', marginTop: 2 }}>
                        {l.desc}
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)' }}>
                      L{i}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              marginTop: 'var(--space-4)',
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-2)',
            }}>
              <div style={{ padding: '8px 12px', background: 'var(--bg-1)', borderRadius: 4, border: '1px solid var(--line)' }}>
                <div style={{ color: 'var(--ink-3)' }}>kernel</div>
                <div style={{ color: 'var(--ink-0)', fontSize: 11 }}>internal/cms · internal/coreapi</div>
              </div>
              <div style={{ padding: '8px 12px', background: 'var(--bg-1)', borderRadius: 4, border: '1px solid var(--line)' }}>
                <div style={{ color: 'var(--ink-3)' }}>extensions</div>
                <div style={{ color: 'var(--ink-0)', fontSize: 11 }}>extensions/*/plugin.go</div>
              </div>
              <div style={{ padding: '8px 12px', background: 'var(--bg-1)', borderRadius: 4, border: '1px solid var(--line)' }}>
                <div style={{ color: 'var(--ink-3)' }}>themes</div>
                <div style={{ color: 'var(--ink-0)', fontSize: 11 }}>themes/*/theme.tengo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EXTS = [
  { name: 'media-manager', kind: 'gRPC plugin', tag: 'core', color: 'var(--teal)',
    desc: 'Image library with auto-WebP, on-the-fly resize, focal points, asset import handshake on theme activation.',
    tables: ['media_files', 'media_folders', 'media_variants'], routes: 12, ver: '1.4.0' },
  { name: 'forms', kind: 'gRPC plugin', tag: 'core', color: 'var(--violet)',
    desc: 'Conditional logic, file uploads, GDPR field types, multi-step layouts, webhooks, notification rules.',
    tables: ['forms', 'form_submissions', 'form_fields'], routes: 18, ver: '1.2.1' },
  { name: 'email-manager', kind: 'gRPC plugin', tag: 'core', color: 'var(--coral)',
    desc: 'Email templates, sending rules, delivery logs, provider abstraction (SMTP, Resend, more). Triggered by events.',
    tables: ['email_templates', 'email_logs'], routes: 9, ver: '0.9.4' },
  { name: 'sitemap-generator', kind: 'Tengo + Go', tag: 'core', color: 'var(--lime)',
    desc: 'Yoast-style XML sitemaps with priority tuning, lastmod accuracy, automatic submission.',
    tables: ['sitemap_entries'], routes: 4, ver: '1.0.2' },
  { name: 'content-blocks', kind: 'Manifest only', tag: 'core', color: 'var(--magenta)',
    desc: 'Declarative block library — accordion, alert, before-after, code, comparison-table, …',
    tables: [], routes: 0, ver: '2.0.0' },
  { name: 'resend-provider', kind: 'Tengo only', tag: 'core', color: 'var(--amber)',
    desc: 'Pluggable email transport. Resend in ~20 lines of Tengo. Yes, really.',
    tables: [], routes: 1, ver: '0.3.0' },
];

const ExtensionsGrid = () => (
  <section>
    <div className="container container-wide">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-7)', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="h-eyebrow">§ built-in extensions</div>
          <h2>Six extensions out of the box.<br/>Built like a third-party would build them.</h2>
        </div>
        <p style={{ maxWidth: '40ch', fontSize: 14 }}>
          Squilla ships with reference extensions that exercise every part of the extension API.
          They are not core code in disguise — they're the same gRPC plugins you'd build yourself.
        </p>
      </div>

      <div data-grid="3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-2)' }}>
        {EXTS.map((e, i) => (
          <div key={e.name} style={{
            padding: 'var(--space-5)',
            borderRight: (i % 3 !== 2) ? '1px solid var(--line)' : 'none',
            borderTop: i >= 3 ? '1px solid var(--line)' : 'none',
            position: 'relative',
            transition: 'background 0.15s',
            cursor: 'default',
          }}
          onMouseEnter={e2 => e2.currentTarget.style.background = 'var(--bg-3)'}
          onMouseLeave={e2 => e2.currentTarget.style.background = 'transparent'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 10, height: 10, background: e.color, borderRadius: 2, boxShadow: `0 0 10px ${e.color}` }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ink-0)' }}>{e.name}</span>
              </div>
              <span className="tag" style={{ borderColor: e.color, color: e.color }}>{e.tag}</span>
            </div>
            <p style={{ fontSize: 13, marginBottom: 16, minHeight: 60 }}>{e.desc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              <Stat label="kind"   val={e.kind} />
              <Stat label="ver"    val={e.ver} />
              <Stat label="tables" val={e.tables.length || '—'} />
              <Stat label="routes" val={e.routes || '—'} />
            </div>

            {e.tables.length > 0 && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--line)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', marginBottom: 6, letterSpacing: '0.1em' }}>OWNS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {e.tables.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      padding: '2px 6px', background: 'var(--bg-0)',
                      border: '1px solid var(--line)', borderRadius: 3,
                      color: 'var(--ink-1)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'var(--space-5)', textAlign: 'center' }}>
        <button className="btn">build your own extension <span style={{ color: 'var(--accent)' }}>→</span></button>
      </div>
    </div>
  </section>
);

const Stat = ({ label, val }) => (
  <div style={{ padding: '6px 8px', background: 'var(--bg-0)', borderRadius: 4 }}>
    <div style={{ color: 'var(--ink-3)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ color: 'var(--ink-0)' }}>{val}</div>
  </div>
);

const ThemeSection = () => (
  <section>
    <div className="container container-wide">
      <div data-cols="2-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
        <div>
          <div className="h-eyebrow">§ themes</div>
          <h2 style={{ marginBottom: 'var(--space-5)' }}>Themes are<br/>sovereign too.</h2>
          <p style={{ marginBottom: 'var(--space-5)' }}>
            A Squilla theme is a self-contained package: layouts, partials, content blocks,
            assets, Tengo scripts that seed content on activation. Activating a theme runs
            its <code style={{ color: 'var(--accent)' }}>theme.tengo</code> script —
            registering node types, taxonomies, and seeding pages — with zero server restart.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 'var(--space-5)' }}>
            {[
              { k: 'Layouts',  v: 'Page-level templates. .node · .app · .user', c: 'var(--teal)' },
              { k: 'Partials', v: 'Reusable fragments. Same context plus .partial', c: 'var(--violet)' },
              { k: 'Blocks',   v: 'Atomic content units. Self-contained, schema-defined, render with their own field data only.', c: 'var(--magenta)' },
            ].map(row => (
              <div key={row.k} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 14, padding: '10px 0', borderTop: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                  <span style={{ width: 6, height: 6, background: row.c, borderRadius: 1 }} />
                  {row.k}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-1)' }}>{row.v}</div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '14px 18px',
            background: 'var(--bg-2)',
            border: '1px solid var(--line)',
            borderLeft: '3px solid var(--accent)',
            borderRadius: 4,
            fontStyle: 'italic',
            color: 'var(--ink-0)',
          }}>
            Activate a theme. The CMS reorganizes itself around it. No restart.
          </div>
        </div>

        <div className="code">
          <div className="code-header">
            <span style={{ width: 8, height: 8, background: 'var(--coral)', borderRadius: '50%' }} />
            <span style={{ width: 8, height: 8, background: 'var(--amber)', borderRadius: '50%' }} />
            <span style={{ width: 8, height: 8, background: 'var(--lime)',  borderRadius: '50%' }} />
            <span style={{ marginLeft: 8 }}>themes/hello-vietnam/theme.tengo</span>
          </div>
          <div className="code-body">
{`core    := import("core/cms")
nodes   := import("core/nodes")
events  := import("core/events")

`}<span className="tok-com">// register the recipe node type</span>{`
nodes.register_type({
  slug: `}<span className="tok-str">"recipe"</span>{`,
  fields: [
    {name: `}<span className="tok-str">"hero_image"</span>{`, type: `}<span className="tok-str">"media"</span>{`},
    {name: `}<span className="tok-str">"prep_minutes"</span>{`, type: `}<span className="tok-str">"int"</span>{`},
    {name: `}<span className="tok-str">"servings"</span>{`,    type: `}<span className="tok-str">"int"</span>{`},
    {name: `}<span className="tok-str">"ingredients"</span>{`, type: `}<span className="tok-str">"repeater"</span>{`},
    {name: `}<span className="tok-str">"instructions"</span>{`, type: `}<span className="tok-str">"richtext"</span>{`},
  ]
})

`}<span className="tok-com">// seed a starter recipe</span>{`
core.node_create({
  type: `}<span className="tok-str">"recipe"</span>{`,
  title: `}<span className="tok-str">"Caramelized scallops"</span>{`,
  fields: { prep_minutes: `}<span className="tok-num">18</span>{`, servings: `}<span className="tok-num">2</span>{` }
})

events.emit(`}<span className="tok-str">"theme.seeded"</span>{`, { theme: `}<span className="tok-str">"hello-vietnam"</span>{` })`}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PerfSection = () => {
  const [ttfb, setTtfb] = React.useState(23);
  React.useEffect(() => {
    const i = setInterval(() => setTtfb(18 + Math.floor(Math.random() * 14)), 1100);
    return () => clearInterval(i);
  }, []);
  const points = [
    'Atomic configuration maps — hot-swapped without locks',
    'Pre-resolved layout trees — no template lookup at request time',
    'JSONB + GIN indexes for content — sub-millisecond field queries',
    'PostgreSQL connection pooling — saturated under load',
    'No N+1 queries — eager-loaded relations across all read paths',
    'Sub-50ms TTFB target on public pages, measured in CI',
  ];

  return (
    <section>
      <div className="container container-wide">
        <div data-cols="2-1" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
          <div>
            <div className="h-eyebrow">§ performance</div>
            <h2 style={{ marginBottom: 'var(--space-5)' }}>Built for the metric<br/>that matters: TTFB.</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {points.map(p => (
                <li key={p} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'var(--ink-1)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>▸</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            border: '1px solid var(--line)', borderRadius: 'var(--radius-md)',
            background: 'var(--bg-2)', padding: 'var(--space-5)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
              animation: 'sweep 3s linear infinite',
            }} />
            <style>{`@keyframes sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }`}</style>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em' }}>LIVE TTFB · /recipes/scallops</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 64, lineHeight: 1, color: 'var(--accent)', marginTop: 6 }}>
                  {ttfb}<span style={{ fontSize: 24, color: 'var(--ink-2)' }}>ms</span>
                </div>
              </div>
              <div className="tag" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>under budget</div>
            </div>

            <div style={{ height: 80, position: 'relative', borderTop: '1px dashed var(--line)', borderBottom: '1px dashed var(--line)', display: 'flex', alignItems: 'flex-end', gap: 3, padding: '8px 0' }}>
              {Array.from({ length: 48 }).map((_, i) => {
                const h = 30 + Math.sin(i * 0.4) * 14 + Math.random() * 10;
                return <div key={i} style={{ flex: 1, height: h, background: i > 40 ? 'var(--accent)' : 'var(--line-strong)', borderRadius: 1 }} />;
              })}
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: '50%',
                borderTop: '1px dashed var(--coral)',
              }}>
                <span style={{ position: 'absolute', right: 4, top: -16, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--coral)' }}>50ms budget</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              <Stat label="p50"  val="21ms" />
              <Stat label="p95"  val="38ms" />
              <Stat label="p99"  val="46ms" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FooterCTA = () => (
  <section className="huge" style={{ position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CompoundEye size={520} density="dense" />
    </div>
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse at center, var(--bg-0) 0%, color-mix(in srgb, var(--bg-0) 70%, transparent) 35%, transparent 70%)',
    }} />
    <div className="container container-narrow" style={{ position: 'relative', textAlign: 'center' }}>
      <div className="h-eyebrow" style={{ justifyContent: 'center' }}>§ try it</div>
      <h2 style={{ marginBottom: 'var(--space-5)' }}>Three minutes from publishing.</h2>

      <div style={{
        margin: '0 auto var(--space-5)', maxWidth: 620,
        background: 'var(--bg-0)',
        border: '1px solid var(--line)',
        borderLeft: '2px solid var(--accent)',
        borderRadius: 6,
        padding: '14px 18px',
        textAlign: 'left',
        fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7,
        color: 'var(--ink-1)',
      }}>
        <div><span style={{ color: 'var(--ink-3)' }}>$</span> <span style={{ color: 'var(--accent)' }}>git clone</span> github.com/squilla/squilla</div>
        <div><span style={{ color: 'var(--ink-3)' }}>$</span> <span style={{ color: 'var(--accent)' }}>docker compose up</span> --build</div>
        <div style={{ color: 'var(--ink-3)' }}>→ app at localhost:3000 · admin login printed to logs</div>
      </div>

      <p style={{ margin: '0 auto var(--space-6)', fontSize: 15, color: 'var(--ink-1)', maxWidth: 540 }}>
        Five extensions active, one theme seeded. You're three minutes from publishing.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-primary"><span style={{opacity:.6}}>$</span> docker compose up <span style={{opacity:.6, marginLeft: 4}}>→</span></button>
        <button className="btn">View on GitHub ↗</button>
      </div>
    </div>
  </section>
);

Object.assign(window, { ArchDiagram, ExtensionsGrid, ThemeSection, PerfSection, FooterCTA });
