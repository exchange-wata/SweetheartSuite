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

  async getUserByMailaddress(mailaddress: string): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({
      where: { mailaddress },
    });

    return UserModel.create(user);
  }

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

  async findByUserId(id: string): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return UserModel.create(user);
  }
}
