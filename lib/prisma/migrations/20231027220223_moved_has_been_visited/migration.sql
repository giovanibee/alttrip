/*
  Warnings:

  - You are about to drop the column `hasBeenVisited` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "hasBeenVisited" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "hasBeenVisited";
