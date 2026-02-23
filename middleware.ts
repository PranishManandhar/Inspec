import { url } from "inspector";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request:NextRequest)
{
    const token = request.cookies.get("token");

    if(!token)
    {
        return NextResponse.redirect(new URL("/signup",request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher:["/dashboard/:path*"],
}