const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

const protectRouter = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }

  if (!token) {
    return next(new AppError("You must login to access this route!", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded.id);
  const validUser = await User.findById(decoded.id);
  if (!validUser) {
    return next(new AppError("The user invalid"));
  }

  req.user = validUser;

  next();
});

module.exports = {
  signToken,
  protectRouter,
  signRefreshToken,
};
