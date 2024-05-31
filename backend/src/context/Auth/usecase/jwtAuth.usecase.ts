import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Effect, tryPromise } from 'effect/Effect';

type AuthType = {
  id: string;
};

@Injectable()
export class JwtAuthUsecase {
  constructor(private readonly jwtService: JwtService) {}

  generateToken = (input: AuthType): Effect<string, { _tag: string }> =>
    tryPromise({
      try: () => this.jwtService.signAsync({ userId: input.id }),
      catch: () => ({ _tag: 'can not generate jwt' }) as const,
    });

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
