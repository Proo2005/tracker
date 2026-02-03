const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    githubUrl: String,
    leetcodeUrl: String,
    githubUsername: String,
    leetcodeUsername: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
