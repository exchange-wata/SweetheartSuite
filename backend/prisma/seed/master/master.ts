import { PrismaClient } from '@prisma/client';
import { requestType } from './requestType';

const prisma = new PrismaClient();

export async function master() {
  await prisma.requestType.deleteMany();

  await requestType();
}

master()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
