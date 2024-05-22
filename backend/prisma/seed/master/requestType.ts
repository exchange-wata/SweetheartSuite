import { PrismaClient } from '@prisma/client';
const crypto = require('crypto');
const prisma = new PrismaClient();

export const requestType = async () => {
  const requestTypes = [
    { id: 1, name: '送信済み' },
    { id: 2, name: '承認' },
    { id: 3, name: '拒否' },
  ];
  await prisma.requestType.createMany({ data: requestTypes });
};
