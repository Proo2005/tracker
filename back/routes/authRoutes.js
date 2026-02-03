const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { signup, login, getMe } = require("../controllers/authController");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected route
router.get("/me", authMiddleware, getMe); // <-- This must exist

module.exports = router;
