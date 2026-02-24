import { Navbar, Footer, Copyright } from "../components/index";
import Image from "next/image";
import Link from "next/link";
export default function ForgetPassword() {
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

          {/* Inputs */}
          <input
            className="w-full p-2 mb-3 border-b-[1px] border-black border-t-0 bg-transparent placeholder:text-black focus:placeholder:text-gray-400"
            id="email"
            type="New Password"
            placeholder="Email"
          />

          <input
            className="w-full p-2 mb-3 border-b-[1px] border-black border-t-0 bg-transparent placeholder:text-black focus:placeholder:text-gray-400"
            type="password"
            placeholder="Re enter New Password"
          />
          <input
            className="w-full p-2 mb-3 border-b-[1px] border-black border-t-0 bg-transparent placeholder:text-black focus:placeholder:text-gray-400"
            type="text"
            placeholder="OTP code"
          />

          {/* signin Button */}
          <button className="w-3/4 mt-3 bg-black text-white py-2 hover:bg-gray-800 rounded-md">
            Reset password
          </button>

          <p className="pt-4 text-slate-500 hover:text-black">
            <Link href="/signup">Back to Login</Link>
          </p>
        </div>
      </main>

      <Footer />
      <Copyright />
    </>
  );
}
