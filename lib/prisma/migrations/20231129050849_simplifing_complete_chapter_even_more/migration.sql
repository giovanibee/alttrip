/*
  Warnings:

  - You are about to drop the `ChapterProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChapterProgress" DROP CONSTRAINT "ChapterProgress_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "ChapterProgress" DROP CONSTRAINT "ChapterProgress_userId_fkey";

-- DropTable
DROP TABLE "ChapterProgress";

-- CreateTable
CREATE TABLE "CompletedChapter" (
    "chapterId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CompletedChapter_pkey" PRIMARY KEY ("chapterId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompletedChapter_chapterId_userId_key" ON "CompletedChapter"("chapterId", "userId");

-- AddForeignKey
ALTER TABLE "CompletedChapter" ADD CONSTRAINT "CompletedChapter_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedChapter" ADD CONSTRAINT "CompletedChapter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
