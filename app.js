const app = require("./server/server");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connect Database Successfully!");
  });

const usersSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have email"],
  },
  password: {
    type: String,
    required: [true, "A user must have password"],
  },
});

const User = mongoose.model("User", usersSchema);

const testUser = new User({
  email: "taihk2@gmail.com",
  password: "admin",
});

testUser
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
