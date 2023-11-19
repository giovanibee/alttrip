/*
  Warnings:

  - You are about to drop the column `completedChaptersCompletedById` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `inProgressChaptersInProgressById` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `savedStoriesSavedById` on the `Story` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_completedChaptersCompletedById_fkey";

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_inProgressChaptersInProgressById_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_savedStoriesSavedById_fkey";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "completedChaptersCompletedById",
DROP COLUMN "inProgressChaptersInProgressById";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "savedStoriesSavedById";

-- CreateTable
CREATE TABLE "_ChapterToCompletedChapters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ChapterToInProgressChapters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedStoriesToStory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChapterToCompletedChapters_AB_unique" ON "_ChapterToCompletedChapters"("A", "B");

-- CreateIndex
CREATE INDEX "_ChapterToCompletedChapters_B_index" ON "_ChapterToCompletedChapters"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChapterToInProgressChapters_AB_unique" ON "_ChapterToInProgressChapters"("A", "B");

-- CreateIndex
CREATE INDEX "_ChapterToInProgressChapters_B_index" ON "_ChapterToInProgressChapters"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedStoriesToStory_AB_unique" ON "_SavedStoriesToStory"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedStoriesToStory_B_index" ON "_SavedStoriesToStory"("B");

-- AddForeignKey
ALTER TABLE "_ChapterToCompletedChapters" ADD CONSTRAINT "_ChapterToCompletedChapters_A_fkey" FOREIGN KEY ("A") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToCompletedChapters" ADD CONSTRAINT "_ChapterToCompletedChapters_B_fkey" FOREIGN KEY ("B") REFERENCES "CompletedChapters"("completedById") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToInProgressChapters" ADD CONSTRAINT "_ChapterToInProgressChapters_A_fkey" FOREIGN KEY ("A") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToInProgressChapters" ADD CONSTRAINT "_ChapterToInProgressChapters_B_fkey" FOREIGN KEY ("B") REFERENCES "InProgressChapters"("inProgressById") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedStoriesToStory" ADD CONSTRAINT "_SavedStoriesToStory_A_fkey" FOREIGN KEY ("A") REFERENCES "SavedStories"("savedById") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedStoriesToStory" ADD CONSTRAINT "_SavedStoriesToStory_B_fkey" FOREIGN KEY ("B") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
