'use server'

import { quest } from 'database'
import prisma from 'lib/prisma'

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

const getAllByQuestId = async (name: string, userEmail: string) =>
	(await quest.getByName(name, userEmail)).tasks

const getByName = (name: string, questId: number) =>
	prisma.task.findUnique({
		where: {
			name,
			questId,
		},
	})

const updateById = (id: number, data: UpdateData) =>
	prisma.task.update({
		where: { id },
		data,
	})

export { create, deleteById, getAllByQuestId, getByName, updateById }
