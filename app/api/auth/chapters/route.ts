'use server'

import { chapters, sortedChapters, user } from 'database'
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

// get all first chapters
// TODO: Use graphql somehow for this
// TODO: get by user completion
export async function GET() {
	try {
		const session = await getServerSession()
		const email =  session?.user?.email
		if (!email) {
			return Response.json(
				{ error: 'Unauthorized access' }, { status: 401 }
			)
		}

		const response = await sortedChapters.getSortedChapters(email)
		return Response.json({ res: response })
	} catch (error) {
		return Response.json({ error }, { status: 500 })
	}
}

export async function POST(request: NextRequest) {
	// TODO: add verification for body
	const body = await request.json()
	if (!body) return Response.json({ error: 'Body is missing' })
	const response = await chapters.create(body)
	return Response.json(response)
}

export async function PUT(request: NextRequest) {
	const { id, ...body } = await request.json()
	const response = await chapters.updateById(id, body)
	return Response.json(response)
}

export async function DELETE(request: NextRequest) {
	const { id } = await request.json()
	const response = await chapters.deleteById(id)
	return Response.json(response)
}
