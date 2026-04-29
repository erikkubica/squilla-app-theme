// 404 page + Legal/Text pages

const NotFoundPage = ({ setPage }) => (
  <section style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CompoundEye size={520} density="dense" />
    </div>
    <div className="container container-narrow" style={{ position: 'relative', textAlign: 'center' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em',
        color: 'var(--coral)', marginBottom: 'var(--space-4)',
      }}>HTTP 404 · UNRENDERED</div>

      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 'clamp(80px, 18vw, 200px)',
        lineHeight: 1, letterSpacing: '-0.04em',
        background: 'linear-gradient(92deg, var(--teal), var(--violet) 40%, var(--magenta) 70%, var(--coral))',
        WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        marginBottom: 'var(--space-5)',
      }}>404</div>

      <h2 style={{ marginBottom: 'var(--space-4)' }}>This page is unrendered.</h2>
      <p style={{ margin: '0 auto var(--space-6)', fontSize: 16, maxWidth: '52ch' }}>
        The route resolver couldn't match this URL to a node, a layout, or an extension's
        public route. The kernel is fine. The link is sus.
      </p>

      <div style={{
        background: 'var(--bg-0)', border: '1px solid var(--line)', borderRadius: 6,
        padding: '14px 18px', display: 'inline-block', textAlign: 'left',
        fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-1)',
        marginBottom: 'var(--space-6)',
      }}>
        <div style={{ color: 'var(--ink-3)' }}>$ core.render.node_preview --url={window.location?.pathname || '/missing'}</div>
        <div style={{ color: 'var(--coral)' }}>← err: NodeNotFound (no row in content_nodes matching slug)</div>
        <div style={{ color: 'var(--ink-3)' }}>→ try: core.node.list, or fix the link</div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => setPage('home')}>← back to home</button>
        <button className="btn" onClick={() => setPage('docs')}>read the docs</button>
        <button className="btn" onClick={() => setPage('showcase')}>browse showcase</button>
      </div>
    </div>
  </section>
);

const LegalPage = () => {
  const [tab, setTab] = React.useState('license');
  const tabs = [
    { id: 'license', label: 'License' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'terms',   label: 'Terms' },
    { id: 'security',label: 'Security' },
    { id: 'brand',   label: 'Brand' },
  ];

  return (
    <>
      <PageHeader eyebrow="§ legal · text"
        title="The fine print, in plain text."
        sub="Boring legal documents written without a legal team. If anything is unclear, open an issue." />
      <section>
        <div className="container container-narrow">
          <div style={{ display: 'flex', gap: 4, marginBottom: 'var(--space-6)', flexWrap: 'wrap', borderBottom: '1px solid var(--line)' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: '8px 14px',
                fontFamily: 'var(--font-mono)', fontSize: 12,
                color: tab === t.id ? 'var(--accent)' : 'var(--ink-2)',
                borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
                marginBottom: -1,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>{t.label}</button>
            ))}
          </div>

          <article style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.85, color: 'var(--ink-1)' }}>
            {tab === 'license' && <LegalLicense />}
            {tab === 'privacy' && <LegalPrivacy />}
            {tab === 'terms'   && <LegalTerms />}
            {tab === 'security'&& <LegalSecurity />}
            {tab === 'brand'   && <LegalBrand />}
          </article>
        </div>
      </section>
    </>
  );
};

const LegalSection = ({ children }) => (
  <div style={{ marginBottom: 'var(--space-6)' }}>{children}</div>
);
const LegalH = ({ children }) => (
  <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--ink-0)', marginBottom: 12, letterSpacing: '-0.01em' }}>{children}</h2>
);
const LegalP = ({ children }) => (
  <p style={{ marginBottom: 12, color: 'var(--ink-1)', maxWidth: '64ch' }}>{children}</p>
);

const LegalLicense = () => (
  <>
    <LegalSection>
      <LegalH>License — GPL-3.0</LegalH>
      <LegalP>
        Squilla is licensed under the <span style={{ color: 'var(--accent)' }}>GNU General Public License v3.0</span>. You can use, modify, and distribute it. If you distribute a modified version, you must release the source under the same license.
      </LegalP>
      <LegalP>The full text is in the LICENSE file at the root of the repository. The summary above is not a substitute.</LegalP>
    </LegalSection>
    <LegalSection>
      <LegalH>What "free" means here</LegalH>
      <LegalP>Free as in freedom, and free as in price. There is no commercial license tier, no SaaS escape hatch, no enterprise add-on. The repository is the product.</LegalP>
    </LegalSection>
    <LegalSection>
      <LegalH>No CLA</LegalH>
      <LegalP>Contributors do not sign a Contributor License Agreement. You retain copyright in your contributions; you license them under GPL-3.0 by submitting a PR.</LegalP>
    </LegalSection>
  </>
);

const LegalPrivacy = () => (
  <>
    <LegalSection>
      <LegalH>What we collect</LegalH>
      <LegalP>The Squilla CMS itself collects nothing. No telemetry. No phone-home. No anonymous metrics. The binary doesn't make outbound network calls unless you configure an extension that does.</LegalP>
    </LegalSection>
    <LegalSection>
      <LegalH>This website</LegalH>
      <LegalP>This marketing site uses no cookies, no analytics, no third-party trackers. Server logs (IP, user-agent, path, timestamp) are kept for 14 days for abuse detection, then deleted.</LegalP>
    </LegalSection>
    <LegalSection>
      <LegalH>Third parties</LegalH>
      <LegalP>Fonts are loaded from Google Fonts. If that bothers you, build the site locally — the source is in the repo.</LegalP>
    </LegalSection>
  </>
);

const LegalTerms = () => (
  <>
    <LegalSection>
      <LegalH>Use of this site</LegalH>
      <LegalP>You can read it. You can link to it. You can scrape it (the robots.txt is permissive). You cannot pretend you wrote it.</LegalP>
    </LegalSection>
    <LegalSection>
      <LegalH>No warranty</LegalH>
      <LegalP>Squilla is provided "as is", without warranty of any kind. See the GPL-3.0 license for the legally-binding version of that sentence.</LegalP>
    </LegalSection>
    <LegalSection>
      <LegalH>Trademarks</LegalH>
      <LegalP>"Squilla" and the compound-eye mark are unregistered trademarks of the Squilla project. Use them to refer to the project. Don't use them to brand a fork.</LegalP>
    </LegalSection>
  </>
);

const LegalSecurity = () => (
  <>
    <LegalSection>
      <LegalH>Reporting a vulnerability</LegalH>
      <LegalP>Email <span style={{ color: 'var(--accent)' }}>security@squilla.dev</span> with reproduction steps. PGP key is on the keyserver. We respond within 72 hours.</LegalP>
    </LegalSection>
    <LegalSection>
      <LegalH>Disclosure timeline</LegalH>
      <LegalP>Standard 90 days from acknowledgement. We can negotiate longer for severe issues; we won't sit on something past 90 days for marketing reasons.</LegalP>
    </LegalSection>
    <LegalSection>
      <LegalH>Bug bounty</LegalH>
      <LegalP>None. We're a small project on a zero-revenue license. We will publicly thank you and add you to the acknowledgements page.</LegalP>
    </LegalSection>
  </>
);

const LegalBrand = () => (
  <>
    <LegalSection>
      <LegalH>The mark</LegalH>
      <LegalP>The compound-eye dot cluster represents Squilla's segmented architecture and multi-spectrum perception. Don't recolor it; the iridescent palette is part of the identity.</LegalP>
    </LegalSection>
    <LegalSection>
      <LegalH>The wordmark</LegalH>
      <LegalP>Set in JetBrains Mono Medium. Lowercase always. The trailing slash is part of it; please don't drop it.</LegalP>
    </LegalSection>
    <LegalSection>
      <LegalH>Do</LegalH>
      <LegalP>Use the kit in articles, talks, screenshots, blog posts. Link back if you can.</LegalP>
    </LegalSection>
    <LegalSection>
      <LegalH>Don't</LegalH>
      <LegalP>Don't combine the mark with another logo. Don't suggest we endorse your product. Don't ship a fork called "Squilla X".</LegalP>
    </LegalSection>
  </>
);

// ---------- Blog post (long-form article) ----------

const FigurePlaceholder = ({ label, ratio = '16/9', tone = 'teal' }) => {
  const colors = { teal: 'var(--teal)', coral: 'var(--coral)', violet: 'var(--violet)', lime: 'var(--lime)' };
  const c = colors[tone] || colors.teal;
  return (
    <div style={{
      aspectRatio: ratio,
      width: '100%',
      background: `repeating-linear-gradient(45deg, var(--bg-1), var(--bg-1) 8px, var(--bg-2) 8px, var(--bg-2) 16px)`,
      border: '1px solid var(--line)',
      borderRadius: 6,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      margin: '1.8em 0',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 30% 40%, ${c}22, transparent 60%)`,
      }} />
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em',
        color: 'var(--ink-2)', textTransform: 'uppercase',
        background: 'var(--bg-0)', border: '1px solid var(--line)', padding: '6px 12px',
        borderRadius: 3, position: 'relative',
      }}>{label}</span>
    </div>
  );
};

const BlogPostPage = ({ setPage }) => (
  <React.Fragment>
    <section style={{ paddingBottom: 'var(--space-5)' }}>
      <div className="container container-narrow">
        <a onClick={() => setPage && setPage('blog')} style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)',
          letterSpacing: '0.08em', cursor: 'pointer', textDecoration: 'none',
        }}>← back to blog</a>
        <div style={{
          marginTop: 'var(--space-5)',
          display: 'flex', gap: 16, alignItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)',
          flexWrap: 'wrap',
        }}>
          <span>2026-04-12</span>
          <span style={{ color: 'var(--line-strong)' }}>│</span>
          <span className="tag" style={{ color: 'var(--coral)', borderColor: 'var(--coral)' }}>engineering</span>
          <span style={{ color: 'var(--line-strong)' }}>│</span>
          <span>13 min read</span>
          <span style={{ color: 'var(--line-strong)' }}>│</span>
          <span>by Mara Quint</span>
        </div>
      </div>
    </section>

    <section style={{ paddingTop: 0 }}>
      <div className="container container-narrow">
        <article className="prose">
          <h1>The shrimp punches faster than the kernel switches.</h1>
          <p style={{ fontSize: 19, color: 'var(--ink-2)', marginTop: '1.2em' }}>
            We rebuilt the request path around a single conviction: TTFB is the only metric that survives
            contact with reality. Here's what we found, what we threw out, and what surprised us about
            <em> Go </em> under load.
          </p>

          <FigurePlaceholder label="hero — mantis shrimp strike, 1/8000s" tone="coral" ratio="16/9" />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)', marginTop: 8 }}>
            Fig. 1 — The peacock mantis shrimp's dactyl club accelerates faster than a .22 bullet.
          </p>

          <h2>Why TTFB</h2>
          <p>
            Time-to-first-byte is the metric that doesn't lie. Lighthouse scores can be gamed. Largest
            Contentful Paint depends on what you stuff into the viewport. But TTFB is wall-clock time
            from <code>SYN</code> to first response byte — it's bounded by physics and your stack, and
            nothing else.
          </p>
          <p>
            We picked <strong>50ms</strong> as a target not because it's round, but because it's roughly
            the threshold below which a page feels <em>instant</em> on a domestic broadband connection.
            Above 100ms, users notice. Above 200ms, they leave.
          </p>

          <blockquote>
            "If the kernel can't answer in 50ms, the kernel is doing too much."
            <cite>— Internal design doc, v0.2</cite>
          </blockquote>

          <h3>The shape of a slow request</h3>
          <p>
            Most CMS frameworks spend their request budget on three things: bootstrapping a runtime,
            resolving a route, and building the template context. Many spend roughly 70% of TTFB on the
            first two. Squilla collapses both into nothing.
          </p>

          <h4>What we cut</h4>
          <ul>
            <li>No request-time plugin loading. Extensions are gRPC processes, already warm.</li>
            <li>No template lookup. Layouts are pre-resolved into a tree at theme activation time.</li>
            <li>No middleware stack of authn/authz/locale/csrf. The kernel handles all four inline.</li>
            <li>No ORM hydration on the hot path — we use a typed read model that maps directly to JSONB.</li>
          </ul>

          <h4>What we kept</h4>
          <ol>
            <li>Connection pooling. PostgreSQL's <code>pgx</code> pool, sized to NumCPU × 4.</li>
            <li>Atomic config maps. Hot-swappable without a lock on the read path.</li>
            <li>The event bus — because extensions need to react, just not synchronously.</li>
          </ol>

          <h2>The atomic config map</h2>
          <p>
            The single biggest win was deciding that the runtime configuration — active theme, registered
            node types, route table, layout tree — is <em>read-only at request time</em> and only ever
            replaced wholesale.
          </p>

          <pre><code>{`// internal/cms/config.go
type Config struct {
    Theme       *ThemeManifest
    NodeTypes   map[string]*NodeType
    Routes      *RouteTable      // pre-built radix tree
    Layouts     *LayoutTree      // pre-resolved
    Extensions  []*ExtensionInfo
}

var current atomic.Pointer[Config]

// Read path: zero allocations, lock-free.
func Current() *Config { return current.Load() }

// Write path (admin only): build a new Config, swap pointer.
func Apply(next *Config) { current.Store(next) }`}</code></pre>

          <p>
            Every request reads <code>Current()</code> exactly once at the top of the handler, then passes
            the pointer down. There are no maps to lock, no caches to invalidate, no consistency races.
            When an extension activates, we build a new <code>Config</code> off the hot path and swap
            the pointer. Old requests finish with the old config; new requests see the new one.
          </p>

          <FigurePlaceholder label="diagram — atomic config swap" tone="teal" ratio="21/9" />

          <h3>Measured impact</h3>
          <table>
            <thead>
              <tr><th>Path</th><th>Before</th><th>After</th><th>Delta</th></tr>
            </thead>
            <tbody>
              <tr><td>Render homepage (cold)</td><td>148ms</td><td>34ms</td><td>−77%</td></tr>
              <tr><td>Render homepage (warm)</td><td>62ms</td><td>11ms</td><td>−82%</td></tr>
              <tr><td>Resolve node by slug</td><td>18ms</td><td>0.4ms</td><td>−98%</td></tr>
              <tr><td>Theme activation</td><td>1100ms</td><td>180ms</td><td>−84%</td></tr>
            </tbody>
          </table>

          <h2>What surprised us</h2>
          <p>Two things, both Go-specific.</p>

          <h4>1. The garbage collector is not the enemy</h4>
          <p>
            We assumed the GC would dominate tail latency. It didn't. With <code>GOGC=200</code> and a
            256MB resident set, p99 GC pauses stayed under 1.2ms across 10k req/s. Modern Go's concurrent
            collector is very, very good.
          </p>

          <h4>2. html/template is fast enough</h4>
          <p>
            We benchmarked five template engines. Standard library <code>html/template</code> with
            pre-parsed templates beat every alternative once layouts were pre-resolved. The cost was
            never in template execution — it was in template <em>resolution</em>.
          </p>

          <FigurePlaceholder label="chart — p50/p99 latency over 24h soak test" tone="violet" ratio="16/10" />

          <h2>Try it</h2>
          <p>
            The atomic config map landed in <a>v0.4.0</a>. You can see the swap happen by activating a
            theme through the admin UI — watch the <kbd>X-Squilla-Config-Gen</kbd> response header
            increment. Or, if you want to feel the speed:
          </p>

          <pre><code>{`$ docker compose up --build
$ curl -w "%{time_starttransfer}\\n" -o /dev/null -s \\
    http://localhost:3000/
0.018`}</code></pre>

          <p>Eighteen milliseconds, on a laptop, on a cold container.</p>

          <hr />

          <h5>Footnotes</h5>
          <ul>
            <li>All measurements taken on M2 MacBook Pro, Postgres 16 in Docker, single replica.</li>
            <li>Soak test ran <code>vegeta</code> at 1500 rps for 24 hours. No restarts, no leaks.</li>
            <li>The mantis shrimp's strike accelerates at ~10,000g — fast enough to boil water briefly via cavitation.</li>
          </ul>
        </article>

        <div style={{
          marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)',
          borderTop: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)',
          flexWrap: 'wrap', gap: 16,
        }}>
          <a onClick={() => setPage && setPage('blog')} style={{ cursor: 'pointer', color: 'var(--ink-2)' }}>
            ← all posts
          </a>
          <span>edit on github — squilla/squilla.dev/posts/0042.md</span>
        </div>
      </div>
    </section>
  </React.Fragment>
);

Object.assign(window, { NotFoundPage, LegalPage, BlogPostPage });
