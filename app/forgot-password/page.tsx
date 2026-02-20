import { Navbar, Footer, Copyright } from "../components/index";
import Image from "next/image";
export default function Admin() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-white">
        <div className="w-[350px] bg-gray-200 shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-xl">
              <Image
                src="/favicon.ico" // also add leading slash
                alt="Inspec Logo"
                className="w-8 h-8"
                width={32}
                height={32} // Next.js Image requires width and height
              />
            </div>
          </div>

          {/* Inputs */}
          <input
            className="w-full p-2 mb-3 border border-gray-300"
            id="email"
            type="email"
            placeholder="Email"
          />
          <input
            className="w-full p-2 mb-3 border border-gray-300"
            id="username"
            type="text"
            placeholder="Username"
          />

          {/* Login Button */}
          <button className="w-full bg-black text-white py-2 hover:bg-gray-800">
            Login
          </button>
        </div>
      </main>

      <Footer />
      <Copyright />
    </>
  );
}
