const nodemailer = require("nodemailer");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { transporter } = require("../mail/mailService");
const sendEmail = require("../mail/mailService");
const User = require("../models/userModel");

exports.resendOTP = catchAsync(async (req, res, next) => {
  const body = req.body;

  const email = body.email;
  if (!email) {
    return next(new AppError("Email is required!", 400));
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new AppError("Email is not exist!"));
  }

  const otp = Math.floor(10000 + Math.random() * 900000);

  await sendEmail({
    from: "Server",
    to: email,
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
    message: `OTP has been resended to ${email}`,
  });
});
