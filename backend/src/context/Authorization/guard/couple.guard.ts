import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { gen, runSync } from 'effect/Effect';

@Injectable()
export class CoupleGuard implements CanActivate {
  canActivate = (context: ExecutionContext): boolean =>
    gen(function* () {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      const list = request.list;
      const couple = request.couple;

      if (!list || !couple) {
        throw new ForbiddenException('List or Couple not found');
      }

      if (list.coupleId !== couple.id) {
        throw new ForbiddenException(
          'User does not belong to the couple owning this list',
        );
      }

      return true;
    }).pipe(runSync);
}
