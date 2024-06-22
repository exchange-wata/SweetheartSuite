import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { gen, runPromise } from 'effect/Effect';
import { FindByListIdUsecase } from 'src/context/List/usecase/findByListId.usecase';

@Injectable()
export class ListGuard implements CanActivate {
  constructor(private readonly findByListIdUsecase: FindByListIdUsecase) {}

  canActivate = (context: ExecutionContext): Promise<boolean> => {
    const self = this;
    return gen(function* () {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      const listId = request.body.variables.listId;
      if (!listId) {
        return false;
      }

      const list = self.findByListIdUsecase.execute(listId);
      if (!list) {
        return false;
      }
      request.list = list;
      return true;
    }).pipe(runPromise);
  };
}
