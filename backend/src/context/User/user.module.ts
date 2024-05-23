import { Module } from '@nestjs/common';
import { UserResolver } from './adapters/resolver/user.resolver';
import { UserRepository } from './infra/user.repository';
import { USER_REPOSITORY } from './const/user.token';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUserByMailaddressUsecase } from './usecase/getUserByMailaddress.usecase';
import { TempUserModule } from './module/tempUser.module';
import { LoginUsecase } from './usecase/login.usecase';
import { AuthModule } from '../Auth/auth.module';
import { CreateUserUsecase } from './usecase/createUser.usecase';
import { RequestModule } from './module/request.module';

const externalContext = [AuthModule];
@Module({
  imports: [TempUserModule, RequestModule, ...externalContext],
  providers: [
    UserResolver,
    GetUserByMailaddressUsecase,
    LoginUsecase,
    CreateUserUsecase,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    PrismaService,
  ],
})
export class UserModule {}
