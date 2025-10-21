$(function(){
    let current = 0;
    let slides = $('.slide');
    let dots = $('.pager-dot');
    let isPlaying = true;
    let interval = null;

    function showSlide(index){
        slides.removeClass('active').eq(index).addClass('active');
        dots.removeClass('active').eq(index).addClass('active');

        current = index;
    }

    function nextSlide(){
        let next = (current + 1) % slides.length;
        showSlide(next);
    }

    startAuto();
    function startAuto(){
        interval= setInterval(nextSlide,3000);
        isPlaying = true;
        $('.stop-btn').text('⏸');
    }

    function stopAuto(){
        clearInterval(interval);
        isPlaying = false;
        $('.stop-btn').text('▶');
    }

    $('.stop-btn').click(function(){
        if(isPlaying) {
            stopAuto();
        }else {
            startAuto();
        }
    })


    dots.click(function(){
        let idx = $(this).index();
        showSlide(idx);
    })
})