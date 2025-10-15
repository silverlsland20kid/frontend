
$(function () {
    $('.tab_menu li').click(function () {
        var i = $(this).index();
        $('.tab_menu li').removeClass('on');
        $('.tab_menu li').eq(i).addClass('on');

        $('.tab_list li').removeClass('on'); 
        $('.tab_list li').eq(i).addClass('on'); 
    });

});