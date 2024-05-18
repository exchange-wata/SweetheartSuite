-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "list";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user";

-- CreateTable
CREATE TABLE "user"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mailaddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mailaddress_key" ON "user"."User"("mailaddress");
