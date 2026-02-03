"use client";
import { useEffect, useState } from "react";
import API from "../lib/api";
import { User } from "../types";
import GithubStats from "./GithubStats";
import LeetcodeStats from "./LeetcodeStats";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/auth/me");
        setUser(data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GithubStats username={user.githubUsername} />
        <LeetcodeStats username={user.leetcodeUsername} />
      </div>
    </div>
  );
}
