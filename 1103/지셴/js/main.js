document.addEventListener("DOMContentLoaded", function () {
  $(".mobile_tab a").on("click", function (e) {
    e.preventDefault();
    $(".mobile_nav").toggleClass("active");
  });

  $(".mobile_nav > ul > li > a").on("click", function (e) {
    e.preventDefault();
    const $sub = $(this).siblings(".sub");

    // 다른 열린 메뉴 닫기
    $(".mobile_nav .sub").not($sub).slideUp();
    // 현재 클릭한 메뉴 토글
    $sub.slideToggle();
  });
});
