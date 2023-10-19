import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface CreateData {
	email: string
	name: string
}

interface UpdateData {
	email?: string
	name?: string
}

const create = (data: CreateData) => prisma.user.create({ data })

const deleteById = (id: number) =>
	prisma.user.delete({
		where: { id },
	})

const getByEmail = (email: string) =>
	prisma.user.findUnique({
		where: { email },
	})

const getById = (id: number) =>
	prisma.user.findUnique({
		where: { id },
	})

const updateById = (id: number, data: UpdateData) =>
	prisma.user.update({
		where: { id },
		data,
	})

export { create, deleteById, getByEmail, getById, updateById }
