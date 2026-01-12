// ====== Data ======
const retreatInfo = {
  title: "2026 동계수련회",
  theme: "요셉의 삶을 벤치마킹하라",
  date: "2026. 01. 23 (금) - 25 (주)",
  location: "동산비전교회",
  verse: "요셉이 꿈을 꾸고 자기 형들에게 말하매... (창세기 37:5)",
  registrationUrl: "https://forms.gle/JJnuGSsyHJ76f8dCA",
  schedule: [
    { day: "1일차 (금)", title: "꿈의 시작", items: ["19:00 경배와 찬양 예배", "21:00 기도회"] },
    { day: "2일차 (토)", title: "연단의 시간", items: ["10:00 강의 성경 파노라마", "14:00 특강 프로그램", "19:00 저녁 집회"] },
    { day: "3일차 (주)", title: "약속의 성취", items: ["11:00 주일 연합예배", "15:00 수련회 마무리"] }
  ]
};

// ====== Stars ======
function makeStars(count = 15){
  const box = document.getElementById("stars");
  if(!box) return;
  box.innerHTML = "";
  for(let i=0;i<count;i++){
    const s = document.createElement("div");
    s.className = "star";
    const size = (Math.random() * 3 + 1);
    s.style.width = size + "px";
    s.style.height = size + "px";
    s.style.left = (Math.random() * 100) + "%";
    s.style.top = (Math.random() * 100) + "%";
    s.style.animationDelay = (Math.random() * 5) + "s";
    box.appendChild(s);
  }
}

// ====== Program render ======
function renderProgram(){
  const wrap = document.getElementById("program");
  if(!wrap) return;
  wrap.innerHTML = "";

  retreatInfo.schedule.forEach(day => {
    const card = document.createElement("div");
    card.className = "day";

    const head = document.createElement("div");
    head.className = "day-head";

    const d = document.createElement("div");
    d.className = "d";
    d.textContent = day.day;

    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = day.title;

    head.appendChild(d);
    head.appendChild(tag);

    const ul = document.createElement("ul");
    ul.className = "items";

    day.items.forEach(item => {
      const li = document.createElement("li");
      const dot = document.createElement("span");
      dot.className = "dot";
      const text = document.createElement("span");
      text.textContent = item;

      li.appendChild(dot);
      li.appendChild(text);
      ul.appendChild(li);
    });

    card.appendChild(head);
    card.appendChild(ul);
    wrap.appendChild(card);
  });
}

// ====== Registration ======
function register(){
  // 하이퍼링크는 유지 (요청대로)
  window.open(retreatInfo.registrationUrl, "_blank", "noopener,noreferrer");
}

// ====== Init ======
(function init(){
  // Fill fields
  const dateText = document.getElementById("dateText");
  const locText = document.getElementById("locText");
  if(dateText) dateText.textContent = retreatInfo.date;
  if(locText) locText.textContent = retreatInfo.location;

  renderProgram();
  makeStars(15);

  // Hero entrance
  requestAnimationFrame(() => {
    const heroInner = document.getElementById("heroInner");
    if(heroInner) heroInner.classList.add("visible");
  });

  // Events
  const registerBtn = document.getElementById("registerBtn");
  if(registerBtn) registerBtn.addEventListener("click", register);

  // Rebuild stars on resize (optional)
  window.addEventListener("resize", () => makeStars(15));
})();
