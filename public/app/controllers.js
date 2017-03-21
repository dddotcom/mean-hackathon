angular.module('AuthCtrls', ['AuthServices'])
.controller('NavCtrl', ['$scope', 'Auth', '$location', 'Alerts', function($scope, Auth, $location, Alerts){
  $scope.isLoggedIn = function(){
    return Auth.isLoggedIn();
  };

  $scope.logout = function() {
    console.log("before logout", Auth.getToken());
    Auth.removeToken();
    console.log("After logout", Auth.getToken());
    Alerts.add("success", "You are now logged out");
    $location.path("/login");
  };

}])
.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.userSignup = function() {
    $http.post("/api/users", $scope.user).then(function success(res){
      $location.path("/");
    }, function error(res){
      console.log("error", res);
    });
  };
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts){
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.userLogin = function(){
    $http.post('/api/auth', $scope.user).then(function success(res){
      Auth.saveToken(res.data.token);
      Alerts.add("success", "You are now logged in as " + res.data.user.email);
      console.log("you logged in");
      $location.path("/");
    }, function error(res){
      console.log("error", res);
    });
  };
}])
.controller('AlertsCtrl', ['$scope', 'Alerts', function($scope, Alerts){
  $scope.alerts = Alerts.get();
}])
.controller('AddSongCtrl', ['$scope', 'Alerts', '$location', 'Track', function($scope, Alerts, $location, Track){
  $scope.track = {
    title: '',
    artist: '',
    starttime: '',
    url: '',
    imdbID: ''
  };

  $scope.addTrack = function() {
    Track.save($scope.track, function success(data) {
      Alerts.add("success", "You created a track");
      $location.path('/');
    }, function error(data){
      console.log(data);
      Alerts.add("error", "Failed to create track");
    });
  };
}]);
