module.controller("LoginController", [
  "$scope",
  "AuthService",
  "$state",
  function ($scope, AuthService, $state) {
    if (AuthService.isAuthenticated()) {
      $state.go("userInfo");
      return;
    }
    $scope.login = async function () {
      try {
        const response = await AuthService.login({
          email: $scope.email,
          password: $scope.password,
        });
        const userID = response.data.userID;
        AuthService.sendOTP(userID);
        $state.go("verify", { id: userID });
      } catch (error) {
        alert(error.data.message);
      }
    };
  },
]);
