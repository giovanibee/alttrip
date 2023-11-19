'use server'

import { user } from 'database'
import prisma from 'lib/prisma'

interface CreateChapter {
	description: string
	details: string
	latitude: number
	longitude: number
	name: string
  passcode?: string
  order: number
  secretText?:  string
  storyId: number
}

// TODO: allow for updating of order (and maybe story) later
interface UpdateChapter extends CreateChapter {
	description?: string
	details?: string
	latitude?: number
	longitude?: number
	name?: string
  passcode?: string
  secretText?:  string
}

// TODO: Return only chapters within a certain distance of the user
// TODO (SOON): Return only chapters that the user is allowed to see (correct order, etc.) using filter options

const create = async (data: CreateChapter) => {
	await prisma.chapter.create({ data })
}

const deleteById = (id: number) =>
	prisma.chapter.delete({
		where: { id },
	})

const deleteAllByStoryId = async (storyId: number) => {
	await prisma.chapter.deleteMany({ where: { storyId } })
}

const getAllByUser = async (email: string) =>
	(await user.getByEmail(email)).chapters

const getByName = (name: string, userId: number) =>
	prisma.chapter.findUnique({
		where: { name, userId },
	})

const updateById = (id: number, data: Chapter) =>
	prisma.chapter.update({
		where: { id },
		data,
	})

export { create, deleteById, deleteAllByStoryId, getAllByUser, getByName, updateById }
