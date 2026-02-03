const axios = require("axios");

// Create an Axios instance for GitHub API
const githubAPI = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "User-Agent": "DevTracker-App",
    ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
  },
  timeout: 5000,
});

// Fetch GitHub user profile
const getGitHubProfile = async (username) => {
  try {
    const { data } = await githubAPI.get(`/users/${username}`);
    return data;
  } catch (error) {
    console.error("GitHub profile fetch error:", error.response?.status, error.response?.data || error.message);
    throw new Error("Failed to fetch GitHub profile");
  }
};

// Fetch GitHub user repos
const getRepos = async (username) => {
  try {
    const { data } = await githubAPI.get(`/users/${username}/repos`, {
      params: { per_page: 100, sort: "updated" },
    });
    return data;
  } catch (error) {
    console.error("GitHub repos fetch error:", error.response?.status, error.response?.data || error.message);
    throw new Error("Failed to fetch GitHub repositories");
  }
};

// Fetch GitHub user profile + OAuth scopes
const getGitHubScopes = async (token) => {
  if (!token) throw new Error("GitHub token required for fetching scopes");

  try {
    const { data, headers } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "DevTracker-App",
      },
    });

    const scopes = headers["x-oauth-scopes"] || "";
    return { profile: data, scopes };
  } catch (err) {
    console.error("GitHub fetch error:", err.response?.status, err.response?.data || err.message);
    throw new Error("Failed to fetch GitHub scopes");
  }
};

module.exports = { getGitHubProfile, getRepos, getGitHubScopes };
