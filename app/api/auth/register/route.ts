import * as user from 'database/user'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

// TODO: Validate email, name, password using Yup or something

export async function POST(request: Request) {
	try {
		const { email, name, password } = await request.json()
		const existingUser = await user.getByEmail(email)
		if (existingUser) {
			return NextResponse.json(
				{ error: 'User already exists' },
				{ status: 409 },
			)
		}

		const newUser = await user.create({
			email,
			name,
			password: await hash(password, 10),
		})
		return NextResponse.json(
			{ user: newUser, message: 'User created successfully' },
			{ status: 201 },
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 },
		)
	}
}
