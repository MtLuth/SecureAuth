const express = require("express");
const {
  register,
  login,
  getInformationOfUser,
  verifyOTP,
} = require("../controller/userController");
const authController = require("../controller/authController");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/verify-otp", verifyOTP);
usersRouter.post("/refresh-token", authController.signNewAccessToken);
usersRouter
  .route("/information")
  .get(authController.protectRouter, getInformationOfUser);

module.exports = usersRouter;
