import { Center } from '@/components/layout/center';
import { Card } from '@/components/ui/card';
import { authClient } from '@/lib/authClient';
import { GetRequestQuery } from '@/types/gql/graphql';
import { gen, tryPromise, catchTag, succeed, runPromise } from 'effect/Effect';
import { gql } from 'graphql-request';
import { RecievedRequest } from './RecievedRequest';
import { SendRequest } from './SendRequest';
import { tag } from '@/lib/Effect.lib';

export const HomeRequest = async () => {
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
};

const getRequestQuery = gql`
  query GetRequest {
    getRequest {
      fromUserId
    }
  }
`;
