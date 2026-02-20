"use client";
import { Navbar, Footer, Copyright } from "@/app/components/index";
import { useState } from "react";
import {
    Overview,
    ManageData,
    ManageUser,
    Settings,
    Logs,
    AccessLogs,
} from "@/app/dashboard/components";

export default function DashBoard() {
    const [pageIndex, setpageIndex] = useState(0);
    const options = [
        "Overview",
        "Manage Data",
        "Manage Users",
        "Settings",
        "Logs",
        "Access Logs",
    ];

    return (
        <>
            <Navbar />
            <div className="flex w-full overflow-hidden h-[calc(100vh-120px)]">
                {/* left side */}
                <div className="w-1/5">
                    <ul>
                        {options.map((label, index) => (
                            <li key={index} className="border-b border-black">
                                <button
                                    onClick={() => setpageIndex(index)}
                                    className={`w-full p-5 text-left text-2xl font-bold
          ${pageIndex === index
                                            ? "bg-black text-white"
                                            : "hover:bg-black hover:text-white"
                                        }`}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* right side */}
                <div className="w-4/5 border-0 border-l-4 px-6 border-black overflow-y-auto">
                    {pageIndex === 0 && <Overview />}
                    {pageIndex === 1 && <ManageData />}
                    {pageIndex === 2 && <ManageUser />}
                    {pageIndex === 3 && <Settings />}
                    {pageIndex === 4 && <Logs />}
                    {pageIndex === 5 && <AccessLogs />}
                </div>
            </div>
            <Footer />
            <Copyright />
        </>
    );
}
