'use server'

import { user } from 'database'
import prisma from 'lib/prisma'

export interface CreateStory extends UpdateStory {
	description: string
	name: string
}

export interface UpdateStory {
  description?: string
	name?: string
}

const create = async (data: CreateStory, email: string) => {
	const id = (await user.getByEmail(email))?.id
	if (!id) throw new Error('User not found')
	return prisma.story.create({
		data: { ...data, userId: id },
	})
}

const deleteById = async (id: number) =>
	prisma.story.delete({
		where: { id },
	})

const deleteByName = async (name: string, email: string) => {
	const id = (await user.getByEmail(email))?.id
	return prisma.story.delete({ where: { name, userId: id } })
}

// doesn't currently get stories by proximity
// TODO: implement proximity
const getAllByProximity = () => prisma.story.findMany()

const getAllByUser = async (email: string) => {
	const id = (await user.getByEmail(email))?.id
	return prisma.story.findMany({ where: { userId: id } })
}

const getByName = async (name: string, email: string) => {
	const id = (await user.getByEmail(email))?.id
	return prisma.story.findUnique({
		where: { name, userId: id },
	})
}

const updateById = (id: number, data: UpdateStory) =>
	prisma.story.update({ where: { id }, data })

export {
	create,
	deleteById,
	deleteByName,
	getAllByProximity,
	getAllByUser,
	getByName,
	updateById
}
