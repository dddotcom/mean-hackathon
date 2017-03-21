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
.controller("movieCtrl",["$scope", "$http", function($scope, $http){
  $scope.movie=[];

  $scope.getMovie = function(searchTerm){
    var req = {
      url:"http://www.omdbapi.com/?",
      method: "GET",
      params: {
        s: searchTerm
      }
    }
    $http(req).then(function success(res){
      $scope.movie = res.data.Search;
    }, function error(res){
      consle.log("error", res)
    })

  }
}]);
