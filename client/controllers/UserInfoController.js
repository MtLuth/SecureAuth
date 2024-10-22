module.controller(
  "UserInfoController",
  function ($scope, UserService, $state, $http) {
    UserService.getInformation().then(function (response) {
      const userData = response.data.data.user;

      $scope.name = userData.name;
      $scope.email = userData.email;
    });

    $scope.logout = function () {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      $state.go("home");
    };
  }
);
