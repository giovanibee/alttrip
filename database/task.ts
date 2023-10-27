import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface CreateData extends UpdateData {
	placeId: number
	questId: number
	title: string
}

interface UpdateData {
	description?: string
	deadline?: Date
	hasBeenVisited?: boolean
	isCompleted?: boolean
	title?: string
}

const create = (data: CreateData) => prisma.task.create({ data })

const deleteById = (id: number) =>
	prisma.task.delete({
		where: { id },
	})

const getAllByQuestId = (id: number) =>
	prisma.task.findUnique({
		where: { id },
	})

const getByTitle = (title: string, questId: number) =>
	prisma.task.findUnique({
		where: {
			title_questId: {
				title,
				questId,
			},
		},
	})

const updateById = (id: number, data: UpdateData) =>
	prisma.task.update({
		where: { id },
		data,
	})

export { create, deleteById, getAllByQuestId, getByTitle, updateById }
