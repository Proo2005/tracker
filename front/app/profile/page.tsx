"use client";
import { useEffect, useState } from "react";
import API from "../lib/api";
import ProfileCard from "../components/ProfileCard";
import { User } from "../types";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/auth/me");
        setUser(data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ProfileCard user={user} />
    </div>
  );
}
