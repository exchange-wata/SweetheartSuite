import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../interfase/user.repository.interfase';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async getLoginUserName(mailaddress: string): Promise<string> {
    const userName = await this.prisma.user.findUnique({
      where: { mailaddress },
      select: {
        name: true,
      },
    });

    return userName.name;
  }
}
