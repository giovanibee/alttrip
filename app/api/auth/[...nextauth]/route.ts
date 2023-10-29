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

				const doesPasswordMatch = await compare(
					credentials.password,
					existingUser.password,
				)
				if (!doesPasswordMatch) return null

				return {
					id: existingUser.id,
					email: existingUser.email,
					name: existingUser.name,
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
