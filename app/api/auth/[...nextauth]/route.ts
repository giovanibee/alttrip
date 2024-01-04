import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import { user } from 'database'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import db from 'lib/prisma/prisma'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	pages: {
		signIn: '/login',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@aol.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null

				const existingUser = await user.getByEmail(credentials.email)

				if (!existingUser) return null

				const { id, email, name, password } = existingUser

				const doesPasswordMatch = await compare(credentials.password, password)
				if (!doesPasswordMatch) return null

				return { id, email, name }
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		// Set to jwt in order for CredentialsProvider to work properly
		strategy: 'jwt',
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
