import { hash } from 'bcrypt'
import { user } from 'database'

export async function GET(request: Request) {
	return Response.json({ res: await request.json() })
}

// TODO: Validate email, name, password using Yup or something
export async function POST(request: Request) {
	try {
		const { email, name, password } = await request.json()
		const existingUser = await user.getByEmail(email)
		if (existingUser) {
			return Response.json({ error: 'User already exists' }, { status: 409 })
		}

		const newUser = await user.create({
			email,
			name,
			password: await hash(password, 10),
		})
		return Response.json(
			{ user: newUser, message: 'User created successfully' },
			{ status: 201 },
		)
	} catch (error) {
		console.error(error)
		return Response.json({ message: 'Internal server error' }, { status: 500 })
	}
}

export async function PUT(request: Request) {
	return Response.json({ res: await request.json() })
}

export async function DELETE(request: Request) {
	return Response.json({ res: await request.json() })
}
