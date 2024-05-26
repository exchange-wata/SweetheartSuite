import { Module } from '@nestjs/common';
import { AuthModule } from 'src/context/Auth/auth.module';
import { CoupleResolver } from '../adapters/resolver/couple.resolver';
import { CreateCoupleUsecase } from '../usecase/createCouple.usecase';
import { CoupleRepository } from '../infra/couple.repository';
import { COUPLE_REPOSITORY, REQUEST_REPOSITORY } from '../const/user.token';
import { RequestRepository } from '../infra/request.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AuthModule],
  providers: [
    CoupleResolver,
    CreateCoupleUsecase,
    { provide: COUPLE_REPOSITORY, useClass: CoupleRepository },
    { provide: REQUEST_REPOSITORY, useClass: RequestRepository },
    PrismaService,
  ],
})
export class CoupleModule {}
