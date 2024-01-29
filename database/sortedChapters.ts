'use server'

import prisma from 'lib/prisma'
import { user, chapters } from 'database'

export interface Chapter {
	id: number
	description: string
	details: string
	latitude: number
	longitude: number
	name: string
	passcode: string | null
	order: number
	secretText: string | null
	storyId: number
	question: string | null
	story?: {
		description: string
		name: string
	}

	hasBeenCompleted?: boolean
}

const checkIfChapterIsCompleted = async (email: string, chapterId: number) => {
	const userRecord = await user.getByEmail(email)
	if (!userRecord) throw new Error('User not found')

	return prisma.completedChapter.findUnique({
		where: {
			chapterId_userId: { userId: userRecord.id, chapterId },
		},
		include: { chapter: true },
	})
}

const getCompletedChapters = async (email: string) => {
	const userRecord = await user.getByEmail(email)
	if (!userRecord) throw new Error('User not found')

	return prisma.completedChapter.findMany({
		where: { userId: userRecord.id },
		include: {
			chapter: {
				include: { story: true },
			},
		},
	})
}

export interface SortedChapters {
	completedChapters: Chapter[]
	incompleteChapters: Chapter[]
}

interface CompletedChapter {
	id: number
	chapterId: number
	userId: number
	chapter: Chapter
}

// all completed stories + next incomplete chapter based on order
const getSortedChapters = async (email: string): Promise<SortedChapters> => {
	const allFirstChapters: Chapter[] = await chapters.getByOrder(0)

	const completedChapters: CompletedChapter[] =
		await getCompletedChapters(email)
	// if no completed stories, return first chapters of all stories
	if (completedChapters.length === 0) {
		return {
			completedChapters: [],
			incompleteChapters: allFirstChapters,
		}
	}

	const incompleteChapters: Chapter[] = []
	await Promise.all(
		allFirstChapters.map(async (chapter) => {
			const isChapterCompleted = completedChapters.find(
				({ id }) => id === chapter.id,
			)

			if (!isChapterCompleted) return incompleteChapters.push(chapter)

			const nextChapter = await chapters.getByOrderAndStoryId(
				chapter.order + 1,
				chapter.storyId,
			)

			if (!nextChapter) return

			const isNextChapterCompleted = completedChapters.find(
				({ id }) => id === nextChapter.id,
			)

			if (!isNextChapterCompleted) incompleteChapters.push(nextChapter)
		}),
	)

	return {
		completedChapters: completedChapters.map(({ chapter }) => chapter),
		incompleteChapters,
	}
}

const markChapterAsComplete = async (email: string, chapterId: number) => {
	const userRecord = await user.getByEmail(email)
	if (!userRecord) throw new Error('User not found')

	const chapter = await chapters.getById(chapterId)
	if (!chapter) throw new Error('Chapter not found')

	return prisma.completedChapter.create({
		data: {
			userId: userRecord.id,
			chapterId: chapter.id,
		},
	})
}

export {
	checkIfChapterIsCompleted,
	getCompletedChapters,
	getSortedChapters,
	markChapterAsComplete,
}
