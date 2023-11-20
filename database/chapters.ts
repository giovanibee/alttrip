'use server'

import prisma from 'lib/prisma'

interface CreateChapter extends UpdateChapter {
	description: string
	details: string
	latitude: number
	longitude: number
	name: string
  order: number
  storyId: number
}

// TODO: allow for updating of order (and maybe story) later
interface UpdateChapter {
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

const create = async (data: CreateChapter) => prisma.chapter.create({ data })

const deleteById = (id: number) =>
	prisma.chapter.delete({
		where: { id },
	})

const deleteAllByStoryId = async (storyId: number) => prisma.chapter.deleteMany({ where: { storyId } })

const getAllByStoryId = async (storyId: number) =>
	prisma.chapter.findMany({ where: { storyId } })

const getById = (id: number) => prisma.chapter.findUnique({ where: { id } })

const getByOrder = (order: number, storyId: number) => prisma.chapter.findUnique({ where: { order, storyId } })

const updateById = (id: number, data: UpdateChapter) =>
	prisma.chapter.update({
		where: { id },
		data,
	})

export { create, deleteById, deleteAllByStoryId, getByOrder, getAllByStoryId, getById, updateById }
