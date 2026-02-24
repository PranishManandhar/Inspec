"use client";
import { Navbar, Footer, Copyright } from "../components/index";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  async function handlelogin() {
    seterror("");
    setloading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok){
        seterror("Invalid credentials");
        return;
      } 

      document.cookie = `token=${data.data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      localStorage.setItem("user", JSON.stringify(data.data.user));

      router.replace("/dashboard");
      
    } catch (err) {
      seterror("something went wrong. please try again in a bit.");
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-white">
        <div className="w-[350px] bg-gray-200 shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-black text-white rounded-full w-20 h-20 flex items-center justify-center text-xl">
              <Image
                src="/favicon.ico"
                alt="Inspec Logo"
                width={32}
                height={32}
                className="w-14 h-14"
              />
            </div>
          </div>
          <div className="mb-4  text-2xl font-bold">Login</div>
          {error && (
            <p className="mb-3 text-sm text-red-500">{error}</p>
          )}

          {/* Inputs */}
          <input
            className="w-full p-2 mb-3 border-b-[1px] border-black border-t-0 bg-transparent placeholder:text-black focus:placeholder:text-gray-400"
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e)=>setemail(e.target.value)}
            />

          <input
            className="w-full p-2 mb-3 border-b-[1px] border-black border-t-0 bg-transparent placeholder:text-black focus:placeholder:text-gray-400"
            type="password"
            placeholder="Password"
            onChange={(e)=>setpassword(e.target.value)}
          />

          {/* signin Button */}
          <button 
          className="w-3/4 mt-3 bg-black text-white py-2 hover:bg-gray-800 rounded-md"
          onClick={handlelogin}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="pt-4 text-slate-500 hover:text-black">
            <Link href="/forgot-password">Forget credentials?</Link>
          </p>
        </div>
      </main>

      <Footer />
      <Copyright />
    </>
  );
}
