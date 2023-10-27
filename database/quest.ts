import { user } from './'
import prisma from 'lib/prisma/prisma'

interface Data {
	description?: string
	name: string
}

const create = async (data: Data, email: string) => {
	const { id } = await user.getByEmail(email) || {}
	if (!id) throw new Error('User not found')
	await prisma.quest.create({ data: {
		...data,
		userId: id
	}})
}

const deleteById = (id: number) =>
	prisma.quest.delete({
		where: { id },
	})

const deleteByTitle = (id: number, name: string) =>
	prisma.quest.delete({
		where: { id, name },
	})

const getAllByQuestId = (id: number) =>
	prisma.quest.findUnique({
		where: { id },
	})

const getByTitle = (name: string, id: number) => 
	prisma.quest.findUnique({
		where: { name, id },
	})

const updateById = (id: number, data: Data) =>
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
