import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../Auth/auth.module';
import { UserResolver } from './adapters/resolver/user.resolver';
import { COUPLE_REPOSITORY, USER_REPOSITORY } from './const/user.token';
import { UserRepository } from './infra/user.repository';
import { CoupleModule } from './module/couple.module';
import { RequestModule } from './module/request.module';
import { TempUserModule } from './module/tempUser.module';
import { CreateUserUsecase } from './usecase/createUser.usecase';
import { GetUserByMailaddressUsecase } from './usecase/getUserByMailaddress.usecase';
import { LoginUsecase } from './usecase/login.usecase';
import { CoupleRepository } from './infra/couple.repository';

const externalContext = [AuthModule];
@Module({
  imports: [TempUserModule, RequestModule, CoupleModule, ...externalContext],
  providers: [
    UserResolver,
    GetUserByMailaddressUsecase,
    LoginUsecase,
    CreateUserUsecase,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: COUPLE_REPOSITORY, useClass: CoupleRepository },
    PrismaService,
  ],
})
export class UserModule {}
