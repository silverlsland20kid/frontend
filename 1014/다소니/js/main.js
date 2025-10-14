
setTimeout(function(){
    $('.slider li .text' + k).addClass('on');
    $('.slider li .atext' + k).addClass('on');
},500);

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
});