import Navbar from "./Individual components/navbar";
import Carousel from "./Individual components/carousel";
import Footer from "./Individual components/footer";
import Image from "next/image";
import devs from '../app/members.json';

export default function Home() {
  return (
    <>
      <Navbar />

      <Carousel />
      
      <hr className="border-slate-950 m-20" />

      <h1 className="flex justify-center text-5xl">Recently Added Data</h1>
      <hr className="border-slate-950 m-20" />

      <h1 className="flex justify-center text-5xl">Team Behind Inspec</h1>
    
    {/* profile of dev team */}
      <div>
        <div className="p-8 space-y-8">
          {devs.map((devs, index) => (
            <div key={index} className="flex items-center gap-8">
              {devs.Image ? (
                <Image
                  src={devs.Image}
                  alt={devs.Name}
                  width={200}
                  height={200}
                  priority
                />
              ) : (
                <div className="w-48 h-48 bg-gray-300 flex items-center justify-center rounded-full">
                  No Image
                </div>
              )}
              <div className="data">
                <p className="text-5xl">{devs.Name}</p>
                <p className="text-2xl">{devs.Roll}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

        <Footer />
    </>
  );
}
