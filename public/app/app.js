var app = angular.module('AuthApp', ['ui.router', 'AuthCtrls']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/404');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/home.html'
    })
    .state('signup', {
      url:'/signup',
      templateUrl: 'app/views/userSignup.html',
      controller: 'SignupCtrl'
    })
    .state('login', {
      url:'/login',
      templateUrl: 'app/views/userLogin.html',
      controller: 'LoginCtrl'
    })
    .state('film', {
      url:'/film/:filmId',
      templateUrl: "app/views/film.html"
    })
    .state('addSong', {
      url:'/film/addSong',
      templateUrl: "app/views/addSong.html",
      controller: 'AddSongCtrl'
    })
    .state('editSong', {
      url:'/film/editSong/:songId',
      templateUrl: "app/views/editSong.html"
    })
    .state('404', {
      url: '/404',
      templateUrl: 'app/views/404.html'
    });

    $locationProvider.html5Mode(true);
  }])
  .config(["$httpProvider", function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
  }]);
