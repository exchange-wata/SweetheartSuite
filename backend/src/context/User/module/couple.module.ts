import { Module } from '@nestjs/common';
import { AuthModule } from 'src/context/Auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoupleResolver } from '../adapters/resolver/couple.resolver';
import { COUPLE_REPOSITORY, REQUEST_REPOSITORY } from '../const/user.token';
import { CoupleRepository } from '../infra/couple.repository';
import { RequestRepository } from '../infra/request.repository';
import { CreateCoupleUsecase } from '../usecase/createCouple.usecase';
import { GetCoupleUsecase } from '../usecase/getCouple.usecase';

@Module({
  imports: [AuthModule],
  providers: [
    CoupleResolver,
    CreateCoupleUsecase,
    GetCoupleUsecase,
    { provide: COUPLE_REPOSITORY, useClass: CoupleRepository },
    { provide: REQUEST_REPOSITORY, useClass: RequestRepository },
    PrismaService,
  ],
})
export class CoupleModule {}
