(() => {
  "use strict";

  const SPRITE_DIR = "FreePixelFood/Assets/FreePixelFood/Sprite/Food/";
  const sprite = (name) => `${SPRITE_DIR}${name}.png`;
  const STORAGE_KEY = "caixa-surpresa:descobertas";
  const SOUND_KEY = "caixa-surpresa:som";
  const PX = 7; // tamanho de cada "pixel" da caixa na tela

  // Sprite principal de cada receita (pelo id do recepies.json)
  const HERO = {
    1: "Waffles", 2: "PiePumpkin", 3: "Potato", 4: "Tart", 5: "Cheese",
    6: "Chicken", 7: "Tomato", 8: "Bread", 9: "PotatoRed", 10: "Eggplant",
    11: "PieLemon", 12: "Sausages", 13: "Roll", 14: "ChickenLeg", 15: "Steak",
  };

  // Ícone de cada ingrediente: vale a palavra-chave que aparece primeiro no texto
  const INGREDIENT_RULES = [
    [/leite|iogurte/i, null],
    [/fermento/i, null],
    [/frango/i, "ChickenLeg"],
    [/patinho|carne/i, "Steak"],
    [/ovo|gema/i, "Eggs"],
    [/tomate|passata|ketchup|extrato/i, "Tomato"],
    [/batata|mandioca/i, "Potato"],
    [/berinjela/i, "Eggplant"],
    [/abobrinha|espinafre|vagem|alface|manjeric|cheiro-verde|ervilha/i, "PepperGreen"],
    [/queijo|mussarela|parmes|requeij|ricota/i, "Cheese"],
    [/cebola|alho/i, "Onion"],
    [/macarr/i, "Pretzel"],
    [/pão|massa|farinha|aveia|farelo|wrap|arroz/i, "Bread"],
    [/azeite|manteiga/i, "Olive"],
    [/cenoura/i, "Turnip"],
    [/mostarda|milho/i, "Honey"],
    [/sal|pimenta|orégano|páprica|tempero/i, "PepperRed"],
  ];

  const ROULETTE = [
    "Steak", "ChickenLeg", "Cheese", "Tomato", "Potato", "Eggs", "Bread", "Onion",
    "Eggplant", "Tart", "PiePumpkin", "Waffles", "Sausages", "Roll", "PepperRed",
    "PepperGreen", "Olive", "Chicken", "PieLemon", "PotatoRed",
  ];

  const $ = (id) => document.getElementById(id);
  const els = {
    stage: $("stage"), gift: $("gift"), lid: $("lid"), body: $("body"), hero: $("hero"),
    bubble: $("bubble"), bubbleImg: $("bubbleImg"), confetti: $("confetti"),
    overlay: $("overlay"), card: $("card"), cardImg: $("cardImg"), cardNum: $("cardNum"),
    cardTitle: $("cardTitle"), cardProtein: $("cardProtein"), cardPrep: $("cardPrep"),
    cardIngredients: $("cardIngredients"), badgeNew: $("badgeNew"),
    againBtn: $("againBtn"), closeBtn: $("closeBtn"), albumGrid: $("albumGrid"),
    counter: $("counter"), progress: $("progress"), resetBtn: $("resetBtn"), soundBtn: $("soundBtn"),
  };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reducedMotion ? Math.min(ms, 60) : ms));

  let recipes = [];
  let filter = "all";
  let lastId = null;
  let busy = false;
  let discovered = new Set(loadJSON(STORAGE_KEY, []));
  let soundOn = loadJSON(SOUND_KEY, true);

  function loadJSON(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v == null ? fallback : JSON.parse(v);
    } catch { return fallback; }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sem storage */ }
  }

  // ---------------------------------------------------------------
  // Caixa de presente em pixel art (desenhada no canvas)
  // ---------------------------------------------------------------
  const C = {
    o: "#2b1a1e", r: "#d64545", R: "#9c2b3a", l: "#f07a6a",
    y: "#ffd25e", Y: "#e09a2b", L: "#fff1a8",
  };

  function setupCanvas(canvas, w, h) {
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w * PX}px`;
    canvas.style.height = `${h * PX}px`;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, w, h);
    return (x, y, key) => { ctx.fillStyle = C[key]; ctx.fillRect(x, y, 1, 1); };
  }

  function ribbonColor(x, cx) {
    if (x === cx - 2) return "L";
    if (x === cx + 1) return "Y";
    if (x === cx - 1 || x === cx) return "y";
    return null;
  }

  function drawBody() {
    const W = 30, H = 18, cx = W / 2;
    const put = setupCanvas(els.body, W, H);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (x === 0 || x === W - 1 || y === 0 || y === H - 1) { put(x, y, "o"); continue; }
        let k = "r";
        if (y === 1 || y === H - 2 || x >= W - 3) k = "R";
        else if (x === 1) k = "l";
        else if ((x + (y % 2) * 3) % 6 === 3 && y % 4 === 2) k = "l"; // bolinhas
        const rb = ribbonColor(x, cx);
        if (rb) k = y === 1 ? "Y" : rb;
        put(x, y, k);
      }
    }
  }

  const BOW = [
    ".oo........oo.",
    "oyyo......oyyo",
    "oyLyo....oyyYo",
    "oyLyyo..oyyyYo",
    "oyyyyyooyyyyYo",
    ".oyyyyYYyyyYo.",
    "..ooooyyYoooo.",
  ];

  function drawLid() {
    const W = 34, LH = 7, top = BOW.length, H = top + LH, cx = W / 2;
    const put = setupCanvas(els.lid, W, H);
    for (let y = top; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (x === 0 || x === W - 1 || y === top || y === H - 1) { put(x, y, "o"); continue; }
        let k = "r";
        if (y === top + 1) k = "l";
        else if (y === H - 2 || x >= W - 3) k = "R";
        else if (x === 1) k = "l";
        const rb = ribbonColor(x, cx);
        if (rb) k = y === H - 2 ? "Y" : rb;
        put(x, y, k);
      }
    }
    const ox = Math.round((W - BOW[0].length) / 2);
    BOW.forEach((row, y) => {
      [...row].forEach((ch, x) => { if (ch !== ".") put(ox + x, y, ch); });
    });
  }

  // ---------------------------------------------------------------
  // Sons 8-bit (WebAudio)
  // ---------------------------------------------------------------
  let audio = null;
  function beep(freq, dur = 0.08, type = "square", vol = 0.06, delay = 0) {
    if (!soundOn) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const t = audio.currentTime + delay;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(audio.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    } catch { /* áudio indisponível */ }
  }
  const sfx = {
    tick: (i) => beep(420 + (i % 4) * 90, 0.04, "square", 0.035),
    pop: () => { beep(180, 0.12, "triangle", 0.12); beep(520, 0.1, "square", 0.05, 0.05); },
    fanfare: () => [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.14, "square", 0.05, i * 0.09)),
    click: () => beep(660, 0.05, "square", 0.04),
  };

  function renderSoundBtn() {
    els.soundBtn.textContent = soundOn ? "♪ ON" : "♪ OFF";
    els.soundBtn.setAttribute("aria-pressed", String(soundOn));
  }

  // ---------------------------------------------------------------
  // Dados
  // ---------------------------------------------------------------
  function proteinGroup(r) {
    const p = r.proteina_principal.toLowerCase();
    return { carne: /carne|patinho/.test(p), frango: /frango/.test(p) };
  }

  function pool() {
    if (filter === "all") return recipes;
    return recipes.filter((r) => proteinGroup(r)[filter]);
  }

  function pickRecipe() {
    const list = pool();
    // Dá preferência às receitas ainda não descobertas, sem repetir a última
    const fresh = list.filter((r) => !discovered.has(r.id) && r.id !== lastId);
    const candidates = fresh.length ? fresh : list.filter((r) => r.id !== lastId);
    const from = candidates.length ? candidates : list;
    return from[Math.floor(Math.random() * from.length)];
  }

  function ingredientIcon(text) {
    let best = null;
    let bestIdx = Infinity;
    for (const [re, icon] of INGREDIENT_RULES) {
      const m = re.exec(text);
      if (m && m.index < bestIdx) { bestIdx = m.index; best = icon; }
    }
    return best;
  }

  const heroOf = (r) => HERO[r.id] || "Cookie";
  const pad = (n) => String(n).padStart(2, "0");

  // ---------------------------------------------------------------
  // Álbum
  // ---------------------------------------------------------------
  function renderAlbum(justFoundId) {
    els.albumGrid.innerHTML = "";
    const inPool = new Set(pool().map((r) => r.id));
    recipes.forEach((r) => {
      const found = discovered.has(r.id);
      const li = document.createElement("li");
      li.className = "album-slot";
      if (!found) li.classList.add("is-locked");
      if (!inPool.has(r.id)) li.classList.add("is-filtered-out");
      if (r.id === justFoundId) li.classList.add("just-found");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.title = found ? r.nome : "Ainda não descoberta";
      btn.setAttribute("aria-label", found ? `Ver receita: ${r.nome}` : `Receita ${pad(r.id)} ainda não descoberta`);
      btn.disabled = !found;

      const num = document.createElement("span");
      num.className = "num";
      num.textContent = pad(r.id);

      const img = document.createElement("img");
      img.src = sprite(heroOf(r));
      img.alt = "";

      btn.append(num, img);
      if (found) btn.addEventListener("click", () => { sfx.click(); showCard(r, false); });
      li.append(btn);
      els.albumGrid.append(li);
    });

    const total = recipes.length;
    els.counter.textContent = `${discovered.size}/${total}`;
    els.progress.style.width = total ? `${(discovered.size / total) * 100}%` : "0";
  }

  // ---------------------------------------------------------------
  // Cartão da receita
  // ---------------------------------------------------------------
  let lastFocus = null;

  function showCard(r, isNew) {
    lastFocus = document.activeElement;
    els.cardImg.src = sprite(heroOf(r));
    els.cardImg.alt = r.nome;
    els.cardNum.textContent = `RECEITA Nº ${pad(r.id)}`;
    els.cardTitle.textContent = r.nome;
    els.cardProtein.textContent = r.proteina_principal;
    els.cardPrep.textContent = r.preparo;
    els.badgeNew.hidden = !isNew;

    els.cardIngredients.innerHTML = "";
    r.ingredientes.forEach((text, i) => {
      const li = document.createElement("li");
      li.style.animationDelay = `${0.15 + i * 0.06}s`;
      const icon = ingredientIcon(text);
      let mark;
      if (icon) {
        mark = document.createElement("img");
        mark.src = sprite(icon);
        mark.alt = "";
      } else {
        mark = document.createElement("span");
        mark.className = "dot";
      }
      const span = document.createElement("span");
      span.textContent = text;
      li.append(mark, span);
      els.cardIngredients.append(li);
    });

    els.overlay.hidden = false;
    els.againBtn.focus();
  }

  function hideCard() {
    if (els.overlay.hidden) return;
    els.overlay.hidden = true;
    resetBox();
    if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus();
  }

  // ---------------------------------------------------------------
  // Sequência de abertura
  // ---------------------------------------------------------------
  function resetBox() {
    els.stage.classList.remove("is-open", "is-busy");
    els.gift.classList.remove("is-shaking", "is-shaking-hard");
    els.bubble.classList.remove("is-rolling");
    els.gift.disabled = false;
    els.confetti.innerHTML = "";
    busy = false;
  }

  async function roulette(finalSprite) {
    els.bubble.classList.add("is-rolling");
    const steps = 22;
    for (let i = 0; i < steps; i++) {
      const last = i === steps - 1;
      els.bubbleImg.src = sprite(last ? finalSprite : ROULETTE[(Math.random() * ROULETTE.length) | 0]);
      sfx.tick(i);
      if (i === 12) els.gift.classList.add("is-shaking-hard");
      // desacelera como uma roleta
      await wait(50 + Math.pow(i / steps, 3) * 260);
    }
  }

  function burstConfetti(heroName) {
    if (reducedMotion) return;
    const rect = els.stage.getBoundingClientRect();
    const boxRect = els.body.getBoundingClientRect();
    const originX = boxRect.left - rect.left + boxRect.width / 2;
    const originY = boxRect.top - rect.top + 10;
    const parts = [];

    for (let i = 0; i < 26; i++) {
      const img = document.createElement("img");
      img.src = sprite(i % 5 === 0 ? heroName : ROULETTE[(Math.random() * ROULETTE.length) | 0]);
      img.alt = "";
      const size = 28 + ((Math.random() * 3) | 0) * 8;
      img.style.width = img.style.height = `${size}px`;
      els.confetti.append(img);
      const angle = (-Math.PI / 2) + (Math.random() - 0.5) * 2.2;
      const speed = 7 + Math.random() * 8;
      parts.push({
        el: img, x: originX - size / 2, y: originY - size / 2,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        rot: 0, vr: (Math.random() < 0.5 ? -1 : 1) * (4 + Math.random() * 8), life: 0,
      });
    }

    const start = performance.now();
    function frame(now) {
      const t = now - start;
      parts.forEach((p) => {
        p.vy += 0.38;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        const snapped = Math.round(p.rot / 15) * 15; // gira "em degraus", estilo pixel
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${snapped}deg)`;
        p.el.style.opacity = String(Math.max(0, 1 - t / 1800));
      });
      if (t < 1800 && els.confetti.isConnected) requestAnimationFrame(frame);
      else els.confetti.innerHTML = "";
    }
    requestAnimationFrame(frame);
  }

  async function openBox() {
    if (busy || !recipes.length) return;
    const list = pool();
    if (!list.length) return;
    busy = true;
    els.gift.disabled = true;

    const r = pickRecipe();
    lastId = r.id;
    const heroName = heroOf(r);
    els.hero.src = sprite(heroName);
    els.hero.alt = r.nome;

    els.stage.classList.add("is-busy");
    els.gift.classList.add("is-shaking");
    await roulette(heroName);
    await wait(350);

    els.gift.classList.remove("is-shaking", "is-shaking-hard");
    els.stage.classList.add("is-open");
    sfx.pop();
    burstConfetti(heroName);
    await wait(500);
    sfx.fanfare();

    const isNew = !discovered.has(r.id);
    if (isNew) {
      discovered.add(r.id);
      saveJSON(STORAGE_KEY, [...discovered]);
    }
    renderAlbum(isNew ? r.id : null);

    await wait(900);
    showCard(r, isNew);
  }

  // ---------------------------------------------------------------
  // Eventos
  // ---------------------------------------------------------------
  els.gift.addEventListener("click", openBox);
  els.closeBtn.addEventListener("click", () => { sfx.click(); hideCard(); });
  els.againBtn.addEventListener("click", () => {
    hideCard();
    els.gift.focus();
    setTimeout(openBox, 250);
  });
  els.overlay.addEventListener("click", (e) => { if (e.target === els.overlay) hideCard(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideCard();
  });

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      if (busy) return;
      sfx.click();
      filter = chip.dataset.filter;
      document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
      renderAlbum();
    });
  });

  els.soundBtn.addEventListener("click", () => {
    soundOn = !soundOn;
    saveJSON(SOUND_KEY, soundOn);
    renderSoundBtn();
    sfx.click();
  });

  let resetArmed = false;
  els.resetBtn.addEventListener("click", () => {
    if (!resetArmed) {
      resetArmed = true;
      els.resetBtn.textContent = "tem certeza? clique de novo";
      setTimeout(() => { resetArmed = false; els.resetBtn.textContent = "recomeçar coleção"; }, 3000);
      return;
    }
    resetArmed = false;
    els.resetBtn.textContent = "recomeçar coleção";
    discovered = new Set();
    saveJSON(STORAGE_KEY, []);
    renderAlbum();
  });

  // ---------------------------------------------------------------
  // Início
  // ---------------------------------------------------------------
  drawBody();
  drawLid();
  renderSoundBtn();
  // pré-carrega os sprites para a roleta não piscar
  [...new Set([...ROULETTE, ...Object.values(HERO)])].forEach((n) => { new Image().src = sprite(n); });

  fetch("recepies.json")
    .then((res) => { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then((data) => {
      recipes = data.pratos_usuario || [];
      renderAlbum();
    })
    .catch(() => {
      document.getElementById("hint").textContent =
        "Não consegui ler o recepies.json — abra a página por um servidor local (veja o README).";
      els.gift.disabled = true;
    });
})();
