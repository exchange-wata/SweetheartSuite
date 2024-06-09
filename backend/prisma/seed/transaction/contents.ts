import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

type ListSeedType = {
  id: string;
};

const prisma = new PrismaClient();

export const contents = async (lists: ListSeedType[]) => {
  const contents = lists.map((list) => ({
    id: crypto.randomUUID(),
    listId: list.id,
    content: 'テスト',
    isDone: false,
  }));

  await prisma.contents.createMany({
    data: contents,
  });

  return contents;
};
