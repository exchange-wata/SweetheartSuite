/*
  Warnings:

  - You are about to drop the column `mailadress` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mailaddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mailaddress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_mailadress_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "mailadress",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "mailaddress" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_mailaddress_key" ON "User"("mailaddress");
