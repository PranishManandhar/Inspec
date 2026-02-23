"use client";
import { useRouter } from "next/navigation";

export default function ViewMoreButton({ id }: { id: number }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/data/persons/${id}`)}
      className="border w-full border-black p-3 bg-black text-white hover:scale-105 h-auto whitespace-nowrap"
    >
      View More
    </button>
  );
}