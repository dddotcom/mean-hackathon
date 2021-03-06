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
      templateUrl: 'app/views/home.html',
      controller: 'movieCtrl'
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
    .state('addSong', {
      url:'/film/addSong/:filmId',
      templateUrl: "app/views/addSong.html",
      controller: 'AddSongCtrl'
    })
    .state('film', {
      url:'/film/:filmId',
      templateUrl: "app/views/film.html",
      controller: 'FilmCtrl'
    })
    .state('editSong', {
      url:'/film/editSong/:songId',
      templateUrl: "app/views/editSong.html",
      controller: "TrackCtrl"
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
