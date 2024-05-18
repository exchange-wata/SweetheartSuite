import { Module } from '@nestjs/common';
import { UserResolver } from './resolver/user.resolver';
import { GetLoginUserNameUsecase } from './usecase/getLoginUserName.usecase';
import { UserRepository } from './infra/user.repository';
import { USER_REPOSITORY } from './const/user.token';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    UserResolver,
    GetLoginUserNameUsecase,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    PrismaService,
  ],
})
export class UserModule {}
