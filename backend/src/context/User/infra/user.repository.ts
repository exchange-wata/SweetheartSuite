import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { UserModel } from '../domain/model/user.model';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByMailaddress(mailaddress: string): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({
      where: { mailaddress },
    });

    return UserModel.create(user);
  }

  async create(name: string, mailaddress: string): Promise<UserModel> {
    const user = await this.prisma.user.create({
      data: {
        name,
        mailaddress,
      },
    });

    return UserModel.create(user);
  }

  async findByUserId(id: string): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return UserModel.create(user);
  }
}
