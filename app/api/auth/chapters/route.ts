'use server'

import { chapters } from 'database'
import { NextRequest } from 'next/server'

// get all first chapters
// TODO: get by user completion
export async function GET(request: NextRequest) {
	const { latitude, longitude } = await request.json()
	if (!latitude || !longitude) {
		return Response.json({ error: 'Latitude and longitude are required' }, { status: 400 })
	}

	try {
		let response = await chapters.getAll()
		console.log('response', response)
		// filter by distance
		// TODO: refine proximity
		response = response.filter((chapter) => {
			const distance = Math.sqrt(
				Math.pow(chapter.latitude - latitude, 2) + Math.pow(chapter.longitude - longitude, 2)
			)
			return distance < 0.1
		})
		// TODO: filter by completion by user
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
