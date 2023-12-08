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
	question?: string
}

// TODO: Return only chapters within a certain distance of the user
const create = async (data: CreateChapter) => prisma.chapter.create({ data })

const deleteById = (id: number) =>
	prisma.chapter.delete({
		where: { id },
	})

const deleteAllByStoryId = async (storyId: number) => prisma.chapter.deleteMany({ where: { storyId } })

const getAll = async () => prisma.chapter.findMany()

const getByOrder = async (order: number) => prisma.chapter.findMany({ where: { order } })

const getByOrderAndStoryId = async (order: number, storyId: number) => prisma.chapter.findUnique({
	where: { order_storyId: { order, storyId } }
})

const getAllByStoryId = async (storyId: number) =>
	prisma.chapter.findMany({ where: { storyId } })

const getById = (id: number) => prisma.chapter.findUnique({ where: { id } })

const updateById = (id: number, data: UpdateChapter) =>
	prisma.chapter.update({
		where: { id },
		data,
	})

const verifyPasscode = async (chapterId: number, passcode: string) => {
	const chapter = await getById(chapterId)
	if (!chapter) throw new Error('Chapter not found')

	if (chapter.passcode !== passcode) return null

	return chapter.secretText
}

export { create, deleteById, deleteAllByStoryId, getAll, getByOrder, getByOrderAndStoryId, getAllByStoryId, getById, updateById, verifyPasscode }
