import { Module } from '@nestjs/common';
import { SendRequestUsecase } from '../usecase/sendRequest.usecase';
import {
  COUPLE_REPOSITORY,
  REQUEST_REPOSITORY,
  USER_REPOSITORY,
} from '../const/user.token';
import { RequestRepository } from '../infra/request.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from '../infra/user.repository';
import { CoupleRepository } from '../infra/couple.repository';
import { RequestResolver } from '../adapters/resolver/request.resolver';
import { AuthModule } from 'src/context/Auth/auth.module';

const externalContext = [AuthModule];

const exportProviders = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: COUPLE_REPOSITORY,
    useClass: CoupleRepository,
  },
  {
    provide: REQUEST_REPOSITORY,
    useClass: RequestRepository,
  },
];

@Module({
  imports: [...externalContext],
  providers: [
    RequestResolver,
    SendRequestUsecase,
    PrismaService,
    ...exportProviders,
  ],
  exports: [...exportProviders],
})
export class RequestModule {}
