

$(function (){
    let bx = $('.slider').bxSlider({
        auto:true,
        controls: false,
        pager: false,
        mode:'fade',
        pause: 5000,
        onSlideBefore: function(){},
        onSlideAfter: function(){
            let k = bx.getCurrentSlide();
            $('.slider li').find('h2').removeClass('on');
            $('.slider li').find('p').removeClass('on');
            $('.slider li .text' + k).addClass('on');
            $('.slider li .atext' + k).addClass('on');
        }
    });

    $('.slider li .text0').addClass('on');
    $('.slider li .atext0').addClass('on');


    let a1 = $('.s2_title img').offset().top;
    let a2 = $('.s2_title h2').offset().top;
    let a3 = $('.s2_title p').offset().top;
    let a4 = $('.s2_table li').offset().top;

    let b1 = $('.s3_title img').offset().top;
    let b2 = $('.s3_title h2').offset().top;
    let b3 = $('.s3_title p').offset().top;
    let b4 = $('.s3_table li').offset().top;

    let c1 = $('.s4_title img').offset().top;
    let c2 = $('.s4_title h2').offset().top;
    let c3 = $('.s4_title p').offset().top;
    let c4 = $('.s4_table li').offset().top;

    let d = $('.s5_inner').offset().top;

    $(window).scroll(function(){
        let sct = $(this).scrollTop();
        // let scl = $(this).scrollLeft();

        // console.log(a1,a2,a3,a4);
        if(a1 <= sct + 700){
            $('.s2_title img').addClass('slide');
        }
        if(a2 < sct + 700){
            $('.s2_title h2').addClass('slide');
        }
        if(a3 < sct + 700){
            $('.s2_title p').addClass('slide');
        }

        if(a4 < sct + 700){
            $('.s2_table li').eq(0).addClass('slide');

            setTimeout(function(){
                $('.s2_table li').eq(1).addClass('slide');
            },300)
            setTimeout(function(){
                $('.s2_table li').eq(2).addClass('slide');
            },600)
            setTimeout(function(){
                $('.s2_table li').eq(3).addClass('slide');
            },900)
        }

        if(b1 <= sct + 700){
            $('.s3_title img').addClass('slide');
        }
        if(b2 < sct + 700){
            $('.s3_title h2').addClass('slide');
        }
        if(b3 < sct + 700){
            $('.s3_title p').addClass('slide');
        }
        if(b4 < sct + 700){
            $('.s3_table li').eq(0).addClass('slide');

            setTimeout(function(){
                $('.s3_table li').eq(1).addClass('slide');
            },300)
            setTimeout(function(){
                $('.s3_table li').eq(2).addClass('slide');
            },600)
            setTimeout(function(){
                $('.s3_table li').eq(3).addClass('slide');
            },900)
            setTimeout(function(){
                $('.s3_table li').eq(4).addClass('slide');
            },1200)
        }


        if(c1 <= sct + 700){
            $('.s4_title img').addClass('slide');
        }
        if(c2 < sct + 700){
            $('.s4_title h2').addClass('slide');
        }
        if(c3 < sct + 700){
            $('.s4_title p').addClass('slide');
        }
        if(c4 < sct + 700){
            $('.s4_table li').eq(0).addClass('slide');

            setTimeout(function(){
                $('.s4_table li').eq(1).addClass('slide');
            },300)
            setTimeout(function(){
                $('.s4_table li').eq(2).addClass('slide');
            },600)
            setTimeout(function(){
                $('.s4_table li').eq(3).addClass('slide');
            },900)
            setTimeout(function(){
                $('.s4_table li').eq(4).addClass('slide');
            },1200)
        }

        if(d <= sct + 700){
            $('.s5_inner').addClass('slide1');
        }

    });

});

