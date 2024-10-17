const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const signToken = require("./authController");
const jwt = require("jsonwebtoken");

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirm_password,
  });
  res.status(201).json({
    message: "OK",
    data: newUser.email,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      error: "Please provide email and password",
    });
  }

  const user = await User.findOne({ email: email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "fail",
      error: "Incorrect Email or Password",
    });
  }

  const accessToken = signToken(user._id);

  res.status(200).json({
    message: "Successfully",
    data: user,
    token: accessToken,
  });
  next();
});
