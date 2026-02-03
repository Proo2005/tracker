"use client";
import { useEffect, useState } from "react";
import API from "../lib/api";

interface Props {
  username: string;
}

// Repo permissions type
type RepoPermissions = {
  admin: boolean;
  maintain: boolean;
  push: boolean;
  triage: boolean;
  pull: boolean;
};

// Repo type
type Repo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  private: boolean;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  default_branch: string;
  permissions: RepoPermissions;
};

// Profile type
type Profile = {
  login: string;
  name: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
};

// Complete GitHub data
type GitHubData = {
  profile: Profile;
  scopes: string;
  repos: Repo[];
};

export default function GithubStats({ username }: Props) {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get(`/github/stats/${username}`);
        setData(data);
      } catch (err) {
        console.error("GitHub fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [username]);

  if (loading) return <p>Loading GitHub data...</p>;
  if (!data) return <p>No GitHub data found.</p>;

  const { profile, repos, scopes } = data;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow rounded text-black dark:text-white space-y-6">
      {/* Profile Section */}
      <div className="border p-4 rounded shadow-sm bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-2">
          {profile.name} ({profile.login})
        </h2>
        <p className="mb-1">{profile.bio || "No bio provided"}</p>
        <p className="mb-1">Location: {profile.location || "N/A"}</p>
        {profile.blog && (
          <p className="mb-1">
            Blog:{" "}
            <a href={profile.blog} target="_blank" rel="noreferrer" className="text-blue-500 underline">
              {profile.blog}
            </a>
          </p>
        )}
        <p className="mb-1">
          Followers: {profile.followers} | Following: {profile.following}
        </p>
        <p className="mb-1">Public Repos: {profile.public_repos} | Public Gists: {profile.public_gists}</p>
        <a href={profile.html_url} target="_blank" className="text-blue-600 underline">
          View on GitHub
        </a>
      </div>

      {/* Scopes Section */}
      <div className="border p-4 rounded shadow-sm bg-gray-50 dark:bg-gray-900">
        <h3 className="text-xl font-semibold mb-2">Token Scopes</h3>
        <pre className="whitespace-pre-wrap text-sm">{scopes.replace(/,/g, "\n")}</pre>
      </div>

      {/* Repositories Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Repositories ({repos.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <div key={repo.full_name} className="border p-4 rounded shadow-sm bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition">
              <h4 className="font-bold text-lg mb-1">
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                  {repo.name}
                </a>
              </h4>
              <p className="mb-1">{repo.description || "No description"}</p>
              <p className="mb-1">
                Language: {repo.language || "N/A"} | ⭐ {repo.stargazers_count} | Forks: {repo.forks_count} | Watchers: {repo.watchers_count}
              </p>
              <p className="mb-1">Private: {repo.private ? "Yes" : "No"} | Default Branch: {repo.default_branch}</p>
              <div className="text-sm mt-2">
                <strong>Permissions:</strong>
                <ul className="list-disc list-inside">
                  {Object.entries(repo.permissions).map(([key, val]) => (
                    <li key={key}>
                      {key}: {val ? "Yes" : "No"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
