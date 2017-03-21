angular.module('AuthServices', ['ngResource'])
.factory('Track', ['$resource', function($resource){
  return $resource('/api/tracks/:songId');
}])
.factory('Auth', ["$window", function($window){
  return {
    saveToken: function(token){
      $window.localStorage["auth-token"] = token;
    },
    getToken: function(){
      return $window.localStorage["auth-token"];
    },
    removeToken: function(){
      $window.localStorage.removeItem("auth-token");
    },
    isLoggedIn: function(){
      var token = this.getToken();
      return token ? true : false;
    },
    currentUser: function(){
      if(this.isLoggedIn()){
        var token = this.getToken();
        try {
          //vulnerable code
          var payload = JSON.parse($window.atob(token.split(".")[1]));
          console.log("payload decoded:", payload);
          //payload has user data in it
          return payload;

        } catch (err){
          //graceful error handling
          console.log(err);
          return false;
        }
      }
      return false;
    }
  };
}])
.factory("AuthInterceptor", ["Auth", function(Auth){
  return {
    request: function(config){
      var token = Auth.getToken();
      if(token){
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    }
  };
}])
.factory("Alerts", [function(){
  var alerts = [];

  return {
    clear: function(){
      alerts = [];
    },
    add: function(type, msg){
      alerts.push({type: type, msg: msg});
    },
    get: function(){
      return alerts;
    },
    remove: function(index){
      alerts.splice(index, 1);
    }
  };
}]);
