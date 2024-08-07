'use server';

import { failWithTag, tag } from '@/lib/Effect.lib';
import { authClient } from '@/lib/authClient';
import {
  CreateListMutation,
  CreateListMutationVariables,
} from '@/types/gql/graphql';
import { catchTags, gen, runPromise, succeed, tryPromise } from 'effect/Effect';
import { gql } from 'graphql-request';
import { revalidatePath } from 'next/cache';

export const createList = async ({ name }: { name: string }) => {
  const client = authClient();

  const result = await gen(function* () {
    if (!name) return yield* failWithTag('input no name');

    const result = yield* tryPromise({
      try: () =>
        client.request<CreateListMutation, CreateListMutationVariables>(
          createListMutation,
          { name },
        ),
      catch: () => tag('fail create list'),
    });

    return {
      list: { id: result.createList.id, name },
      error: '',
    };
  })
    .pipe(
      catchTags({
        'input no name': () =>
          succeed({
            list: { id: '', name: '' },
            error: 'リストの名前を入力してください',
          }),
        'fail create list': () =>
          succeed({
            list: { id: '', name: '' },
            error: 'リストの作成に失敗しました',
          }),
      }),
    )
    .pipe(runPromise);

  revalidatePath('/home');

  return result;
};

const createListMutation = gql`
  mutation CreateList($name: String!) {
    createList(name: $name) {
      id
    }
  }
`;
