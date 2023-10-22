-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('INSTANT', 'EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "deadline" TIMESTAMP(3),
    "description" TEXT,
    "difficulty" "Difficulty" NOT NULL,
    "minutesSpent" INTEGER DEFAULT 0,
    "questId" INTEGER,
    "title" TEXT NOT NULL DEFAULT 'New Task',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuestToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Quest_userId_key" ON "Quest"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_title_userId_key" ON "Quest"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_userId_key" ON "Tag"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_userId_key" ON "Tag"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_questId_key" ON "Task"("questId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_title_questId_key" ON "Task"("title", "questId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestToTag_AB_unique" ON "_QuestToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestToTag_B_index" ON "_QuestToTag"("B");

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestToTag" ADD CONSTRAINT "_QuestToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestToTag" ADD CONSTRAINT "_QuestToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
