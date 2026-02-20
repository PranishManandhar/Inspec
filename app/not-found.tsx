"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const path = usePathname();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">
      <p className="text-8xl mb-4">=ᗢ=</p>
      <h1 className="text-9xl font-black tracking-tighter mb-2">404</h1>
      <p className="text-2xl font-bold mb-2">Page Not Found</p>
      <p className="text-gray-400 mb-8 text-center">
        Sorry lad, we don&apos;t serve{" "}
        <span className="text-white font-mono bg-gray-800 px-2 py-1 rounded">
          {path}
        </span>{" "}
        here
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}