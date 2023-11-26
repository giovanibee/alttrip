'use server'

import { chapters, stories } from 'database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const { latitude, longitude } = await request.json()
	if (!latitude || !longitude) { // required for below (at some point)
		return Response.json({ error: 'Latitude or longitude is missing' })
	}
	// TODO: add coords to access proximity
	const allStories = await stories.getAllByProximity()
	return Response.json({ res: allStories })
}

export async function POST(request: NextRequest) {
	// TODO: add better verification for body
	const { userEmail, story, chapters } = await request.json() || {}
	if (!userEmail) return Response.json({ error: 'User email not found', status: 422 })
	if (!story) return Response.json({ error: 'Story not found', status: 422 })
	if (!chapters) return Response.json({ error: 'Chapters not found', status: 422 })

	try {
		const response = await stories.create(story, userEmail)
		chapters.storyId = response.id
		const chaptersResponse = await chapters.create(chapters)
		return Response.json({ res: response, status: 200 })
	} catch (error) {
		return Response.json({ error })
	}
}

export async function PUT(request: NextRequest) {
	const { id, ...body } = await request.json()
	const response = await stories.updateById(id, body)
	return Response.json({ res: response })
}

export async function DELETE(request: NextRequest) {
	const { id } = await request.json()
	const response = await stories.deleteById(id)
	return Response.json({ res: response })
}
