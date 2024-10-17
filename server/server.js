const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./routes/userRouter");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", usersRouter);

module.exports = app;
