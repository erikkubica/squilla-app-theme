// themes/squilla — global page behaviors.
//
// Sections:
//   1. Compound-eye SVG injection      (data-squilla-eye)
//   2. MCP console animation           (data-squilla-mcp)
//   3. Perf TTFB live counter          (data-squilla-perf)
//   4. Arch diagram hover tinting      (.arch-diagram__layer)
//   5. Blog list filter + pagination   (data-squilla-blog)
//   6. Extensions catalog filter       (data-squilla-ext-catalog)
//   7. Legal tabs                       (data-squilla-legal)
//   8. Docs shell (search + sidebar)    (data-squilla-docs)
//   9. 404 path injection
//
// Vanilla JS, no build, no deps. Respects prefers-reduced-motion.

(() => {
  const ready = (fn) => (document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn));
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $  = (sel, root = document) => root.querySelector(sel);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─────────────────────────────────────────────
  // 1. Compound-eye SVG injection
  // Renders the iridescent dot mosaic from a placeholder div.
  // ─────────────────────────────────────────────
  const PALETTE = ['var(--teal)', 'var(--violet)', 'var(--magenta)', 'var(--coral)', 'var(--lime)', 'var(--amber)', 'var(--teal-2)'];
  const renderEye = (host) => {
    const size = parseInt(host.dataset.size, 10) || 240;
    const density = host.dataset.density || 'normal';
    const cols = density === 'dense' ? 14 : 10;
    const rows = cols;
    const cx = cols / 2, cy = rows / 2;
    const cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c + (r % 2 ? 0.5 : 0);
        const dx = x - cx, dy = r - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > cols / 2) continue;
        const idx = (Math.floor(dist) + c + r) % PALETTE.length;
        const opacity = 1 - (dist / (cols / 2)) * 0.7;
        const radius = 0.32 + Math.random() * 0.1;
        cells.push(`<circle cx="${x}" cy="${r}" r="${radius.toFixed(2)}" fill="${PALETTE[idx]}" opacity="${opacity.toFixed(2)}"/>`);
      }
    }
    host.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 ${cols} ${rows}" aria-hidden="true">${cells.join('')}</svg>`;
  };
  const initEyes = () => $$('[data-squilla-eye]').forEach(renderEye);

  // ─────────────────────────────────────────────
  // 2. MCP console animation
  // Reads the transcript from a <template data-mcp-script> JSON, then
  // renders one line at a time with realistic delays. Replays on loop.
  // ─────────────────────────────────────────────
  // The transcript carries `args_text` (preformatted string) from the editor;
  // tolerate the legacy `args` (object) shape so old fields_data keeps working.
  const argsText = (line) => {
    if (typeof line.args_text === 'string' && line.args_text.length) return line.args_text;
    if (line.args && typeof line.args === 'object') {
      return Object.entries(line.args).map(([k, v]) => {
        if (typeof v === 'object') return `${k}: ${JSON.stringify(v)}`;
        if (typeof v === 'string') return `${k}: "${v}"`;
        return `${k}: ${v}`;
      }).join(', ');
    }
    return '';
  };
  // Color tokens are stored as bare names ("teal"); convert to CSS var.
  const colorVar = (c) => (typeof c === 'string' && c.startsWith('var(')) ? c : `var(--${c || 'teal'})`;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const lineHTML = (line) => {
    const text = esc(line.text);
    if (line.t === 'sys')   return `<div class="mcp__line" style="color: var(--ink-3)">[sys] ${text}</div>`;
    if (line.t === 'user')  return `<div class="mcp__line"><span style="color: var(--coral)">user</span><span style="color: var(--ink-3)"> ⟶ </span><span style="color: var(--ink-0)">${text}</span></div>`;
    if (line.t === 'plan')  return `<div class="mcp__line"><span style="color: var(--violet)">agent</span><span style="color: var(--ink-3)"> · plan </span><span style="color: var(--ink-1)">${text}</span></div>`;
    if (line.t === 'call')  return `<div class="mcp__line"><span style="color: var(--ink-3)">→ </span><span style="color: ${colorVar(line.color)}">${esc(line.tool)}</span><span style="color: var(--ink-3)">(</span><span style="color: var(--ink-1)">${esc(argsText(line))}</span><span style="color: var(--ink-3)">)</span><span style="color: var(--ink-3); margin-left: 8px">· ${esc(line.dur)}ms</span></div>`;
    if (line.t === 'res')   return `<div class="mcp__line" style="color: var(--ink-1)"><span style="color: var(--lime)">← ok</span> ${text}</div>`;
    if (line.t === 'done')  return `<div class="mcp__line"><span class="mcp__done">DONE</span><span style="color: var(--ink-1); margin-left: 8px">${text}</span></div>`;
    return '';
  };

  const initMcpConsole = (host) => {
    const tpl = $('[data-mcp-script]', host);
    if (!tpl) return;
    let script;
    try {
      const raw = tpl.innerHTML || tpl.textContent || '';
      // Decode HTML entities (Go template may escape quotes inside <template>)
      const decoded = raw.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      script = JSON.parse(decoded.trim()).lines;
    } catch (e) { console.error('mcp-console: failed to parse transcript', e); return; }
    const body = $('[data-mcp-body]', host);
    const progress = $('.mcp__progress', host);
    const replayBtn = $('[data-mcp-replay]');
    const toggleBtn = $('[data-mcp-toggle]');
    let step = 0, running = !reduceMotion, timer = null;

    const caretHTML = `<span class="mcp__caret"></span>`;
    const render = () => {
      body.innerHTML = script.slice(0, step).map(lineHTML).join('');
      if (step < script.length) body.insertAdjacentHTML('beforeend', caretHTML);
      body.scrollTop = body.scrollHeight;
      if (progress) progress.textContent = `${step}/${script.length}`;
    };
    const tick = () => {
      if (!running) return;
      if (step >= script.length) {
        timer = setTimeout(() => { step = 0; render(); tick(); }, 3500);
        return;
      }
      const cur = script[step];
      const delay = cur.t === 'call' ? Math.max(420, (cur.dur || 30) * 8) : (cur.t === 'user' ? 900 : 480);
      timer = setTimeout(() => { step++; render(); tick(); }, delay);
    };

    if (replayBtn) replayBtn.addEventListener('click', () => {
      clearTimeout(timer); step = 0; running = true; render(); tick();
      if (toggleBtn) toggleBtn.textContent = '❚❚ pause';
    });
    if (toggleBtn) toggleBtn.addEventListener('click', () => {
      running = !running;
      toggleBtn.textContent = running ? '❚❚ pause' : '▶ resume';
      if (running) tick(); else clearTimeout(timer);
    });

    render();
    tick();
  };
  const initMcp = () => $$('[data-squilla-mcp]').forEach(initMcpConsole);

  // ─────────────────────────────────────────────
  // 3. Perf TTFB live counter
  // ─────────────────────────────────────────────
  const initPerf = (host) => {
    if (reduceMotion) return;
    const num = $('[data-perf-num]', host);
    const bars = $$('.perf__bar', host);
    bars.forEach((bar, i) => {
      const h = 30 + Math.sin(i * 0.4) * 14 + Math.random() * 10;
      bar.style.height = `${h.toFixed(1)}px`;
      if (i > 40) bar.classList.add('perf__bar--hot');
    });
    setInterval(() => {
      if (num) num.textContent = (18 + Math.floor(Math.random() * 14));
    }, 1100);
  };
  const initPerfPanels = () => $$('[data-squilla-perf]').forEach(initPerf);

  // ─────────────────────────────────────────────
  // 4. Arch diagram hover tinting
  // ─────────────────────────────────────────────
  const initArchDiagram = () => {
    $$('.arch-diagram__layer').forEach((layer) => {
      const color = layer.dataset.color;
      const chip = $('.arch-diagram__chip', layer);
      if (chip) chip.style.background = `var(--${color})`;
      layer.addEventListener('mouseenter', () => {
        layer.style.background = 'var(--bg-3)';
        layer.style.borderColor = `var(--${color})`;
        if (chip) chip.style.boxShadow = `0 0 12px var(--${color})`;
      });
      layer.addEventListener('mouseleave', () => {
        layer.style.background = '';
        layer.style.borderColor = '';
        if (chip) chip.style.boxShadow = '';
      });
    });
  };

  // ─────────────────────────────────────────────
  // 5. Blog list — category filter + pagination, URL state
  //    URL params: ?cat=<tag>&page=<n>
  //    pushState on change; readState on load and popstate.
  // ─────────────────────────────────────────────
  const initBlogList = (host) => {
    const rows = $$('.blog-list__row', host);
    const chips = $$('.blog-list__chip', host);
    const empty = $('[data-blog-empty]', host);
    const pager = $('[data-blog-pager]', host);
    const pages = $('[data-blog-pages]', host);
    const prev  = $('[data-blog-prev]', host);
    const next  = $('[data-blog-next]', host);
    const total = $('[data-blog-total]', host);
    const counts = $$('[data-count]', host);
    const pageSize = parseInt(host.dataset.pageSize, 10) || 6;

    // Tally counts per category
    const catCounts = { all: rows.length };
    rows.forEach(r => { catCounts[r.dataset.tag] = (catCounts[r.dataset.tag] || 0) + 1; });
    counts.forEach(c => { c.textContent = catCounts[c.dataset.count] || 0; });

    const tagColors = {};
    rows.forEach(r => { tagColors[r.dataset.tag] = $('.blog-list__tag', r)?.dataset.color || 'ink-1'; });

    const apply = (cat, page, push) => {
      const filtered = (cat === 'all') ? rows : rows.filter(r => r.dataset.tag === cat);
      const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
      const safePage = Math.min(Math.max(1, page), totalPages);
      const start = (safePage - 1) * pageSize;
      const end = start + pageSize;

      rows.forEach(r => { r.hidden = true; });
      filtered.slice(start, end).forEach(r => { r.hidden = false; });

      if (empty) empty.hidden = filtered.length !== 0;
      if (total) total.textContent = `${filtered.length} ${filtered.length === 1 ? 'post' : 'posts'}`;

      // Active chip
      chips.forEach(c => {
        const active = c.dataset.filter === cat;
        c.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      // Pager
      if (totalPages > 1) {
        pager.hidden = false;
        pages.innerHTML = '';
        for (let n = 1; n <= totalPages; n++) {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'blog-list__pager-page' + (n === safePage ? ' is-active' : '');
          b.textContent = String(n).padStart(2, '0');
          b.addEventListener('click', () => apply(cat, n, true));
          pages.appendChild(b);
        }
        prev.disabled = safePage === 1;
        next.disabled = safePage === totalPages;
        prev.onclick = () => apply(cat, safePage - 1, true);
        next.onclick = () => apply(cat, safePage + 1, true);
      } else {
        pager.hidden = true;
      }

      if (push) {
        const params = new URLSearchParams();
        if (cat !== 'all') params.set('cat', cat);
        if (safePage !== 1) params.set('page', String(safePage));
        const qs = params.toString();
        const url = window.location.pathname + (qs ? '?' + qs : '');
        history.pushState({ cat, page: safePage }, '', url);
      }
    };

    chips.forEach(c => c.addEventListener('click', () => apply(c.dataset.filter, 1, true)));

    const readURL = () => {
      const u = new URLSearchParams(window.location.search);
      apply(u.get('cat') || 'all', parseInt(u.get('page') || '1', 10), false);
    };
    window.addEventListener('popstate', readURL);
    readURL();
  };
  const initBlog = () => $$('[data-squilla-blog]').forEach(initBlogList);

  // ─────────────────────────────────────────────
  // 6. Extensions catalog — tag filter, URL state
  //    URL param: ?source=<tag>
  // ─────────────────────────────────────────────
  const initExtCat = (host) => {
    const cells = $$('.ext-cat__cell', host);
    const filters = $$('.ext-cat__filter', host);
    const count = $('[data-ext-count]', host);

    const apply = (tag, push) => {
      const visible = cells.filter(c => tag === 'all' || c.dataset.tag === tag);
      cells.forEach(c => { c.hidden = !(tag === 'all' || c.dataset.tag === tag); });
      filters.forEach(f => f.setAttribute('aria-pressed', f.dataset.filter === tag ? 'true' : 'false'));
      if (count) count.textContent = `${visible.length} extensions · sorted by downloads`;

      if (push) {
        const params = new URLSearchParams(window.location.search);
        if (tag === 'all') params.delete('source'); else params.set('source', tag);
        const qs = params.toString();
        history.pushState({ source: tag }, '', window.location.pathname + (qs ? '?' + qs : ''));
      }
    };

    filters.forEach(f => f.addEventListener('click', () => apply(f.dataset.filter, true)));
    const readURL = () => apply(new URLSearchParams(window.location.search).get('source') || 'all', false);
    window.addEventListener('popstate', readURL);
    readURL();
  };
  const initExt = () => $$('[data-squilla-ext-catalog]').forEach(initExtCat);

  // ─────────────────────────────────────────────
  // 7. Legal tabs — hash-based, refresh-persistent
  // ─────────────────────────────────────────────
  const initLegal = (host) => {
    const tabs = $$('.legal__tab', host);
    const panels = $$('.legal__panel', host);
    const apply = (id, push) => {
      tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.tab === id ? 'true' : 'false'));
      panels.forEach(p => { p.hidden = p.dataset.panel !== id; });
      if (push) history.replaceState(null, '', '#' + id);
    };
    tabs.forEach(t => t.addEventListener('click', () => apply(t.dataset.tab, true)));
    const initial = (window.location.hash || '#license').slice(1);
    apply(tabs.some(t => t.dataset.tab === initial) ? initial : 'license', false);
  };
  const initLegalAll = () => $$('[data-squilla-legal]').forEach(initLegal);

  // ─────────────────────────────────────────────
  // 7b. Gallery tabs — hash-based, refresh-persistent
  // ─────────────────────────────────────────────
  const initGtabs = (host) => {
    const tabs = $$('.gtabs__tab', host);
    const panels = $$('.gtabs__panel', host);
    if (!tabs.length) return;
    const apply = (id, push) => {
      tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.tab === id ? 'true' : 'false'));
      panels.forEach(p => { p.hidden = p.dataset.panel !== id; });
      if (push) history.replaceState(null, '', '#' + id);
    };
    tabs.forEach(t => t.addEventListener('click', () => apply(t.dataset.tab, true)));
    const fallback = tabs[0].dataset.tab;
    const initial = (window.location.hash || '#' + fallback).slice(1);
    apply(tabs.some(t => t.dataset.tab === initial) ? initial : fallback, false);

    // Lightbox — clicking a thumb opens the full-size variant. Slide list
    // is built from the *currently visible* panel's cells so navigation
    // wraps the active tab only (prevents jumping between Content/Theme
    // mid-browse). Keyboard: ←/→ navigate, Esc closes.
    const lb = host.querySelector('[data-gtabs-lb]');
    if (!lb) return;
    // Move the lightbox to <body> so it escapes the section's stacking
    // context (`.page > * { z-index: 1 }` in theme.css traps anything
    // inside, even position:fixed children, behind the sticky header at
    // z-index 50 in the page-level context). Reparenting once at init is
    // the cheapest way to win without restructuring the page wrapper.
    if (lb.parentNode !== document.body) document.body.appendChild(lb);
    const lbImg = lb.querySelector('.gtabs-lb__img');
    const lbPos = lb.querySelector('[data-lb-pos]');
    const lbAlt = lb.querySelector('[data-lb-alt-text]');
    const prevBtn = lb.querySelector('[data-lb-prev]');
    const nextBtn = lb.querySelector('[data-lb-next]');
    const closeBtn = lb.querySelector('[data-lb-close]');

    let slides = [];
    let cursor = 0;
    let lastFocus = null;

    const render = () => {
      const slide = slides[cursor];
      if (!slide) return;
      lbImg.src = slide.full;
      lbImg.alt = slide.alt || '';
      lbPos.textContent = (cursor + 1) + ' / ' + slides.length;
      lbAlt.textContent = slide.alt || '';
      prevBtn.disabled = slides.length < 2;
      nextBtn.disabled = slides.length < 2;
    };

    const open = (cell) => {
      const panel = cell.closest('.gtabs__panel');
      if (!panel) return;
      const cells = $$('[data-lb-open]', panel);
      slides = cells.map(c => ({ full: c.dataset.lbFull, alt: c.dataset.lbAlt || '' }));
      cursor = cells.indexOf(cell);
      if (cursor < 0) cursor = 0;
      lastFocus = cell;
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      render();
      closeBtn.focus();
    };

    const close = () => {
      lb.hidden = true;
      document.body.style.overflow = '';
      lbImg.removeAttribute('src');
      if (lastFocus) lastFocus.focus();
    };

    const step = (delta) => {
      if (slides.length < 2) return;
      cursor = (cursor + delta + slides.length) % slides.length;
      render();
    };

    $$('[data-lb-open]', host).forEach(cell => {
      cell.addEventListener('click', () => open(cell));
    });
    prevBtn.addEventListener('click', () => step(-1));
    nextBtn.addEventListener('click', () => step(1));
    closeBtn.addEventListener('click', close);
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowLeft')  { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    });
  };
  const initGtabsAll = () => $$('[data-squilla-gtabs]').forEach(initGtabs);

  // ─────────────────────────────────────────────
  // 8. Docs shell — search + sidebar collapse
  //    URL param: ?q=<query>
  // ─────────────────────────────────────────────
  const initDocs = (host) => {
    const search = $('[data-docs-search]', host);
    const items = $$('[data-docs-item]', host);
    const groups = $$('[data-docs-group]', host);
    const noResults = $('[data-docs-noresults]', host);
    if (!search) return;

    const apply = (q, push) => {
      const ql = q.trim().toLowerCase();
      let any = false;
      items.forEach(i => {
        const hay = (i.dataset.docsLabel + ' ' + (i.dataset.docsSection || '') + ' ' + (i.dataset.docsKeywords || '')).toLowerCase();
        const match = !ql || hay.includes(ql);
        i.hidden = !match;
        if (match) any = true;
      });
      groups.forEach(g => {
        const visible = $$('[data-docs-item]', g).some(i => !i.hidden);
        g.hidden = !visible;
      });
      if (noResults) noResults.hidden = any;

      if (push) {
        const params = new URLSearchParams(window.location.search);
        if (ql) params.set('q', ql); else params.delete('q');
        const qs = params.toString();
        history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
      }
    };

    search.addEventListener('input', () => apply(search.value, true));
    const readURL = () => {
      const q = new URLSearchParams(window.location.search).get('q') || '';
      search.value = q;
      apply(q, false);
    };
    window.addEventListener('popstate', readURL);
    readURL();

    // Sidebar group toggles (server-rendered open by default; user can collapse)
    $$('[data-docs-group-toggle]', host).forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('[data-docs-group]');
        const list = $('[data-docs-list]', group);
        const open = !list.hidden;
        list.hidden = open;
        btn.querySelector('[data-docs-group-icon]').textContent = open ? '+' : '−';
      });
    });

    // Build "On this page" TOC from h2/h3 inside the doc body
    const tocHost = $('[data-docs-toc]', host);
    const article = $('[data-docs-article]', host);
    if (tocHost && article) {
      const headings = $$('h2, h3', article);
      if (headings.length) {
        const list = document.createElement('ul');
        headings.forEach((h, i) => {
          if (!h.id) h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ('h-' + i);
          const li = document.createElement('li');
          li.dataset.level = h.tagName.toLowerCase();
          const a = document.createElement('a');
          a.href = '#' + h.id;
          a.textContent = h.textContent;
          li.appendChild(a);
          list.appendChild(li);
        });
        tocHost.innerHTML = '';
        tocHost.appendChild(list);
      } else {
        tocHost.parentElement.hidden = true;
      }
    }
  };
  const initDocsAll = () => $$('[data-squilla-docs]').forEach(initDocs);

  // ─────────────────────────────────────────────
  // 9. 404 path injection
  // ─────────────────────────────────────────────
  const initNotFound = () => {
    $$('[data-notfound-path]').forEach(el => { el.textContent = window.location.pathname; });
  };

  // ─────────────────────────────────────────────
  // 10. Code-block syntax highlighting (lazy)
  // ─────────────────────────────────────────────
  const initHighlight = () => {
    const blocks = $$('.code[data-language] pre code');
    if (blocks.length === 0) return;

    blocks.forEach(code => {
      const wrap = code.closest('.code[data-language]');
      const lang = wrap.dataset.language || 'plaintext';
      const hljsLang = lang === 'tengo' ? 'plaintext' : lang;
      code.classList.add('language-' + hljsLang);
    });

    const apply = () => blocks.forEach(code => {
      try { window.hljs.highlightElement(code); } catch (_) {}
    });

    if (window.hljs) { apply(); return; }
    const s = document.createElement('script');
    s.src = '/theme/assets/vendor/highlight.min.js';
    s.async = true;
    s.onload = apply;
    document.head.appendChild(s);
  };

  // ─────────────────────────────────────────────
  // Boot
  // ─────────────────────────────────────────────
  ready(() => {
    initEyes();
    initMcp();
    initPerfPanels();
    initArchDiagram();
    initBlog();
    initExt();
    initLegalAll();
    initGtabsAll();
    initDocsAll();
    initNotFound();
    initHighlight();
  });
})();
