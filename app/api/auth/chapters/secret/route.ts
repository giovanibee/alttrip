'use server'

import { chapters, sortedChapters } from 'database'
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

// evaluate if user already has access to chapter
export async function GET(request: NextRequest) {
	const url = new URL(request.nextUrl).searchParams
	console.log('URLLL', url)
	const searchParams = new URL(request.nextUrl).searchParams?.get('chapterId')
	const id = parseInt(searchParams || '')
	if (isNaN(id)) {
		return Response.json({ error: 'ChapterId is missing' }, { status: 400 })
	}

	try {
		const session = await getServerSession()
		const email = session?.user?.email
		if (!email) {
			return Response.json({ error: 'Not authenticated', status: 401 })
		}
		const response = await sortedChapters.checkIfChapterIsCompleted(email, id)
		const secretText = response?.chapter?.secretText
		return Response.json(secretText)
	} catch (error) {
		console.error(error)
		return Response.json({ error: 'Server error', status: 500 })
	}
}

export async function PUT(request: NextRequest) {
	const { chapterId, passcode } = await request.json() || {}
	if (!chapterId || !passcode) {
		return Response.json({ error: 'Param in body is missing' })
	}

	try {
		const session = await getServerSession()
		const email = session?.user?.email
		if (!email) {
			return Response.json({ error: 'Not authenticated', status: 401 })
		}
		const response = await chapters.verifyPasscode(chapterId, passcode)
		if (!response) {
			return Response.json({ error: 'Invalid passcode', status: 400 })
		}
		
		await sortedChapters.markChapterAsComplete(email, chapterId)
		return Response.json(response)
	} catch (error) {
		console.error(error)
		return Response.json({ error: 'Server error', status: 500 })
	}
}