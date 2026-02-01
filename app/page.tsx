import { Navbar, Carousel, Footer, Copyright } from "./components";
import Image from "next/image";
import devs from "../app/json-files/members.json";

export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />

      {/* Section: Recently Added */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        <hr className="border-slate-700/30 mb-12" />
        <h1 className="text-3xl md:text-5xl font-semibold text-center">
          Categories
        </h1>
        <div className="grid grid-flow-col grid-rows-3 gap-4 text-center pt-9">
          <div className="p-3 text-2xl font-light border border-black rounded-md">link 1</div>
          <div className="p-3 text-2xl font-light border border-black rounded-md">link 2</div>
          <div className="p-3 text-2xl font-light border border-black rounded-md">link 3</div>
          <div className="p-3 text-2xl font-light border border-black rounded-md">link 4</div>
          <div className="p-3 text-2xl font-light border border-black rounded-md">link 5</div>
          <div className="p-3 text-2xl font-light border border-black rounded-md">link 6</div>
          <div className="p-3 text-2xl font-light border border-black rounded-md">link 7</div>
          <div className="p-3 text-2xl font-light border border-black rounded-md">link 8</div>
          <div className="p-3 text-2xl font-light border border-black rounded-md">link 9</div>
        </div>
      </section>



      {/* Section: Team */}
      <hr className="border-slate-700/30 mt-12" />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        <h1 className="text-3xl md:text-5xl font-semibold text-center mb-16">
          Team Behind Inspec
        </h1>

        <div className="space-y-10">
          {devs.map((dev, index) => (
            <div
              key={index}
              className={`flex flex-col md:items-center gap-8 ${index % 2 === 0
                ? "md:flex-row-reverse md:text-right"
                : "md:flex-row md:text-left"
                }`}
            >
              {dev.Image ? (
                <Image
                  src={dev.Image}
                  alt={dev.Name}
                  width={180}
                  height={180}
                  className="rounded-full"
                />
              ) : (
                <div className="w-44 h-44 bg-gray-300 flex items-center justify-center rounded-full">
                  No Image
                </div>
              )}

              <div>
                <p className="text-2xl md:text-3xl font-semibold">
                  {dev.Name}
                </p>
                <p className="text-lg text-slate-400">
                  {dev.Roll}
                </p>
                <p className="text-lg text-slate-400">
                  {dev.Email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
}
