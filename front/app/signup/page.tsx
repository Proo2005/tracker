"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import API from "../lib/api";

interface FormState {
  name: string;
  email: string;
  password: string;
  githubUrl: string;
  leetcodeUrl: string;
}

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    githubUrl: "",
    leetcodeUrl: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/signup", form);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Signup failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded text-black">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {(["name", "email", "password", "githubUrl", "leetcodeUrl"] as (keyof FormState)[]).map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
        ))}
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 mt-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
