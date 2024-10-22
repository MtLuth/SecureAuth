const nodemailer = require("nodemailer");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../mail/mailService");
const User = require("../models/userModel");

exports.resendOTP = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return next(new AppError("User not found!", 400));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("Email is not exist!"));
  }

  const otp = Math.floor(10000 + Math.random() * 900000);

  await sendEmail({
    from: "Server",
    to: user.email,
    message: `Your OTP is: ${otp}`,
    subject: "MFA OTP",
  });

  user.otp = otp;
  await user.save();

  setTimeout(() => {
    user.otp = undefined;
    user.save();
  }, 1 * 60 * 1000);

  res.status(200).json({
    status: "Successfully!",
    message: `OTP has been resended to ${user.email}`,
  });
});
