module.controller(
  "OTPController",
  function ($scope, AuthService, $state, $stateParams) {
    const userID = $stateParams.id;
    $scope.verifyOTP = async function () {
      try {
        const res = await AuthService.verifyOTP(userID, $scope.otp);
        const responseData = res.data;
        localStorage.setItem("accessToken", responseData.data.accessToken);
        localStorage.setItem(
          "refreshToken",
          responseData.data.user.refreshToken
        );
        $state.go("userInfo", { id: userID });
      } catch (error) {
        console.log(error);
      }
    };
  }
);
