import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface CreateData extends UpdateData {
	difficulty: number
	userId: number
	title: string
}

interface UpdateData {
	description?: string
	deadline?: Date
	difficulty?: number
	isCompleted?: boolean
	minutesSpent?: number
	title?: string
}

const create = (data: CreateData) => prisma.quest.create({ data })

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
