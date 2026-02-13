(function(){
  RoseWall.mount("rose-wall", 150);

  const cfg = window.CONTENT || {};
  const gfName = cfg.girlfriendName || "my love";
  document.getElementById("gfNameTop").textContent = gfName;
  document.getElementById("gfNameFoot").textContent = gfName;

  // ====== Passcode gate ======
  const lockEl = document.getElementById("lock");
  const passInput = document.getElementById("passInput");
  const unlockBtn = document.getElementById("unlockBtn");
  const hintBtn = document.getElementById("hintBtn");
  const lockMsg = document.getElementById("lockMsg");
  const unlockKey = "openwhen_unlocked_v1";

  function showLock(message){
    console.log("showLock:", message);
    try{
      lockMsg.textContent = message || "";
      lockEl.classList.remove("hidden");
      passInput.value = "";
      passInput.focus();
    }catch(e){ console.error("showLock error", e); }
  }
  function hideLock(){
    console.log("hideLock");
    try{ lockEl.classList.add("hidden"); }catch(e){ console.error("hideLock error", e); }
  }

  const passcode = (cfg.passcode || "").trim();
  const alreadyUnlocked = Storage.getJSON(unlockKey, false) === true;

  if(passcode && !alreadyUnlocked){
    showLock("Type the secret code (set in content.js).");
  }

  function tryUnlock(){
    const v = (passInput && (passInput.value || "") || "").trim().toLowerCase();
    if(!passcode){
      hideLock();
      return;
    }
    console.log("tryUnlock: entered=", v, " expected=", passcode && passcode.toLowerCase());
    try{
      if(v === passcode.toLowerCase()){
        Storage.setJSON(unlockKey, true);
        console.log("unlock success — stored key", Storage.getJSON(unlockKey));
        hideLock();
      }else{
        showLock("Nope 😌 try again.");
      }
    }catch(e){ console.error("tryUnlock error", e); showLock("Unexpected error — see console."); }
  }
  unlockBtn.addEventListener("click", tryUnlock);
  passInput.addEventListener("keydown", (e)=>{ if(e.key==="Enter") tryUnlock(); });

  hintBtn.addEventListener("click", ()=>{
    if(!passcode) return;
    // cute hint: show length
    showLock(`Hint:KDB didi usually call you this and it has ${passcode.length} characters. (Or… just ask me 😄)`);
  });

  // ====== Counters ======
  const daysTogetherEl = document.getElementById("daysTogether");
  const nextMeetEl = document.getElementById("nextMeet");

  function updateStats(){
    const start = cfg.relationshipStartDate ? new Date(cfg.relationshipStartDate) : null;
    if(start && !isNaN(start.getTime())){
      const days = DateUtils.daysBetween(start, new Date());
      daysTogetherEl.textContent = `${days} days`;
    }else{
      daysTogetherEl.textContent = "Set start date";
    }

    if(cfg.nextMeetDate){
      const d = new Date(cfg.nextMeetDate);
      if(!isNaN(d.getTime())){
        const daysLeft = DateUtils.daysBetween(new Date(), d);
        nextMeetEl.textContent = daysLeft >= 0 ? `${daysLeft} days` : "date passed";
      }else{
        nextMeetEl.textContent = "invalid date";
      }
    }else{
      nextMeetEl.textContent = "—";
    }
  }
  updateStats();

  // ====== Envelopes ======
  const grid = document.getElementById("grid");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("closeBtn");
  const mTitle = document.getElementById("mTitle");
  const mBody = document.getElementById("mBody");
  const mPhoto = document.getElementById("mPhoto");
  const mAudio = document.getElementById("mAudio");
  const mAction = document.getElementById("mAction");
  const mMeta = document.getElementById("mMeta");
  const markUnopenedBtn = document.getElementById("markUnopenedBtn");
  const specialArea = document.getElementById("specialArea");

  const openedKey = "openwhen_opened_v1";
  const opened = new Set(Storage.getJSON(openedKey, []));
  function saveOpened(){ Storage.setJSON(openedKey, [...opened]); }

  // coupon storage
  const couponKey = "openwhen_coupons_v1";
  const redeemed = new Set(Storage.getJSON(couponKey, []));
  function saveRedeemed(){ Storage.setJSON(couponKey, [...redeemed]); }

  // reasons favorites storage
  const favKey = "openwhen_reason_favs_v1";
  const favs = Storage.getJSON(favKey, []);
  function saveFavs(){ Storage.setJSON(favKey, favs); }

  // valentine unlock date
  const valentineUnlock = cfg.valentineUnlockDate || cfg.valentineUnlockDate || "2026-02-14";

  function isUnlocked(env){
    if(!env.unlockDate) return true;
    const today = new Date();
    const unlock = new Date(env.unlockDate);
    if(isNaN(unlock.getTime())) return true;
    // unlock if today is same day or after
    const diff = DateUtils.daysBetween(unlock, today);
    return diff >= 0;
  }

  function renderGrid(){
    grid.innerHTML = "";
    (cfg.envelopes || []).forEach(env=>{
      const btn = document.createElement("button");
      btn.className = "env";
      const wasOpened = opened.has(env.id);
      const unlocked = isUnlocked(env);

      const statusPill = unlocked
        ? (wasOpened ? "opened ✅" : "sealed 🔒")
        : "locked ⏳";

      btn.innerHTML = `
        <div class="emoji">${Safe.escapeHtml(env.emoji || "💌")}</div>
        <div class="title">${Safe.escapeHtml(env.title || "Open when…")}</div>
        <div class="meta">
          <span class="pill">${statusPill}</span>
          ${env.unlockDate ? `<span class="pill">opens ${Safe.escapeHtml(env.unlockDate)}</span>` : ""}
        </div>
      `;
      btn.addEventListener("click", ()=>openEnvelope(env));
      grid.appendChild(btn);
    });
  }

  function closeModal(){
    modal.classList.add("hidden");
    // stop audio to avoid it continuing in background
    try{ mAudio.pause(); }catch(e){}
  }

  function openEnvelope(env){
    // locked?
    if(!isUnlocked(env)){
      // show lock message modal (no mark opened)
      mTitle.textContent = env.title || "Locked";
      mBody.innerHTML = `<p>${Safe.escapeHtml(env.lockMessage || "Not yet 😉")}</p>`;
      mMeta.textContent = "This one is intentionally locked.";
      mPhoto.classList.add("hidden");
      mAudio.classList.add("hidden");
      mAudio.src = "";
      mAction.classList.add("hidden");
      markUnopenedBtn.classList.add("hidden");
      specialArea.innerHTML = "";
      modal.classList.remove("hidden");
      return;
    }

    opened.add(env.id);
    saveOpened();
    renderGrid();

    mTitle.textContent = env.title || "Open when…";
    mBody.innerHTML = (env.body || []).map(line=> `<p>${Safe.escapeHtml(line)}</p>`).join("");

    // Special widget
    specialArea.innerHTML = "";
    if(env.special?.type === "breathing"){
      const seconds = Number(env.special.seconds || 60);
      specialArea.innerHTML = `
        <div class="card" style="padding:12px; margin: 10px 0;">
          <div style="font-weight:900;">60-second breathing exercise</div>
          <div class="small" style="margin-top:6px;">Press start. Breathe in 4 • hold 2 • out 6.</div>
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:10px;">
            <button id="breathBtn" class="btn btn-primary">Start</button>
            <div id="breathTimer" class="pill">Ready</div>
          </div>
        </div>
      `;
      const breathBtn = document.getElementById("breathBtn");
      const timer = document.getElementById("breathTimer");
      let t = seconds;
      let interval = null;
      breathBtn.addEventListener("click", ()=>{
        if(interval) return;
        t = seconds;
        timer.textContent = `${t}s`;
        interval = setInterval(()=>{
          t -= 1;
          timer.textContent = `${t}s`;
          if(t <= 0){
            clearInterval(interval);
            interval = null;
            timer.textContent = "Done 🌿";
          }
        }, 1000);
      });
    }

    // Photo
    if(env.photo){
      mPhoto.src = env.photo;
      mPhoto.classList.remove("hidden");
    }else{
      mPhoto.classList.add("hidden");
      mPhoto.src = "";
    }

    // Audio
    if(env.audio){
      mAudio.src = env.audio;
      mAudio.classList.remove("hidden");
    }else{
      mAudio.classList.add("hidden");
      mAudio.src = "";
    }

    // Action
    if(env.action?.type === "whatsapp"){
      const num = (cfg.whatsappNumber || "").trim();
      if(num){
        const url = WhatsApp.link(num, env.action.text || "");
        mAction.href = url;
        mAction.textContent = env.action.label || "Text me";
        mAction.classList.remove("hidden");
      }else{
        mAction.classList.add("hidden");
      }
    }else if(env.action?.url){
      mAction.href = env.action.url;
      mAction.textContent = env.action.label || "Do this now";
      mAction.classList.remove("hidden");
    }else{
      mAction.classList.add("hidden");
    }

    // Meta + mark unopened
    mMeta.textContent = `Envelope id: ${env.id} • Saved as opened on this device.`;
    markUnopenedBtn.classList.remove("hidden");
    markUnopenedBtn.onclick = ()=>{
      opened.delete(env.id);
      saveOpened();
      renderGrid();
      closeModal();
    };

    modal.classList.remove("hidden");
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeModal(); });

  renderGrid();

  // SOS button opens the "miss-me" envelope if it exists
  document.getElementById("sos").addEventListener("click", ()=>{
    const env = (cfg.envelopes || []).find(e=>e.id==="miss-me") || (cfg.envelopes || [])[0];
    if(env) openEnvelope(env);
  });

  // ====== Timeline ======
  const timelineList = document.getElementById("timelineList");
  (cfg.timeline || []).forEach(item=>{
    const el = document.createElement("div");
    el.className = "timeline-item";
    el.innerHTML = `
      <div class="timeline-date">${Safe.escapeHtml(item.dateLabel || "")}</div>
      <div>
        <div class="timeline-title">${Safe.escapeHtml(item.title || "")}</div>
        <div class="timeline-note">${Safe.escapeHtml(item.note || "")}</div>
      </div>
    `;
    timelineList.appendChild(el);
  });

  // ====== Gallery ======
  const galleryGrid = document.getElementById("galleryGrid");
  (cfg.gallery || []).forEach(g=>{
    const card = document.createElement("div");
    card.className = "gcard";
    card.innerHTML = `
      <img src="${Safe.escapeHtml(g.photo)}" alt="Gallery photo"/>
      <div class="gcap">${Safe.escapeHtml(g.caption || "")}</div>
    `;
    card.addEventListener("click", ()=>{
      mTitle.textContent = "Memory ✨";
      mBody.innerHTML = `<p>${Safe.escapeHtml(g.caption || "")}</p>`;
      specialArea.innerHTML = "";
      mPhoto.src = g.photo;
      mPhoto.classList.remove("hidden");
      mAudio.classList.add("hidden");
      mAudio.src = "";
      mAction.classList.add("hidden");
      markUnopenedBtn.classList.add("hidden");
      mMeta.textContent = "Gallery item.";
      modal.classList.remove("hidden");
    });
    galleryGrid.appendChild(card);
  });

  // ====== Playlist ======
  const playlistList = document.getElementById("playlistList");
  (cfg.playlist || []).forEach(s=>{
    const el = document.createElement("div");
    el.className = "song";
    el.innerHTML = `
      <div class="top">
        <div>
          <div class="title">${Safe.escapeHtml(`${s.n}. ${s.title}`)}</div>
          <div class="small" style="margin-top:6px; line-height:1.45;">${Safe.escapeHtml(s.note || "")}</div>
        </div>
        <a href="${Safe.escapeHtml(s.url || "#")}" target="_blank" rel="noreferrer">Open link</a>
      </div>
    `;
    playlistList.appendChild(el);
  });

  // ====== Coupons ======
  const couponGrid = document.getElementById("couponGrid");
  (cfg.coupons || []).forEach(c=>{
    const el = document.createElement("div");
    el.className = "coupon";
    const isRed = redeemed.has(c.id);
    el.innerHTML = `
      <div class="ctitle">${Safe.escapeHtml(c.title)}</div>
      <div class="cdesc">${Safe.escapeHtml(c.desc)}</div>
      <div class="cmeta">
        <span class="${isRed ? "redeemed" : ""}">${isRed ? "Redeemed ✅" : "Available 🎟️"}</span>
        <button class="btn btn-ghost" data-coupon="${Safe.escapeHtml(c.id)}" style="padding:8px 10px;border-radius:999px;">
          ${isRed ? "Undo" : "Redeem"}
        </button>
      </div>
      <div class="small" style="margin-top:10px;">${Safe.escapeHtml(c.redeemText || "")}</div>
    `;
    el.querySelector("button").addEventListener("click", (e)=>{
      const id = e.currentTarget.getAttribute("data-coupon");
      if(redeemed.has(id)) redeemed.delete(id);
      else redeemed.add(id);
      saveRedeemed();
      // re-render coupons quickly
      couponGrid.innerHTML = "";
      (cfg.coupons || []).forEach(()=>{});
      // easiest: just rerun whole coupon render
      // (small data, ok)
      renderCoupons();
    });
    couponGrid.appendChild(el);
  });

  function renderCoupons(){
    couponGrid.innerHTML = "";
    (cfg.coupons || []).forEach(c=>{
      const el = document.createElement("div");
      el.className = "coupon";
      const isRed = redeemed.has(c.id);
      el.innerHTML = `
        <div class="ctitle">${Safe.escapeHtml(c.title)}</div>
        <div class="cdesc">${Safe.escapeHtml(c.desc)}</div>
        <div class="cmeta">
          <span class="${isRed ? "redeemed" : ""}">${isRed ? "Redeemed ✅" : "Available 🎟️"}</span>
          <button class="btn btn-ghost" data-coupon="${Safe.escapeHtml(c.id)}" style="padding:8px 10px;border-radius:999px;">
            ${isRed ? "Undo" : "Redeem"}
          </button>
        </div>
        <div class="small" style="margin-top:10px;">${Safe.escapeHtml(c.redeemText || "")}</div>
      `;
      el.querySelector("button").addEventListener("click", (e)=>{
        const id = e.currentTarget.getAttribute("data-coupon");
        if(redeemed.has(id)) redeemed.delete(id);
        else redeemed.add(id);
        saveRedeemed();
        renderCoupons();
      });
      couponGrid.appendChild(el);
    });
  }
  renderCoupons();

  // ====== Reasons generator ======
  const reasonBox = document.getElementById("reasonBox");
  const favList = document.getElementById("favList");
  const reasonBtn = document.getElementById("reasonBtn");
  const saveReasonBtn = document.getElementById("saveReasonBtn");
  const clearFavsBtn = document.getElementById("clearFavsBtn");
  let currentReason = "";

  function renderFavs(){
    favList.innerHTML = "";
    favs.forEach((r, idx)=>{
      const chip = document.createElement("div");
      chip.className = "fav";
      chip.textContent = r;
      chip.title = "Click to remove";
      chip.addEventListener("click", ()=>{
        favs.splice(idx, 1);
        saveFavs();
        renderFavs();
      });
      favList.appendChild(chip);
    });
    if(!favs.length){
      const empty = document.createElement("div");
      empty.className = "small";
      empty.textContent = "No favorites yet.";
      favList.appendChild(empty);
    }
  }
  renderFavs();

  function pickReason(){
    const list = cfg.reasons || [];
    if(!list.length){
      currentReason = "Add reasons in content.js";
      reasonBox.textContent = currentReason;
      return;
    }
    const r = list[Math.floor(Math.random()*list.length)];
    currentReason = r;
    reasonBox.textContent = r;
  }
  reasonBtn.addEventListener("click", pickReason);

  saveReasonBtn.addEventListener("click", ()=>{
    if(!currentReason) return;
    if(!favs.includes(currentReason)){
      favs.unshift(currentReason);
      // cap favorites
      if(favs.length > 12) favs.pop();
      saveFavs();
      renderFavs();
    }
  });

  clearFavsBtn.addEventListener("click", ()=>{
    favs.splice(0, favs.length);
    saveFavs();
    renderFavs();
  });

  // ====== Quiz ======
  const quizWrap = document.getElementById("quizWrap");
  const submitQuizBtn = document.getElementById("submitQuizBtn");
  const resetQuizBtn = document.getElementById("resetQuizBtn");
  const quizResult = document.getElementById("quizResult");

  function renderQuiz(){
    quizWrap.innerHTML = "";
    quizResult.classList.add("hidden");
    quizResult.textContent = "";

    const quiz = cfg.quiz || {};
    const qs = quiz.questions || [];
    qs.forEach((qObj, qi)=>{
      const qCard = document.createElement("div");
      qCard.className = "qcard";
      qCard.innerHTML = `
        <div class="q">${Safe.escapeHtml(`${qi+1}. ${qObj.q}`)}</div>
        <div class="qopts">
          ${qObj.options.map((opt, oi)=>`
            <label>
              <input type="radio" name="${Safe.escapeHtml(qObj.id)}" value="${oi}"/>
              <span>${Safe.escapeHtml(opt)}</span>
            </label>
          `).join("")}
        </div>
      `;
      quizWrap.appendChild(qCard);
    });
  }
  renderQuiz();

  function gradeQuiz(){
    const quiz = cfg.quiz || {};
    const qs = quiz.questions || [];
    let score = 0;
    let answered = 0;

    qs.forEach(qObj=>{
      const chosen = document.querySelector(`input[name="${CSS.escape(qObj.id)}"]:checked`);
      if(chosen){
        answered += 1;
        if(Number(chosen.value) === Number(qObj.answerIndex)) score += 1;
      }
    });

    quizResult.classList.remove("hidden");
    quizResult.textContent = `Score: ${score}/${qs.length} — answered ${answered}/${qs.length}. (Placeholder quiz)`;
    // cute: if perfect, open valentine-ish message
    if(score === qs.length && qs.length > 0){
      quizResult.textContent += " 💘 Perfect! You know us too well.";
    }
  }

  submitQuizBtn.addEventListener("click", gradeQuiz);
  resetQuizBtn.addEventListener("click", renderQuiz);

})();
