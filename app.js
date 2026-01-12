const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches; // 모바일 터치
if (!isCoarsePointer) {
  // wheel 인터셉트 로직 실행
}

// 등록 버튼: 구글폼 새 탭
const registrationUrl = "https://forms.gle/JJnuGSsyHJ76f8dCA";
document.getElementById("registerBtn")?.addEventListener("click", () => {
  window.open(registrationUrl, "_blank");
});

// HERO 페이드인(선택)
document.getElementById("heroInner")?.classList.add("visible");

// 별 만들기(원하면 유지)
const stars = document.getElementById("stars");
if (stars) {
  const count = 14;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const size = Math.random() * 2 + 1;
    s.style.width = size + "px";
    s.style.height = size + "px";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = (Math.random() * 4) + "s";
    stars.appendChild(s);
  }
}

/**
 * 휠 스크롤을 "페이지 단위"로 넘기기
 * - 트랙패드/모바일은 기본 스크롤 스냅이 자연스럽기 때문에,
 *   데스크탑 휠에서만 강하게 한 페이지씩 넘기도록 설계.
 */
const root = document.getElementById("scrollRoot");
if (root) {
  let locked = false;
  const lockMs = 700;

  const sections = Array.from(root.querySelectorAll(".page"));
  const getCurrentIndex = () => {
    const y = root.scrollTop;
    // 가장 가까운 섹션 찾기
    let bestIdx = 0;
    let bestDist = Infinity;
    sections.forEach((sec, idx) => {
      const dist = Math.abs(sec.offsetTop - y);
      if (dist < bestDist) { bestDist = dist; bestIdx = idx; }
    });
    return bestIdx;
  };

  const scrollToIndex = (idx) => {
    const target = sections[Math.max(0, Math.min(idx, sections.length - 1))];
    if (!target) return;
    root.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };

  root.addEventListener("wheel", (e) => {
    // 트랙패드는 deltaY가 작고 연속적이라 자연 스크롤을 살리기
    if (Math.abs(e.deltaY) < 25) return;

    if (locked) { e.preventDefault(); return; }
    locked = true;
    setTimeout(() => (locked = false), lockMs);

    e.preventDefault();
    const idx = getCurrentIndex();
    if (e.deltaY > 0) scrollToIndex(idx + 1);
    else scrollToIndex(idx - 1);
  }, { passive: false });
}
