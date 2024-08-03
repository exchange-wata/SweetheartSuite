import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GetListByIdUsecase } from '../usecase/getListById.usecase';

@Injectable()
export class ListAuthGuard implements CanActivate {
  constructor(private readonly getListByIdUsecase: GetListByIdUsecase) {}

  canActivate = async (context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const coupleId = request.user.coupleId;
    const listId = request.body.variables.listId;
    const list = await this.getListByIdUsecase.execute(listId);

    return list.coupleId === coupleId;
  };
}
