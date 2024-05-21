/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `TempUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TempUser_token_key" ON "user"."TempUser"("token");
