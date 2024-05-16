import { PrismaClient } from '@prisma/client';
import { user } from './user';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await user();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
