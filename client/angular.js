const module = angular.module("secureAuth", ["ui.router"]);

module.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "templates/home.html",
      controller: "HomeController",
    })
    .state("login", {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginController",
    })
    .state("verify", {
      url: "/verify-otp/:id",
      templateUrl: "templates/verifyOTP.html",
      controller: "OTPController",
    })
    .state("userInfo", {
      url: "/user-info/:id",
      templateUrl: "/templates/userInfo.html",
      controller: "UserInfoController",
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });
});
