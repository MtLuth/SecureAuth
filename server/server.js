const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./routes/userRouter");
const handleGlobalError = require("./controller/errorController");
const AppError = require("./utils/appError");
const mailRouter = require("./routes/mailRouter");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/mail-service", mailRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(handleGlobalError);

module.exports = app;
