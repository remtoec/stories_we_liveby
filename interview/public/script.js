// 生命故事訪談 · 第九章「生成新的開始」
// The interviewer only asks, acknowledges, and echoes the person's own words back.
// It never evaluates, advises, interprets or summarises.

const SCRIPT = [
  { say: '你好。多謝你今日抽時間嚟。' },
  { say: '開始之前想講清楚：呢個唔係測驗，冇啱同錯。我唔會評判你，唔會畀建議，亦唔會分析你——我只會問，同埋聽。' },
  { say: '有時我會用返你自己講過嘅說話，同你確認吓意思。唔想答嘅問題，撳「跳過」就得；講得幾多、幾少都可以。' },
  { say: '今日想同你傾嘅，係你同「下一代」、同「留低啲乜」之間嘅關係。準備好，我哋就開始。' },

  { part: '開始之前' },
  { ask: '首先，可唔可以講吓你自己？你而家喺人生嘅邊個階段——每日大部分時間，花咗喺邊度？',
    probe: '如果呢個階段係你人生之書嘅其中一章，你會幫佢起個咩名？' },

  { part: '一 · 好早之前' },
  { say: '我想由好早好早開始問。' },
  { ask: '細個嘅時候，有冇一個人、一個地方，或者一套信念，令你覺得自己係特別嘅——好似被揀中、被睇見咁？',
    probe: '可唔可以帶我返去嗰個場景？當時喺邊、有邊個，佢做咗或者講咗啲乜？' },
  { ask: '就算童年未必好開心，有冇一啲嘢，當時靜靜地支撐住你？',
    probe: '佢而家仍然喺你身邊嗎？' },

  { part: '二 · 你相信嘅嘢' },
  { say: '接落嚟，想問吓你相信啲乜。' },
  { ask: '你覺得，人類嘅將來會變好、定變差？點解你會咁諗？',
    probe: '有冇一件事、一個畫面，令你特別咁覺得？' },
  { ask: '有冇一啲你由好早就相信、到而家都冇變過嘅嘢？',
    probe: '有冇一次，呢個信念被考驗過？當時發生咩事？' },
  { ask: '你相信自己有能力，為比你年輕嘅人做到啲乜嗎？',
    probe: '呢份信心——或者冇信心——係由邊度嚟嘅？' },

  { part: '三 · 壞事與好事' },
  { say: '下一部分可能會掂到一啲唔容易嘅事。慢慢嚟，唔想講可以跳過。' },
  { ask: '喺你嘅人生入面，有冇一件壞事、一段難捱嘅日子，後來帶咗一啲好嘅嘢嚟？',
    probe: '嗰個轉變係點樣發生嘅？當時你自己知唔知？' },
  { ask: '又有冇一件事，到而家都仲未變好？',
    probe: '佢而家喺你嘅故事入面，佔咗一個點樣嘅位置？' },

  { part: '四 · 想留低啲乜' },
  { ask: '如果有一日你唔喺度，你希望有啲乜嘢仍然存在？',
    probe: '點解係呢樣？' },
  { ask: '有邊啲人需要你？被需要，對你嚟講係一種點樣嘅感覺？',
    probe: '可唔可以講一次，你特別覺得被需要嘅時刻？' },

  { part: '五 · 社會時鐘' },
  { ask: '身邊嘅人、屋企、社會，期望你喺呢個年紀做到啲乜？——例如工作、結婚、生仔、買樓，或者其他。',
    probe: '你自己點樣同呢啲期望相處？' },

  { part: '六 · 下一代' },
  { ask: '講到下一代——可以係屋企嘅細路、你教過或者帶過嘅人、你嘅社區，或者成個世界——你最關心嘅係乜？',
    probe: '呢份關心，喺你日常生活入面係點樣出現嘅？' },

  { part: '七 · 創造、維護、奉獻' },
  { say: '書入面講，人為下一代留低嘢，大概有三種方式：創造、維護同奉獻。我逐樣問。' },
  { ask: '創造——你有冇整過一樣帶住你影子嘅嘢？可以係一件作品、一個人、一個團體、一個習慣、一份工作。',
    probe: '整嘅過程入面，有冇一刻，你覺得佢已經唔再完全由你控制？' },
  { ask: '維護——有冇一樣舊嘢、一個傳統、一種做法，係你想好好保存，交畀之後嘅人？',
    probe: '你想點樣交出去？交畀邊個？' },
  { ask: '奉獻——有冇一樣你創造過、或者照顧過嘅嘢，係你需要放手、由佢自己去生長？',
    probe: '放手嗰陣——或者諗到要放手——你有咩感覺？' },

  { part: '八 · 兩股力量' },
  { ask: '你幾時最想掌控、最想做到最好？又幾時最想放低、陪伴、同人連繫？',
    probe: '呢兩種感覺，有冇喺你身上拉扯過？可唔可以講一個例子？' },

  { part: '九 · 將來' },
  { say: '最後幾條，關於將來。' },
  { ask: '你對未來有冇一個計劃、草稿，或者夢想？',
    probe: '佢點樣令你有創造力？又點樣為其他人帶嚟貢獻？' },
  { ask: '如果你嘅故事有一日完結，你希望佢會成為一個點樣嘅新開始——對邊個？',
    probe: '對佢哋嚟講，嗰個新開始會係點樣？' },
  { ask: '回望今日講過嘅所有嘢——有冇一條線貫穿住？如果用一句說話講，會係咩？' },

  { part: '完' },
  { say: '多謝你今日將你嘅故事講畀我聽。' },
  { say: '我唔會總結，亦唔會分析——呢個故事係你嘅。' },
  { say: '書入面講，認識自己嘅個人神話係一個過程，唔係一次就完。你可以下載今日嘅記錄，過一排再讀；或者搵一個信得過嘅朋友，輪流做對方嘅聆聽者。' }
];

const ACK = ['嗯。', '我聽到。', '多謝你講。', '嗯，我喺度聽緊。'];
const NEXT = ['嗯。', '多謝你。', '我記低咗。'];
const SKIP = ['冇問題。', '冇問題，我哋去下一條。'];
const TOTAL = SCRIPT.filter(s => s.ask).length;
const KEY = 'swlb-interview-v1';
const $ = s => document.querySelector(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// state: i = next script step, wait = 'q' | 'probe' | null, log = what was said
let S = null;
const fresh = () => ({ i: 0, wait: null, log: [], secs: 0, done: false });
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } };
const pick = (arr, n) => arr[n % arr.length];

/* Echo the first sentence of an answer back, verbatim — confirming, never interpreting. */
function reflect(text, n) {
  const first = text.split(/[。！？!?\n]/).map(s => s.trim()).find(Boolean) || '';
  const chars = [...first];
  if (chars.length < 6) return pick(ACK, n);
  const frag = chars.length > 26 ? chars.slice(0, 24).join('') + '……' : first;
  return `${pick(ACK, n)}你講到「${frag}」。`;
}

/* ---------- state transitions (synchronous; rendering catches up) ---------- */
function add(msg) { S.log.push(msg); queue.push(msg); }

function advance() {
  while (S.i < SCRIPT.length) {
    const st = SCRIPT[S.i];
    if (st.part) { add({ who: 'part', text: st.part }); S.i++; continue; }
    if (st.say) { add({ who: 'me', text: st.say }); S.i++; continue; }
    add({ who: 'me', text: st.ask, q: true });
    S.wait = 'q';
    break;
  }
  if (S.i >= SCRIPT.length) S.done = true;
  save();
  drain();
}

function respond(text) {
  const st = SCRIPT[S.i];
  add({ who: 'you', text });
  if (S.wait === 'q' && st.probe) {
    add({ who: 'me', text: `${reflect(text, S.log.length)}\n${st.probe}` });
    S.wait = 'probe';
    save();
    return drain();
  }
  finishItem();
}

function skip() {
  if (S.wait === 'q') { add({ who: 'you', text: '（跳過）', skipped: true }); add({ who: 'me', text: pick(SKIP, S.log.length) }); }
  S.wait = null;
  S.i++;
  advance();
}

function finishItem() {
  S.wait = null;
  S.i++;
  if (SCRIPT[S.i]?.ask) add({ who: 'me', text: pick(NEXT, S.log.length) });
  advance();
}

/* ---------- rendering ---------- */
const log = $('#log');
let queue = [];
let draining = false;

function el(msg) {
  const li = document.createElement('li');
  li.className = msg.who + (msg.q ? ' q' : '') + (msg.skipped ? ' skipped' : '');
  li.textContent = msg.text;
  return li;
}

async function drain() {
  if (draining) return;
  draining = true;
  closeComposer();
  while (queue.length) {
    const msg = queue.shift();
    if (msg.who === 'me' && !reduced) {
      const dots = document.createElement('li');
      dots.className = 'typing';
      dots.innerHTML = '<span></span><span></span><span></span>';
      log.append(dots);
      scrollEnd();
      await new Promise(r => setTimeout(r, Math.min(1900, 500 + [...msg.text].length * 22)));
      dots.remove();
    }
    log.append(el(msg));
    scrollEnd();
  }
  draining = false;
  settle();
}

function settle() {
  updateTape();
  if (S.done) return showEnd();
  if (S.wait) openComposer(S.wait === 'q' ? '跳過' : '下一題');
}

const scrollEnd = () => log.lastElementChild?.scrollIntoView({ block: 'end', behavior: reduced ? 'auto' : 'smooth' });

/* ---------- composer ---------- */
const form = $('#composer');
const ta = $('#answer');
function openComposer(skipLabel) {
  $('#skip').textContent = skipLabel;
  form.hidden = false;
  ta.value = '';
  $('#send').disabled = true;
  ta.focus({ preventScroll: true });
  scrollEnd();
}
function closeComposer() { form.hidden = true; }

ta.addEventListener('input', () => { $('#send').disabled = !ta.value.trim(); });
ta.addEventListener('keydown', e => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !e.isComposing) { e.preventDefault(); form.requestSubmit(); }
});
form.addEventListener('submit', e => {
  e.preventDefault();
  const text = ta.value.trim();
  if (!text || !S.wait) return;
  respond(text);
});
$('#skip').addEventListener('click', () => { if (S.wait) skip(); });

/* ---------- recorder: clock + tape reels ---------- */
const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
function asked() { return SCRIPT.slice(0, S.i).filter(s => s.ask).length + (S.wait ? 1 : 0); }
function updateTape() {
  const done = S.done ? TOTAL : Math.max(0, asked() - (S.wait ? 1 : 0));
  const p = done / TOTAL;
  $('#reel-l').style.r = `${5 + 6 * (1 - p)}px`;
  $('#reel-r').style.r = `${5 + 6 * p}px`;
  $('#count').textContent = S.done ? '完' : `${Math.min(asked(), TOTAL)} / ${TOTAL}`;
  $('#rec').classList.toggle('live', !S.done && !log.hidden);
  $('#clock').textContent = fmt(S.secs);
}
setInterval(() => {
  if (!S || S.done || log.hidden || document.hidden) return;
  S.secs++;
  $('#clock').textContent = fmt(S.secs);
  if (S.secs % 5 === 0) save();
}, 1000);

/* ---------- start / resume / end ---------- */
function enterRoom() {
  $('#intro').hidden = true;
  log.hidden = false;
  scrollTo(0, 0);
}
function replay() { // render a saved transcript instantly
  log.replaceChildren(...S.log.map(el));
  queue = [];
  settle();
}
function showEnd() {
  closeComposer();
  log.classList.add('done');
  $('#end').hidden = false;
  $('#rec').classList.remove('live');
}
function reset() {
  try { localStorage.removeItem(KEY); } catch {}
  S = fresh();
  log.replaceChildren();
  log.classList.remove('done');
  $('#end').hidden = true;
}

$('#start').addEventListener('click', () => { reset(); enterRoom(); advance(); });
$('#resume').addEventListener('click', () => {
  enterRoom();
  replay();
  if (!S.wait && !S.done) advance(); // left mid-sequence: carry on
});
$('#restart').addEventListener('click', () => {
  if (!confirm('確定清除上次嘅訪談，重新開始？')) return;
  reset(); enterRoom(); advance();
});
$('#again').addEventListener('click', () => {
  if (!confirm('確定清除今次嘅訪談記錄？清除咗就冇得返轉頭。')) return;
  reset(); enterRoom(); advance();
});
$('#print').addEventListener('click', () => print());
$('#download').addEventListener('click', () => {
  const date = new Date().toISOString().slice(0, 10);
  const lines = S.log.map(m => m.who === 'part' ? `\n—— ${m.text} ——` : `${m.who === 'me' ? '問' : '答'}：${m.text}`);
  const blob = new Blob([`生命故事訪談 · 生成新的開始\n${date}　錄音時間 ${fmt(S.secs)}\n${lines.join('\n\n')}\n`], { type: 'text/plain;charset=utf-8' });
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `生命故事訪談-${date}.txt` });
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

/* boot */
S = load();
if (S && S.log?.length) {
  $('#start').hidden = true;
  $('#resume').hidden = false;
  $('#resume').textContent = S.done ? '睇返上次嘅記錄' : '繼續上次';
  $('#restart').hidden = false;
} else {
  S = fresh();
}
updateTape();
