import prisma from 'lib/prisma/prisma'

interface CreateData {
	email: string
	name: string
	password: string
}

interface UpdateData {
	email?: string
	name?: string
	password?: string
}

const create = async (data: CreateData) => prisma.user.create({ data })
const deleteById = async (id: number) => prisma.user.delete({ where: { id } })
const getByEmail = async (email: string) => prisma.user.findUnique({ where: { email } })
const getById = async (id: number) => prisma.user.findUnique({ where: { id } })
const updateById = async (id: number, data: UpdateData) =>
	prisma.user.update({ where: { id }, data })

export { create, deleteById, getByEmail, getById, updateById }
