import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Effect, tryPromise } from 'effect/Effect';

type AuthType = {
  id: string;
  coupleId: string;
};

@Injectable()
export class JwtAuthUsecase {
  constructor(private readonly jwtService: JwtService) {}

  generateToken = (input: AuthType): Effect<string, { _tag: string }> =>
    tryPromise({
      try: () =>
        this.jwtService.signAsync({
          userId: input.id,
          coupleId: input.coupleId,
        }),
      catch: () => ({ _tag: 'can not generate jwt' }) as const,
    });

  verifyToken = (token: string) =>
    tryPromise({
      try: () => this.jwtService.verifyAsync(token),
      catch: () => ({ _tag: 'can not verify token' }) as const,
    });
}
