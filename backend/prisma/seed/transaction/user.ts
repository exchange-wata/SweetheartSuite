import { PrismaClient } from '@prisma/client';
const crypto = require('crypto');
const prisma = new PrismaClient();

export const user = async () => {
  const users = Array(10)
    .fill(0)
    .map((_, i) => ({
      id: crypto.randomUUID(),
      name: `name${i + 1}`,
      mailaddress: `email${i + 1}@gmail.com`,
    }));
  await prisma.user.createMany({ data: users });

  return users;
};
