import { Center } from '@/components/layout/center';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { authClient } from '@/lib/authClient';
import {
  GetContentsByListIdQuery,
  GetContentsByListIdQueryVariables,
} from '@/types/gql/graphql';
import { gen, runPromise, tryPromise } from 'effect/Effect';
import { gql } from 'graphql-request';

export default async function List({ params }: { params: { listId: string } }) {
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
        <CardHeader className="items-center">TODO リスト名表示</CardHeader>
        <CardContent>
          {contents.getContentsByListId.map((content) => (
            <ContentsColumn
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

const ContentsColumn = ({
  content,
  isDone,
}: {
  contentsId: string;
  content: string;
  isDone: boolean;
}) => (
  <div className="flex flex-col justify-center border p-4">
    {content}
    {isDone}
  </div>
);

const getContentsQuery = gql`
  query getContentsByListId($listId: String!) {
    getContentsByListId(listId: $listId) {
      id
      content
      isDone
    }
  }
`;
