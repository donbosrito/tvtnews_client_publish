angular.module('tvtnews-routes', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'template/page/main-index.html'
            })
            .when('/category/:id/page/:numPage', {
                templateUrl: 'template/page/main-category.html'
            })
            .when('/post/:id', {
                templateUrl: 'template/page/main-single-post.html'
            })
            .when('/author', {
                templateUrl: 'template/page/main-author-list.html'
            })
            .when('/author/:id/page/:numPage', {
                templateUrl: 'template/page/main-author-detail.html'
            })
            .when('/404', {
                templateUrl: 'template/page/main-404.html'
            })
            .when('/about', {
                templateUrl: 'template/page/main-about-us.html'
            })
            .when('/contact', {
                templateUrl: 'template/page/main-contact-us.html'
            })
            .when('/user/', {
                templateUrl: 'template/page/main-user.html'
            })
            .when('/user/edit', {
                templateUrl: 'template/page/main-edit-user.html'
            })
            .when('/createpost', {
                templateUrl: 'template/page/main-create-post-news.html'
            })
            .when('/search/:tag/page/:numPage', {
                templateUrl: 'template/page/main-search-articles.html'
            })
            .otherwise({
                redirectTo: '/index'
            });
    }]);
