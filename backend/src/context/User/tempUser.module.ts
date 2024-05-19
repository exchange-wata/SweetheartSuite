import { PrismaService } from 'src/prisma/prisma.service';
import { TEMP_USER_REPOSITORY } from './const/user.token';
import { TempUserRepository } from './infra/tempUser.repository';
import { CreateTempUserUsecase } from './usecase/createTempUserUsecase.usecase';
import { Module } from '@nestjs/common';
import { TempUserResolver } from './adapters/resolver/tempUser.resolver';

@Module({
  providers: [
    TempUserResolver,
    CreateTempUserUsecase,
    { provide: TEMP_USER_REPOSITORY, useClass: TempUserRepository },
    PrismaService,
  ],
})
export class TempUserModule {}
