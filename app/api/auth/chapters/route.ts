'use server'

import { chapters } from 'database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const { storyId } = await request.json()
	const allchapters = await chapters.getAllByStoryId(storyId)
	return NextResponse.json(allchapters)
}

export async function POST(request: NextRequest) {
	// TODO: add verification for body
	const body = await request.json()
	if (!body) return NextResponse.json({ error: 'Body is missing' })
	const response = await chapters.create(body)
	return NextResponse.json(response)
}

export async function PUT(request: NextRequest) {
	const { id, ...body } = await request.json()
	const response = await chapters.updateById(id, body)
	return NextResponse.json(response)
}

export async function DELETE(request: NextRequest) {
	const { id } = await request.json()
	const response = await chapters.deleteById(id)
	return NextResponse.json(response)
}
