import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GetContentsByIdsUsecase } from '../usecase/getContentsByIds.usecase';
import { GetListByIdUsecase } from '../usecase/getListById.usecase';

@Injectable()
export class ContentsAuthGuard implements CanActivate {
  constructor(
    private readonly getContentsByIdsUsecase: GetContentsByIdsUsecase,
    private readonly getListByIdUsecase: GetListByIdUsecase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const coupleId = request.user?.coupleId;
    const { id: contentId, ids: contentIds } = request.body?.variables ?? {};

    if (contentId) {
      return this.checkSingleContent(coupleId, contentId);
    }

    if (contentIds && contentIds.length > 1) {
      return this.checkMultipleContents(coupleId, contentIds);
    }

    return false;
  }

  private async checkSingleContent(
    coupleId: string,
    contentId: string,
  ): Promise<boolean> {
    const contents = await this.getContentsByIdsUsecase.execute([contentId]);
    const listId = contents[0]?.listId;

    if (!listId) {
      throw new Error('invalid listId');
    }

    const list = await this.getListByIdUsecase.execute(listId);
    return list.coupleId === coupleId;
  }

  private async checkMultipleContents(
    coupleId: string,
    contentIds: string[],
  ): Promise<boolean> {
    const contents = await this.getContentsByIdsUsecase.execute(contentIds);
    const listId = contents[0]?.listId;

    const sameListIds = contents.every((content) => content.listId === listId);

    if (!listId || !sameListIds) {
      throw new Error('invalid listId');
    }

    const list = await this.getListByIdUsecase.execute(listId);
    return list.coupleId === coupleId;
  }
}
