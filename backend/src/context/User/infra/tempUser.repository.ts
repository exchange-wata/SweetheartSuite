import { Injectable } from '@nestjs/common';
import { pipe } from 'effect';
import { andThen, tryPromise } from 'effect/Effect';
import { PrismaService } from 'src/prisma/prisma.service';
import { TempUserErrorMessage } from '../const/errorMessage/tempUser.errorMessage';
import { TempUserRepositoryInterface } from '../domain/interface/tempUser.repository.interface';
import { TempUserModel } from '../domain/model/tempUser.model';

@Injectable()
export class TempUserRepository implements TempUserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  create = (mailaddress: string, token: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.tempUser.create({
            data: {
              mailaddress,
              token,
            },
          }),
        catch: () => ({ _tag: TempUserErrorMessage.CREATE }) as const,
      }),
      andThen(TempUserModel.create),
    );

  findByToken = (token: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.tempUser.findUniqueOrThrow({
            where: { token },
          }),
        catch: () => ({ _tag: TempUserErrorMessage.FIND_BY_TOKEN }) as const,
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
      catch: () => ({ _tag: TempUserErrorMessage.DELETE_MANY }) as const,
    });
}
