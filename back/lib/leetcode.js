const axios = require("axios");

exports.fetchLeetCodeData = async (username) => {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        profile {
          ranking
          reputation
          userAvatar
          realName
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables: { username } },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.data.matchedUser;
  } catch (err) {
    console.error("LeetCode API error:", err.message);
    return null;
  }
};
