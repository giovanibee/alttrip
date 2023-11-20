'use server'

import { stories } from 'database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const { latitude, longitude } = await request.json()
	if (!latitude || !longitude) { // required for below (at some point)
		return NextResponse.json({ error: 'Latitude or longitude is missing' })
	}
	// TODO: add coords to access proximity
	const allStories = await stories.getAllByProximity()
	return NextResponse.json(allStories)
}

export async function POST(request: NextRequest) {
	// TODO: add verification for user email
	const { userEmail, ...body } = await request.json()
	if (!userEmail) return NextResponse.json({ error: 'User email not found' })
	if (!body) return NextResponse.json({ error: 'Body is missing' })
	const response = await stories.create(body, userEmail)
	return NextResponse.json(response)
}

export async function PUT(request: NextRequest) {
	const { id, ...body } = await request.json()
	const response = await stories.updateById(id, body)
	return NextResponse.json(response)
}

export async function DELETE(request: NextRequest) {
	const { id } = await request.json()
	const response = await stories.deleteById(id)
	return NextResponse.json(response)
}
