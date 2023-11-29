'use server'

import prisma from 'lib/prisma'
import { user, chapters } from 'database'

const markChapterAsComplete = async (email: string, chapterId: number) => {
  const userRecord = await user.getByEmail(email)
  if (!userRecord) throw new Error('User not found')

  const chapter = await chapters.getById(chapterId)
  if (!chapter) throw new Error('Chapter not found')

  return prisma.completedChapter.create({
    data: {
      userId: userRecord.id,
      chapterId: chapter.id,
    }
  })
}

const getCompletedChapters = async (email: string) => {
  const userRecord = await user.getByEmail(email)
  if (!userRecord) throw new Error('User not found')

  return prisma.completedChapter.findMany({
    where: { userId: userRecord.id },
  })
}

// completedChapters + next incomplete chapter based on order
// if no next incomplete chapter, return first chapter
// TODO: verify this works as expecteds
const getSortedChapters = async (email: string) => {
  const allChapters = await chapters.getAllFirstChapters()
  const allChapterIds = allChapters.map((chapter) => chapter.id)

  const completedChapters = await getCompletedChapters(email)

  const completedChapterIds = completedChapters.map((chapter) => chapter.chapterId)
  const incompleteChapterIds = allChapterIds.filter((id) => !completedChapterIds.includes(id))

  // check in next chapter
  // const nextChapter = await chapters.getByOrder(1)

  return {
    incompleteChapterIds: incompleteChapterIds,
    completedChapterIds: completedChapterIds,
  }
}

export { markChapterAsComplete, getCompletedChapters, getSortedChapters }