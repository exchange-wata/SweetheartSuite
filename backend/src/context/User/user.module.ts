import { Module } from '@nestjs/common';
import { UserResolver } from './resolver/user.resolver';
import { GetLoginUserNameUsecase } from './usecase/getLoginUserName.usecase';
import { UserRepository } from './infra/user.repository';
import { USER_REPOSITORY } from './const/user.token';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [
    UserResolver,
    GetLoginUserNameUsecase,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    PrismaClient,
  ],
})
export class UserModule {}
