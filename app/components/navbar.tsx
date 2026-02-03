"use client";
import { useState, useRef, useEffect } from 'react';
import { HomeSharpIcon, InfoSharpIcon, GroupsIcon,LocalPhoneSharpIcon } from '@/public/icons';
import Image from "next/image";
import Link from "next/link";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);
    const ignoreRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !ignoreRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
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
                <ul className="flex items-center">
                    <li className="p-2 text-white flex items-center gap-1">
                        <HomeSharpIcon />
                        <Link href={"/"}>Home</Link>
                    </li>

                    {/* dropdown */}
                    <li
                        className="relative p-2"
                        ref={dropdownRef}
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <button className="text-white px-3 rounded-md flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none">
                            <GroupsIcon />
                            Available info
                        </button>
                    </li>

                    <li className="p-2 text-white flex items-center gap-1">
                        <InfoSharpIcon />
                        <Link href={"/about-us"}>About us</Link>
                    </li>

                    <li className="p-2 text-white flex items-center gap-1">
                        <LocalPhoneSharpIcon />
                        <Link href={"/contact"}>Contact us</Link>
                    </li>
                </ul>
            </nav>

            {/* {this is under work please dont touch} */}
            <div ref={ignoreRef} className={`grid grid-cols-4 right-0 top-full bg-slate-300 border rounded-md shadow-lg w-full ${isOpen ? 'block' : 'hidden'} text-center`}>
                <div className='m-3 border border-slate-700 rounded-md'>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data1"}>Data 1</Link>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data2"}>Data 2</Link>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data3"}>Data 3</Link>
                </div>
                <div className='m-3 border border-slate-700 rounded-md'>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data4"}>Data 4</Link>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data5"}>Data 5</Link>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data6"}>Data 6</Link>
                </div>
                <div className='m-3 border border-slate-700 rounded-md'>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data7"}>Data 7</Link>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data8"}>Data 8</Link>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data9"}>Data 9</Link>
                </div>
                <div className='m-3 border border-slate-700 rounded-md'>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data10"}>Data 10</Link>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data11"}>Data 11</Link>
                    <Link className="block px-4 py-2 text-black hover:bg-slate-400" href={"/data/data12"}>Data 12</Link>
                </div>
            </div>
        </>
    );
}