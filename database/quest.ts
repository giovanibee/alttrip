import { user } from './'
import prisma from 'lib/prisma/prisma'

interface Data {
	description?: string
	name: string
}

const create = async (data: Data, email: string) => {
	const { id } = (await user.getByEmail(email)) || {}
	if (!id) throw new Error('User not found')
	await prisma.quest.create({
		data: {
			...data,
			userId: id,
		},
	})
}

const deleteById = (id: number) =>
	prisma.quest.delete({
		where: { id },
	})

const deleteByName = (name: string, userEmail: string) =>
	prisma.quest.delete({
		where: { name, email: userEmail },
	})

const getAllByUser = async (email: string) =>
	(await user.getByEmail(email)).quests

const getByName = async (name: string, email: string) => {
	const { id } = (await user.getByEmail(email)) || {}
	return prisma.quest.findUnique({
		where: { name, userId: id },
	})
}

const updateById = (id: number, data: Data) =>
	prisma.quest.update({
		where: { id },
		data,
	})

export { create, deleteById, deleteByName, getAllByUser, getByName, updateById }
