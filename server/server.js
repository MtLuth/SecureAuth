const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./routes/userRouter");
const handleGlobalError = require("./controller/errorController");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", usersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(handleGlobalError);

module.exports = app;
