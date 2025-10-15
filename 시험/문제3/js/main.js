$(function(){
    $('dd').hide();
    $('dd').eq(0).show();
    $('dt').eq(0).addClass('selected');
    $('dl dt').click(function () {
        if ($(this).next('dd').css('display') === 'none') {
            $('dd').slideUp('slow');
            $(this).next().slideDown('slow');
            $('dl dt').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('dl dt').mouseover(function () {
        $(this).addClass('over');
    });

    $('dl dt').mouseout(function () {
        $(this).removeClass('over');
    });
});