/*
  Warnings:

  - A unique constraint covering the columns `[name,storyId]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_completedChaptersCompletedById_fkey";

-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "completedChaptersCompletedById" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_name_storyId_key" ON "Chapter"("name", "storyId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_completedChaptersCompletedById_fkey" FOREIGN KEY ("completedChaptersCompletedById") REFERENCES "CompletedChapters"("completedById") ON DELETE SET NULL ON UPDATE CASCADE;
