import { Injectable } from '@nestjs/common';
import { pipe } from 'effect';
import { andThen, tryPromise } from 'effect/Effect';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserErrorMessage } from '../const/errorMessage/user.errorMessage';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { UserModel } from '../domain/model/user.model';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  getUserByMailaddress = (mailaddress: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.user.findUniqueOrThrow({
            where: { mailaddress },
          }),
        catch: () =>
          ({ _tag: UserErrorMessage.GET_USER_BY_MAILADDRESS }) as const,
      }),
      andThen(UserModel.create),
    );

  create = (name: string, mailaddress: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.user.create({
            data: {
              name,
              mailaddress,
            },
          }),
        catch: () => ({ _tag: UserErrorMessage.CREATE }) as const,
      }),
      andThen(UserModel.create),
    );

  findByUserId = (id: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.user.findUniqueOrThrow({
            where: { id },
          }),
        catch: () => ({ _tag: UserErrorMessage.FIND_BY_USER_ID }) as const,
      }),
      andThen(UserModel.create),
    );
}
