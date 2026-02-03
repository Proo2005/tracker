const { getGitHubProfile, getRepos, getGitHubScopes } = require("../lib/github");

exports.getGitHubStats = async (req, res) => {
  const username = req.params.username;

  try {
    // Use the token, not the username
    const { profile, scopes } = await getGitHubScopes(process.env.GITHUB_TOKEN);

    const repos = await getRepos(username);
    res.json({
      profile,
      scopes,
      repos,
    });
  } catch (err) {
    console.error("GitHub fetch error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch GitHub stats" });
  }
};
