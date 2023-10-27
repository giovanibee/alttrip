import * as User from './user'
import prisma from 'lib/prisma/prisma'

interface CreateData extends UpdateData {
	difficulty: number
	title: string
	userId?: number
}

interface UpdateData {
	description?: string
	deadline?: Date
	difficulty?: number
	isCompleted?: boolean
	minutesSpent?: number
	title?: string
}

const create = async (data: CreateData, email: string) => {
	const { id } = await prisma.user.findUnique(email)
	if (!id) throw new Error('User not found')
	data.userId = id as number
	await prisma.quest.create({ data })
}

const deleteById = (id: number) =>
	prisma.quest.delete({
		where: { id },
	})

const deleteByTitle = (userId: number, title: string) =>
	prisma.quest.delete({
		where: { userId, title },
	})

const getAllByQuestId = (id: number) =>
	prisma.quest.findUnique({
		where: { id },
	})

const getByTitle = (title: string, userId: number) =>
	prisma.quest.findUnique({
		where: { title, userId },
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
