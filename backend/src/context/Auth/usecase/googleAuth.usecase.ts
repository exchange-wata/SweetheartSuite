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
        catch: (e) => ({ _tag: `Invalid token: ${e}` }) as const,
      }),
      andThen((v) => v.getPayload()?.email),
    );
}
