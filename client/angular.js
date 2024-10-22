const module = angular.module("secureAuth", ["ui.router"]);

module.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/templates/home.html",
      controller: "HomeController",
    })
    .state("login", {
      url: "/login",
      templateUrl: "/templates/login.html",
      controller: "LoginController",
    })
    .state("verify", {
      url: "/verify-otp/:id",
      templateUrl: "/templates/verifyOTP.html",
      controller: "OTPController",
    })
    .state("userInfo", {
      url: "/user-info/",
      templateUrl: "/templates/userInfo.html",
      controller: "UserInfoController",
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });
});

module.factory("authInterceptor", function ($q, $state, $injector) {
  return {
    responseError: function (rejection) {
      const $http = $injector.get("$http");
      if (rejection.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          return $http
            .post("http://localhost:8080/api/v1/users/refresh-token", {
              refreshToken: refreshToken,
            })
            .then(function (response) {
              localStorage.setItem("accessToken", response.data.accessToken);
              rejection.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
              return $http(rejection.config);
            })
            .catch(function (error) {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              $state.go("login");
              return $q.reject(rejection);
            });
        } else {
          localStorage.removeItem("accessToken");
          $state.go("login");
          return $q.reject(rejection);
        }
      }
      return $q.reject(rejection);
    },
    request: function (config) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  };
});

module.config(function ($httpProvider) {
  $httpProvider.interceptors.push("authInterceptor");
});
