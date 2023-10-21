import * as user from 'database/user'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const { email, name, password } = await req.json()
	const exists = await user.getByEmail(email)
	if (exists)
		return NextResponse.json({ error: 'User already exists' }, { status: 400 })

	const newUser = await user.create({
		email,
		name,
		password: await hash(password, 10),
	})
	return NextResponse.json(newUser)
}
