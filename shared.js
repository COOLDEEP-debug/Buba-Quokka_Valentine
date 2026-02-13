/* shared.js: rose-wall + small utilities.  */

(function(){
  function rand(min, max){ return Math.random()*(max-min)+min; }

  window.RoseWall = {
    mount(containerId, count=170){
      const el = document.getElementById(containerId);
      if(!el) return;
      el.innerHTML = "";
      const w = window.innerWidth;
      const h = window.innerHeight;
      for(let i=0;i<count;i++){
        const s = document.createElement("span");
        s.className = "rose";
        s.textContent = "🌹";
        s.style.left = rand(0, w) + "px";
        s.style.top  = rand(0, h) + "px";
        s.style.fontSize = rand(18, 36) + "px";
        s.style.opacity  = rand(0.25, 0.9);
        s.style.animationDelay = rand(0, 6).toFixed(2) + "s";
        el.appendChild(s);
      }
    }
  };

  window.DateUtils = {
    daysBetween(a, b){
      const ms = 24*60*60*1000;
      const da = new Date(a.getFullYear(), a.getMonth(), a.getDate());
      const db = new Date(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.round((db - da)/ms);
    },
    fmt(d){
      return d.toLocaleDateString(undefined, { year:"numeric", month:"short", day:"numeric" });
    }
  };

  window.WhatsApp = {
    link(numberE164NoPlus, message){
      // number example: 919999888877 (countrycode + number, NO +, NO spaces)
      const msg = encodeURIComponent(message || "");
      return `https://wa.me/${numberE164NoPlus}?text=${msg}`;
    }
  };

  window.Safe = {
    escapeHtml(s){
      return String(s)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
    }
  };

  window.Storage = {
    getJSON(key, fallback){
      try{
        const raw = localStorage.getItem(key);
        if(!raw) return fallback;
        return JSON.parse(raw);
      }catch(e){
        return fallback;
      }
    },
    setJSON(key, value){
      localStorage.setItem(key, JSON.stringify(value));
    }
  };
})();
