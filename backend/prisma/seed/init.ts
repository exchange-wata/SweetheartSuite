import { PrismaClient } from '@prisma/client';
import { user } from './user';
import { couple } from './couple';
import { UserModel } from 'src/context/User/domain/model/user.model';

export type UserSeedType = {
  id: string;
  name: string;
  mailaddress: string;
};

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.couple.deleteMany();

  const users = await user();
  await couple(chunkUsersForCouple(users));
}

main()
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
