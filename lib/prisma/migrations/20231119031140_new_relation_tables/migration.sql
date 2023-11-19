/*
  Warnings:

  - You are about to drop the `Place` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_userId_fkey";

-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_questId_fkey";

-- DropTable
DROP TABLE "Place";

-- DropTable
DROP TABLE "Quest";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "savedStoriesSavedById" INTEGER,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New Task',
    "passcode" TEXT,
    "order" INTEGER NOT NULL,
    "secretText" TEXT,
    "storyId" INTEGER NOT NULL,
    "completedChaptersCompletedById" INTEGER NOT NULL,
    "inProgressChaptersInProgressById" INTEGER,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletedChapters" (
    "completedChapterId" INTEGER NOT NULL,
    "completedById" INTEGER NOT NULL,

    CONSTRAINT "CompletedChapters_pkey" PRIMARY KEY ("completedById")
);

-- CreateTable
CREATE TABLE "InProgressChapters" (
    "inProgressChapterId" INTEGER NOT NULL,
    "inProgressById" INTEGER NOT NULL,

    CONSTRAINT "InProgressChapters_pkey" PRIMARY KEY ("inProgressById")
);

-- CreateTable
CREATE TABLE "SavedStories" (
    "savedStoryId" INTEGER NOT NULL,
    "savedById" INTEGER NOT NULL,

    CONSTRAINT "SavedStories_pkey" PRIMARY KEY ("savedById")
);

-- CreateIndex
CREATE UNIQUE INDEX "Story_userId_key" ON "Story"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Story_name_userId_key" ON "Story"("name", "userId");

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_savedStoriesSavedById_fkey" FOREIGN KEY ("savedStoriesSavedById") REFERENCES "SavedStories"("savedById") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_completedChaptersCompletedById_fkey" FOREIGN KEY ("completedChaptersCompletedById") REFERENCES "CompletedChapters"("completedById") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_inProgressChaptersInProgressById_fkey" FOREIGN KEY ("inProgressChaptersInProgressById") REFERENCES "InProgressChapters"("inProgressById") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedChapters" ADD CONSTRAINT "CompletedChapters_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InProgressChapters" ADD CONSTRAINT "InProgressChapters_inProgressById_fkey" FOREIGN KEY ("inProgressById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedStories" ADD CONSTRAINT "SavedStories_savedById_fkey" FOREIGN KEY ("savedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
