// More pages: About, Blog, Showcase, Pricing, Documentation

const AboutPage = () => (
  <>
    <PageHeader eyebrow="§ about" title="Why Squilla exists." />
    <section>
      <div className="container container-narrow">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.85, color: 'var(--ink-1)' }}>
          <p style={{ marginBottom: 22, fontSize: 18, color: 'var(--ink-0)' }}>
            WordPress made publishing easy in 2003. It's now 2026. The web has changed; the CMS hasn't.
          </p>
          <p style={{ marginBottom: 22 }}>
            We built Squilla because the existing options force a choice: be developer-friendly OR
            be content-editor-friendly. Be fast OR be flexible. Be open-source OR be AI-ready.
            Squilla refuses the trade.
          </p>
          <p style={{ marginBottom: 22 }}>
            The kernel is <span style={{ color: 'var(--accent)' }}>Linux-small</span>.
            The extension model is <span style={{ color: 'var(--violet)' }}>Debian-clean</span>.
            The MCP layer is <span style={{ color: 'var(--coral)' }}>OpenAI-native</span>.
            The performance is <span style={{ color: 'var(--lime)' }}>Go-native</span>.
            The GPL-3.0 license is <span style={{ color: 'var(--magenta)' }}>forever</span>.
          </p>
        </div>

        <div style={{ marginTop: 'var(--space-8)' }}>
          <div className="h-eyebrow">§ principles</div>
          <ol style={{ listStyle: 'none', counterReset: 'p', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['AI agents are first-class users.', 'Not as a "ChatGPT integration." As primary operators with the same API surface humans use.'],
              ['Performance is non-negotiable.', 'Sub-50ms TTFB on every public page. Always.'],
              ['The kernel stays small.', 'If disabling a feature would leave dead code in core, that feature belongs in an extension.'],
              ['Extensions are sovereign.', 'Their tables, their UI, their scripts, their migrations. The kernel doesn\'t reach inside.'],
              ['One-shot setup.', 'docker compose up and you\'re publishing. No package managers, no cron jobs, no PHP-FPM tuning.'],
            ].map(([h, b], i) => (
              <li key={i} style={{
                display: 'grid', gridTemplateColumns: '52px 1fr', gap: 18,
                padding: 'var(--space-4) 0', borderTop: '1px solid var(--line)',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--accent)', lineHeight: 1 }}>0{i + 1}</span>
                <div>
                  <div style={{ fontSize: 17, color: 'var(--ink-0)', marginBottom: 4 }}>{h}</div>
                  <div style={{ fontSize: 14, color: 'var(--ink-1)' }}>{b}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', background: 'var(--bg-2)' }}>
          <div className="h-eyebrow">§ open source</div>
          <p style={{ fontSize: 16, color: 'var(--ink-0)' }}>
            GPL-3.0. No telemetry. No CLA. No "open core" bait-and-switch.
            What's in the repo is the whole thing.
          </p>
        </div>

        <div style={{ marginTop: 'var(--space-8)' }}>
          <div className="h-eyebrow">§ name</div>
          <p style={{ fontSize: 14, color: 'var(--ink-1)' }}>
            <em>Squilla</em> is the Latin genus of mantis shrimps — the fastest punchers in the
            animal kingdom (sub-millisecond strike) and possessing the most complex visual
            system on Earth (16 photoreceptor types vs. our 3). Extreme speed; multi-spectrum
            perception (for AI agents); a segmented body with specialized appendages
            (kernel + extensions). The metaphor wrote itself.
          </p>
        </div>
      </div>
    </section>
  </>
);

const POSTS = [
  { date: '2026-04-18', tag: 'release',     title: 'v0.4.2 — incremental migrations across extension boundaries', read: '6 min',  color: 'var(--lime)' },
  { date: '2026-04-12', tag: 'engineering', title: 'The shrimp punches faster than the kernel switches',           read: '13 min', color: 'var(--coral)' },
  { date: '2026-04-02', tag: 'deep dive',   title: 'Why we don\'t cache: the case for fast originals',             read: '12 min', color: 'var(--violet)' },
  { date: '2026-03-21', tag: 'release',     title: 'v0.4.0 — the MCP rewrite is in',                                read: '9 min',  color: 'var(--lime)' },
  { date: '2026-03-08', tag: 'engineering', title: 'Atomic config maps without Go generics gymnastics',             read: '8 min',  color: 'var(--coral)' },
  { date: '2026-02-28', tag: 'deep dive',   title: 'Resolving Tengo sandbox ergonomics for theme authors',          read: '10 min', color: 'var(--violet)' },
  { date: '2026-02-14', tag: 'philosophy',  title: 'Sovereignty: what an extension actually owns',                  read: '5 min',  color: 'var(--magenta)' },
  { date: '2026-02-02', tag: 'release',     title: 'v0.3.8 — capability gates, formalised',                         read: '4 min',  color: 'var(--lime)' },
  { date: '2026-01-30', tag: 'engineering', title: 'Pre-resolving layout trees at theme activation',                read: '11 min', color: 'var(--coral)' },
  { date: '2026-01-18', tag: 'philosophy',  title: 'Why an AI agent is a first-class user, not an integration',     read: '7 min',  color: 'var(--magenta)' },
  { date: '2026-01-04', tag: 'engineering', title: 'GORM, JSONB, and the read model that doesn\'t lie',             read: '9 min',  color: 'var(--coral)' },
  { date: '2025-12-20', tag: 'release',     title: 'v0.3.0 — first stable extension API',                           read: '5 min',  color: 'var(--lime)' },
  { date: '2025-12-08', tag: 'deep dive',   title: 'Inside the gRPC plugin handshake (and why it\'s bidirectional)', read: '14 min', color: 'var(--violet)' },
  { date: '2025-11-22', tag: 'philosophy',  title: 'On not building yet another framework',                         read: '6 min',  color: 'var(--magenta)' },
];

const POST_CATEGORIES = [
  { id: 'all',         label: 'all',         color: 'var(--ink-1)' },
  { id: 'release',     label: 'release',     color: 'var(--lime)' },
  { id: 'engineering', label: 'engineering', color: 'var(--coral)' },
  { id: 'deep dive',   label: 'deep dive',   color: 'var(--violet)' },
  { id: 'philosophy',  label: 'philosophy',  color: 'var(--magenta)' },
];

const PAGE_SIZE = 6;

const BlogPage = ({ setPage }) => {
  const [cat, setCat] = React.useState('all');
  const [page, setLocalPage] = React.useState(1);

  const filtered = React.useMemo(
    () => cat === 'all' ? POSTS : POSTS.filter(p => p.tag === cat),
    [cat]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  React.useEffect(() => { setLocalPage(1); }, [cat]);

  const counts = React.useMemo(() => {
    const c = { all: POSTS.length };
    POSTS.forEach(p => { c[p.tag] = (c[p.tag] || 0) + 1; });
    return c;
  }, []);

  return (
    <>
      <PageHeader eyebrow="§ blog" title="Engineering, philosophy, releases."
        sub="Long-form posts from the people building Squilla. We don't post often — only when there's something worth reading." />

      <section>
        <div className="container container-narrow">
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: 'var(--space-4) var(--space-4)',
            marginBottom: 'var(--space-5)',
            border: '1px solid var(--line)',
            borderRadius: 6,
            background: 'var(--bg-2)',
            flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: 8,
            }}>filter ›</span>
            {POST_CATEGORIES.map(c => {
              const active = cat === c.id;
              return (
                <button key={c.id}
                  onClick={() => setCat(c.id)}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12,
                    padding: '6px 12px',
                    background: active ? c.color : 'transparent',
                    color: active ? 'var(--bg-0)' : c.color,
                    border: `1px solid ${c.color}`,
                    borderRadius: 3,
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                    transition: 'background 0.15s, color 0.15s',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}>
                  <span>{c.label}</span>
                  <span style={{ opacity: 0.6, fontSize: 10 }}>{counts[c.id] || 0}</span>
                </button>
              );
            })}
            <span style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)',
            }}>
              {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 360, border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden' }}>
            {visible.length === 0 ? (
              <div style={{
                padding: 'var(--space-7) var(--space-4)',
                borderTop: '1px solid var(--line)',
                borderBottom: '1px solid var(--line)',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-3)',
              }}>
                No posts in this category. Try another, or go write one.
              </div>
            ) : visible.map((p, i) => (
              <a key={start + i}
                onClick={() => setPage && setPage('post')}
                className="blog-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '110px 100px 1fr 80px',
                  gap: 24,
                  padding: 'var(--space-5) var(--space-5)',
                  borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.querySelector('.title').style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.querySelector('.title').style.color = 'var(--ink-0)'; }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)' }}>{p.date}</span>
                <span className="tag" style={{ color: p.color, borderColor: p.color, justifySelf: 'start' }}>{p.tag}</span>
                <span className="title" style={{ fontSize: 17, color: 'var(--ink-0)', transition: 'color 0.15s' }}>{p.title}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', justifySelf: 'end' }}>{p.read} →</span>
              </a>
            ))}
            {visible.length > 0 && <div style={{ display: 'none' }} />}
          </div>

          {totalPages > 1 && (
            <div style={{
              marginTop: 'var(--space-6)',
              padding: 'var(--space-4) var(--space-5)',
              border: '1px solid var(--line)',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)',
              flexWrap: 'wrap', gap: 12,
            }}>
              <button
                disabled={safePage === 1}
                onClick={() => setLocalPage(safePage - 1)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  padding: '8px 14px',
                  background: 'transparent',
                  border: '1px solid var(--line)',
                  color: safePage === 1 ? 'var(--ink-3)' : 'var(--ink-1)',
                  borderRadius: 3,
                  cursor: safePage === 1 ? 'not-allowed' : 'pointer',
                  opacity: safePage === 1 ? 0.4 : 1,
                  letterSpacing: '0.04em',
                }}>← prev</button>

              <div style={{ display: 'flex', gap: 6 }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => {
                  const active = n === safePage;
                  return (
                    <button key={n}
                      onClick={() => setLocalPage(n)}
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: 12,
                        width: 32, height: 32,
                        background: active ? 'var(--accent)' : 'transparent',
                        color: active ? 'var(--bg-0)' : 'var(--ink-2)',
                        border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
                        borderRadius: 3,
                        cursor: 'pointer',
                      }}>
                      {String(n).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={safePage === totalPages}
                onClick={() => setLocalPage(safePage + 1)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  padding: '8px 14px',
                  background: 'transparent',
                  border: '1px solid var(--line)',
                  color: safePage === totalPages ? 'var(--ink-3)' : 'var(--ink-1)',
                  borderRadius: 3,
                  cursor: safePage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: safePage === totalPages ? 0.4 : 1,
                  letterSpacing: '0.04em',
                }}>next →</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const SHOWCASE = [
  { name: 'arctic-method.com',  type: 'editorial', built: '4 days', color: 'var(--teal)' },
  { name: 'kindred-tours.travel', type: 'small locals-driven travel agency', built: '1 week', color: 'var(--violet)' },
  { name: 'recipe.notes',       type: 'recipes',   built: '1 day (AI-built)', color: 'var(--coral)' },
  { name: 'kernel-zero.dev',    type: 'tech blog', built: '3 days', color: 'var(--lime)' },
  { name: 'forms.cooperative',  type: 'docs',      built: '5 days', color: 'var(--magenta)' },
  { name: 'patches.local',      type: 'changelog', built: '2 days', color: 'var(--amber)' },
];

const ShowcasePage = () => (
  <>
    <PageHeader eyebrow="§ showcase" title="Sites built on Squilla."
      sub="A small but growing list. Are you running Squilla in production? Open a PR." />
    <section>
      <div className="container container-wide">
        <div data-grid="3" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)',
        }}>
          {SHOWCASE.map(s => (
            <div key={s.name} style={{
              border: '1px solid var(--line)', borderRadius: 'var(--radius-md)',
              background: 'var(--bg-2)', overflow: 'hidden',
            }}>
              <div style={{
                aspectRatio: '4/3', position: 'relative',
                background: `linear-gradient(135deg, var(--bg-0), ${s.color}15)`,
                borderBottom: '1px solid var(--line)',
              }}>
                <div className="eyegrid" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--bg-0) 70%, transparent) 100%)',
                }} />
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  color: 'var(--ink-1)', letterSpacing: '0.14em',
                  background: 'var(--bg-0)', padding: '3px 8px', borderRadius: 3,
                  border: '1px solid var(--line)',
                }}>
                  PLACEHOLDER · screenshot
                </div>
                <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                  <Carapace segments={10} height={3} />
                </div>
              </div>
              <div style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ink-0)' }}>{s.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{s.type} · built in {s.built}</div>
                </div>
                <span style={{ color: 'var(--accent)' }}>↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const PricingPage = () => (
  <>
    <PageHeader eyebrow="§ pricing" title="There is no pricing."
      sub="Squilla is GPL-3.0. The repo is the product. There is no paid tier, no managed offering, no enterprise SKU — and no plans for any of those." />
    <section>
      <div className="container container-wide">
        <div style={{
          padding: 'var(--space-7)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-2)',
          maxWidth: 760, margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              padding: '4px 12px', border: '1px solid var(--accent)',
              color: 'var(--accent)', borderRadius: 999, letterSpacing: '0.14em',
            }}>FREE · GPL-3.0 · FOREVER</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 96, lineHeight: 1,
            color: 'var(--ink-0)', marginBottom: 8,
          }}>
            $0
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)', marginBottom: 'var(--space-6)' }}>
            no usage limits · no seat caps · no feature gates
          </div>

          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 'var(--space-6)', textAlign: 'left' }}>
            {[
              'Full kernel + all built-in extensions',
              '~50 MCP tools across 15 domains',
              'Sub-50ms TTFB target',
              'No telemetry · no CLA',
              'GPL-3.0 license',
              'Community support (Discord, GitHub)',
            ].map(b => (
              <li key={b} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink-1)' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>+</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <button className="btn btn-primary" style={{ marginRight: 8 }}>
            <span style={{ opacity: 0.6 }}>$</span> docker compose up
          </button>
          <button className="btn">View on GitHub ↗</button>

          <div style={{
            marginTop: 'var(--space-7)', paddingTop: 'var(--space-5)',
            borderTop: '1px solid var(--line)',
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--ink-2)', textAlign: 'left',
          }}>
            <div style={{ color: 'var(--ink-3)', letterSpacing: '0.14em', marginBottom: 8 }}>// FAQ</div>
            <div style={{ marginBottom: 10 }}><span style={{ color: 'var(--ink-0)' }}>Is there a managed/hosted version?</span> No, and there are no plans for one. Run it yourself or run nothing.</div>
            <div style={{ marginBottom: 10 }}><span style={{ color: 'var(--ink-0)' }}>Is there an enterprise tier?</span> No. The kernel doesn't know what an enterprise is.</div>
            <div><span style={{ color: 'var(--ink-0)' }}>Will pricing change later?</span> The license can't. GPL-3.0 is one-way.</div>
          </div>
        </div>
      </div>
    </section>
  </>
);

Object.assign(window, { AboutPage, BlogPage, ShowcasePage, PricingPage });
