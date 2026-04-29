// Top navigation + footer

const NAV = [
  { id: 'home',     label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'arch',     label: 'Architecture' },
  { id: 'ext',      label: 'Extensions' },
  { id: 'themes',   label: 'Themes' },
  { id: 'docs',     label: 'Docs' },
  { id: 'about',    label: 'About' },
  { id: 'blog',     label: 'Blog' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'pricing',  label: 'Pricing' },
  { id: 'legal',    label: 'Legal' },
];

const TopNav = ({ page, setPage }) => {
  const [stars, setStars] = React.useState(2841);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'color-mix(in srgb, var(--bg-1) 85%, transparent)',
      backdropFilter: 'blur(12px) saturate(140%)',
      WebkitBackdropFilter: 'blur(12px) saturate(140%)',
      borderBottom: '1px solid var(--line)',
    }}>
      <div className="container container-wide" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 56,
      }}>
        <button onClick={() => setPage('home')} style={{ display: 'flex', alignItems: 'center' }}>
          <SquillaWordmark size={15} />
        </button>

        <nav className="nav-links" style={{ display: 'flex', gap: 2, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              style={{
                padding: '6px 10px',
                color: page === n.id ? 'var(--ink-0)' : 'var(--ink-2)',
                borderBottom: page === n.id ? '1px solid var(--accent)' : '1px solid transparent',
                marginBottom: -1,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink-0)'}
              onMouseLeave={e => e.currentTarget.style.color = page === n.id ? 'var(--ink-0)' : 'var(--ink-2)'}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--ink-2)',
            padding: '5px 10px',
            border: '1px solid var(--line)',
            borderRadius: 4,
          }}>
            <span style={{ color: 'var(--ink-3)' }}>v0.4.2</span>
            <span style={{ width: 1, height: 10, background: 'var(--line)' }} />
            <span>★ {stars.toLocaleString()}</span>
          </div>
          <button className="btn" onClick={() => setPage('docs')} style={{ padding: '5px 12px' }}>
            <span>docker compose up</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const FOOTER_COLS = [
  { title: 'Product', links: ['Features', 'Architecture', 'Extensions', 'Themes', 'Showcase', 'Pricing'] },
  { title: 'Develop', links: ['Documentation', 'MCP Reference', 'Tengo Reference', 'CoreAPI', 'Capability matrix', 'Changelog'] },
  { title: 'Community', links: ['GitHub', 'Discord', 'Mastodon', 'Bluesky', 'RFC process', 'Code of conduct'] },
  { title: 'Project', links: ['About', 'Blog', 'Brand kit', 'Press', 'Security policy', 'Roadmap'] },
];

const SiteFooter = ({ setPage }) => (
  <footer className="site-footer">
    <div className="container container-wide">
      <div className="container container-wide" style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr repeat(4, 1fr)',
        gap: 'var(--space-7)',
        marginBottom: 'var(--space-8)',
      }} data-grid="footer">
        <div>
          <SquillaWordmark size={16} />
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-2)', maxWidth: 320 }}>
            An open-source, AI-native, Go-based CMS. Kernel-class core.
            Sovereign extensions. ~50 MCP tools, sub-50ms TTFB.
          </p>
          <div style={{ marginTop: 18 }}>
            <Carapace segments={16} height={4} />
          </div>
          <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
            <span className="tag">GPL-3.0</span>
            <span className="tag">No telemetry</span>
            <span className="tag">No CLA</span>
          </div>
        </div>
        {FOOTER_COLS.map(col => (
          <div key={col.title}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--ink-2)', marginBottom: 14,
            }}>{col.title}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {col.links.map(l => (
                <li key={l}>
                  <a style={{ fontSize: 13, color: 'var(--ink-1)' }}
                     onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                     onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-1)'}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 'var(--space-5)', borderTop: '1px solid var(--line)',
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)',
      }}>
        <div>© 2026 squilla project · made for kernels and crustaceans</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>git: 9f3a1c2</span>
          <span>built: 2026.04.14</span>
          <span>go 1.24.2</span>
          <span>postgres 16.2</span>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { TopNav, SiteFooter });
