module.factory("UserService", function ($http) {
  const apiUrl = "http://localhost:8080/api/v1";
  return {
    getInformation: function () {
      return $http({
        url: `${apiUrl}/users/information`,
        method: "GET",
        body: {
          refreshToken: localStorage.getItem("refreshToken"),
        },
      });
    },
  };
});
