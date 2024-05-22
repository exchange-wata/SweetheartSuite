-- CreateTable
CREATE TABLE "user"."Request" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."RequestType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RequestType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_from_key" ON "user"."Request"("from");

-- CreateIndex
CREATE UNIQUE INDEX "Request_to_key" ON "user"."Request"("to");

-- AddForeignKey
ALTER TABLE "user"."Request" ADD CONSTRAINT "Request_from_fkey" FOREIGN KEY ("from") REFERENCES "user"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Request" ADD CONSTRAINT "Request_to_fkey" FOREIGN KEY ("to") REFERENCES "user"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Request" ADD CONSTRAINT "Request_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "user"."RequestType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
