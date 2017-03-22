angular.module('AuthCtrls', ['AuthServices'])
.controller('NavCtrl', ['$scope', 'Auth', '$location', 'Alerts', function($scope, Auth, $location, Alerts){
  $scope.isLoggedIn = function(){
    return Auth.isLoggedIn();
  };

  $scope.logout = function() {
    Auth.removeToken();
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
.controller('AddSongCtrl', ['$scope', 'Alerts', '$location', 'TrackAPI', "$stateParams", function($scope, Alerts, $location, TrackAPI, $stateParams){
  $scope.track = {
    title: '',
    artist: '',
    starttime: '',
    url: '',
    imdbID: $stateParams.filmId,
    likes: 0,
    dislikes: 0
  };

  $scope.addTrack = function() {
    TrackAPI.addTrack($scope.track).then(function success(response){
      console.log("success", response);
      $location.path("/film/" + $scope.track.imdbID);
    }, function error(err){
      Alerts.add("error", "Failed to create track");
      console.log("error with track api.add track)", err);
    });
  };
}])
.controller("movieCtrl",["$scope", "$http", function($scope, $http){
    $scope.searchTerm ="" ;
  $scope.$watch("searchTerm", function(newVal, oldVal){
    var req = {
      url:"http://www.omdbapi.com/?",
      method: "GET",
      params: {
        s: $scope.searchTerm
      }
    }
    $http(req).then(function success(res){
      $scope.movie = res.data.Search;
    }, function error(res){
      console.log("error", res)
    })

  })
  // $scope.movie=[];

  // $scope.getMovie = function(searchTerm){
  //   var req = {
  //     url:"http://www.omdbapi.com/?",
  //     method: "GET",
  //     params: {
  //       s: searchTerm
  //     }
  //   }
  //   $http(req).then(function success(res){
  //     $scope.movie = res.data.Search;
  //   }, function error(res){
  //     console.log("error", res)
  //   })
  //
  // }
}])
.controller("FilmCtrl",["$scope", "$http", "$stateParams", "TrackAPI", "Auth", function($scope, $http, $stateParams, TrackAPI, Auth){

  $scope.imdbID = $stateParams.filmId;
  $scope.tracks = [];
  $scope.isLoggedIn = function(){
    return Auth.isLoggedIn();
  };

    var req = {
      url:"http://www.omdbapi.com/?",
      method: "GET",
      params: {
        i: $scope.imdbID
      }
    }

    $http(req).then(function success(res){
      $scope.movie = res.data;
    }, function error(res){
      console.log("error", res)
    })

    TrackAPI.getTracks($scope.imdbID).then(function success(response){
      $scope.tracks = response;
    }, function error(err){
      Alerts.add("error", "failed to get tracks");
      console.log(err);
    });

    $scope.deleteTrack = function(trackId) {
      TrackAPI.deleteTrack(trackId).then(function success(response){
        TrackAPI.getTracks($scope.imdbID).then(function success(response){
          $scope.tracks = response;
        }, function error(err){
          Alerts.add("error", "failed to get tracks");
          console.log(err);
        });
      }, function error(err){
        console.log("Error with TrackAPI.deleteTrack()", err);
      });
    };

    $scope.addLike = function(trackId, index){
      TrackAPI.getTrack(trackId).then(function success(response){
        var track = response;
        if(!isNaN(track.likes)){
          track.likes++;
        } else {
          track.likes = 1;
        }
        TrackAPI.updateTrack(track).then(function success(response){
          if(!isNaN($scope.tracks[index].likes)){
            $scope.tracks[index].likes++;
          } else {
            $scope.tracks[index].likes = 1;
          }
        }, function error(err){
          console.log(err);
        });
      }, function error(err){
        console.log(err);
      });
    };

    $scope.addDislike = function(trackId, index){
      TrackAPI.getTrack(trackId).then(function success(response){
        var track = response;
        if(!isNaN(track.dislikes)){
          track.dislikes++;
        } else {
          track.dislikes = 1;
        }
        TrackAPI.updateTrack(track).then(function success(response){
          if(!isNaN($scope.tracks[index].dislikes)){
            $scope.tracks[index].dislikes++;
          } else {
            $scope.tracks[index].dislikes = 1;
          }
        }, function error(err){
          console.log(err);
        });
      }, function error(err){
        console.log(err);
      });
    };
}])
.controller("TrackCtrl", ["$scope", "$stateParams", "TrackAPI", "$location", "Alerts", function($scope, $stateParams, TrackAPI, $location, Alerts){
  $scope.trackId = $stateParams.songId;
  $scope.track = {};

  TrackAPI.getTrack($scope.trackId).then(function success(response){
    $scope.track = response;
  }, function error(err){
    console.log(err);
  });

  $scope.editTrack = function() {
    TrackAPI.updateTrack($scope.track).then(function success(response){
      $location.path("/film/" + $scope.track.imdbID);
    }, function error(err){
      Alerts.add("error", "Failed to update track");
      console.log("error with track api.update track)", err);
    });
  };

}]);
