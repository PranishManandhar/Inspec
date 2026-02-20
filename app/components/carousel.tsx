"use client";

import Image from "next/image";

import { useState, useEffect } from "react";

export default function Carousel() {
  //state for carousel image array
  const [count, setcount] = useState(0);

  // temporary images
  const images = [
    "/Assets/carousel-Images/car1.jpg",
    "/Assets/carousel-Images/car2.jpg",
    "/Assets/carousel-Images/car3.jpg",
  ];

  // logic for the carousel buttons

  const next = () => {
    if (count == images.length - 1) {
      setcount(0);
    } else {
      setcount(count + 1);
    }
  };

  // changes image automatically every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => next(), 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex justify-center items-center w-full py-8">
      <div className="flex w-full max-w-7xl h-[30rem] rounded-md">
        {/* Button Column */}
        <div className="flex flex-col w-[25%] h-[10rem]">
            <h3 className="text-center font-bold text-3xl bg-black border text-white p-4">Latest Updates</h3>
          <button
            onClick={() => setcount(0)}
            className="flex-1 bg-black border border-gray-200 text-white text-xl hover:bg-white hover:text-black translate-colors p-4"
          >
            Intro to Inspec
          </button>
          <button
            onClick={() => setcount(1)}
            className="flex-1 bg-black border border-gray-200 text-white text-xl hover:bg-white hover:text-black translate-colors p-4"
          >
            Q4 News
          </button>
          <button
            onClick={() => setcount(2)}
            className="flex-1 bg-black border border-gray-200 text-white text-xl hover:bg-white hover:text-black translate-colors p-4"
          >
            Latest Update
          </button>
        </div>

        {/* Carousel Image */}
        <div className="relative flex-1 overflow-hidden rounded shadow-lg">
          <Image
            src={images[count]}
            alt={`Carousel image ${count + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
