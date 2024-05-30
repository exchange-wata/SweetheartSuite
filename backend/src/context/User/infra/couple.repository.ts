import { Injectable } from '@nestjs/common';
import { pipe } from 'effect';
import { andThen, tryPromise } from 'effect/Effect';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoupleErrorMessage } from '../const/errorMessage/couple.errorMessage';
import { CoupleRepositoryInterface } from '../domain/interface/couple.repository.interface';
import { CoupleModel } from '../domain/model/couple.model';

@Injectable()
export class CoupleRepository implements CoupleRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  findByUserId = (userId: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.couple.findMany({
            where: {
              OR: [{ userId1: userId }, { userId2: userId }],
            },
          }),
        catch: () => ({ _tag: CoupleErrorMessage.FIND_BY_USER_ID }) as const,
      }),
      andThen((couples) => couples.map((v) => CoupleModel.create(v))),
    );

  async create(userId1: string, userId2: string): Promise<CoupleModel> {
    const couple = await this.prisma.couple.create({
      data: { userId1, userId2 },
    });

    return CoupleModel.create(couple);
  }
}
