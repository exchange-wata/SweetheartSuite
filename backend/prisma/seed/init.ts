import { PrismaClient } from '@prisma/client';
import { master } from './master/master';
import { transaction } from './transaction/transaction';

const prisma = new PrismaClient();

async function main() {
  await transaction();
  await master();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
