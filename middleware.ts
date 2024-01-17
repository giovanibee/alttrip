import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
	// Get the pathname of the request (e.g. /, /login)
	const path = req.nextUrl.pathname
	// If it's the root path, just render it
	if (path === '/') return NextResponse.next()

	const session = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
		cookieName: 'next-auth.session-token',
	})

	console.log('session', session)
	console.log('req', req)
	console.log('secret', process.env.NEXTAUTH_SECRET?.substring(0, 6))
	if (session === null && path === '/explore') {
		return NextResponse.redirect(new URL('/login', req.url))
	} else if (session && ['/login', '/register'].includes(path)) {
		return NextResponse.redirect(new URL('/explore', req.url))
	}
	return NextResponse.next()
}
