document.addEventListener("DOMContentLoaded", function () {
  $(window).resize(function () {
    var w = $(this).width();

    if (w <= 850) {
    } else {
      if ($(".mobile_nav").hasClass("active")) {
        $(".mobile_nav").removeClass("active");
        $(".transparency").removeClass("active");
        $(".container").removeClass("active");
        $("body").removeClass("no-scroll");
        $(".mobile_tab a img").removeClass("hide");
      }
    }
  });
  // 컴퓨터 브라우저 켜자마자 한번 resize 명령 실행
  $(window).trigger("resize");

  // gnb메뉴 드롭다운
  $(".nav ul").hover(
    function () {
      $(this).addClass("over");
    },
    function () {
      $(this).removeClass("over");
    }
  );

  // 모바일 화면 탭 클릭시 gnb 메뉴 등장
  $(".mobile_tab a").on("click", function (e) {
    e.preventDefault();
    $(".mobile_nav").toggleClass("active");
    $(".transparency").toggleClass("active");
    $(".container").toggleClass("active");
    $("body").toggleClass("no-scroll");
    $(".mobile_tab a img").toggleClass("hide");
  });

  $(".transparency").on("click", function () {
    $(".mobile_nav").removeClass("active");
    $(".transparency").removeClass("active");
    $(".container").removeClass("active");
    $("body").removeClass("no-scroll");
    $(".mobile_tab a img").removeClass("hide");
  });

  $(".mobile_nav > ul > li > a").on("click", function (e) {
    e.preventDefault();
    // $sub는 일반 DOM이 아니라 jQuery 객체가 들어있는 변수
    // $를 붙이면 “이건 jQuery 객체임 이”라는 걸 한눈에 구분할 수 있어 코드 가독성이 좋아짐
    // $를 붙이면 jQuery 메서드(.css(), .slideUp(), .toggleClass() 등)를 쓸 수 있는 객체
    const $sub = $(this).siblings(".sub");
    // 다른 열린 메뉴 닫기
    $(".mobile_nav .sub").not($sub).slideUp();
    // 현재 클릭한 메뉴 토글
    $sub.slideToggle();
  });
});
