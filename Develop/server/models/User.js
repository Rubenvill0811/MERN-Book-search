const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@+\..+/, "Please use a valid email."],
  },
  password: {
    type: String,
    required: true,
  },
  likedBooks: [bookSchema],
});

const User = model("User", userSchema);

module.exports = User;
