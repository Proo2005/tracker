export interface User {
  _id: string;
  name: string;
  email: string;
  githubUrl: string;
  leetcodeUrl: string;
  githubUsername: string;
  leetcodeUsername: string;
}

export interface GitHubProfile {
  login: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

export interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export interface LeetCodeStats {
  submitStatsGlobal: {
    acSubmissionNum: {
      difficulty: string;
      count: number;
    }[];
  };
  profile: {
    ranking: number;
  };
}
