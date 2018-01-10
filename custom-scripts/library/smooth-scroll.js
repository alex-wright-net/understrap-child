$(document).ready(function() {
    function e(e) {
        if (e = 'string' == typeof e ? e : $(this).attr('href'), 0 === e.indexOf('#')) {
            var i = $(e);
            if (i.length && ($('html, body').animate({
                scrollTop: i.offset().top - 64
            }, 1e3, 'easeInOutExpo'), history && 'pushState' in history)) return history.pushState({}, document.title, window.location.pathname + e), 
            !1;
        }
    }
    e(window.location.hash), window.location.replace('#'), 'function' == typeof window.history.replaceState && history.replaceState({}, '', window.location.href.slice(0, -1)), 
    $('a.page-scroll').on('click', function(e) {
        var i = $(this);
        $('html, body').stop().animate({
            scrollTop: $(i.attr('href')).offset().top - 64
        }, 1e3, 'easeInOutExpo'), e.preventDefault();
    }),
    $('.nav-item.page-scroll a').on('click', function(e) {
        var i = $(this);
        $('html, body').stop().animate({
            scrollTop: $(i.attr('href')).offset().top - 64
        }, 1e3, 'easeInOutExpo'), e.preventDefault();
    });
});