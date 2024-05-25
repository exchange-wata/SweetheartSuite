import { Injectable } from '@nestjs/common';
import { CoupleRepositoryInterface } from '../domain/interface/couple.repository.interface';
import { CoupleModel } from '../domain/model/couple.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoupleRepository implements CoupleRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<CoupleModel[]> {
    const couple = await this.prisma.couple.findMany({
      where: {
        OR: [{ userId1: userId }, { userId2: userId }],
      },
    });

    return couple.map((v) => CoupleModel.create(v));
  }
}
