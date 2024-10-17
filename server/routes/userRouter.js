const express = require("express");
const {
  register,
  login,
  getInformationOfUser,
} = require("../controller/userController");
const authController = require("../controller/authController");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.route("/login").post(login);
usersRouter
  .route("/information")
  .get(authController.protectRouter, getInformationOfUser);

module.exports = usersRouter;
