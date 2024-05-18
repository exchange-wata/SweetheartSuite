import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { UserModel } from '../domain/model/user.model';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async getLoginUserName(mailaddress: string): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({
      where: { mailaddress },
    });

    return UserModel.create(user);
  }
}
