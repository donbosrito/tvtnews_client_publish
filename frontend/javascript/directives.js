(function(){
    var app = angular.module("tvtnews-directives", ['ngSanitize', 'xeditable']);
    
    app.directive("headerDefault", function(){
        return {
            restrict: "E",
            templateUrl: "template/header/header-default.html",
            controller: function ($http, $scope, $window, $location) {

                var controller = this;


                $('#searchbox').keypress(function (e) {
                    if (e.which == 13) {
                        console.log('asd');
                        $location.path('/search/' + $scope.searchTag + '/page/1');
                        $scope.$apply();
                    }
                });

                $scope.isLogin = localStorage.getItem("token"); //$window.sessionStorage.token;

                $http({
                    method: 'GET',
                    url: 'https://tvtnews-server.herokuapp.com/api/v1/categories'
                }).success(function (data) {
                    controller.categories = data.categories;
                });

                // Xử lý đăng nhập
                $scope.LoginAccount = function () {
                    var request = {
                        method: 'POST',
                        url: 'https://tvtnews-server.herokuapp.com/api/v1/users/sign-in',
                        data: {
                            "username": $scope.usernameLogin,
                            "password": $scope.passwordLogin
                        }
                    }

                    $http(request).then(function (response) {
                        //$window.sessionStorage.token = response.data.user.accessToken;
                        //$window.sessionStorage.userId = response.data.user._id;
                        //$window.sessionStorage.role = response.data.user.typeMember;

                        localStorage.setItem("token", response.data.user.accessToken);
                        localStorage.setItem("userId", response.data.user._id);
                        localStorage.setItem("role", response.data.user.typeMember);

                        location.reload();
                    });
                }

                // Xử lý đăng nhập facebook
                $scope.LoginFB = function () {
                    FB.login(function(response) {
                        // handle the response
                        if (response.status === 'connected') {
                            // Logged into your app and Facebook.
                            console.log("Đã đăng nhập vào website!");
                            $scope.userFBID = response.authResponse.userID;
                            console.log("ID USER: " + $scope.userFBID);

                            FB.api('/me', function(response) {
                                console.log('Successful login for: ' + response.name);
                                document.getElementById('status').innerHTML =
                                    'Thanks for logging in, ' + response.name + '!';

                                console.log("Name FB: " + $scope.nameFBID);
                            });

                            console.log(JSON.stringify($scope.userFBID));

                            // sign up
                            $http({ method: 'POST', url: 'https://tvtnews-server.herokuapp.com/api/v1/users',
                                data: {
                                    "username": JSON.stringify($scope.userFBID),
                                    "password": "123456789",
                                    "gender": "Nam",
                                    "birthday": null,
                                    "nickname": null,
                                    "fullname": $scope.nameFBID,
                                    "email": null,
                                    "typeMember": "USER",
                                    "typeAccount": "facebook"
                                }}).success(function (response) {

                                console.log("POST SIGNUP FB OK!");
                                console.log(response.user.accessToken + " " + response.user._id + " " + response.user.typeMember);

                                localStorage.setItem("token", response.user.accessToken);
                                localStorage.setItem("userId", response.user._id);
                                localStorage.setItem("role", response.user.typeMember);

                                location.reload();

                            }).error(function (error) {
                                console.log(error.resultMessage);
                                console.log("POST SIGNUP FB ERROR!");
                            });

                            // sign-in
                            $http({ method: 'POST', url: 'https://tvtnews-server.herokuapp.com/api/v1/users/sign-in-facebook',
                                data: {
                                    "typeAccount": "facebook",
                                    "typeAccountId": $scope.userFBID
                                }}).success(function (response) {

                                console.log("POST SIGNIN FB OK!");
                                console.log(response.user.accessToken + " " + response.user._id + " " + response.user.typeMember);

                                localStorage.setItem("token", response.user.accessToken);
                                localStorage.setItem("userId", response.user._id);
                                localStorage.setItem("role", response.user.typeMember);

                                location.reload();

                            }).error(function (error) {
                                console.log(error.resultMessage);
                                console.log("POST SIGNIN FB ERROR!");
                            });

                        } else if (response.status === 'not_authorized') {
                            // The person is logged into Facebook, but not your app.
                            console.log("Đã đăng nhập vào facebook nhưng chưa đăng nhập vào website!");
                            $scope.userFBID = response.authResponse.userID;

                            FB.api('/me', function(response) {
                                console.log('Successful login for: ' + response.name);
                                document.getElementById('status').innerHTML =
                                    'Thanks for logging in, ' + response.name + '!';

                                $scope.nameFBID = response.name;
                                console.log("Name FB: " + $scope.nameFBID);
                                //console.log("ID USER: " + $scope.userFBID);
                            });

                            console.log(JSON.stringify($scope.userFBID));

                            $http({ method: 'POST', url: 'https://tvtnews-server.herokuapp.com/api/v1/users',
                                data: {
                                    "username": JSON.stringify($scope.userFBID),
                                    "password": "123456789",
                                    "gender": "Nam",
                                    "birthday": null,
                                    "nickname": null,
                                    "fullname": $scope.nameFBID,
                                    "email": null,
                                    "typeMember": "USER",
                                    "typeAccount": "facebook"
                                }}).success(function (response) {

                                console.log("POST SIGNUP FB OK!");

                                localStorage.setItem("token", response.data.user.accessToken);
                                localStorage.setItem("userId", response.data.user._id);
                                localStorage.setItem("role", response.data.user.typeMember);

                            }).error(function (error) {
                                console.log(error.resultMessage);
                                console.log("POST SIGNUP FB ERROR!");
                            });

                        } else {
                            // The person is not logged into Facebook, so we're not sure if
                            // they are logged into this app or not.
                            console.log("Chưa đăng nhập facebook và website!");

                        }
                    }, {scope: 'public_profile,email'});
                }

                // Xử lý đăng ký
                $scope.RegisterAccount = function () {

                    if ($scope.passwordRegister != $scope.rePasswordRegister) {
                        window.alert("Password not match!");
                    } else if ($scope.passwordRegister.length < 6) {
                        window.alert("Require password length from 6 character!");
                    } else {
                        var request = {
                            method: 'POST',
                            url: 'https://tvtnews-server.herokuapp.com/api/v1/users',
                            data: {
                                "username": $scope.usernameRegister,    //require
                                "password": $scope.passwordRegister,    //require
                                "gender": "Nam",
                                "birthday": null,
                                "nickname": null,
                                "fullname": "Newbie",
                                "email": null,
                                "typeMember": "USER",   //require
                                "typeAccount": "tvtnews"   //require
                            }
                        }

                        $http(request).then(function (response) {
                            window.alert("Register account successful!");
                            location.reload();
                        });
                    }
                }

                // Xử lý đăng xuất
                $scope.LogoutAccount = function () {
                    FB.logout(function(response) {
                        // Person is now logged out
                    });
                    //delete $window.sessionStorage.token;
                    //delete $window.sessionStorage.userId;
                    //delete $window.sessionStorage.typeMember;

                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("role");

                    window.location = "index.html";
                }

                $(document).ready(function () {
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
                    $(".hamburger-menu").on('click', function () {
                        $(".hamburger-menu").toggleClass("active");
                        $('body').toggleClass("show-megamenu-mobile");
                        if ($(window).width() >= 769) {
                            $('.navigation-mobile').css("min-height", $('.body-wrapper').height() - $(".header-topbar").height() - $(".header-middle").height());
                            if ($('.show-megamenu-mobile').length)
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
                    $('body').on('click', function (event) {
                        if ($('.hamburger-menu').has(event.target).length === 0 && !$('.hamburger-menu').is(event.target) && $('.navigation-mobile').has(event.target).length === 0 && !$('.navigation-mobile').is(event.target)) {
                            $(".hamburger-menu").removeClass("active");
                            $('body').removeClass("show-megamenu-mobile");
                            $('html').removeClass("no-scroll");
                            $('.navigation-mobile').css("min-height", 0);
                        }
                    });

                    $('.icons-dropdown-wrapper').on('click', function () {
                        $(this).toggleClass('submenu-opened');
                        $(this).next().toggleClass('open');
                        /* Act on the event */
                    });
                });
            },
            controllerAs: "headerDefaultCtrl"
        };
    });

    app.directive("bannerDefault", function () {
        return {
            restrict: "E",
            templateUrl: "template/banner-default.html",
            controller: function($http){
                var controller = this;
                $http({ method: 'GET', url: 'https://tvtnews-server.herokuapp.com/api/v1/articles' }).success(function (response) {

                    controller.newses = response.articles;

                    setTimeout(function () {
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

                });
                $(document).ready(function () {

                });
            },
            controllerAs: "bannerDefaultCtrl"
        };
    });

    app.directive("profileUser", function () {
        return {
            restrict: "E",
            templateUrl: "template/profile-user.html",
            controller: function ($http, $scope, $window, $location) {

                //if ($window.sessionStorage.token == null)
                if (localStorage.getItem("token") == null)
                    window.location = "index.html";

                var controller = this;

                var token = localStorage.getItem("token"); //$window.sessionStorage.token;
                var userId = localStorage.getItem("userId"); //$window.sessionStorage.userId;
                var role = JSON.stringify(localStorage.getItem("role")); //$window.sessionStorage.role);
                var isAdmin = false;
                if (role === JSON.stringify("ADMIN")) {
                    isAdmin = true;
                }
                $scope.isAdmin = isAdmin;

                var isAuthor = false;
                if (role === JSON.stringify("AUTHOR")) {
                    isAuthor = true;
                }

                $scope.isAuthor = isAuthor;

                var headerGetUser = {
                    "access_token": token,
                    "_id": userId
                };

                $http({ method: "GET", url: "https://tvtnews-server.herokuapp.com/api/v1/users/" + userId, headers: headerGetUser }).success(function(response){
                    controller.user = response.user;
                });

                filepicker.setKey("AdvzWWog5SESFt6jHnWXgz");
                controller.browserImage = function () {
                    filepicker.pick(
                        {
                            cropRatio: 1/1,
                            minitype:'image/*',
                            services:['COMPUTER','WEBCAM','FACEBOOK','IMAGE_SEARCH', 'URL'],
                            conversions:['crop','rotate', 'filter']
                        },
                        function (img) {
                            var url = img.url;

                            console.log(url);

                            var avatarUpdate = {
                                "avatar"    : url
                            };

                            $http({ data: avatarUpdate, method: "PUT", url: "https://tvtnews-server.herokuapp.com/api/v1/users/" + userId, headers: headerGetUser })
                                .then(function successCallback(response) {
                                    // this callback will be called asynchronously
                                    // when the response is available
                                    //$location.path('/user');
                                    $window.location.reload();
                                }, function errorCallback(response) {
                                    // called asynchronously if an error occurs
                                    // or server returns response with an error status.
                                    $window.alert("Có lỗi xảy ra, vui lòng thử lại!");
                                });
                        }
                    );
                }

                // Xử lý đăng ký
                $scope.RegisterVipAccount = function () {

                    if ($scope.passwordRegister != $scope.rePasswordRegister) {
                        window.alert("Password not match!");
                    } else if ($scope.passwordRegister.length < 6) {
                        window.alert("Require password length from 6 character!");
                    } else {
                        var request = {
                            method: 'POST',
                            url: 'https://tvtnews-server.herokuapp.com/api/v1/users',
                            data: {
                                "username": $scope.usernameRegister,    //require
                                "password": $scope.passwordRegister,    //require
                                "gender": "Nam",
                                "birthday": null,
                                "nickname": null,
                                "fullname": "Newbie",
                                "email": null,
                                "typeMember": $scope.typeMemberRegister,   //require
                                "typeAccount": "tvtnews"   //require
                            }
                        }

                        $http(request).then(function (response) {
                            window.alert("Register account successful!");
                            location.reload();
                        });
                    }
                }

            },
            controllerAs: "profileUserCtrl"
        };
    });

    app.directive("editProfileUser", function () {
        return {
            restrict: "E",
            templateUrl: "template/edit-profile-user.html",
            controller: function ($http, $scope, $window, $location) {

                //if ($window.sessionStorage.token == null)
                if (localStorage.getItem("token") == null)
                    window.location = "index.html";

                var controller = this;

                var token = localStorage.getItem("token"); //$window.sessionStorage.token;
                var userId = localStorage.getItem("userId"); //$window.sessionStorage.userId;

                var headerGetUser = {
                    "access_token": token,
                    "_id": userId
                };

                $http({ method: "GET", url: "https://tvtnews-server.herokuapp.com/api/v1/users/" + userId, headers: headerGetUser }).success(function(response){
                    controller.user = response.user;
                });

                controller.saveInfoChange = function ($userUpdate) {

                    var birthdayFormat = new Date($userUpdate.birthday).getTime();

                    console.log(birthdayFormat);

                    var dataUpdate = {
                        "gender"    : $userUpdate.gender,
                        "email"     : $userUpdate.email,
                        "fullname"  : $userUpdate.fullname,
                        "nickname"  : $userUpdate.nickname,
                        "birthday"  : birthdayFormat
                    };

                    $http({ data: dataUpdate, method: "PUT", url: "https://tvtnews-server.herokuapp.com/api/v1/users/" + userId, headers: headerGetUser }).success(function(response){
                        $location.path('/user')
                    }).error(function (response) {
                        $window.alert("Chỉnh sửa thất bại!");
                    });
                };

                filepicker.setKey("AdvzWWog5SESFt6jHnWXgz");
                controller.browserImage = function () {
                    filepicker.pick(
                        {
                            minitype:'image/*',
                            services:['COMPUTER','WEBCAM','FACEBOOK','IMAGE_SEARCH', 'URL'],
                            conversions:['crop','rotate', 'filter']
                        },
                        function (img) {
                            var url = img.url;

                            console.log(url);

                            var avatarUpdate = {
                                "avatar"    : url
                            };

                            $http({ data: avatarUpdate, method: "PUT", url: "https://tvtnews-server.herokuapp.com/api/v1/users/" + userId, headers: headerGetUser })
                                .then(function successCallback(response) {
                                // this callback will be called asynchronously
                                // when the response is available
                                    $location.path('/user')
                            }, function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                                    $window.alert("Cập nhật avatar thất bại!");
                            });
                        }
                    );
                }

            },
            controllerAs: "editProfileUserCtrl"
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

                   setTimeout(function () {
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
                   }, 0);
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
               controller.popularNews = [];
               $http({method: 'GET', url: 'https://tvtnews-server.herokuapp.com/api/v1/articles?action="popular"'}).success(function (data) {
                   controller.popularNews = data.articles;
                   console.log(controller.popularNews);

                   setTimeout(function () {
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
               });
           },
           controllerAs: "popularNewsCtrl"
       }
    });

    app.directive("tabNews", function () {
        return {
            restrict: "E",
            templateUrl: "template/tab-news.html",
            controller: function ($http) {
                var controller = this;
                controller.categories = [];

                $http({
                    method: 'GET',
                    url: 'https://tvtnews-server.herokuapp.com/api/v1/categories'
                }).success(function (response) {
                    controller.categories = response.categories;

                    controller.articlesArray = [];
                    for (var i = 0; i < 5; i++) {
                        $http({
                            method: 'GET',
                            url: 'https://tvtnews-server.herokuapp.com/api/v1/categories/' + controller.categories[i]._id + '/articles'
                        })
                            .success(function (response) {
                                controller.articlesArray.push(response.articles);
                            });
                    }
                });
            },
            controllerAs: "tabNewsCtrl"
        };
    });

    app.directive("bannerSidebar", function () {
        return {
            restrict: "E",
            templateUrl: "template/sidebar/banner-sidebar.html"
        };
    });

    app.directive("whatsTrending", function () {
        return {
            restrict: "E",
            templateUrl: "template/sidebar/whats-trending.html",
            controller: function($http) {
                // get data
                var controller = this;
                $http({
                    method: 'GET',
                    url: 'https://tvtnews-server.herokuapp.com/api/v1/articles?action="trending"'
                }).success(function (data) {
                    controller.newses = data.articles;
                });
            },
            controllerAs: "whatsTrendingCtrl"
        };
    });

    app.directive("postSlider", function () {
        return {
            restrict: "E",
            templateUrl: "template/sidebar/post-slider.html",
            controller: function($http) {
                var controller = this;
                $http({ method: 'GET', url: 'https://tvtnews-server.herokuapp.com/api/v1/articles' }).success(function(response) {
                    controller.newses = response.articles;

                    setTimeout(function () {
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
                });

                $(document).ready(function () {

                });
            },
            controllerAs: 'postSliderCtrl'
        };
    });

    app.directive("subscribeFeed", function () {
        return {
            restrict: "E",
            templateUrl: "template/sidebar/subscribe-feed.html"
        };
    });

    app.directive("footerDefault", function () {
        return {
            restrict: "E",
            templateUrl: "template/footer/footer-default.html"
        };
    });

    app.directive("categoryWidget", function () {
        return {
            restrict: "E",
            templateUrl: "template/footer/category-widget.html",
            controller: function ($http) {
                var controller = this;
                $http({ method: 'GET', url: 'https://tvtnews-server.herokuapp.com/api/v1/categories'}).success(function (res){
                    controller.categories = res.categories;
                });
            },
            controllerAs: "categoryWidgetCtrl"


        };
    });

    app.directive("trendingWidget", function () {
        return {
            restrict: "E",
            templateUrl: "template/footer/trending-widget.html",
            controller: function($http) {
                // get data
                var controller = this;
                $http({
                    method: 'GET',
                    url: 'https://tvtnews-server.herokuapp.com/api/v1/articles?action="trending"'
                }).success(function (data) {
                    controller.newses = data.articles;
                });
            },
            controllerAs: "trendingWidgetCtrl"
        };
    });

    app.directive("galleryWidget", function () {
        return {
            restrict: "E",
            templateUrl: "template/footer/gallery-widget.html",
            controller: function () {
                $(document).ready(function () {
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

    app.directive("moreNews", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/more-news.html",
            controller: function ($http) {
                // get data
                var controller = this;
                controller.twoNews = [];
                $http({'method': 'GET', 'url': 'data/hot-news-today.json'}).success(function (data) {
                    controller.newses = data;
                    controller.firstNews = data[0];
                    for (var i = 1; i < data.length - 1; i++) {
                        controller.twoNews.push(data[i]);
                    }
                });

                $(document).ready(function () {
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

    app.directive("moreAuthor", function () {
        return {
            restrict: "E",
            templateUrl: "template/sidebar/more-author.html",
            controller: ['$http', '$routeParams', function ($http, $routeParams) {
                // get data
                var controller = this;
                $http({'method': 'GET', 'url': 'https://tvtnews-server.herokuapp.com/api/v1/articles/' + $routeParams.id}).success(function (data1) {
                    $http({'method': 'GET', 'url': 'https://tvtnews-server.herokuapp.com/api/v1/users/' + data1.article._author._id + '/articles'}).success(function (data2) {
                        controller.newses = data2.articles;
                    });
                });

            }],
            controllerAs: "moreAuthorNewsCtrl"
        };
    });

    app.directive("featuredVideo", function () {
        return {
            restrict: "E",
            templateUrl: "template/sidebar/featured-video.html",
            controller: function () {
                $(document).ready(function () {
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

                    $('.widget .btn-slick-prev').click(function () {
                        $('.widget .slick-1-item').slick('slickPrev');
                    });

                    $('.widget .btn-slick-next').click(function () {
                        $('.widget .slick-1-item').slick('slickNext');
                    });
                });
            }
        };
    });

    app.directive("tagsWidget", function () {
        return {
            restrict: "E",
            templateUrl: "template/sidebar/tags-widget.html"
        };
    });

    app.directive("mainSinglePost", function () {
        return {
            restrict: "E",
            templateUrl: "template/main-single-post.html",
            controller: ['$http', '$routeParams', '$window', '$scope', function ($http, $routeParams, $window, $scope) {
                var controller = this;

                $window.scrollTo(0, 0);

                $http({
                    method: 'GET',
                    url: 'https://tvtnews-server.herokuapp.com/api/v1/articles/' + $routeParams.id
                }).success(function (data) {
                    controller.news = data.article;

                    delete $window.sessionStorage.categoryIdArticle;
                    $window.sessionStorage.categoryIdArticle = data.article._category._id;

                    setTimeout(function () {
                        $('.button-more').on('click', function () {
                            $('.item.other-share-wrapper').toggleClass('activeOtherShare');
                            $('.button-more .ic-more').toggleClass('hide');
                            $('.button-more .share-text.more').toggleClass('hide');
                            $('.button-more .ic-less').toggleClass('hide');
                            $('.button-more .share-text.less').toggleClass('hide');
                        });
                    }, 0);
                });

                $scope.sharePost = function () {
                    var currentLocation = window.location.href;
                    FB.ui({
                        method: 'feed',
                        name: controller.news.title,
                        link: currentLocation,
                        picture: controller.news.poster,
                        caption: controller.news.summary,
                        description: controller.news.summary
                    }, function(response) {
                        if (response && response.post_id) {
                            $http({
                                method: 'POST',
                                url: 'https://tvtnews-server.herokuapp.com/api/v1/articles/' + $routeParams.id + '/share-post'
                            }).success(function (data) {});
                        }
                    });
                }
            }],
            controllerAs: 'singlePostCtrl'
        };
    });

    app.directive("authorLayout", function () {
        return {
            restrict: "E",
            templateUrl: "template/author-layout.html",
            controller: function ($http, $location) {
                var controller = this;
                $http({ method: 'GET', url: 'https://tvtnews-server.herokuapp.com/api/v1/users'})
                    .success(function(res) {
                        controller.authors = new Array();
                        for (var i = 0; i < res.users.length; i++)
                        {
                            if (res.users[i].typeMember == "AUTHOR") {
                                controller.authors.push(res.users[i]);
                            }
                        }
                    });
            },
            controllerAs: 'authorCtrl'
        };
    });

    app.directive("relatedNews", function () {
        return {
            restrict: "E",
            templateUrl: "template/related-news.html",
            controller: function ($http, $window) {
                var controller = this;
                $http({ method: 'GET', url: 'https://tvtnews-server.herokuapp.com/api/v1/categories/' + $window.sessionStorage.categoryIdArticle + '/articles'})
                    .success(function(res){
                        controller.relatedNews = res.articles;
                    });

                console.log($window.sessionStorage.categoryIdArticle);
            },
            controllerAs: "relatedNewsCtrl"
        }
    });

    app.directive("featuredNews", function(){
        return {
            restrict: "E",
            templateUrl: "template/sidebar/featured-news.html"
        };
    });

    app.directive("featuredByAuthor", function () {
        return {
            restrict: "E",
            templateUrl: "template/sidebar/featured-by-author.html",
            controller: function ($http) {
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

                $(document).ready(function () {
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

    app.directive("categoryNewsList", function () {
        return {
            restrict: "E",
            templateUrl: "template/category-news-list.html",
            controller: ['$http', '$routeParams', '$window', function($http, $routeParams, $window){

                $window.scrollTo(0, 0);

                // get data
                var controller = this;

                // save category id
                controller.categoryId = $routeParams.id;

                controller.restCategoryNews = [];
                $http({ method: 'GET', url: 'https://tvtnews-server.herokuapp.com/api/v1/categories/' + $routeParams.id + '/articles/' + "?page=" + $routeParams.numPage })

                    .success(function (data) {
                        controller.firstCategoryNews = data.articles[0];
                        for (i = 1; i < data.articles.length; i++) {
                            controller.restCategoryNews.push(data.articles[i]);
                        }

                        // Handle Pagination
                        // get page count
                        controller.pageCount = data.pages;
                        controller.currentPage = $routeParams.numPage;

                        controller.isHead = false;
                        controller.isTail = false;

                        if (controller.currentPage == 1)
                            controller.isHead = true;
                        if (controller.currentPage == controller.pageCount)
                            controller.isTail = true;

                        if ($routeParams.numPage <= controller.pageCount) {
                            var maxPage = (Number($routeParams.numPage) + Number(3) < controller.pageCount) ? Number($routeParams.numPage) + Number(3) : controller.pageCount;
                            controller.listPage = [];
                            for (var i = $routeParams.numPage; i <=  maxPage; i++) {
                                var pagi = {};
                                if (i == $routeParams.numPage)
                                    pagi.active = true;
                                else
                                    pagi.active = false;

                                pagi.index = Number(i);

                                controller.listPage.push(pagi);
                            }
                            console.log(controller.listPage);
                        }

                    });
            }],
            controllerAs: "categoryNewsListCtrl"
        };
    });

    app.directive("lastestNews", function () {
        return {
            restrict: "E",
            templateUrl: "template/lastest-news.html",
            controller: function ($http) {
                // get data
                var controller = this;
                $http({'method': 'GET', 'url': 'https://tvtnews-server.herokuapp.com/api/v1/articles'}).success(function (data) {
                    controller.newses = data.articles;
                });

                $(document).ready(function () {

                });
            },
            controllerAs: "lastNewsCtrl"
        };
    });

    app.directive("authorDetailLayout", function () {
        return {
            restrict: "E",
            templateUrl: "template/author-detail-layout.html",
            controller: function($http, $routeParams, $window){
                // get data
                var controller = this;

                $window.scrollTo(0, 0);

                $http({'method': 'GET', 'url': 'https://tvtnews-server.herokuapp.com/api/v1/users/' + $routeParams.id + '/articles?page=' + $routeParams.numPage})
                    .success(function (data) {
                        controller.pages = data.pages;
                        controller.newses = data.articles;

                        // Handle Pagination
                        // get page count
                        controller.pageCount = data.pages;
                        controller.currentPage = $routeParams.numPage;

                        controller.isHead = false;
                        controller.isTail = false;

                        if (controller.currentPage == 1)
                            controller.isHead = true;
                        if (controller.currentPage == controller.pageCount)
                            controller.isTail = true;

                        if ($routeParams.numPage <= controller.pageCount) {
                            var maxPage = (Number($routeParams.numPage) + Number(3) < controller.pageCount) ? Number($routeParams.numPage) + Number(3) : controller.pageCount;
                            controller.listPage = [];
                            for (var i = $routeParams.numPage; i <=  maxPage; i++) {
                                var pagi = {};
                                if (i == $routeParams.numPage)
                                    pagi.active = true;
                                else
                                    pagi.active = false;

                                pagi.index = Number(i);

                                controller.listPage.push(pagi);
                            }
                            console.log(controller.listPage);
                        }
                });



                $(document).ready(function() {

                });
            },
            controllerAs: "authorDetailCtrl"
        }
    });

    app.directive("postByAuthorLayout", function () {
        return {
            restrict: "E",
            templateUrl: "template/post-by-author-layout.html",
            controller: function ($http) {
                // get data
                var controller = this;
                $http({'method': 'GET', 'url': 'data/hot-news-today.json'}).success(function (data) {
                    controller.newses = data;
                });

                $(document).ready(function () {

                });
            },
            controllerAs: "postByAuthorCtrl"
        }
    });

    app.directive("createPostNews", function () {
        return {
            restrict: "E",
            templateUrl: "template/create-post-news.html",
            controller: function ($http, $window) {
                var token = localStorage.getItem("token"); //$window.sessionStorage.token;
                var userId = localStorage.getItem("userId"); //$window.sessionStorage.userId;

                var listContent = new Array();
                var controller = this;
                controller.addText = function () {
                    if ($('.input-text').val() != "") {
                        var text = $('.input-text').val().replace(/\n/g, '<br/>');
                        var content = "<p class='content-text content-paragraph" + controller.setStyleContent() + "'>" + text + "</p>";
                        controller.addContentToPreview(content);
                        listContent.push(content);
                        $('.input-text').val('');
                    }
                };

                controller.setStyleContent = function () {
                    var style = "";
                    var bold = $("#text-bold");
                    var italic = $("#text-italic");
                    var underline = $("#text-underline");
                    var left = $("#align-left");
                    var center = $("#align-center");
                    var right = $("#align-right");
                    var justify = $("#align-justify");

                    if (bold.is(':checked')) style += " text-style-b";
                    if (italic.is(':checked')) style += " text-style-i";
                    if (underline.is(':checked')) style += " text-style-u";

                    if (left.is(":checked"))
                        style += " text-align-left";
                    else if (center.is(":checked"))
                        style += " text-align-center";
                    else if (right.is(":checked"))
                        style += " text-align-right";
                    else
                        style += " text-align-justify";
                    return style;
                };
                controller.addImage = function () {
                    var url = $('#image-url').val();
                    var caption = $('#image-caption').val();
                    $('#image-url').val('');
                    $('#image-caption').val('');
                    $(".image-preview").html('<button type="button" class="btn btn-default btn-post-image"' +
                        'data-target="#modalImportImage" data-toggle="modal">Import Image ' +
                        '</button>');
                    var content;
                    if (caption != '')
                        content = "<div class='image-post'><img class='image-content' src='" + url + "'/>" +
                            "<span class='image-caption'>" + caption + "</span></div>";
                    else
                        content = "<div class='image-post'><img class='image-content' src='" + url + "'/>";
                    controller.addContentToPreview(content);
                    listContent.push(content);
                };

                controller.addHtml = function () {
                    if ($('.input-html').val() != "") {
                        var content = $('.input-html').val();
                        controller.addContentToPreview(content);
                        listContent.push(content);
                        $('.input-html').val('');
                    }
                };

                filepicker.setKey("AdvzWWog5SESFt6jHnWXgz");
                controller.loadImage = function () {
                    filepicker.pick(
                        {
                            minitype: 'image/*',
                            services: ['COMPUTER', 'WEBCAM', 'FACEBOOK', 'IMAGE_SEARCH', 'URL'],
                            conversions: ['crop', 'rotate', 'filter']
                        },
                        function (img) {
                            var url = img.url;
                            var content;
                            content = '<div class="image-post"><img class="image-content" src="' + url + '"/>';
                            $(".image-preview").html('<div class="well well-sm">' +
                                '<a class="pull-right edit-item"><i class="fa fa-edit"></i>' +
                                '</a>' + content + '</div>');
                            $("#image-url").val(url);
                        }
                    );
                };

                controller.loadPoster = function () {
                    filepicker.pick(
                        {
                            minitype: 'image/*',
                            services: ['COMPUTER', 'WEBCAM', 'FACEBOOK', 'IMAGE_SEARCH', 'URL'],
                            conversions: ['crop', 'rotate', 'filter']
                        },
                        function (img) {
                            var url = img.url;
                            var content = '<div class="image-post"><img class="image-content" src="' + url + '"/>';

                            $("#pnlPreviewPoster").html('<div class="well well-sm">' +
                                '<a class="pull-right edit-item"><i class="fa fa-edit"></i>' +
                                '</a>' + content + '</div>');

                            $("#poster-url").val(url);
                        }
                    );
                };

                controller.showPost = function () {
                    $(".preview-post").empty();
                    for (var i = 0; i < listContent.length; i++) {
                        $(".preview-post").append(listContent[i]);
                    }
                };

                controller.addContentToPreview = function (content) {
                    $('#pnlPreview ul').append('<li class="well well-sm">' +
                        '<a class="pull-right delete-item"><i class="fa fa-trash"></i>' +
                        '<a class="pull-right put-back-item"><i class="fa fa-arrow-up"></i>' +
                        '</a>' + content + '</li>');
                };

                $http({
                    method: 'GET',
                    url: 'https://tvtnews-server.herokuapp.com/api/v1/categories'
                }).success(function (data) {
                    controller.categories = data.categories;
                });

                var categoryID;

                controller.onCategoryChange = function () {
                    categoryID = controller.itemSelected;

                };
                controller.AddPostNews = function () {
                    var contentString = "";
                    var title, summary, tempTags, tags, urlPoster;

                    for (var i = 0; i < listContent.length; i++)
                        contentString += listContent[i].replace(/"/g, '\\"');

                    urlPoster = $('#poster-url').val();
                    title = $('.input-title').val();
                    summary = $('.input-summary').val();
                    tempTags = $('.input-tags').val();
                    tags = tempTags.split("#");

                    var request = {
                        "_author": userId,
                        "_category": categoryID,
                        "title": title,
                        "summary": summary,
                        "body": contentString,
                        "tags": tags,
                        "poster": urlPoster
                    };

                    $http({
                        method: 'POST',
                        url: 'https://tvtnews-server.herokuapp.com/api/v1/articles',
                        headers: {

                            "access_token": token,
                            "_id": userId
                        },
                        data: request
                    }).success(function (data) {
                        $location.path('/author/' + userId + '/page/1');
                    }).error(function (error) {
                        console.log(error);
                    });
                };
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
                    $('#pnlPreviewPoster').on("click", "a.edit-item", function () {
                        controller.loadPoster();
                    });
                    $('.image-preview').on("click", "a.edit-item", function () {
                        controller.loadImage();
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

    app.directive("searchNewsList", function() {
        return {
            restrict: "E",
            templateUrl: "template/search-news-list.html",
            controller: ['$http', '$routeParams', '$window', function ($http, $routeParams, $window) {

                $window.scrollTo(0, 0);

                // get data
                var controller = this;

                // save tag
                controller.tag = $routeParams.tag;

                controller.restCategoryNews = [];
                $http({
                    method: 'GET',
                    url: 'https://tvtnews-server.herokuapp.com/api/v1/articles?search=' + $routeParams.tag + '&' + "page=" + $routeParams.numPage
                })
                    .success(function (data) {
                        controller.firstCategoryNews = data.articles[0];
                        for (i = 1; i < data.articles.length; i++) {
                            controller.restCategoryNews.push(data.articles[i]);
                        }

                        // Handle Pagination
                        // get page count
                        controller.pageCount = data.pages;
                        controller.currentPage = $routeParams.numPage;

                        controller.isHead = false;
                        controller.isTail = false;

                        if (controller.currentPage == 1)
                            controller.isHead = true;
                        if (controller.currentPage == controller.pageCount)
                            controller.isTail = true;

                        if ($routeParams.numPage <= controller.pageCount) {
                            var maxPage = (Number($routeParams.numPage) + Number(3) < controller.pageCount) ? Number($routeParams.numPage) + Number(3) : controller.pageCount;
                            controller.listPage = [];
                            for (var i = $routeParams.numPage; i <= maxPage; i++) {
                                var pagi = {};
                                if (i == $routeParams.numPage)
                                    pagi.active = true;
                                else
                                    pagi.active = false;

                                pagi.index = Number(i);

                                controller.listPage.push(pagi);
                            }
                            console.log(controller.listPage);
                        }

                    });
            }],
            controllerAs: "searchNewsListCtrl"
        }
    });

    app.directive("commentInSinglePost", function () {
        return {
            restrict: "E",
            templateUrl: "template/comment-in-single-post.html",
            controller: function ($http, $scope, $window, $routeParams) {
                // get data
                var controller = this;
                var idArticle = $routeParams.id;

                $http({
                    method: 'GET',
                    url: 'https://tvtnews-server.herokuapp.com/api/v1/articles/' + idArticle + '/comments'
                }).success(function (data) {
                    controller.comments = data.comments;
                });

                controller.insertCommentOfSinglePost = function () {
                    //if ($window.sessionStorage.token != null) {
                    if (localStorage.getItem("token") != null) {

                        var controller = this;

                        var token = localStorage.getItem("token"); //$window.sessionStorage.token;
                        var userId = localStorage.getItem("userId"); //$window.sessionStorage.userId;

                        var commentContent = controller.commentContent;


                        var request = {
                            "message": commentContent
                        };

                        $http({
                            method: 'POST',
                            url: 'https://tvtnews-server.herokuapp.com/api/v1/articles/' + idArticle + '/comments',
                            headers: {

                                "access_token": token,
                                "_id": userId
                            },
                            data: request,
                        }).success(function (data) {
                            location.reload();
                        }).error(function (error) {
                            alert(error);
                            console.log(error);
                        });
                    }
                    else {
                        alert("Vui lòng đăng nhập để comment");
                    }
                };
                controller.replyAComment = function ($index, commentID, ArticleID) {
                    //if ($window.sessionStorage.token != null) {
                    if (localStorage.getItem("token") != null) {
                        var token = localStorage.getItem("token"); //$window.sessionStorage.token;
                        var userId = localStorage.getItem("userId"); //$window.sessionStorage.userId;


                        var replyContent = controller.replyContent[$index];
                        var request = {
                            "message": replyContent,
                            "replyFor": commentID
                        };

                        $http({
                            method: 'POST',
                            url: 'https://tvtnews-server.herokuapp.com/api/v1/articles/' + ArticleID + '/comments',
                            headers: {

                                "access_token": token,
                                "_id": userId
                            },
                            data: request,
                        }).success(function (data) {
                            location.reload();
                        }).error(function (error) {
                            console.log(error);
                        });
                    }
                    else {
                        alert("Vui lòng đăng nhập để comment");
                    }
                };
            },

            controllerAs: "commentInSinglePostCtrl"
        }
    });
})();
