import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';

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
