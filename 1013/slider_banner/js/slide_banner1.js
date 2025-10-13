
$(function(){
    var visual = $('#brandVisual>ul>li');
    var button = $('#buttonList>li');
    var current = 0;
    var id;
    var i;

    button.click(function () {
        i = $(this).index(); // 클릭한 버튼의 인덱스 번호를 가져옴
        button.removeClass('on').eq(i).addClass('on');

        move();
        return false;
    });

    // ▶ 자동재생 함수 정의
    function timer(){
        id = setInterval(function(){ // 일정 시간마다 실행
            var n = current + 1;
            if (n === 4) {n = 0;} // 만약 마지막 슬라이드(2번) 다음이면 0번으로 초기화

            button.eq(n).trigger('click'); // n번째 버튼 클릭 이벤트 강제 실행 (자동 이동)
        },3000);
    }
    timer();

    function move(){
        if(current == i) return; // 현재와 클릭한 인덱스가 같으면 아무 것도 하지 않음
        
        var cu = visual.eq(current); // 현재 보여지고 있는 슬라이드(li)
        var ne = visual.eq(i); // 새로 보여질 슬라이드(li)
        cu.css('left','0').stop().animate({'left':'-100%'},500); // 현재 슬라이드를 왼쪽 기준 0에 놓고 왼쪽(-100%)으로 0.5초 동안 이동 (사라짐)
        ne.css('left','100%').stop().animate({'left':'0'},500); // 새 슬라이드를 오른쪽 바깥(100%)에 두고 왼쪽으로 이동해 화면에 나타남

        current = i; // 현재 인덱스를 새 인덱스로 갱신
    }


});