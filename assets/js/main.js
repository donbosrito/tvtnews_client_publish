jQuery(function($) {
    "use strict";

    var SLZ = window.SLZ || {};

    /*=======================================
    =             MAIN FUNCTION             =
    =======================================*/

    SLZ.headerFunction = function() {
        /*================= Dropdown Search Menu ===================*/
        // Show - hide box search on menu
        $('.button-search .icons').on('click', function () {
            $('.nav-search').toggleClass('hide');
            $('.button-search').toggleClass('active');
            $('.nav-search input').focus();
            $('.header-main.gaming .menu-wrapper').toggleClass("hide");
            $('.header-main.gaming .navigation').toggleClass("hide");
            $('.header-lifestyle .expand-search').toggleClass("lifestyle-search-active");
        });


        /*================= Fixed Header When Scroll ===================*/
        setTimeout(function(){
            if($(window).width() > 768) {
                if($('.fixed-header').length) {
                    var place_fixed = $('.fixed-header').offset().top;
                }
                $(window).on('scroll load', function (event) {
                    if ($(this).scrollTop() > place_fixed){
                        $('.fixed-header').addClass("sticky-header");
                    }
                    else{
                        $('.fixed-header').removeClass("sticky-header");
                    }
                });

                /*======= Show menu when scroll up, hide menu when scroll down =======*/
                var lastScroll = 50;
                var window_height = $(window).height();
                $(window).on('scroll load', function (event) {
                    var st = $(this).scrollTop();
                    if (st > lastScroll) {
                        $('.fixed-header').addClass('hide-menu');
                    }
                    else if (st < lastScroll) {
                        $('.fixed-header').removeClass('hide-menu');
                    }

                    if ($(window).scrollTop() <= 200 ){
                        $('.fixed-header').removeClass('hide-menu');
                    }
                    else if ($(window).scrollTop() < window_height && $(window).scrollTop() > 0) {
                        $('.fixed-header').addClass('hide-menu');
                    }
                    lastScroll = st;
                });
            }
            else {
                if($('.fixed-header-mobile').length) {
                    var place_fixed = $('.fixed-header-mobile').offset().top;
                }
                $(window).on('scroll load', function (event) {
                    if ($(this).scrollTop() > place_fixed){
                        $('.fixed-header-mobile').addClass("sticky-header");
                    }
                    else{
                        $('.fixed-header-mobile').removeClass("sticky-header");
                    }
                });

                /*======= Show menu when scroll up, hide menu when scroll down =======*/
                var lastScroll = 50;
                var window_height = $(window).height();
                $(window).on('scroll load', function (event) {
                    var st = $(this).scrollTop();
                    if (st > lastScroll) {
                        $('.fixed-header-mobile').addClass('hide-menu');
                    }
                    else if (st < lastScroll) {
                        $('.fixed-header-mobile').removeClass('hide-menu');
                    }

                    if ($(window).scrollTop() <= 100 ){
                        $('.fixed-header-mobile').removeClass('hide-menu');
                    }
                    else if ($(window).scrollTop() < window_height && $(window).scrollTop() > 0) {
                        $('.fixed-header-mobile').addClass('hide-menu');
                    }
                    lastScroll = st;
                });
            }
        }, 300);

    };

    SLZ.mainFunction = function() {

        // Back to top
        if ($('.back-to-top').length) {
            var scrollTrigger = 100; // px
            var backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('.back-to-top').addClass('show');
                } else {
                    $('.back-to-top').removeClass('show');
                }
            };

            backToTop();

            $(window).on('scroll', function() {
                backToTop();
            });

            $('.back-to-top').on('click', function(e) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: 0
                }, 700);
            });
        }

        // // show images gor gallery
        // $('.gallery-images ul .thumb').directionalHover({
        //     speed: 200
        // });
        //
        // $('.list-photo .thumb').directionalHover({
        //     speed: 200
        // });

        // Fancy box for photos
        if ($('.photos').length) {
            $('.fancybox').fancybox({
                helpers : {
                    thumbs  : {
                        width   : 50,
                        height  : 50
                    },
                    overlay: {
                        locked: false
                    }
                }
            });
        }

        $('.tabs-list-2 .link').on('click', function(){

            $(".tab-content").addClass("loaded");
            setTimeout(function() {
                $('.slick-slider').slick('setPosition');
                $('.banner-main-1 .banner-content').css('height', $('.banner-main-1 .tab-pane.active').height());
            },200);

            setTimeout(function() {
                $(".tab-content").removeClass("loaded");
            },500);
        });

        setTimeout(function() {
            $('.banner-main-1 .banner-content').css('height', $('.banner-main-1 .tab-pane.active').height());
        },500);

        // Block breaking news
        // label news animation in header
        $('.vticker').easyTicker({
            direction: 'up',
            easing: 'easeInOutBack',
            speed: 'slow',
            interval: 5000,
            height: 'auto',
            visible: 1,
            mousePause: 0,
            controls: {
                up: '.up',
                down: '.down',
                toggle: '.toggle',
                stopText: 'Stop !!!'
            }
        }).data('easyTicker');

        // close Breaking news on header
        $(".btn-close-breaking-news").on("click", function(){
            $(".breaking-news").css("display","none");
        });
    };

    SLZ.slickFunction = function() {

        // slick 2 item
        $('.slick-2-item').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 300,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 2,
            slidesToScroll: 1,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 668,
                    settings: {
                        slidesToShow: 2
                        }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        // slick 3 item
        $('.slick-3-item').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            setPosition: true,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        arrows: false,
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 668,
                    settings: {
                        arrows: false,
                        slidesToShow: 2
                        }
                },
                {
                    breakpoint: 481,
                    settings: {
                        arrows: false,
                        slidesToShow: 1
                    }
                }
            ]
        });

        $('.slick-5-item').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 5,
            slidesToScroll: 1,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        arrows: false,
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        arrows: false,
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        arrows: false,
                        slidesToShow: 1
                    }
                }
            ]
        });

        // slick photos
        if ($('.list-photo').length) {
            $('.list-photo').slick({
                dots: false,
                arrows: false,
                infinite: false,
                speed: 400,
                autoplay: true,
                autoplaySpeed: 3000,
                slidesToShow: 6,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 5
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 4
                            }
                    },
                    {
                        breakpoint: 637,
                        settings: {
                            slidesToShow: 3
                            }
                    },
                    {
                        breakpoint: 415,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });
        }


        // slick breaking news
        if ($('.breaking-news').length) {
            $('.breaking-news-list').slick({
                dots: false,
                arrows: false,
                infinite: true,
                speed: 800,
                autoplay: true,
                autoplaySpeed: 7000,
                slidesToShow: 4,
                slidesToScroll: 4,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        }
                    },
                    {
                        breakpoint: 481,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }

        if ($('.breaking-news-2').length) {
            $('.breaking-news-list').slick({
                dots: false,
                arrows: true,
                infinite: true,
                speed: 800,
                autoplay: true,
                autoplaySpeed: 5000,
                slidesToShow: 3,
                slidesToScroll: 3,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            arrows: false,
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            arrows: false,
                        }
                    },
                    {
                        breakpoint: 481,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                        }
                    }
                ]
            });
        }

        !function(d, s, id) {
            var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
            if(!d.getElementById(id))  {
                js=d.createElement(s);
                js.id=id;
                js.src=p+'://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js,fjs);
            }
        }(document, 'script', 'twitter-wjs');

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.6";
            fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));
    };

    SLZ.stickySidebar = function() {
        //sticky sidebar
        if($('.sidebar .sidebar-wrapper').length > 0 && window.innerWidth > 1024) {

            setInterval(function() {
                /*check height of sidebar and their parent*/
                $('.sidebar .sidebar-wrapper').each(function(index, el) {
                    var sidebar = $(this);
                    var height_sidebar,
                        height_content_wrapper,
                        empty_spacing;

                    height_content_wrapper = sidebar.parent().prev().height();
                    height_sidebar = sidebar.height();
                    empty_spacing = height_content_wrapper-height_sidebar;
                    if(empty_spacing <= 0) {
                        sidebar.css('position', 'static');
                    }
                });
            },200);

            $('.sidebar .sidebar-wrapper').each(function(index, el) {
                var sidebar = $(this);

                var width_sidebar,
                    height_sidebar,
                    height_content_wrapper,
                    empty_spacing;

                var lastScrollTop = 0;

                setTimeout(function() {
                    width_sidebar = sidebar.parent().width();
                },200);

                $(window).scroll(function(){
                    var currentScrollTop = $(this).scrollTop();

                    /*height of menu sticky*/
                    var height_menu_fixed = $('.sticky-header').height();

                    /*offsetTop of main wrapper*/
                    // var offsetTop_main = sidebar.parents('.row').offset().top;
                    var offsetTop_main = sidebar.parent().prev().offset().top;

                    height_content_wrapper = sidebar.parent().prev().height();

                    height_sidebar = sidebar.height();

                    width_sidebar = sidebar.parent().width();

                    /*offsetTop of sidebar wrapper and sidebar*/
                    var offsetTop_sidebar = 0;

                    if( currentScrollTop  <= height_content_wrapper + offsetTop_main) {
                        offsetTop_sidebar = sidebar.offset().top - sidebar.parent().offset().top;

                        /*update empty spacing when height of sidebar is changed*/
                        empty_spacing = height_content_wrapper-height_sidebar;

                        if(empty_spacing > 0) {
                            if (currentScrollTop > lastScrollTop){
                                // Scroll Down
                                /*make sidebar position change from fixed to absolute when scroll down*/
                                if(sidebar.offset().top - $(window).scrollTop() == height_menu_fixed + 20) {
                                    sidebar.css({
                                        'position': 'absolute',
                                        'top': offsetTop_sidebar+'px',
                                        'bottom': 'auto'
                                    });
                                }

                                if(height_sidebar >= window.innerHeight) {
                                    /*keep sidebar fixed when scroll down to the bottom of sidebar*/
                                    if(currentScrollTop >= (height_sidebar + sidebar.offset().top - window.innerHeight) ) {
                                        sidebar.css({
                                            'width': width_sidebar+'px',
                                            'position': 'fixed',
                                            'top': 'auto',
                                            'bottom': 0
                                        });

                                        $(window).on('load', function() {
                                            if(sidebar.offset().top+sidebar.height() > height_content_wrapper) {
                                                empty_spacing = height_content_wrapper-height_sidebar;
                                                sidebar.css({
                                                    'position': 'absolute',
                                                    'top': empty_spacing+'px',
                                                    'bottom': 'auto'
                                                });
                                            }
                                        });
                                    }
                                }
                                else {
                                    /*keep sidebar fixed when scroll down to the top of sidebar*/
                                    if(currentScrollTop >= (offsetTop_main - height_menu_fixed - 20) ) {
                                        sidebar.css({
                                            'width': width_sidebar+'px',
                                            'position': 'fixed',
                                            'top': height_menu_fixed+20+'px',
                                            'bottom': 'auto'
                                        });
                                    }
                                }

                                /*keep sidebar at the bottom of their parent*/
                                if(height_sidebar + offsetTop_sidebar >= height_content_wrapper ) {
                                    sidebar.css({
                                        'position': 'absolute',
                                        'top': empty_spacing+'px',
                                        'bottom': 'auto'
                                    });
                                }
                            } else {
                                // Scroll Up
                                if(offsetTop_sidebar !== 0) {
                                    /*make sidebar position absolute when scroll up*/
                                    sidebar.css({
                                        'position': 'absolute',
                                        'top': offsetTop_sidebar+'px',
                                        'bottom': 'auto'
                                    });

                                    /*keep sidebar fixed when scroll up to the top of sidebar*/
                                    if( currentScrollTop <= (sidebar.offset().top - height_menu_fixed) ) {
                                        sidebar.css({
                                            'width': width_sidebar+'px',
                                            'position': 'fixed',
                                            'top': height_menu_fixed+20+'px',
                                            'bottom': 'auto'
                                        });
                                    }

                                    /*make sidebar original*/
                                    if(offsetTop_sidebar <= 0 ) {
                                        sidebar.css({
                                            'position': 'static',
                                            'top': 'auto',
                                            'bottom': 'auto'
                                        });
                                    }
                                }
                            }
                        }
                    }

                    lastScrollTop = currentScrollTop;
                    /*keep sidebar at the bottom of their parent in case of pressing button END*/

                    document.addEventListener("keydown", function(event) {
                        height_content_wrapper = sidebar.parent().prev().height();
                        height_sidebar = sidebar.height();
                        empty_spacing = height_content_wrapper-height_sidebar;
                        if(event.which == 35 && empty_spacing > 0) {
                            sidebar.css({
                                'position': 'absolute',
                                'top': empty_spacing+'px',
                                'bottom': 'auto'
                            });
                        }
                    });

                    if(currentScrollTop + $(window).innerHeight() == $(document).innerHeight() && empty_spacing > 0) {
                        sidebar.css({
                            'position': 'absolute',
                            'top': empty_spacing+'px',
                            'bottom': 'auto'
                        });
                    }

                    if(currentScrollTop === 0) {
                        sidebar.css('position', 'static');
                    }
                });

            });
        }
    };

    SLZ.backToTopFunction = function() {
        if($('.header-main').hasClass('header-lifestyle'))  {
            $('.back-to-top').addClass('lifestyle');
        }
        else if($('.header-main').hasClass('header-food'))  {
            $('.back-to-top').addClass('food');
        }

    };
    SLZ.weather = function () {
         var html = "";
        $.simpleWeather({
            location: 'New York',
            woeid: '',
            unit: 'c',
            success: function(weather) {
                html = '<div class="weather-icons"><i class="icon-weather icon-'+weather.code+'"></i></div><div class="weather-info"><div class="weather-temp"> '
                + weather.temp +'<sup>&deg;'+ weather.units.temp +'</sup></div><div class="weather-region">'+weather.city+
                ', '+weather.region+'</div></div>';

                $("#menu-travel-weather").html(html);
            },
            error: function(error) {
                $("#menu-travel-weather").html('<div class="weather-error">'+ error +'</div>');
            }
        });
    };
    /*======================================
    =            INIT FUNCTIONS            =
    ======================================*/

    $(document).ready(function() {
        SLZ.headerFunction();
        SLZ.mainFunction();
        SLZ.slickFunction();
        SLZ.stickySidebar();
        SLZ.backToTopFunction();
        SLZ.weather();
    });

    /*=====  End of INIT FUNCTIONS  ======*/

    $(window).on('load', function() {
        $("html,body").animate({scrollTop: 0}, 1);
        setTimeout(function() {
            $('.sidebar .sidebar-wrapper').css('position', 'static');
        },200);
    });

    $(window).on('resize', function() {
        if(window.innerWidth < 1025) {
            $('.sidebar .sidebar-wrapper').css('position', 'static');
        }
        /* Act on the event */
    });

});
