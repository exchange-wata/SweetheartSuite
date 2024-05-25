import { PrismaClient } from '@prisma/client';
import { couple } from './couple';
import { user } from './user';

export type UserSeedType = {
  id: string;
  name: string;
  mailaddress: string;
};

const prisma = new PrismaClient();

export async function transaction() {
  await prisma.couple.deleteMany();
  await prisma.user.deleteMany();

  const users = await user();
  await couple(chunkUsersForCouple(users));
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
