import { PrismaService } from 'src/prisma/prisma.service';
import { TEMP_USER_REPOSITORY } from './const/user.token';
import { TempUserRepository } from './infra/tempUser.repository';
import { CreateTempUserUsecase } from './usecase/createTempUser.usecase';
import { Module } from '@nestjs/common';
import { TempUserResolver } from './adapters/resolver/tempUser.resolver';

const exportProviders = [
  { provide: TEMP_USER_REPOSITORY, useClass: TempUserRepository },
];

@Module({
  providers: [
    TempUserResolver,
    CreateTempUserUsecase,
    PrismaService,
    ...exportProviders,
  ],
  exports: [...exportProviders],
})
export class TempUserModule {}
