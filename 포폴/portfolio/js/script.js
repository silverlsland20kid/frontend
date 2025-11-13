function updateClockKST() {
  var now = new Date();
  var utc = now.getTime() + now.getTimezoneOffset() * 60000;
  var kstNow = new Date(utc + 3600000 * 9); // 9: 한국 시간대 오프셋

  var h = kstNow.getHours();
  var m = kstNow.getMinutes();
  var mid = "PM";

  if (m < 10) m = "0" + m;
  if (h > 12) {
    mid = "PM";
    h = h - 12;
  } else if (h == 0) {
    h = 12;
    mid = "AM";
  } else if (h < 12) {
    mid = "AM";
  }

  var time = h + ":" + m;

  document.getElementById("time").innerHTML = time;
  document.getElementById("ampm").innerHTML = mid;

  setTimeout(updateClockKST, 500);
}
updateClockKST();

/*썸네일 이미지 효과 */
document.querySelectorAll(".project-card__link").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    const thumbUrl = this.dataset.thumb;
    const viewer = document.getElementById("cardThumbViewer");
    if (thumbUrl && viewer) {
      viewer.style.backgroundImage = `url('${thumbUrl}')`;
      viewer.classList.add("is-active");
    }
  });
  link.addEventListener("mouseleave", function () {
    const viewer = document.getElementById("cardThumbViewer");
    if (viewer) {
      viewer.classList.remove("is-active");
      viewer.style.backgroundImage = "";
    }
  });
});

// Contact 모달 열기
document
  .getElementById("contactModalBtn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("contactModal").style.display = "block";
    document.body.style.overflow = "hidden"; // 스크롤 방지
    document.getElementById("contactModalClose").focus();
  });
// Contact 모달 닫기 (버튼, 배경 클릭, ESC)
function closeContactModal() {
  document.getElementById("contactModal").style.display = "none";
  document.body.style.overflow = "";
}
document
  .getElementById("contactModalClose")
  .addEventListener("click", closeContactModal);
document
  .getElementById("contactModalBackdrop")
  .addEventListener("click", closeContactModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeContactModal();
});

// 상세 링크를 JSON 템플릿(work.html?slug=...)로 통일
document.querySelectorAll(".project-card__link[data-slug]").forEach((a) => {
  const slug = a.dataset.slug;
  if (slug) a.href = `work.html?slug=${encodeURIComponent(slug)}`;
});
