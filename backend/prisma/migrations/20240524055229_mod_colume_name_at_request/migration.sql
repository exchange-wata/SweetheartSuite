/*
  Warnings:

  - You are about to drop the column `from` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Request` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fromUserId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[toUserId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fromUserId` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user"."Request" DROP CONSTRAINT "Request_from_fkey";

-- DropForeignKey
ALTER TABLE "user"."Request" DROP CONSTRAINT "Request_to_fkey";

-- DropIndex
DROP INDEX "user"."Request_from_key";

-- DropIndex
DROP INDEX "user"."Request_to_key";

-- AlterTable
ALTER TABLE "user"."Request" DROP COLUMN "from",
DROP COLUMN "to",
ADD COLUMN     "fromUserId" TEXT NOT NULL,
ADD COLUMN     "toUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Request_fromUserId_key" ON "user"."Request"("fromUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Request_toUserId_key" ON "user"."Request"("toUserId");

-- AddForeignKey
ALTER TABLE "user"."Request" ADD CONSTRAINT "Request_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "user"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Request" ADD CONSTRAINT "Request_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "user"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
