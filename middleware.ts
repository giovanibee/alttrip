import { NextRequest, NextResponse } from 'next/server'
// import { getToken } from 'next-auth/jwt'

export default async function middleware(req: NextRequest) {
	// Get the pathname of the request (e.g. /, /login)
	const path = req.nextUrl.pathname
	// If it's the root path, just render it
	if (path === '/') return NextResponse.next()

	// TODO---use an actual session token instead of this fake cookie
	// right now there's a bug where the session token is not being returned on prod
	const session = false // if i had a working session token, it would be here
	// await getToken({
	// 	req,
	// 	secureCookie: true,
	// 	cookieName: 'next-auth.session-token',
	// 	secret: process.env.NEXTAUTH_SECRET,
	// 	raw: true,
	// })

	if (session && path === '/explore') {
		return NextResponse.redirect(new URL('/login', req.url))
	} else if (session && ['/login', '/register'].includes(path)) {
		return NextResponse.redirect(new URL('/explore', req.url))
	}
	return NextResponse.next()
}
