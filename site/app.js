document.documentElement.classList.add('js');

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const TYPE_COLOR = { agency: '#e2492f', communion: '#2b57a6', both: '#5b2d6e', neither: '#8a8578' };
const TYPE_NAME = { agency: '能動性角色', communion: '共融性角色' };

const GLYPHS = {
  warrior: '<path d="M30 70 L82 18"/><path d="M22 58 L42 78"/><path d="M27 73 L14 86"/>',
  traveler: '<path class="trail" d="M8 76 C 28 30, 46 94, 64 52 S 86 22, 90 24"/><circle cx="90" cy="24" r="5" fill="currentColor"/>',
  sage: '<circle class="core" cx="50" cy="50" r="7" fill="currentColor"/><circle cx="50" cy="50" r="22"/><circle class="ring" cx="50" cy="50" r="38" stroke-dasharray="3 9"/>',
  maker: '<rect x="18" y="56" width="28" height="28"/><rect x="54" y="56" width="28" height="28"/><rect class="top" x="36" y="20" width="28" height="28"/>',
  lover: '<path class="w1" d="M6 42 Q 28 12 50 42 T 94 42"/><path class="w2" d="M6 64 Q 28 34 50 64 T 94 64"/>',
  caregiver: '<path d="M14 86 H86"/><g class="sprout"><path d="M50 86 V46"/><path d="M50 62 C 34 62 26 50 26 36 C 42 36 50 48 50 62 Z"/><path d="M50 52 C 66 52 74 40 74 26 C 58 26 50 38 50 52 Z"/></g>',
  friend: '<circle class="l" cx="38" cy="50" r="24"/><circle class="r" cx="62" cy="50" r="24"/>',
  ritualist: '<path d="M16 86 H84"/><path class="flame" d="M50 80 C 30 72 30 52 44 40 C 44 52 52 54 54 46 C 58 36 52 26 50 16 C 70 30 76 52 66 66 C 62 74 56 79 50 80 Z"/>'
};
const glyph = (id, cls = '') => `<svg class="glyph g-${id} ${cls}" viewBox="0 0 100 100" aria-hidden="true">${GLYPHS[id]}</svg>`;

/* ---------- ch6 cards ---------- */
for (const im of IMAGOES) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'card reveal';
  b.style.setProperty('--c', im.color);
  b.setAttribute('aria-haspopup', 'dialog');
  b.innerHTML = `${glyph(im.id)}<span class="en">${im.en}</span><span class="name">${im.name}</span>
    <span class="god">${im.god}</span><span class="hook">${im.hook}</span><span class="who">${im.person.name}的故事</span>`;
  b.addEventListener('click', () => openImago(im.id));
  $('#cards-' + im.type).append(b);
}

/* ---------- map ---------- */
const POINTS = [...IMAGOES.map(i => ({ id: i.id, name: i.name, color: i.color, href: '#' + i.id })), ...MAP_EXTRA];
for (const p of POINTS) {
  const [x, y] = MAP_POS[p.id];
  const a = document.createElement('a');
  a.className = 'dot' + (x > .7 ? ' flip' : '');
  a.href = p.href;
  a.textContent = p.name;
  a.style.left = x * 100 + '%';
  a.style.top = (1 - y) * 100 + '%';
  a.style.setProperty('--c', p.color || TYPE_COLOR[p.type]);
  $('#map').append(a);
}

/* ---------- imago dialog ---------- */
const dlg = $('#imago-dialog');
function openImago(id) {
  const i = IMAGOES.findIndex(m => m.id === id);
  if (i < 0) return;
  const im = IMAGOES[i];
  const prev = IMAGOES[(i + IMAGOES.length - 1) % IMAGOES.length];
  const next = IMAGOES[(i + 1) % IMAGOES.length];
  const [first, ...rest] = im.quotes;
  const q = (x, cls = '') => `<blockquote class="quote ${cls}"><p>${x.t}</p><cite>${x.by}</cite></blockquote>`;
  dlg.style.setProperty('--c', im.color);
  dlg.innerHTML = `
    <button class="x" type="button" data-close aria-label="關閉">✕</button>
    <header class="dlg-head">
      ${glyph(im.id, 'alive')}
      <p class="en">${im.en} · ${TYPE_NAME[im.type]}</p>
      <h2 id="dlg-title">${im.name}</h2>
      <p class="god"><b>${im.god}</b>　${im.godLine}</p>
    </header>
    <div class="dlg-main">
      <p class="essence">${im.essence}</p>
      <aside class="note">${im.hook}</aside>
      <h3 class="person">${im.person.name}</h3>
      <p class="meta">${im.person.en} · ${im.person.meta}</p>
      ${q(first, 'v')}
      ${im.story.map(p => `<p>${p}</p>`).join('')}
      <section class="reading">
        <h4>作者的解讀</h4>
        ${im.reading.map(p => `<p>${p}</p>`).join('')}
        ${rest.map(x => q(x)).join('')}
      </section>
      <div class="ask"><h4>問吓自己</h4><p>${im.ask}</p></div>
      <nav class="dlg-nav" aria-label="其他角色">
        <button type="button" data-go="${prev.id}">← ${prev.name}</button>
        <button type="button" data-go="${next.id}">${next.name} →</button>
      </nav>
    </div>`;
  if (!dlg.open) dlg.showModal();
  dlg.scrollTop = 0;
  history.replaceState(null, '', '#' + id);
}
dlg.addEventListener('click', e => {
  if (e.target === dlg || e.target.closest('[data-close]')) return dlg.close();
  const go = e.target.closest('[data-go]');
  if (go) openImago(go.dataset.go);
});
dlg.addEventListener('close', () => {
  if (IMAGOES.some(m => '#' + m.id === location.hash)) history.replaceState(null, '', location.pathname + location.search);
});
const fromHash = () => openImago(location.hash.slice(1));
addEventListener('hashchange', fromHash);
fromHash();

/* ---------- scroll reveals ---------- */
const io = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}, { threshold: .18 });
document.querySelectorAll('.reveal, .race, .overprint, .light').forEach(el => io.observe(el));

$('#race-replay').addEventListener('click', () => {
  const r = $('.race');
  r.classList.remove('in');
  void r.offsetWidth; // restart the CSS animation
  r.classList.add('in');
});

/* ---------- your myth ---------- */
const form = $('#myth-form');
const KEY = 'swlb-myth-v1';
const NUM = '一二三四五六七八';
const EVENTS = [['peak', '高峯'], ['low', '低谷'], ['turn', '轉折點'], ['earliest', '最早的記憶'], ['child', '童年'], ['teen', '青春期'], ['adult', '成年'], ['other', '另一個重要時刻']];

for (const p of POINTS) {
  const label = document.createElement('label');
  label.className = 'chip';
  label.style.setProperty('--c', p.color || TYPE_COLOR[p.type]);
  label.innerHTML = `<input type="checkbox" name="cast" value="${p.id}"><span>${p.name}</span>`;
  $('#cast').append(label);
}

function read() {
  const d = { chapter: [], cast: [], giftType: [] };
  for (const el of form.elements) {
    if (!el.name) continue;
    if (el.type === 'checkbox') { if (el.checked) d[el.name].push(el.value); }
    else if (el.name === 'chapter') d.chapter.push(el.value);
    else d[el.name] = el.value;
  }
  return d;
}
function write(d) {
  let ci = 0;
  for (const el of form.elements) {
    if (!el.name || !(el.name in d)) continue;
    if (el.type === 'checkbox') el.checked = d[el.name].includes(el.value);
    else if (el.name === 'chapter') el.value = d.chapter[ci++] ?? '';
    else el.value = d[el.name];
  }
}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(read())); } catch {} };
function load() {
  let d = null;
  try { d = JSON.parse(localStorage.getItem(KEY)); } catch {}
  if (!d) return false;
  write(d);
  // open whatever already has words in it
  form.querySelectorAll('.chapters li').forEach(li => { if (li.querySelector('input').value) li.hidden = false; });
  form.querySelectorAll('.event').forEach(det => { if (det.querySelector('textarea').value) det.open = true; });
  syncAdd();
  return true;
}
const syncAdd = () => { $('#add-chapter').hidden = !form.querySelector('.chapters li[hidden]'); };

$('#add-chapter').addEventListener('click', () => {
  const li = form.querySelector('.chapters li[hidden]');
  if (li) { li.hidden = false; li.querySelector('input').focus(); }
  syncAdd();
});
form.addEventListener('input', save);
form.addEventListener('submit', e => {
  e.preventDefault();
  save();
  renderCard();
  $('#myth-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
$('#clear-myth').addEventListener('click', () => {
  if (!confirm('確定清除你寫低嘅所有內容？')) return;
  form.reset();
  try { localStorage.removeItem(KEY); } catch {}
  form.querySelectorAll('.chapters li').forEach((li, i) => { li.hidden = i > 2; });
  form.querySelectorAll('.event').forEach(det => { det.open = false; });
  syncAdd();
  $('#myth-card').hidden = $('#card-actions').hidden = true;
});
$('#print-myth').addEventListener('click', () => {
  document.body.classList.add('print-myth');
  print();
});
addEventListener('afterprint', () => document.body.classList.remove('print-myth'));

function renderCard() {
  const d = read();
  const t = s => (s || '').trim();
  const chapters = d.chapter.map(t).filter(Boolean);
  const cast = [
    ...d.cast.map(id => POINTS.find(p => p.id === id)).filter(Boolean).map(p => ({ name: p.name, color: p.color || TYPE_COLOR[p.type] })),
    ...t(d.castCustom).split(/[，,、\n]/).map(t).filter(Boolean).map(name => ({ name, color: '#1c1a17' }))
  ];
  const events = EVENTS.filter(([k]) => t(d[k]));
  const block = (title, body) => body ? `<h4>${title}</h4>${body}` : '';
  const free = s => t(s) ? `<p class="free">${esc(t(s))}</p>` : '';
  const date = new Date().toLocaleDateString('zh-HK', { year: 'numeric', month: 'long', day: 'numeric' });

  const html = [
    block('目錄', chapters.length ? `<ol class="toc">${chapters.map((c, i) => `<li><span>第${NUM[i]}章</span><span>${esc(c)}</span></li>`).join('')}</ol>` : ''),
    block('主要角色', cast.length ? `<div class="cast">${cast.map(c => `<span style="--c:${c.color}">${esc(c.name)}</span>`).join('')}</div>${free(d.tension)}` : free(d.tension)),
    block('關鍵場景', events.length ? `<dl>${events.map(([k, label]) => `<dt>${label}</dt><dd>${esc(t(d[k]))}</dd>`).join('')}</dl>` : ''),
    block('重要的人', free(d.people) + (t(d.hero) ? `<p class="free">我的英雄：${esc(t(d.hero))}</p>` : '')),
    block('信念與價值', free(d.values)),
    block('未來腳本', (d.giftType.length ? `<p class="free">我想留低嘅，比較似：${esc(d.giftType.join('、'))}</p>` : '') + free(d.future))
  ].join('');

  $('#myth-card').innerHTML = `
    <p class="eyebrow">我的個人神話</p>
    <h3>《${esc(t(d.theme) || '一本仲寫緊嘅書')}》</h3>
    <p class="date">寫於 ${date}</p>
    ${html || '<p class="empty">本書仲係一片空白——返上去寫低幾句，再撳一次。</p>'}`;
  $('#myth-card').hidden = false;
  $('#card-actions').hidden = !html;
}

if (load()) { const d = read(); if (d.chapter.some(Boolean) || d.theme) renderCard(); }
