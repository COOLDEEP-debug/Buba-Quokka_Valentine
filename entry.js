(function(){
  RoseWall.mount("rose-wall", 220);

  // Load photo on entry page if element exists
  const me = document.getElementById("me-photo");
  if(me){
    me.src = "assets/photos/me.jpg";
    me.alt = "A cute photo of me (replace later)";
  }

  // Personalize name text if placeholders exist
  if(window.CONTENT){
    const nameSpans = document.querySelectorAll("[data-gf-name]");
    nameSpans.forEach(s => s.textContent = CONTENT.girlfriendName || "my love");
  }
})();
