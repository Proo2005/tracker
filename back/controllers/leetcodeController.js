const { fetchLeetCodeData } = require("../lib/leetcode");

exports.getLeetCodeStats = async (req, res) => {
  const { username } = req.params;
  try {
    const data = await fetchLeetCodeData(username);
    if (!data) return res.status(404).json({ message: "User not found" });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
