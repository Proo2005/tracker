"use client";
import { useEffect, useState } from "react";
import API from "../lib/api";

interface Props {
  username: string;
}

interface Submission {
  difficulty: string;
  count: number;
  submissions: number;
}

interface Profile {
  username: string;
  realName: string;
  ranking: number;
  reputation: number;
  userAvatar: string;
}

interface LeetCodeData {
  username: string;
  profile: Profile;
  submitStatsGlobal: { acSubmissionNum: Submission[] };
}

export default function LeetCodeStats({ username }: Props) {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        const res = await API.get(`/leetcode/${username}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeetCode();
  }, [username]);

  if (loading) return <p>Loading LeetCode...</p>;
  if (!data) return <p>User not found</p>;

  return (
    <div className="p-4 bg-white shadow rounded text-black">
      <h2 className="font-bold text-xl mb-2">LeetCode Stats</h2>
      <div className="flex items-center space-x-4 mb-2">
        <img src={data.profile.userAvatar} className="w-12 h-12 rounded-full" alt="avatar" />
        <div>
          <p>Username: {data.username}</p>
          <p>Real Name: {data.profile.realName || "N/A"}</p>
        </div>
      </div>
      <p>Ranking: {data.profile.ranking}</p>
      <p>Reputation: {data.profile.reputation}</p>
      <h3 className="mt-2 font-semibold">Submissions:</h3>
      <ul className="list-disc pl-5">
        {data.submitStatsGlobal.acSubmissionNum.map((item) => (
          <li key={item.difficulty}>
            {item.difficulty}: {item.count} accepted / {item.submissions} total
          </li>
        ))}
      </ul>
    </div>
  );
}
