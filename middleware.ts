import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
	// Get the pathname of the request (e.g. /, /login)
	const path = req.nextUrl.pathname
	// If it's the root path, just render it
	if (path === '/') return NextResponse.next()

	const token = req.cookies.get('next-auth.session-token')
	console.log('token', token)

	if (!token && path === '/explore') {
		return NextResponse.redirect(new URL('/login', req.url))
	} else if (token && ['/login', '/register'].includes(path)) {
		return NextResponse.redirect(new URL('/explore', req.url))
	}
	return NextResponse.next()
}
