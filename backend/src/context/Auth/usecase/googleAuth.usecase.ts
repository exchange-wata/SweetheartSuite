import { Injectable } from '@nestjs/common';
import { pipe } from 'effect';
import { andThen, tryPromise } from 'effect/Effect';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthUsecase {
  private readonly client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  verifyToken = (token: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
          }),
        catch: () => ({ _tag: 'Invalid token' }) as const,
      }),
      andThen((v) => v.getPayload().email),
    );
}
