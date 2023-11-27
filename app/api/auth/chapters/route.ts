'use server'

import { chapters } from 'database'
import { NextRequest } from 'next/server'

// get all first chapters
// TODO: Use graphql somehow for this
// TODO: get by user completion
export async function GET() {
	try {
		let response = await chapters.getAll()
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
