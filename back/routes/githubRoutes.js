const express = require("express");
const router = express.Router();
const { getGitHubStats } = require("../controllers/githubController");

router.get("/stats/:username", getGitHubStats);

module.exports = router;
