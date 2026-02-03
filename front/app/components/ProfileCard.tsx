import { User } from "../types";
import { FaGithub, FaLaptopCode } from "react-icons/fa";

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="p-6 flex flex-col items-center">
        <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
          {user.name.charAt(0)}
        </div>
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        <div className="flex gap-4 mt-4">
          <a
            href={user.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 text-2xl"
          >
            <FaGithub />
          </a>
          <a
            href={user.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 text-2xl"
          >
            <FaLaptopCode />
          </a>
        </div>
      </div>
    </div>
  );
}
