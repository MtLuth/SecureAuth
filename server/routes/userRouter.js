const express = require("express");
const { register, login } = require("../controller/userController");
const authController = require("../controller/authController");

const usersRouter = express.Router();

usersRouter.post("/register", authController.protectRouter, register);
usersRouter.route("/login").post(login);

module.exports = usersRouter;
