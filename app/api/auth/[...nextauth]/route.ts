import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import * as User from 'database/user'

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				console.log('credentials', credentials)
				const { email, password } = credentials ?? {}
				if (!email || !password) {
					throw new Error('Missing username or password')
				}
				const user = await User.getByEmail(email)
				console.log('user', user)
				// if user doesn't exist or password doesn't match
				if (!user || !(await compare(password, user.password))) {
					throw new Error('Invalid username or password')
				}
				return {
					id: user.id.toString(),
					name: user.password,
					email: user.email,
				}
			},
		}),
	],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
