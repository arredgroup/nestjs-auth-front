import { NextResponse } from 'next/server'

export const middleware = (request) => {
    console.log("MIDDLEWARE");
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        if(!user){
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
}
export const config = {
    matcher: ['/users/:path*', '/users'],
}