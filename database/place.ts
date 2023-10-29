'use server'

import { user } from 'database'
import prisma from 'lib/prisma'

interface CreateData extends UpdateData {
	location: number[]
	name: string
}

interface UpdateData {
	description?: string
	location?: number[]
	hasBeenVisited?: boolean
	name?: string
	rating?: number
}

const create = async (data: CreateData, email: string) => {
	const { id } = (await user.getByEmail(email)) || {}
	if (!id) throw new Error('User not found')
	await prisma.place.create({ data: { ...data, userId: id } })
}

const deleteById = (id: number) =>
	prisma.place.delete({
		where: { id },
	})

const deleteByName = async (email: string, name: string) => {
	const { id } = (await user.getByEmail(email)) || {}
	await prisma.place.delete({ where: { userId: id, name } })
}

const getAllByUser = async (email: string) =>
	(await user.getByEmail(email)).places

const getByName = (name: string, userId: number) =>
	prisma.place.findUnique({
		where: { name, userId },
	})

const updateById = (id: number, data: UpdateData) =>
	prisma.place.update({
		where: { id },
		data,
	})

export { create, deleteById, deleteByName, getAllByUser, getByName, updateById }
