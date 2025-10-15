

$(function () {
    $(window).scroll(function(){
        let sct = $(this).scrollTop();
        $('.s_Top').text(sct);

        if(sct >= 450 && sct <= 1000){
            $('.left1').addClass('on');
        }else {
            $('.left1').removeClass('on');
        }

        if(sct >= 1000 && sct <= 1800){
            $('.right1').addClass('on');
        }else {
            $('.right1').removeClass('on');
        }

        if(sct >= 2500){
            
        $('.s4_1').addClass('active');
            setTimeout(() => { $('.s4_2').addClass('active'); }, 400);
            setTimeout(() => { $('.s4_3').addClass('active'); }, 800);
            setTimeout(() => { $('.s4_4').addClass('active'); }, 1200);
        }


        if(sct >= $('.container > div').eq(0).offset().top){
            $('nav ul li').removeClass('on');
            $('nav ul li').eq(0).addClass('on');
        }
        if(sct >= $('.container > div').eq(1).offset().top){
            $('nav ul li').removeClass('on');
            $('nav ul li').eq(1).addClass('on');
        }
        if(sct >= $('.container > div').eq(2).offset().top){
            $('nav ul li').removeClass('on');
            $('nav ul li').eq(2).addClass('on');
        }
        if(sct >= $('.container > div').eq(3).offset().top){
            $('nav ul li').removeClass('on');
            $('nav ul li').eq(3).addClass('on');
        }
        if(sct >= $('.container > div').eq(4).offset().top){
            $('nav ul li').removeClass('on');
            $('nav ul li').eq(4).addClass('on');
        }
    });

    $('nav ul li').click(function(){
        var i = $(this).index(); // li의 인덱스번호 가져오긔
        var offset_t = $('.container > div').eq(i).offset().top;

        $('html, body').stop().animate({scrollTop:offset_t},1300);
        // $('nav ul li').removeClass('on');
        // $('nav ul li').eq(i).addClass('on');

        return false;
    });


    
});