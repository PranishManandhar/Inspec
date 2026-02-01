"use client";

import { CopyrightIcon } from "@/public/icons";

export default function Copyright() {
    return (
        <>
            <div className="w-full h-auto bg-black">
                <p className="text-center text-white justify-center p-4">Copyright <CopyrightIcon /> {new Date().getFullYear()} by Inspec</p>
            </div>
        </>
    );
}