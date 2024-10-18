module.controller("LoginController", [
  "$scope",
  "AuthService",
  "$state",
  function ($scope, AuthService, $state) {
    $scope.login = async function () {
      console.log($scope.email);
      console.log($scope.password);

      try {
        const response = await AuthService.login({
          email: $scope.email,
          password: $scope.password,
        });
        const to = $scope.email;
        const userID = response.data.userID;
        AuthService.sendOTP(to);
        $state.go("verify", { id: userID });
      } catch (error) {
        alert(error.data.message);
      }
    };
  },
]);
