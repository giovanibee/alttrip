'use server'

import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'
import { object, string } from 'yup'
import { chapters, stories } from 'database'

const postSchema = object({
	story: object({
		name: string().required(),
		description: string().required(),
	}).required(),
	firstChapter: object({
		name: string().required(),
		description: string().required(),
		details: string().required(),
		passcode: string().required(),
		secretText: string().required(),
	}).required(),
}).required()

export async function GET(request: NextRequest) {
	const { latitude, longitude } = await request.json()
	if (!latitude || !longitude) { // required for below (at some point)
		return Response.json({ error: 'Latitude or longitude is missing' }, { status: 422 })
	}
	// TODO: add coords to access proximity
	const allStories = await stories.getAllByProximity()
	return Response.json({ res: allStories })
}

export async function POST(request: NextRequest) {
	// TODO: add better verification for body
	const body = await request.json() || {}
	try {
		await postSchema.validate(body)
	} catch (error) {
		return Response.json({ error }, { status: 422 })
	}

	const session = await getServerSession()
	const email = session?.user?.email
	if (!email) return Response.json({ error: 'Not authorized' }, { status: 401 })

	try {
		console.log(body)
		const response = await stories.create(body.story, email)
		console.log('response1', response)
		if (!response) return Response.json({ error: 'Story not created' }, { status: 500 })
		body.firstChapter.storyId = response.id

		const responseChapter = await chapters.create(body.firstChapter)
		if (!responseChapter) return Response.json({ error: 'Chapter not created' }, { status: 500 })

		return Response.json({ res: response, }, { status: 200 })
	} catch (error) {
		return Response.json({ error }, { status: 500 })
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
