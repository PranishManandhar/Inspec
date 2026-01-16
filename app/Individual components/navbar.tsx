"use client";

import { useState, useRef, useEffect } from 'react';
import { HomeSharpIcon,InfoSharpIcon } from '@/public/icons';
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="bg-slate-950 flex items-center justify-between px-4 relative z-50">
            {/* logo */}
            <ul className='flex'>
                <li>
                    <Image src="/Assets/inspec-logo.png" alt="Inspec logo"
                        width={50}
                        height={50}
                        priority />
                </li>
            </ul>
            {/* options */}
            <ul className="flex">
                <li className="p-2 text-white"><HomeSharpIcon/> Home</li>
                
                {/* dropdown start */}
                <li className="relative p-2" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white px-3 border rounded-md hover:border-slate-700 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                    >
                        Data
                    </button>
                    <div className={`absolute top-full mt-1 right-0 bg-slate-300 border rounded-md shadow-lg min-w-[150px] ${isOpen ? 'block' : 'hidden'} text-center`}>
                        <a href="#" className="block px-4 py-2 text-black hover:bg-slate-400">data 1</a>
                        <a href="#" className="block px-4 py-2 text-black hover:bg-slate-400">data 2</a>
                        <a href="#" className="block px-4 py-2 text-black hover:bg-slate-400">data 3</a>
                    </div>
                </li>
                {/* dropdown end */}

                <li className="p-2 text-white"><InfoSharpIcon/> About</li>
                <li className="p-2 text-white">Code of Conducts</li>
            </ul>
        </nav>
    );
}