import { NextRequest,NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { get, request } from "http";

export function middleware(req: NextRequest) {
   const token = getToken({ req:request, secret: process.env.NEXTAUTH_SECRET });
    const url = request.nextUrl

if(
    token &&
    (
    url.pathname.startsWith('/signin')||
    url.pathname.startsWith('/signup')||
    url.pathname.startsWith('/')||
    url.pathname.startsWith('/verify')
    )
    ){
    return NextResponse.redirect(new URL('/dashboard', req.url))
    }
if(!token && url.pathname.startsWith('/dashboard')){
    return NextResponse.redirect(new URL('/dashboard', req.url))
}
return NextResponse.next()
};

export const config = {
    matcher: [
        '/signin',
        '/signup',
        '/',
        '/dashboard:path*'
    ]
};