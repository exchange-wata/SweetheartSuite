import { Module } from '@nestjs/common';
import { UserResolver } from './adapters/resolver/user.resolver';
import { UserRepository } from './infra/user.repository';
import { USER_REPOSITORY } from './const/user.token';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUserByMailaddressUsecase } from './usecase/getUserByMailaddress.usecase';

@Module({
  providers: [
    UserResolver,
    GetUserByMailaddressUsecase,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    PrismaService,
  ],
})
export class UserModule {}
