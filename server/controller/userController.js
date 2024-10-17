const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "OK",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
