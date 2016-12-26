(function(){
    var app = angular.module("tvtnews-directives", ['ngSanitize']);
    
    app.directive("headerDefault", function(){
        return {
            restrict: "E",
            templateUrl: "template/header/header-default.html",
            controller: function($http){

                var controller = this;
                $http({ method: 'GET', url: 'https://tvtnews-server.herokuapp.com/api/v1/categories' }).success(function (data) {
                   controller.categories = data.categories;
                });

                $(window).load(function () {
                    /*=== Button Search ===*/
                    $('.button-search .icons').on('click', function () {
                        $('.nav-search').toggleClass('hide');
                        $('.button-search').toggleClass('active');
                        $('.nav-search input').focus();
                        $('.header-main.gaming .menu-wrapper').toggleClass("hide");
                        $('.header-main.gaming .navigation').toggleClass("hide");
                        $('.header-lifestyle .expand-search').toggleClass("lifestyle-search-active");
                    });

                    /*================= Show Mobile Menu ===================*/
                    $(".hamburger-menu").on('click', function(){
                        $(".hamburger-menu").toggleClass("active");
                        $('body').toggleClass("show-megamenu-mobile");
                        if ($(window).width() >= 769) {
                            $('.navigation-mobile').css("min-height", $('.body-wrapper').height() - $(".header-topbar").height() - $(".header-middle").height());
                            if($('.show-megamenu-mobile').length)
                                $('html,body').animate({
                                    scrollTop: 0
                                }, 300);
                        }
                        // else if ($(window).width() >= 601) {
                        //     $('.navigation-mobile').css("min-height", $(window).height() - $(".fixed-header-mobile").height() + 125);
                        // }
                        // else {
                        //     $('.navigation-mobile').css("min-height", $(window).height() - $(".fixed-header-mobile").height() + 180);
                        // }
                        else {
                            $('.navigation-mobile').css("min-height", $(window).height() - $(".fixed-header-mobile").height());
                            // $('html').toggleClass('no-scroll');
                        }
                    });

                    // hide Mega menu when click outside
                    $('body').on('click', function(event){
                        if ($('.hamburger-menu').has(event.target).length === 0 && !$('.hamburger-menu').is(event.target) && $('.navigation-mobile').has(event.target).length === 0 && !$('.navigation-mobile').is(event.target)) {
                            $(".hamburger-menu").removeClass("active");
                            $('body').removeClass("show-megamenu-mobile");
                            $('html').removeClass("no-scroll");
                            $('.navigation-mobile').css("min-height", 0);
                        }
                    });

                    $('.icons-dropdown-wrapper').on('click', function() {
                        $(this).toggleClass('submenu-opened');
                        $(this).next().toggleClass('open');
                        /* Act on the event */
                    });
                });
            },
            controllerAs: "headerDefaultCtrl"
        };
    });

    app.directive("bannerDefault", function(){
        return {
            restrict: "E",
            templateUrl: "template/banner-default.html",
            controller: function(){
                $(window).load(function () {
                    // Slide Main Banner
                    $('.banner-slide-homepage .list-items').slick({
                        dots: false,
                        arrows: false,
                        infinite: true,
                        speed: 500,
                        autoplaySpeed: 4000,
                        slidesToShow: 1,
                        adaptiveHeight: true,
                    });
                });
            },
            controllerAs: "bannerDefaultCtrl"
        };
    });

    app.directive("hotNews", function(){
       return {
           restrict: "E",
           templateUrl: "template/hot-news.html",
           controller: function($http){
               // get data
               var controller = this;
               $http({method: 'GET', url: 'https://tvtnews-server.herokuapp.com/api/v1/articles'}).success(function(data){
                  controller.newses = data.articles;
                   console.log(data.articles);

                   $('.bg-loading').removeClass('display-none');
               });

               $(window).load(function() {
                   // slick 4 item
                   $('.slick-4-item').slick({
                       dots: false,
                       arrows: true,
                       infinite: true,
                       speed: 300,
                       autoplay: true,
                       autoplaySpeed: 5000,
                       slidesToShow: 4,
                       slidesToScroll: 1,
                       adaptiveHeight: true,
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

                   $('.hot-news-prev').click(function () {
                       $('.slick-4-item').slick('slickPrev');
                   });

                   $('.hot-news-next').click(function () {
                       $('.slick-4-item').slick('slickNext');
                   });

                   // slick 4 item
                   $('.slick-4-item-notauto').slick({
                       dots: false,
                       arrows: true,
                       infinite: true,
                       speed: 300,
                       autoplay: false,
                       slidesToShow: 4,
                       slidesToScroll: 1,
                       adaptiveHeight: true,
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

                   //$('body').removeClass('bg-loading');
               });
           },
           controllerAs: "hotNewsCtrl"
       }
    });

    app.directive("popularNews", function(){
       return {
           restrict: "E",
           templateUrl: "template/popular-news.html",
           controller: function($http){
               // get data
               var controller = this;
               controller.restPopularNews = [];
               $http({'method': 'GET', 'url': 'data/hot-news-today.json'}).success(function (data) {
                   controller.newses = data;
                   controller.firstPopularNews = data[0];
                   for (var i = 1; i < data.length - 1; i++) {
                       controller.restPopularNews.push(data[i]);
                   }
               });

               $(window).load(function() {
                   // slick fade
                   $('.slick-1-item-fade').slick({
                       dots: false,
                       arrows: false,
                       infinite: true,
                       speed: 500,
                       fade: true,
                       slidesToShow: 1,
                       slidesToScroll: 1,
                       adaptiveHeight: true,
                   });

                   $('.btn-slick-prev').click(function(){
                       $(this).parent().prev().slick('slickPrev');
                   });

                   $('.btn-slick-next').click(function(){
                       $(this).parent().prev().slick('slickNext');
                   });
               });
           },
           controllerAs: "popularNewsCtrl"
       }
    });

    app.directive("tabNews", function(){
        return {
            restrict: "E",
            templateUrl: "template/tab-news.html"
        };
    });

    app.directive("bannerSidebar", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/banner-sidebar.html"
        };
    });

    app.directive("whatsTrending", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/whats-trending.html"
        };
    });

    app.directive("postSlider", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/post-slider.html",
            controller: function() {
                $(window).load(function () {
                    // slick 1 item
                    $('.slick-1-item').slick({
                        dots: false,
                        arrows: false,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        adaptiveHeight: true,
                    });

                    $('.widget .btn-slick-prev').click(function(){
                        $('.widget .slick-1-item').slick('slickPrev');
                    });

                    $('.widget .btn-slick-next').click(function(){
                        $('.widget .slick-1-item').slick('slickNext');
                    });
                });
            }
        };
    });

    app.directive("subscribeFeed", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/subscribe-feed.html"
        };
    });

    app.directive("footerDefault", function(){
        return {
            restrict: "E",
            templateUrl: "template/footer/footer-default.html"
        };
    });

    app.directive("categoryWidget", function(){
        return {
            restrict: "E",
            templateUrl: "template/footer/category-widget.html"
        };
    });

    app.directive("trendingWidget", function(){
        return {
            restrict: "E",
            templateUrl: "template/footer/trending-widget.html"
        };
    });

    app.directive("galleryWidget", function(){
        return {
            restrict: "E",
            templateUrl: "template/footer/gallery-widget.html",
            controller: function(){
                $(window).load(function () {
                    // show images gor gallery
                    $('.gallery-images ul .thumb').directionalHover({
                        speed: 200
                    });

                    $('.list-photo .thumb').directionalHover({
                        speed: 200
                    });
                });
            }
        };
    });

    app.directive("relatedPost", function(){
        return {
            restrict: "E",
            templateUrl: "template/related-post.html"
        };
    });

    app.directive("moreNews", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/more-news.html",
            controller: function($http){
                // get data
                var controller = this;
                controller.twoNews = [];
                $http({'method': 'GET', 'url': 'data/hot-news-today.json'}).success(function (data) {
                    controller.newses = data;
                    controller.firstNews = data[0];
                  for (var i = 1; i < data.length - 1; i++)
                  {
                      controller.twoNews.push(data[i]);
                  }
                });

                $(window).load(function() {
                    // slick 4 item
                    $('.slick-4-item').slick({
                        dots: false,
                        arrows: true,
                        infinite: true,
                        speed: 300,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
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

                    $('.hot-news-prev').click(function () {
                        $('.slick-4-item').slick('slickPrev');
                    });

                    $('.hot-news-next').click(function () {
                        $('.slick-4-item').slick('slickNext');
                    });

                    // slick 4 item
                    $('.slick-4-item-notauto').slick({
                        dots: false,
                        arrows: true,
                        infinite: true,
                        speed: 300,
                        autoplay: false,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
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
                });
            },
            controllerAs: "moreNewsCtrl"
        };
    });

    app.directive("moreAuthor", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/more-author.html"
        };
    });

    app.directive("featuredVideo", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/featured-video.html",
            controller: function(){
                $(window).load(function () {
                    // slick 1 item
                    $('.slick-1-item').slick({
                        dots: false,
                        arrows: false,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        adaptiveHeight: true,
                    });

                    $('.widget .btn-slick-prev').click(function(){
                        $('.widget .slick-1-item').slick('slickPrev');
                    });

                    $('.widget .btn-slick-next').click(function(){
                        $('.widget .slick-1-item').slick('slickNext');
                    });
                });
            }
        };
    });

    app.directive("tagsWidget", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/tags-widget.html"
        };
    });

    app.directive("mainSinglePost", function(){
        return {
            restrict: "E",
            templateUrl: "template/main-single-post.html",
            controller: ['$http', '$routeParams', function ($http, $routeParams) {
                var controller = this;
                $http({ method: 'GET', url: 'https://tvtnews-server.herokuapp.com/api/v1/articles/' + $routeParams.id }).success(function (data) {
                    controller.news = data.article;
                    controller.news.tags = null;
                    for (tag in data.article.tags) {
                        controller.news.tags.push(JSON.stringify(tag));
                    }
                });

                $(window).load(function () {
                    $('.button-more').on('click', function () {
                        $('.item.other-share-wrapper').toggleClass('activeOtherShare');
                        $('.button-more .ic-more').toggleClass('hide');
                        $('.button-more .share-text.more').toggleClass('hide');
                        $('.button-more .ic-less').toggleClass('hide');
                        $('.button-more .share-text.less').toggleClass('hide');
                    });
                });
            }],
            controllerAs: 'singlePostCtrl'
        };
    });

    app.directive("authorLayout", function () {
        return {
            restrict: "E",
            templateUrl: "template/author-layout.html"
        };
    });

    app.directive("featuredNews", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/featured-news.html"
        };
    });

    app.directive("featuredByAuthor", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/featured-by-author.html",
            controller: function($http){
                // get data
                var controller = this;
                controller.restFeaturedByAuthor = [];
                $http({'method': 'GET', 'url': 'data/hot-news-today.json'}).success(function (data) {
                    controller.newses = data;
                    controller.firstFeaturedByAuthor = data[0];
                    for (var i = 1; i < data.length - 1; i++) {
                        controller.restFeaturedByAuthor.push(data[i]);
                    }
                });

                $(window).load(function() {
                    // slick 4 item
                    $('.slick-4-item').slick({
                        dots: false,
                        arrows: true,
                        infinite: true,
                        speed: 300,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
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

                    $('.hot-news-prev').click(function () {
                        $('.slick-4-item').slick('slickPrev');
                    });

                    $('.hot-news-next').click(function () {
                        $('.slick-4-item').slick('slickNext');
                    });

                    // slick 4 item
                    $('.slick-4-item-notauto').slick({
                        dots: false,
                        arrows: true,
                        infinite: true,
                        speed: 300,
                        autoplay: false,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
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
                });
            },
            controllerAs: "feautredByAuthorCtrl"
        };
    });

    app.directive("categoryNewsList", function() {
        return {
            restrict: "E",
            templateUrl: "template/category-news-list.html",
            controller: ['$http', '$routeParams', function($http, $routeParams){
                // get data
                var controller = this;
                controller.restCategoryNews = [];
                $http({ method: 'GET', url: 'https://tvtnews-server.herokuapp.com/api/v1/categories/' + $routeParams.id + '/articles'})
                    .success(function (data) {
                        controller.firstCategoryNews = data.articles[0];
                        for (var i = 1; i < data.length; i++) {
                            controller.restCategoryNews.push(data.articles[i]);
                        }
                    });

                $(window).load(function() {

                });
            }],
            controllerAs: "categoryNewsListCtrl"
        };
    });

    app.directive("lastestNews", function() {
        return {
            restrict: "E",
            templateUrl: "template/lastest-news.html",
            controller: function($http){
                // get data
                var controller = this;
                controller.restLastNews = [];
                $http({'method': 'GET', 'url': 'data/hot-news-today.json'}).success(function (data) {
                    console.log(data);
                    controller.newses = data;
                    controller.firstLastNews = data[0];
                    for (var i = 1; i < data.length; i++) {
                        controller.restLastNews.push(data[i]);
                    }
                    console.log(controller.restLastNews);
                });

                $(window).load(function() {

                });
            },
            controllerAs: "lastNewsCtrl"
        };
    });

    app.directive("authorDetailLayout", function() {
        return{
            restrict: "E",
            templateUrl: "template/author-detail-layout.html",
            controller: function($http){
                // get data
                var controller = this;
                $http({'method': 'GET', 'url': 'data/list-author.json'}).success(function (data) {
                    controller.currentAuthor = data[0];
                });

                $(window).load(function() {

                });
            },
            controllerAs: "authorDetailCtrl"
        }
    });

    app.directive("postByAuthorLayout", function() {
        return{
            restrict: "E",
            templateUrl: "template/post-by-author-layout.html",
            controller: function($http){
                // get data
                var controller = this;
                $http({'method': 'GET', 'url': 'data/hot-news-today.json'}).success(function (data) {
                    controller.newses = data;
                });

                $(window).load(function() {

                });
            },
            controllerAs: "postByAuthorCtrl"
        }
    });

    app.directive("createPostNews", function() {
        return {
            restrict: "E",
            templateUrl: "template/create-post-news.html",
            controller: function($http)
            {
                var listContent = new Array();
                var controller = this;
                controller.addText = function(){

                    if ($('.input-text').val() != "") {
                        var text = $('.input-text').val().replace(/\n/g, '<br/>');
                        var content = "<p class='content-text content-paragraph' style='" + controller.setStyleContent() + "'>" + text + "</p>";
                        controller.addContentToPreview(content);
                        listContent.push(content);
                        $('.input-text').val('');
                    }
                }

                controller.setStyleContent = function() {
                    var style = "";
                    var bold = $("#text-bold");
                    var italic = $("#text-italic");
                    var underline = $("#text-underline");
                    var left = $("#align-left");
                    var center = $("#align-center");
                    var right = $("#align-right");
                    var justify = $("#align-justify");

                    if (bold.is(':checked')) style += "font-weight: bold;";
                    if (italic.is(':checked')) style += "font-style: italic;";
                    if (underline.is(':checked')) style += "text-decoration: underline;";

                    if (left.is(":checked"))
                        style += "text-align: left;";
                    else if (center.is(":checked"))
                        style += "text-align: center;";
                    else if (right.is(":checked"))
                        style += "text-align: right;";
                    else
                        style += "text-align: justify;";

                    return style;
                }
                controller.addImage = function() {
                    var url = $('#image-url').val();
                    var caption = $('#image-caption').val();
                    var content;
                    if (caption != '')
                        content = '<div class="image-post"><img class="image-content" src="' + url + '"/>' +
                            '<span class="image-caption">' + caption + '</span></div>';
                    else
                        content = '<div class="image-post"><img class="image-content" src="' + url + '"/>';
                    controller.addContentToPreview(content);
                    listContent.push(content);
                }

                controller.addHtml = function(){
                    if ($('.input-html').val() != "") {
                        var content = $('.input-html').val();
                        controller.addContentToPreview(content);
                        listContent.push(content);
                        $('.input-html').val('');
                    }
                }

                controller.showPost = function() {
                    $(".preview-post").empty();
                    for (var i = 0; i < listContent.length; i++) {
                        $(".preview-post").append(listContent[i]);
                    }
                }

                controller.addContentToPreview = function(content) {
                    $('#pnlPreview ul').append('<li class="well well-sm">' +
                        '<a class="pull-right delete-item"><i class="fa fa-trash"></i>' +
                        '<a class="pull-right put-back-item"><i class="fa fa-arrow-up"></i>' +
                        '</a>' + content + '</li>');
                }

                controller.AddPostNews = function()
                {
                    var contentString = "";
                    for (var i = 0; i < listContent.length; i++)
                        contentString += listContent[i];
                    alert(contentString);

                    $http.post("https://tvtnews-server.herokuapp.com/api/v1/articles?_author=van&_category=1&title=Gapnhau&summary=gdragon&body=tintucamnhac&tags=music")
                        .success(function(data)
                        {
                            console.log(data);
                        }).error(function(error)
                    {
                        alert("co loi!!!");
                        return false;
                    });
                }
                $(document).ready(function () {
                    $('#pnlPreview').on("click", "a.delete-item", function () {
                        var parent = $(this).closest('li');
                        listContent.splice(parent.index(), 1);
                        parent.remove('li').eq(parent.index());
                    });

                    $('#pnlPreview').on("click", "a.put-back-item", function () {
                        var parent = $(this).closest('li');
                        if (parent.index() > 0) {
                            var temp = listContent[parent.index()];
                            listContent[parent.index()] = listContent[parent.index() - 1];
                            listContent[parent.index() - 1] = temp;
                            parent.prev('li').before(parent);
                        }
                    });

                    $('#tabs-editor a').click(function (e) {
                        e.preventDefault();
                        $(this).tab('show');
                    })
                });
            },
            controllerAs: "createPostNewsCtrl"

        }

    });
})();
