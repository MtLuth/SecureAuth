const express = require("express");
const { register } = require("../controller/userController");

const usersRouter = express.Router();

usersRouter.route("/register").post(register);

module.exports = usersRouter;
