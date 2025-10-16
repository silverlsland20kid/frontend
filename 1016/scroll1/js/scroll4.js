

$(function () {

    var f_top = $('#float_div').offset().top;
    // alert(f_top);

    $(window).scroll(function(){
        let sct = $(this).scrollTop();

        $('#float_div').stop().animate({top:f_top+sct},300);

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
        
        $('.container > div').each(function(i){
            if (sct >= $('.container > div').eq(i).offset().top) {
                $('nav ul li').removeClass('on');
                $('nav ul li').eq(i).addClass('on');
                $('#float_div ul li').removeClass('on');
                $('#float_div ul li').eq(i).addClass('on');
            }
        })

        if(sct >= 300){
            $('nav').addClass('fixed');
        }else {
            $('nav').removeClass('fixed');
        }
    });

    $('nav ul li').click(function(){
        var i = $(this).index(); // li의 인덱스번호 가져오긔
        var offset_t = $('.container > div').eq(i).offset().top;

        $('html, body').stop().animate({scrollTop:offset_t},1300);

        return false;
    });

    $('#float_div ul li').click(function(){
        var i = $(this).index(); // li의 인덱스번호 가져오긔
        var offset_t = $('.container > div').eq(i).offset().top;

        $('html, body').stop().animate({scrollTop:offset_t},1300);

        return false;
    });

    $('.container > div').mousewheel(function(event,d){
        console.log(d);

        if(d>0){
            let preVal = $(this).prev().offset().top;
            $('html, body').stop().animate({scrollTop:preVal},1000,'easeOutBounce');
        }if(d<0){
            let nextVal = $(this).next().offset().top;
            $('html, body').stop().animate({scrollTop:nextVal},1000,'easeOutBounce');
        }
    });
    

    $( function() {
        $( "#popup" ).draggable();
    });

    // pop = no 값을 넣어 하루동안 저장예정
    // 처음은 pop 변수도없고 no도 없음
    if($.cookie('pop')!='no'){
        $('#popup').show(); // 쿠키 변수에 no 없으면 팝업 보여주긔
    };

    $('#popup area:eq(0)').click(function(){
        $('#popup').fadeOut('fast'); // 창닫기 버튼 클릭시 서서히 팝업창 닫힘
    });

    $('#popup area:eq(1)').click(function(){
        $.cookie('pop','no',{expires:1});
        $('#popup').fadeOut('fast'); // 창닫기 버튼 클릭시 서서히 팝업창 닫힘
    });

    //popup 변수에 none이 저장되어 있으면 #notice_wrap을 숨겨주긔
    $("#notice_wrap").draggable();
        if($.cookie('popup')=='none'){
        $('#notice_wrap').hide();
    };   
    
    let chk = $("#expiresChk");
    $('.closeBtn').on('click',closePop);
        
    function closePop(){
        if(chk.prop('checked')){ //chk 되어있으면
            $.cookie('popup','none',{expires:3}); // 쿠키 popup에 none을 저장해서 3일 기간을 가지긔
        };

        $('#notice_wrap').fadeOut();
    }
});