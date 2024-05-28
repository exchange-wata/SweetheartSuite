import { Injectable } from '@nestjs/common';
import { pipe } from 'effect';
import { Effect, andThen, tryPromise } from 'effect/Effect';
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

  create = (
    name: string,
    mailaddress: string,
  ): Effect<UserModel, { _tag: string }> =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.user.create({
            data: {
              name,
              mailaddress,
            },
          }),
        catch: () => ({ _tag: 'can not create user' }) as const,
      }),
      andThen(UserModel.create),
    );

  async findByUserId(id: string): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return UserModel.create(user);
  }
}
