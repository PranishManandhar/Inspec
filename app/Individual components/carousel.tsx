"use client";

import Image from "next/image";

import { useState,useEffect } from "react";

export default function Carousel() {

    //state for carousel image array
    const [count, setcount] = useState(0);

    // temporary images
    const images = ["/Assets/carousel-Images/gremragi.jpeg",
        "/Assets/carousel-Images/Higurashi no naku koro ni.jpeg",
        "/Assets/carousel-Images/sayo project.png"];


        // logic for the carousel buttons

    const next = () => {
        if (count == images.length - 1) {
            setcount(0);
        }
        else {
            setcount(count + 1);
        }
    }
    const prev = () => {
        if (count == 0) {
            setcount(images.length - 1);
        }
        else {
            setcount(count - 1);
        }

    }

    // changes image automatically every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => next(), 5000);
        return () => clearInterval(interval);
    }, [count]);

    return (
        <>
            <div className="relative w-full h-64 sm:h-80 md:h-[35rem] overflow-hidden">
                <Image
                    src={images[count]}
                    alt={`Carousel image ${count + 1}`}
                    fill
                    priority
                />
            </div>
            <div className="controls">
                <button onClick={prev} className="border rounded-md p-2">prev</button>
                <button onClick={next} className="border rounded-md p-2">next</button>
            </div>
        </>
    );
}