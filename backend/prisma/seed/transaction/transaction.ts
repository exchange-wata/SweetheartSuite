import { PrismaClient } from '@prisma/client';
import { contents } from './contents';
import { couple } from './couple';
import { list } from './list';
import { user } from './user';

export type UserSeedType = {
  id: string;
  name: string;
  mailaddress: string;
};

const prisma = new PrismaClient();

export async function transaction() {
  // list schema
  await prisma.contents.deleteMany();
  await prisma.list.deleteMany();

  // user schema
  await prisma.request.deleteMany();
  await prisma.couple.deleteMany();
  await prisma.user.deleteMany();

  // user schema
  const users = await user();
  const couples = await couple(chunkUsersForCouple(users));

  // list schema
  const lists = await list(couples);
  const listIds = lists.map((list) => ({ id: list.id }));
  await contents(listIds);
}

transaction()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

const chunkUsersForCouple = (users: UserSeedType[]): UserSeedType[][] => {
  const chunkUsers = [];
  for (let i = 0; i < users.length; i += 2) {
    const chunk = users.slice(i, i + 2);
    chunkUsers.push(chunk);
  }

  return chunkUsers;
};
