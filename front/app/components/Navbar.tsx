"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-indigo-600 text-white">
      <h1 className="font-bold text-xl cursor-pointer" onClick={() => router.push("/")}>
        DevTracker
      </h1>
      <button
        onClick={logout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
}
