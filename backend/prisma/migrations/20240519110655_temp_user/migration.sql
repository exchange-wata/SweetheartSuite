-- CreateTable
CREATE TABLE "user"."TempUser" (
    "id" TEXT NOT NULL,
    "mailaddress" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TempUser_pkey" PRIMARY KEY ("id")
);
