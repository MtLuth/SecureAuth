const sendEmail = require("../mail/mailService");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { signToken, signRefreshToken } = require("./authController");
exports.register = catchAsync(async (req, res, next) => {
  if (!req.body.confirm_password) {
    return next(new AppError("Confirm password is required", 400));
  }
  if (req.body.confirm_password !== req.body.password) {
    return next(new AppError("Passwords are not the same", 400));
  }
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(201).json({
    message: "OK",
    data: newUser.email,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please input email and password!", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "fail",
      error: "Incorrect Email or Password",
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  await sendEmail({
    from: "Secure Auth",
    to: email,
    subject: "MFA OTP",
    message: `Your OTP is: ${otp}`,
  });

  user.otp = otp.toString();
  await user.save();

  setTimeout(() => {
    user.otp = undefined;
    user.save();
  }, 1 * 60 * 1000);

  res.status(200).json({
    message: "Successfully",
    data: `OTP has been sended to ${email}`,
  });
});

exports.getInformationOfUser = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const id = decoded.id;
  const user = await User.findById(id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.verifyOTP = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (!user.otp) {
    return next(new AppError("Invalid or expired OTP", 400));
  }

  if (user.otp !== otp.toString()) {
    return next(new AppError("Incorrect OTP", 400));
  }

  console.log(user._id);
  const accessToken = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  user.otp = undefined;
  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({
    status: "success",
    message: {
      user,
      accessToken,
    },
  });
});
