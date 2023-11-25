import { hash } from 'bcrypt'
import { inviteCodes, user } from 'database'

export async function GET(request: Request) {
	return Response.json({ res: await request.json() })
}

// TODO: Validate email, name, password using Yup or similar
export async function POST(request: Request) {
	const { email, name, password, inviteCode } = await request.json()
	if (!email || !name || !password || !inviteCode) {
		return Response.json({ error: 'Missing required fields' }, { status: 400 })
	} 

	try {
		const existingUser = await user.getByEmail(email)
		if (existingUser) {
			return Response.json({ error: 'User already exists' }, { status: 409 })
		}
	} catch (error) {
		console.error(error)
		return Response.json({ message: 'Internal server error checking for existing user' }, { status: 500 })
	}

	try {
		const inviteCodeResponse = await inviteCodes.getByCode(inviteCode.toUpperCase())
		if (!inviteCodeResponse) {
			return Response.json({ error: 'Invalid invite code' }, { status: 401 })
		}

		if (inviteCodeResponse.isRedeemed) {
			return Response.json({ error: 'Invite code already redeemed' }, { status: 410 })
		}
	} catch (error) {
		console.error(error)
		return Response.json({ message: 'Internal server error validating invite code' }, { status: 500 })
	}

	// One day invite codes will be a one-time use, but for now they're not
	// inviteCodes.updateRedeemedById(inviteCodeResponse.id)
	try {
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
		return Response.json({ message: 'Internal server error creating user' }, { status: 500 })
	}
}

export async function PUT(request: Request) {
	return Response.json({ res: await request.json() })
}

export async function DELETE(request: Request) {
	return Response.json({ res: await request.json() })
}
