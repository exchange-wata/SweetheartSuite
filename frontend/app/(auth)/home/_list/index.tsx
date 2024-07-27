import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Center } from '@/components/layout/center';
import { gql } from 'graphql-request';
import { CreateListDialog } from './CreateListDialog';
import { authClient } from '@/lib/authClient';
import { GetListsQuery, GetListsQueryVariables } from '@/types/gql/graphql';
import Link from 'next/link';

export const HomeList = async () => {
  const client = authClient();

  const lists = await client.request<GetListsQuery, GetListsQueryVariables>(
    getListsQuery,
  );

  return (
    <Center className="m-10">
      <Card className="w-[350px] flex-col items-center justify-center p-5">
        <CardHeader className="items-center">やりたいことリスト</CardHeader>
        <CardContent>
          <CreateListDialog />
          {lists.getLists.map((list) => (
            <ListRow listId={list.id} listName={list.name} />
          ))}
        </CardContent>
      </Card>
    </Center>
  );
};

const ListRow = ({
  listId,
  listName,
}: {
  listId: string;
  listName: string;
}) => (
  <div className="flex flex-row items-center border p-4">
    <Link href={`/home/${listId}`}>{listName}</Link>
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
