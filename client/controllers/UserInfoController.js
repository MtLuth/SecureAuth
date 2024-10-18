module.controller("UserInfoController", function ($scope, AuthService, $state) {
  $scope.user = {
    name: "John Doe",
    email: "taihk2@gmail.com",
  };

  $scope.logout = function () {
    AuthService.logout();
    $state.go("login");
  };
});
