import { gql } from 'graphql-request';
import { authClient } from '@/lib/authClient';
import { GetCoupleQuery } from '@/types/gql/graphql';
import { tag } from '@/lib/Effect.lib';
import { gen, tryPromise, catchTag, succeed, runPromise } from 'effect/Effect';
import { HomeRequest } from './_request';
import { HomeList } from './_list';

export default async function Home() {
  const {
    getCouple: { id: coupleId },
  } = await gen(function* () {
    const client = yield* authClient();
    return yield* tryPromise({
      try: () => client.request<GetCoupleQuery>(getCoupleQuery),
      catch: () => tag('no couple'),
    });
  })
    .pipe(catchTag('no couple', () => succeed({ getCouple: { id: null } })))
    .pipe(runPromise);

  if (coupleId === null) return <HomeRequest />;

  return <HomeList />;
}

const getCoupleQuery = gql`
  query GetCouple {
    getCouple {
      id
    }
  }
`;
