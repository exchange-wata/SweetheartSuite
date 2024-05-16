import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const user = async () => {
  await prisma.user.createMany({
    data: Array(10)
      .fill(0)
      .map((v, i) => ({
        id: i + 1,
        name: `name${i + 1}`,
        mailaddress: `email${i + 1}@gmail.com`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
  });
};