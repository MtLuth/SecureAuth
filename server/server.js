const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./routes/userRouter");
const handleGlobalError = require("./controller/errorController");
const AppError = require("./utils/appError");
const mailRouter = require("./routes/mailRouter");
const cors = require("cors");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/mail-service", mailRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(express.static(`${__dirname}/../client`));

app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/../client/index.html`);
});

app.use(handleGlobalError);

module.exports = app;
