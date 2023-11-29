/*
  Warnings:

  - You are about to drop the `CompletedChapters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InProgressChapters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedStories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChapterToCompletedChapters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChapterToInProgressChapters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SavedStoriesToStory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompletedChapters" DROP CONSTRAINT "CompletedChapters_completedById_fkey";

-- DropForeignKey
ALTER TABLE "InProgressChapters" DROP CONSTRAINT "InProgressChapters_inProgressById_fkey";

-- DropForeignKey
ALTER TABLE "SavedStories" DROP CONSTRAINT "SavedStories_savedById_fkey";

-- DropForeignKey
ALTER TABLE "_ChapterToCompletedChapters" DROP CONSTRAINT "_ChapterToCompletedChapters_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChapterToCompletedChapters" DROP CONSTRAINT "_ChapterToCompletedChapters_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChapterToInProgressChapters" DROP CONSTRAINT "_ChapterToInProgressChapters_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChapterToInProgressChapters" DROP CONSTRAINT "_ChapterToInProgressChapters_B_fkey";

-- DropForeignKey
ALTER TABLE "_SavedStoriesToStory" DROP CONSTRAINT "_SavedStoriesToStory_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedStoriesToStory" DROP CONSTRAINT "_SavedStoriesToStory_B_fkey";

-- DropTable
DROP TABLE "CompletedChapters";

-- DropTable
DROP TABLE "InProgressChapters";

-- DropTable
DROP TABLE "SavedStories";

-- DropTable
DROP TABLE "_ChapterToCompletedChapters";

-- DropTable
DROP TABLE "_ChapterToInProgressChapters";

-- DropTable
DROP TABLE "_SavedStoriesToStory";

-- CreateTable
CREATE TABLE "ChapterProgress" (
    "id" SERIAL NOT NULL,
    "chapterId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isSaved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ChapterProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChapterProgress_chapterId_userId_key" ON "ChapterProgress"("chapterId", "userId");

-- AddForeignKey
ALTER TABLE "ChapterProgress" ADD CONSTRAINT "ChapterProgress_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterProgress" ADD CONSTRAINT "ChapterProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
