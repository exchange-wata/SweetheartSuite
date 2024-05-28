import { Injectable } from '@nestjs/common';
import { pipe } from 'effect';
import { Effect, andThen, tryPromise } from 'effect/Effect';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BatchPayload,
  TempUserRepositoryInterface,
} from '../domain/interface/tempUser.repository.interface';
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

  findByToken = (token: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.tempUser.findUniqueOrThrow({
            where: { token },
          }),
        catch: () => ({ _tag: 'temp user not found' }) as const,
      }),
      andThen(TempUserModel.create),
    );

  deleteMany = (mailaddress: string) =>
    tryPromise({
      try: () =>
        this.prisma.tempUser.deleteMany({
          where: {
            mailaddress: {
              equals: mailaddress,
            },
          },
        }),
      catch: () => ({ _tag: 'can not delete temp user' }) as const,
    });
}
