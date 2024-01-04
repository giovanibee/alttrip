import { PrismaClient } from '../node_modules/.prisma/client'

declare global {
	// eslint-disable-next-line no-unused-vars
	let prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
