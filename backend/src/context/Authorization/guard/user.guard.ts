import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { gen, runPromise } from 'effect/Effect';
import { GetCoupleUsecase } from 'src/context/User/usecase/getCouple.usecase';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly getCoupleUsecase: GetCoupleUsecase) {}

  canActivate = (context: ExecutionContext): Promise<boolean> => {
    const self = this;
    return gen(function* () {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      const userId = request.user.id;
      if (!userId) {
        return false;
      }

      const couple = self.getCoupleUsecase.execute(userId);
      if (!couple) {
        return false;
      }
      request.couple = couple;
      return true;
    }).pipe(runPromise);
  };
}
