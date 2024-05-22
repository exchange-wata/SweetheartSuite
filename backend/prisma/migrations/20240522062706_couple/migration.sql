-- CreateTable
CREATE TABLE "user"."Couple" (
    "id" TEXT NOT NULL,
    "userId1" TEXT NOT NULL,
    "userId2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Couple_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Couple_userId1_key" ON "user"."Couple"("userId1");

-- CreateIndex
CREATE UNIQUE INDEX "Couple_userId2_key" ON "user"."Couple"("userId2");

-- AddForeignKey
ALTER TABLE "user"."Couple" ADD CONSTRAINT "Couple_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "user"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Couple" ADD CONSTRAINT "Couple_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "user"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
