import { Center } from '@/components/layout/center';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { authClient } from '@/lib/authClient';
import {
  GetContentsByListIdQuery,
  GetContentsByListIdQueryVariables,
  GetListsQuery,
  GetListsQueryVariables,
} from '@/types/gql/graphql';
import { gen, runPromise, tryPromise } from 'effect/Effect';
import { gql } from 'graphql-request';
import { CreateContentsDialog } from './CreateContentsDialog';
import { ContentsRow } from './ContentsRow';

export default async function List({ params }: { params: { listId: string } }) {
  const lists = await gen(function* () {
    const client = yield* authClient();
    return yield* tryPromise(() =>
      client.request<GetListsQuery, GetListsQueryVariables>(getListsQuery),
    );
  }).pipe(runPromise);

  const list = lists.getLists.find((list) => list.id === params.listId)!;

  const contents = await gen(function* () {
    const client = yield* authClient();
    return yield* tryPromise(() =>
      client.request<
        GetContentsByListIdQuery,
        GetContentsByListIdQueryVariables
      >(getContentsQuery, { listId: params.listId }),
    );
  }).pipe(runPromise);

  return (
    <Center className="m-10">
      <Card className="w-[350px] flex-col items-center justify-center p-5">
        <CardHeader className="items-center">{list.name}</CardHeader>
        <CardContent>
          <CreateContentsDialog listId={params.listId} />
          {contents.getContentsByListId.map((content) => (
            <ContentsRow
              contentsId={content.id}
              content={content.content}
              isDone={content.isDone}
            />
          ))}
        </CardContent>
      </Card>
    </Center>
  );
}

const getListsQuery = gql`
  query GetLists {
    getLists {
      id
      name
    }
  }
`;

const getContentsQuery = gql`
  query getContentsByListId($listId: String!) {
    getContentsByListId(listId: $listId) {
      id
      content
      isDone
    }
  }
`;
