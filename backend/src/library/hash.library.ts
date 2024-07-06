import * as bcryptjs from 'bcryptjs';
import { Effect, tryPromise } from 'effect/Effect';

const saltOrRounds = 10;

export const createToken = (
  mailaddress: string,
): Effect<string, { _tag: string }> =>
  tryPromise({
    try: () => bcryptjs.hash(mailaddress, saltOrRounds),
    catch: () => ({ _tag: 'can not create hash' }) as const,
  });
