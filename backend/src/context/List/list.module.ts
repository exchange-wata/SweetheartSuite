import { Module } from '@nestjs/common';
import { AuthModule } from '../Auth/auth.module';
import { CoupleResolver } from '../User/adapters/resolver/couple.resolver';
import { ListResolver } from './adapters/resolver/list.resolver';
import { LIST_REPOSITORY } from './const/list.token';
import { ListRepository } from './infra/list.repository';
import { CreateListUsecase } from './usecase/createList.usecase';

@Module({
  imports: [AuthModule],
  providers: [
    CoupleResolver,
    ListResolver,
    CreateListUsecase,
    { provide: LIST_REPOSITORY, useClass: ListRepository },
  ],
})
export class ListModule {}
