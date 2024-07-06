import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Center } from '@/components/layout/center';
import { gql } from 'graphql-request';
import { CreateListDialog } from './CreateListDialog';
import { authClient } from '@/lib/authClient';
import { gen, runPromise, tryPromise } from 'effect/Effect';
import { GetListsQuery, GetListsQueryVariables } from '@/types/gql/graphql';

export const HomeList = async () => {
  const lists = await gen(function* () {
    const client = yield* authClient();
    return yield* tryPromise(() =>
      client.request<GetListsQuery, GetListsQueryVariables>(getListsQuery),
    );
  }).pipe(runPromise);

  return (
    <Center className="m-10">
      <Card className="w-[350px] flex-col items-center justify-center p-5">
        <CardHeader className="items-center">やりたいことリスト</CardHeader>
        <CardContent>
          <CreateListDialog />
          {lists.getLists.map((list) => (
            <ListColumn listName={list.name} />
          ))}
        </CardContent>
      </Card>
    </Center>
  );
};

const ListColumn = ({ listName }: { listName: string }) => (
  <div className="flex flex-col justify-center border p-4">
    <h1>{listName}</h1>
  </div>
);

const getListsQuery = gql`
  query GetLists {
    getLists {
      id
      name
    }
  }
`;
