import { Center } from '@/components/layout/center';
import { Card } from '@/components/ui/card';
import { SendRequest } from './SendRequest';
import { gql } from 'graphql-request';
import { catchTag, gen, runPromise, succeed, tryPromise } from 'effect/Effect';
import { authClient } from '@/lib/authClient';
import { GetRequestQuery } from '@/types/gql/graphql';
import { tag } from '@/lib/Effect.lib';
import { RecievedRequest } from './RecievedRequest';

export default async function Home() {
  const {
    getRequest: { fromUserId },
  } = await gen(function* () {
    const client = yield* authClient();
    return yield* tryPromise({
      try: () => client.request<GetRequestQuery>(getRequestQuery),
      catch: () => tag('no request'),
    });
  })
    .pipe(
      catchTag('no request', () =>
        succeed({ getRequest: { fromUserId: null } }),
      ),
    )
    .pipe(runPromise);

  return (
    <Center className="m-10">
      <Card className="w-[350px] h-[400px] flex-col items-center justify-center p-5">
        {fromUserId && <RecievedRequest fromUserId={fromUserId} />}
        <SendRequest />
      </Card>
    </Center>
  );
}

const getRequestQuery = gql`
  query GetRequest {
    getRequest {
      fromUserId
    }
  }
`;
