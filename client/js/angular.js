const module = angular.module("secureAuth", ["ui.router"]); // Đăng ký ui-router

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
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });
});

module.controller("HomeController", function ($scope) {
  $scope.css = "css/index.css";
});

module.controller("LoginController", function ($scope) {
  $scope.message = "login";
  console.log($scope.message);
});
