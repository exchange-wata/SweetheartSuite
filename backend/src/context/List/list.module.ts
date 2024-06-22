import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../Auth/auth.module';
import { COUPLE_REPOSITORY } from '../User/const/user.token';
import { CoupleRepository } from '../User/infra/couple.repository';
import { GetCoupleUsecase } from '../User/usecase/getCouple.usecase';
import { ListResolver } from './adapters/resolver/list.resolver';
import { LIST_REPOSITORY } from './const/list.token';
import { ListRepository } from './infra/list.repository';
import { CreateListUsecase } from './usecase/createList.usecase';
import { UpdateListUsecase } from './usecase/updateList.usecase';

@Module({
  imports: [AuthModule],
  providers: [
    ListResolver,
    CreateListUsecase,
    GetCoupleUsecase,
    UpdateListUsecase,
    PrismaService,
    { provide: LIST_REPOSITORY, useClass: ListRepository },
    { provide: COUPLE_REPOSITORY, useClass: CoupleRepository },
  ],
})
export class ListModule {}
