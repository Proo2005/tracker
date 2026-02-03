"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // User already logged in → redirect to dashboard
      router.push("/dashboard");
    } else {
      setLoading(false); // show homepage card
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full p-8 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">
          Welcome to DevTracker
        </h1>
        <p className="text-gray-600 mb-6">
          Track your GitHub and LeetCode stats in one dashboard. Sign up now to get started!
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push("/signup")}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push("/login")}
            className="border border-indigo-600 text-indigo-600 py-2 px-4 rounded hover:bg-indigo-50"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
