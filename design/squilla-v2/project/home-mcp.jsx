// Live MCP console — fake AI agent driving CMS through tool calls

const SCRIPT = [
  { t: 'sys',   text: 'agent connected · session a4f9e2 · capabilities=24/24 · tools=50' },
  { t: 'user',  text: 'Build a recipe blog with 10 example recipes.' },
  { t: 'plan',  text: '6-step plan: theme → activation → nodetype → seed → preview → menu' },
  { t: 'call',  tool: 'core.theme.list', args: { tags: ['recipe', 'food'] }, dur: 14 },
  { t: 'res',   text: 'found 3 themes · selecting hello-vietnam (best schema match)' },
  { t: 'call',  tool: 'core.theme.activate', args: { id: 'hello-vietnam' }, dur: 31 },
  { t: 'res',   text: 'activated · seeded 4 node types · 1 menu · 12 settings' },
  { t: 'call',  tool: 'core.nodetype.create', args: { slug: 'recipe', fields: 7 }, dur: 22 },
  { t: 'res',   text: 'recipe type registered · table content_recipes created' },
  { t: 'call',  tool: 'core.node.create', args: { type: 'recipe', batch: 10 }, dur: 84 },
  { t: 'res',   text: '10 recipes drafted · ids=[101..110]' },
  { t: 'call',  tool: 'core.render.node_preview', args: { url: '/recipes/scallops' }, dur: 19 },
  { t: 'res',   text: 'rendered · 4.1KB · ttfb=18ms · ok' },
  { t: 'call',  tool: 'core.menu.update', args: { items: 4 }, dur: 11 },
  { t: 'res',   text: 'navigation wired · publishing…' },
  { t: 'done',  text: 'site live at http://localhost:3000 · 10 recipes published in 12.4s' },
];

const TOOL_COLORS = {
  'core.theme.list':            'var(--teal)',
  'core.theme.activate':        'var(--lime)',
  'core.nodetype.create':       'var(--violet)',
  'core.node.create':           'var(--magenta)',
  'core.render.node_preview':   'var(--coral)',
  'core.menu.update':           'var(--amber)',
};

const fmtArgs = (a) => {
  return Object.entries(a).map(([k, v]) => (
    `${k}: ${typeof v === 'object' ? JSON.stringify(v) : (typeof v === 'string' ? `"${v}"` : v)}`
  )).join(', ');
};

const McpConsole = () => {
  const [step, setStep] = React.useState(0);
  const [running, setRunning] = React.useState(true);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (!running) return;
    if (step >= SCRIPT.length) {
      const t = setTimeout(() => setStep(0), 3500);
      return () => clearTimeout(t);
    }
    const cur = SCRIPT[step];
    const delay = cur.t === 'call' ? Math.max(420, (cur.dur || 30) * 8) : (cur.t === 'user' ? 900 : 480);
    const t = setTimeout(() => setStep(s => s + 1), delay);
    return () => clearTimeout(t);
  }, [step, running]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step]);

  const visible = SCRIPT.slice(0, step);

  return (
    <section>
      <div className="container container-wide">
        <div data-cols="2-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--space-7)', alignItems: 'start' }}>
          <div>
            <div className="h-eyebrow">§ MCP showcase</div>
            <h2 style={{ marginBottom: 'var(--space-5)' }}>
              Every operation<br/>is a tool an<br/>AI can call.
            </h2>
            <p style={{ marginBottom: 'var(--space-5)' }}>
              Squilla exposes ~50 Model Context Protocol tools across 15 domains. An AI agent
              can drive the entire CMS through structured API calls — create node types,
              seed content, activate themes, install extensions, preview rendered pages.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 'var(--space-5)' }}>
              {[
                { label: 'tools', val: '~50' },
                { label: 'domains', val: '15' },
                { label: 'capability gates', val: '24' },
                { label: 'avg call latency', val: '32ms' },
              ].map(s => (
                <div key={s.label} style={{
                  padding: '14px 16px', border: '1px solid var(--line)',
                  borderRadius: 6, background: 'var(--bg-2)',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, color: 'var(--ink-0)' }}>{s.val}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={() => { setStep(0); setRunning(true); }}>↻ replay</button>
              <button className="btn" onClick={() => setRunning(r => !r)}>{running ? '❚❚ pause' : '▶ resume'}</button>
              <button className="btn btn-ghost"><span className="muted">view all 50 tools →</span></button>
            </div>
          </div>

          {/* Console */}
          <div style={{
            background: 'var(--bg-0)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: '0 30px 80px -30px rgba(0, 255, 209, 0.18)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderBottom: '1px solid var(--line)',
              background: 'var(--bg-2)',
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-2)',
            }}>
              <div className="live-dot" />
              <span style={{ color: 'var(--ink-1)' }}>mcp://squilla.local</span>
              <span style={{ color: 'var(--ink-3)' }}>·</span>
              <span>session a4f9e2</span>
              <span style={{ color: 'var(--ink-3)' }}>·</span>
              <span>capabilities 24/24</span>
              <span style={{ marginLeft: 'auto', color: 'var(--ink-3)' }}>{step}/{SCRIPT.length}</span>
            </div>
            <div ref={scrollRef} style={{
              padding: '14px 16px',
              fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7,
              maxHeight: 460, minHeight: 460, overflowY: 'auto',
            }}>
              {visible.map((line, i) => <ConsoleLine key={i} line={line} />)}
              {step < SCRIPT.length && <Caret />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ConsoleLine = ({ line }) => {
  if (line.t === 'sys') return <Line color="var(--ink-3)">[sys] {line.text}</Line>;
  if (line.t === 'user') return (
    <Line>
      <span style={{ color: 'var(--coral)' }}>user</span>
      <span style={{ color: 'var(--ink-3)' }}> ⟶ </span>
      <span style={{ color: 'var(--ink-0)' }}>{line.text}</span>
    </Line>
  );
  if (line.t === 'plan') return (
    <Line>
      <span style={{ color: 'var(--violet)' }}>agent</span>
      <span style={{ color: 'var(--ink-3)' }}> · plan </span>
      <span style={{ color: 'var(--ink-1)' }}>{line.text}</span>
    </Line>
  );
  if (line.t === 'call') {
    const c = TOOL_COLORS[line.tool] || 'var(--teal)';
    return (
      <Line>
        <span style={{ color: 'var(--ink-3)' }}>→ </span>
        <span style={{ color: c }}>{line.tool}</span>
        <span style={{ color: 'var(--ink-3)' }}>(</span>
        <span style={{ color: 'var(--ink-1)' }}>{fmtArgs(line.args)}</span>
        <span style={{ color: 'var(--ink-3)' }}>)</span>
        <span style={{ color: 'var(--ink-3)', marginLeft: 8 }}>· {line.dur}ms</span>
      </Line>
    );
  }
  if (line.t === 'res') return <Line color="var(--ink-1)"><span style={{color:'var(--lime)'}}>← ok</span> {line.text}</Line>;
  if (line.t === 'done') return (
    <Line>
      <span style={{
        display: 'inline-block', padding: '2px 8px', marginTop: 6,
        background: 'var(--accent)', color: 'var(--accent-ink)',
        borderRadius: 3, fontSize: 11, letterSpacing: '0.08em',
      }}>DONE</span>
      <span style={{ color: 'var(--ink-1)', marginLeft: 8 }}>{line.text}</span>
    </Line>
  );
  return null;
};

const Line = ({ children, color }) => (
  <div style={{ color, marginBottom: 4 }}>{children}</div>
);

const Caret = () => (
  <span style={{
    display: 'inline-block', width: 7, height: 14,
    background: 'var(--accent)', verticalAlign: 'middle',
    animation: 'blink 1s steps(2) infinite',
  }}>
    <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
  </span>
);

Object.assign(window, { McpConsole });
