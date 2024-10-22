module.factory("AuthService", function ($http) {
  const apiUrl = "http://localhost:8080/api/v1";

  return {
    login: function (credentials) {
      return $http.post(`${apiUrl}/users/login`, credentials);
    },
    sendOTP: function (id) {
      return $http.post(`${apiUrl}/mail-service/send-otp/${id}`);
    },
    verifyOTP: function (id, otp) {
      return $http.post(`${apiUrl}/users/verify-otp/${id}`, {
        otp: otp,
      });
    },
    refreshAccessToken: function (refreshToken) {
      return $http.post(`${apiUrl}/users/refresh-token`, {
        token: refreshToken,
      });
    },

    isAuthenticated: function () {
      return !!localStorage.getItem("accessToken");
    },
    logout: function () {
      localStorage.removeItem("accessToken");
    },
  };
});
