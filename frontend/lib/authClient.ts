import { AUTHORIZATION } from '@/app/api/auth/[...nextauth]/route';
import { Effect, succeed } from 'effect/Effect';
import { GraphQLClient } from 'graphql-request';
import { cookies } from 'next/headers';
import { failWithTag } from './Effect.lib';

export const authClient = (): Effect<
  GraphQLClient,
  {
    readonly _tag: 'Unauthorized';
  },
  never
> => {
  const client = new GraphQLClient(process.env.BACKEND_URL);
  const authorization = cookies().get(AUTHORIZATION)?.value;

  return authorization
    ? succeed(client.setHeaders({ authorization }))
    : failWithTag('Unauthorized');
};
