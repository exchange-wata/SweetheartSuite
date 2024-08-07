import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
import { UserSeedType } from './transaction';

const prisma = new PrismaClient();

export const couple = async (users: UserSeedType[][]) => {
  const couples = users.map((couple) => ({
    id: crypto.randomUUID(),
    userId1: couple[0]?.id ?? '',
    userId2: couple[1]?.id ?? '',
  }));

  await prisma.couple.createMany({
    data: couples,
  });

  return couples;
};
