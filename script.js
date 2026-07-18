// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Hero terminal: simulated deploy log ----------
// This mirrors Erjon's real workflow: commit -> push -> Cloudflare Pages build -> live.
(function () {
  const body = document.getElementById('terminal-body');
  const lines = [
    { text: '$ git push origin main', delay: 30 },
    { text: 'Enumerating objects, done.', delay: 10, muted: true },
    { text: '→ Cloudflare Pages: build triggered', delay: 25 },
    { text: '  Building gold-studio...        ', delay: 20 },
    { text: '  ✓ gold-studio        deployed', delay: 15, ok: true },
    { text: '  Building mango-match-web...    ', delay: 20 },
    { text: '  ✓ mango-match-web    deployed', delay: 15, ok: true },
    { text: '  Building bipo-messenger...     ', delay: 20 },
    { text: '  ✓ bipo-messenger     deployed', delay: 15, ok: true },
    { text: '', delay: 10 },
    { text: '3/3 projects live.', delay: 20, ok: true },
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let renderedHTML = '';

  function colorize(line) {
    let cls = '';
    if (line.ok) cls = 'color:#3ddc84;';
    else if (line.muted) cls = 'color:#5b6478;';
    else if (line.text.startsWith('$')) cls = 'color:#ffb454;';
    else if (line.text.startsWith('→')) cls = 'color:#5b8cff;';
    return cls;
  }

  function typeStep() {
    if (lineIndex >= lines.length) {
      setTimeout(() => {
        renderedHTML = '';
        lineIndex = 0;
        charIndex = 0;
        body.innerHTML = '';
        typeStep();
      }, 2200);
      return;
    }
    const line = lines[lineIndex];
    if (charIndex === 0) {
      renderedHTML += `<span style="${colorize(line)}">`;
    }
    charIndex++;
    const partial = line.text.slice(0, charIndex);
    body.innerHTML = renderedHTML + partial + (charIndex < line.text.length ? '<span class="cursor">▍</span>' : '') + '</span>';

    if (charIndex >= line.text.length) {
      renderedHTML += line.text + '\n</span>';
      lineIndex++;
      charIndex = 0;
      setTimeout(typeStep, line.delay * 4);
    } else {
      setTimeout(typeStep, line.delay);
    }
  }

  typeStep();
})();

// ---------- Leo: free AI assistant powered by Puter.js (no API key, no cost) ----------
(function () {
  const toggle = document.getElementById('leo-toggle');
  const panel = document.getElementById('leo-panel');
  const closeBtn = document.getElementById('leo-close');
  const messagesEl = document.getElementById('leo-messages');
  const form = document.getElementById('leo-form');
  const input = document.getElementById('leo-input');

  const SYSTEM_CONTEXT = `Ti je Leo, asistenti AI në website-in personal të Erjon Gjoka.
Erjon është zhvillues i pavarur full-stack dhe DevOps. Ai ndërton "Mango Match", një app dating
për Android (Kotlin, Jetpack Compose) me një version web paralel (React, TypeScript, Vite, Tailwind),
të dyja mbi një backend të përbashkët Supabase. Ai ka gjithashtu tre projekte live në Cloudflare Pages:
Gold Studio, Mango Match Web, dhe Bipo Messenger.
Përgjigju shkurt, miqësor dhe profesional, në shqip nëse vizitori shkruan shqip, ose në gjuhën
që përdor vizitori. Nëse nuk di diçka specifike për Erjonin, thuaje haptazi dhe sugjero ta kontaktojnë direkt.`;

  const history = [{ role: 'system', content: SYSTEM_CONTEXT }];
  let opened = false;

  function addMessage(text, cls) {
    const div = document.createElement('div');
    div.className = `leo-msg ${cls}`;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function openPanel() {
    panel.classList.remove('hidden');
    if (!opened) {
      addMessage('Tungjatjeta 👋 Unë jam Leo, asistenti i Erjonit. Pyet më për projektet e tij, stack-un teknik, ose si të lidhesh me të.', 'bot');
      opened = true;
    }
    input.focus();
  }

  toggle.addEventListener('click', () => {
    panel.classList.contains('hidden') ? openPanel() : panel.classList.add('hidden');
  });
  closeBtn.addEventListener('click', () => panel.classList.add('hidden'));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    input.disabled = true;

    addMessage(text, 'user');
    history.push({ role: 'user', content: text });

    const typingEl = addMessage('Leo po shkruan...', 'bot typing');

    try {
      if (typeof puter === 'undefined' || !puter.ai || !puter.ai.chat) {
        throw new Error('puter-unavailable');
      }
      const response = await puter.ai.chat(history, { model: 'gpt-5-nano' });
      const replyText = (typeof response === 'string')
        ? response
        : (response?.message?.content ?? response?.text ?? JSON.stringify(response));

      typingEl.remove();
      addMessage(replyText, 'bot');
      history.push({ role: 'assistant', content: replyText });
    } catch (err) {
      typingEl.remove();
      addMessage('Më vjen keq, Leo nuk arriti të përgjigjet tani. Provo sërish për pak, ose kontakto Erjonin direkt.', 'bot');
      console.error('Leo/Puter error:', err);
    } finally {
      input.disabled = false;
      input.focus();
    }
  });
})();
