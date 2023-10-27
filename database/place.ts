import { user } from './'
import prisma from 'lib/prisma/prisma'

interface CreateData extends UpdateData {
	hasBeenVisited?: boolean
	location: number[]
	name: string
	userId?: number
}

interface UpdateData {
	description?: string
	hasBeenVisited?: boolean
	name?: string
	rating?: number
}

const create = async (data: CreateData, email: string) => {
	const { id } = (await user.getByEmail(email)) || {}
	if (!id) throw new Error('User not found')
	await prisma.quest.create({ data: { ...data, userId: id } })
}

const deleteById = (id: number) =>
	prisma.quest.delete({
		where: { id },
	})

const deleteByTitle = (userId: number, name: string) =>
	prisma.quest.delete({
		where: { userId, name },
	})

const getAllByQuestId = (id: number) =>
	prisma.quest.findUnique({
		where: { id },
	})

const getByTitle = (name: string, userId: number) =>
	prisma.quest.findUnique({
		where: { name, userId },
	})

const updateById = (id: number, data: UpdateData) =>
	prisma.quest.update({
		where: { id },
		data,
	})

export {
	create,
	deleteById,
	deleteByTitle,
	getAllByQuestId,
	getByTitle,
	updateById,
}
