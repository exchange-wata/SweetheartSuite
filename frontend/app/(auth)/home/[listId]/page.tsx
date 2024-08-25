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
import { Breadcrumb } from '@/app/Breadcrumb';

export default async function List({ params }: { params: { listId: string } }) {
  const client = authClient();

  const lists = await client.request<GetListsQuery, GetListsQueryVariables>(
    getListsQuery,
  );

  const list = lists.getLists.find((list) => list.id === params.listId)!;

  const contents = await gen(function* () {
    return yield* tryPromise(() =>
      client.request<
        GetContentsByListIdQuery,
        GetContentsByListIdQueryVariables
      >(getContentsQuery, { listId: params.listId }),
    );
  }).pipe(runPromise);

  return (
    <Center className="m-10">
      <div>
        <Breadcrumb
          paths={[{ name: 'ホーム', href: '/home' }, { name: 'リスト' }]}
        />
        <Card size="lg" className="flex-col items-center justify-center p-5">
          <CardHeader className="items-center">{list.name}</CardHeader>
          <CardContent className="flex flex-col gap-2">
            <CreateContentsDialog listId={params.listId} />
            <div className="flex flex-col gap-1">
              {contents.getContentsByListId.map((content) => (
                <ContentsRow
                  contentsId={content.id}
                  content={content.content}
                  isDone={content.isDone}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
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
