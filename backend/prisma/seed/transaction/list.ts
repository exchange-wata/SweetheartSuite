import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

type CoupleSeedType = {
  id: string;
  userId1: string;
  userId2: string;
};

const prisma = new PrismaClient();

export const list = async (couples: CoupleSeedType[]) => {
  const lists = couples.map((couple) => {
    return {
      id: crypto.randomUUID(),
      coupleId: couple.id,
    };
  });
  await prisma.list.createMany({
    data: lists,
  });

  return lists;
};
