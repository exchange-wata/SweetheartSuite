import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Effect } from 'effect';
import { gen, runPromise } from 'effect/Effect';
import { Request } from 'express';
import { JwtAuthUsecase } from '../usecase/jwtAuth.usecase';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtAuthUsecase: JwtAuthUsecase) {}

  canActivate = (context: ExecutionContext): Promise<boolean> => {
    const self = this;
    return gen(function* () {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      const token = yield* self.extractTokenFromHeader(request);
      if (!token) throw new Error('invalid token');
      const payload = yield* self.jwtAuthUsecase.verifyToken(token);
      request['user'] = payload;

      return true;
    }).pipe(runPromise);
  };

  private extractTokenFromHeader = (request: Request) => {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer'
      ? Effect.succeed(token)
      : Effect.fail(new UnauthorizedException());
  };
}
