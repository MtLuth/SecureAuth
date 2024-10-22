const express = require("express");
const {
  sendEmail,
  sendOTP,
  resendOTP,
} = require("../controller/mailController");

const mailRouter = express.Router();

mailRouter.post("/send-otp/:id", resendOTP);

module.exports = mailRouter;
