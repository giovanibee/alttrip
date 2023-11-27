/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_phoneNumber_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneNumber",
ALTER COLUMN "email" SET NOT NULL;
