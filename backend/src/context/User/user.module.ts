import { Module } from '@nestjs/common';
import { UserResolver } from './adapters/resolver/user.resolver';
import { UserRepository } from './infra/user.repository';
import { USER_REPOSITORY } from './const/user.token';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUserByMailaddressUsecase } from './usecase/getUserByMailaddress.usecase';
import { TempUserModule } from './tempUser.module';

@Module({
  imports: [TempUserModule],
  providers: [
    UserResolver,
    GetUserByMailaddressUsecase,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    PrismaService,
  ],
})
export class UserModule {}
