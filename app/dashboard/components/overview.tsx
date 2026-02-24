"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Overview() {
  const [user, setuser] = useState<{
    id: number;
    username: string;
    email: string;
    role: string;
    login_count:number
  } | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const router = useRouter();

  const stats = [
    { title: "ID", value: user?.id },
    { title: "Username", value: user?.username }, // ✅ added value:
    { title: "Email", value: user?.email },
    { title: "Log session counts", value: user?.login_count },
  ];

  const handleSignout = () => {
    document.cookie = "token=;path/; max-age=0";
    router.replace("/");
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-xl bg-white p-6 shadow-md border">
            <h3 className="text-sm text-gray-500">{stat.title}</h3>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full mt-10 text-center">
        <button
          onClick={handleSignout}
          className="bg-black text-white p-4 hover:bg-red-400 "
          title="Sign out"
        >
          Sign Out
        </button>
      </div>
    </>
  );
}
