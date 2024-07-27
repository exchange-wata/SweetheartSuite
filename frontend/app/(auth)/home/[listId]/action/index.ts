'use server';

import { failWithTag, tag } from '@/lib/Effect.lib';
import { authClient } from '@/lib/authClient';
import {
  CreateContentsMutation,
  CreateContentsMutationVariables,
  SetCompletedContentsMutation,
  SetCompletedContentsMutationVariables,
  SetIncompleteContentsMutation,
  SetIncompleteContentsMutationVariables,
} from '@/types/gql/graphql';
import { catchTags, gen, runPromise, succeed, tryPromise } from 'effect/Effect';
import { gql } from 'graphql-request';
import { revalidatePath } from 'next/cache';

export const createContents = async ({
  listId,
  content,
}: {
  listId: string;
  content: string;
}) => {
  const result = await gen(function* () {
    const client = authClient();

    if (!content) return yield* failWithTag('input no content');

    const result = yield* tryPromise({
      try: () =>
        client.request<CreateContentsMutation, CreateContentsMutationVariables>(
          createContentsMutation,
          { listId, content },
        ),
      catch: () => tag('fail create contents'),
    });

    return {
      list: { id: result.createContents.id },
      error: '',
    };
  })
    .pipe(
      catchTags({
        'input no content': () =>
          succeed({
            error: 'やることを入力してください',
          }),
        'fail create contents': () =>
          succeed({
            error: 'やることの作成に失敗しました',
          }),
      }),
    )
    .pipe(runPromise);

  revalidatePath(`/home/${listId}`);

  return result;
};

const createContentsMutation = gql`
  mutation CreateContents($listId: String!, $content: String!) {
    createContents(listId: $listId, content: $content) {
      id
    }
  }
`;

export const setCompletedContents = async ({
  contentsId,
}: {
  contentsId: string;
}) =>
  authClient().request<
    SetCompletedContentsMutation,
    SetCompletedContentsMutationVariables
  >(setCompletedContentsMutation, { setCompletedContentsId: contentsId });

const setCompletedContentsMutation = gql`
  mutation SetCompletedContents($setCompletedContentsId: String!) {
    setCompletedContents(id: $setCompletedContentsId) {
      id
    }
  }
`;

export const setIncompleteContents = async ({
  contentsId,
}: {
  contentsId: string;
}) =>
  authClient().request<
    SetIncompleteContentsMutation,
    SetIncompleteContentsMutationVariables
  >(setIncompleteContentsMutation, {
    setIncompleteContentsId: contentsId,
  });

const setIncompleteContentsMutation = gql`
  mutation SetIncompleteContents($setIncompleteContentsId: String!) {
    setIncompleteContents(id: $setIncompleteContentsId) {
      id
    }
  }
`;
