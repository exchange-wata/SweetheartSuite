import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../Auth/auth.module';
import { COUPLE_REPOSITORY } from '../User/const/user.token';
import { CoupleRepository } from '../User/infra/couple.repository';
import { GetCoupleUsecase } from '../User/usecase/getCouple.usecase';
import { ContentsResolver } from './adapters/resolver/contents.resolver';
import { ListResolver } from './adapters/resolver/list.resolver';
import { CONTENTS_REPOSITORY, LIST_REPOSITORY } from './const/list.token';
import { ContentsRepository } from './infra/contents.repository';
import { ListRepository } from './infra/list.repository';
import { ArchiveListUsecase } from './usecase/archiveList.usecase';
import { CreateContentsUsecase } from './usecase/createContents.usecase';
import { CreateListUsecase } from './usecase/createList.usecase';
import { DeleteContentsUsecase } from './usecase/deleteContents.usecase';
import { GetContentsByListIdUsecase } from './usecase/getContentsByListId.usecase';
import { GetListByIdUsecase } from './usecase/getListById.usecase';
import { GetListsUsecase } from './usecase/getLists.usecase';
import { SetCompletedContentsUsecase } from './usecase/setCompletedContents.usecase';
import { SetIncompleteContentsUsecase } from './usecase/setIncompleteContents.usecase';
import { UpdateContentsUsecase } from './usecase/updateContents.usecase';
import { UpdateListUsecase } from './usecase/updateList.usecase';

@Module({
  imports: [AuthModule],
  providers: [
    ListResolver,
    ContentsResolver,
    GetListsUsecase,
    CreateListUsecase,
    GetCoupleUsecase,
    UpdateListUsecase,
    CreateContentsUsecase,
    GetContentsByListIdUsecase,
    UpdateContentsUsecase,
    SetCompletedContentsUsecase,
    SetIncompleteContentsUsecase,
    ArchiveListUsecase,
    DeleteContentsUsecase,
    GetListByIdUsecase,
    PrismaService,
    { provide: LIST_REPOSITORY, useClass: ListRepository },
    { provide: COUPLE_REPOSITORY, useClass: CoupleRepository },
    { provide: CONTENTS_REPOSITORY, useClass: ContentsRepository },
  ],
})
export class ListModule {}
