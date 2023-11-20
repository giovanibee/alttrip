/*
  Warnings:

  - A unique constraint covering the columns `[order,storyId]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chapter_order_storyId_key" ON "Chapter"("order", "storyId");
