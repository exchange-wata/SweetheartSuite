import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetContentsByIdsUsecase } from '../usecase/getContentsByIds.usecase';
import { GetListByIdUsecase } from '../usecase/getListById.usecase';

@Injectable()
export class ContentsAuth {
  constructor(
    private readonly getContentsByIdsUsecase: GetContentsByIdsUsecase,
    private readonly getListByIdUsecase: GetListByIdUsecase,
  ) {}

  async canEditContents(coupleId: string, contentIds: string[]): Promise<void> {
    const contents = await this.getContentsByIdsUsecase.execute(contentIds);
    const listId = contents[0]?.listId;

    const isSameListId = contents.every((content) => content.listId === listId);

    if (!listId || !isSameListId) throw new Error('invalid content ids');

    const list = await this.getListByIdUsecase.execute(listId);
    if (list.coupleId !== coupleId) throw new UnauthorizedException();
  }
}
