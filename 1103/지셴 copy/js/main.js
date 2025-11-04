document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("resize", function () {
    var w = window.innerWidth;

    if (w <= 850) {
    } else {
      var mobileNav = document.querySelector(".mobile_nav");
      var transparency = document.querySelector(".transparency");
      var container = document.querySelector(".container");

      // 메뉴, 배경, 컨테이너 모두 토글, 열려있으면 닫히게 하기
      if (mobileNav) mobileNav.classList.toggle("active");
      if (transparency) transparency.classList.toggle("active");
      if (container) container.classList.toggle("active");
      document.body.classList.toggle("no-scroll");

      var subs = document.querySelectorAll(".mobile_nav .sub");
      subs.forEach(function (sub) {
        sub.classList.remove("active");
      });
    }
  });

  // gnb메뉴 드롭다운
  // navUls => nav ul 전부를 담은 묶음
  // navUl => forEach에서 순회 중인 “개별 ul 하나”
  var navUls = document.querySelectorAll(".nav ul");
  navUls.forEach(function (navUl) {
    navUl.addEventListener("mouseenter", function () {
      this.classList.add("over");
    });

    navUl.addEventListener("mouseleave", function () {
      this.classList.remove("over");
    });
  });

  // 모바일 화면 탭 클릭시 gnb 메뉴 등장
  var mobileTab = document.querySelector(".mobile_tab");

  if (mobileTab) {
    mobileTab.addEventListener("click", function (e) {
      e.preventDefault(); // a 태그 기본동작 방지

      var mobileNav = document.querySelector(".mobile_nav");
      var transparency = document.querySelector(".transparency");
      var container = document.querySelector(".container");

      // 메뉴, 배경, 컨테이너 모두 토글
      if (mobileNav) mobileNav.classList.toggle("active");
      if (transparency) transparency.classList.toggle("active");
      if (container) container.classList.toggle("active");
      document.body.classList.toggle("no-scroll");

      var subs = document.querySelectorAll(".mobile_nav .sub");
      subs.forEach(function (sub) {
        sub.classList.remove("active");
      });

      e.preventDefault();
    });
  }

  var mobileNavLinks = document.querySelectorAll(".mobile_nav>ul>li>a");
  mobileNavLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var subMenu = this.nextElementSibling;
      if (subMenu && subMenu.classList.contains("sub")) {
        var isActive = subMenu.classList.contains("active");

        var allSubs = document.querySelectorAll(".mobile_nav .sub");
        allSubs.forEach(function (sub) {
          sub.classList.remove("active");
        });

        if (!isActive) {
          subMenu.classList.add("active");
        }
      }
    });
  });
});
