require("dotenv").config();
const express = require("express");
const connectDB = require("./lib/db");
const cors = require("cors");
const app = express();
connectDB();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if you use cookies
  })
);
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/github", require("./routes/githubRoutes"));
app.use("/leetcode", require("./routes/leetcodeRoutes"));

app.listen(5000, () =>
  console.log("Server running on port 5000")
);
