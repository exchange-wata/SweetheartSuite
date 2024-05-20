import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TempUserRepositoryInterface } from '../domain/interface/tempUserRepositoryInterface.repository.interface';
import { TempUserModel } from '../domain/model/tempUser.model';

@Injectable()
export class TempUserRepository implements TempUserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(mailaddress: string, token: string): Promise<TempUserModel> {
    const tempUser = await this.prisma.tempUser.create({
      data: {
        mailaddress,
        token,
      },
    });

    return TempUserModel.create(tempUser);
  }
}
