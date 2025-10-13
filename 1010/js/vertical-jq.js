$(function(){
    $('.m_menu li ul').css('display','none');
    //$('.sub').css('display','none');
    //$('.sub').hide();

   // $('.sub').eq(0).show();
    //.sub중 첫번째것만 보여라

    //$('.m_menu li:nth-child(1) ul').css('display','block');
    //$('.m_menu li:nth-child(1) ul').show();
    //$('.m_menu li:eq(0) ul').show();
    //$('.m_menu li:first ul').show();

    $('.m_menu>li>a').click(function(e){
        e.preventDefault(); //a 링크 금지, e 이벤트를 걸지 않으면 링크 클릭시 맨 상단으로 이동되는 이슈가 있음
        //.m_menu 안의 li자식 a 태그를 클릭하면
        var status =  $(this).next('.sub').css('display');
        // 클릭한 a 태그 담에 있는 요소중 클래스가 sub인 요쇼의 display 속성값을 가져와서
        //status 저장  none이면 현재 sub가 닫혀있는 상태 block 현재 서브가 열린상태
        //alert(status);
        if(status ==='none'){
            $('.sub').slideUp();
            $(this).next('.sub').slideDown();
        }else{
            $('.sub').slideUp();
        }
     //return false;
    });


});