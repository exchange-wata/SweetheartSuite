import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TempUserRepositoryInterface } from '../domain/interface/tempUserRepositoryInterface.repository.interface';
import { TempUserModel } from '../domain/model/tempUser.mode';

@Injectable()
export class TempUserRepository implements TempUserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(mailaddress: string): Promise<TempUserModel> {
    const tempUser = await this.prisma.tempUser.create({
      data: {
        mailaddress,
        token: '1398yr93r9cnwo1831nci3yn9',
      },
    });

    return TempUserModel.create(tempUser);
  }
}
