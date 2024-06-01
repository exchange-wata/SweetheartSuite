'use server';

import { gql } from 'graphql-request';
import {
  GetUserByMailaddressQuery,
  GetUserByMailaddressQueryVariables,
  SendRequestMutation,
  SendRequestMutationVariables,
} from '@/types/gql/graphql';
import { authClient } from '@/lib/authClient';
import { catchTags, gen, runPromise, succeed, tryPromise } from 'effect/Effect';
import { failWithTag, tag } from '@/lib/Effect.lib';

type State = {
  mailaddress: string;
  name: string;
  error: string;
};

export const findUser = async (_: State, payload: FormData) =>
  gen(function* () {
    const mailaddress = payload.get('mailaddress')?.toString();
    if (!mailaddress) return yield* failWithTag('no mailaddress');

    const client = yield* authClient();
    const result = yield* tryPromise({
      try: () =>
        client.request<
          GetUserByMailaddressQuery,
          GetUserByMailaddressQueryVariables
        >(getUserByMailaddressQuery, { mailaddress }),
      catch: () => tag('user not found'),
    });

    return {
      mailaddress: result.getUserByMailaddress.mailaddress,
      name: result.getUserByMailaddress.name,
      error: '',
    };
  })
    .pipe(
      catchTags({
        'no mailaddress': () =>
          succeed({
            mailaddress: '',
            name: '',
            error: 'メールアドレスを入力してください',
          }),
        'user not found': () =>
          succeed({
            mailaddress: '',
            name: '',
            error: 'ユーザーが見つかりませんでした',
          }),
      }),
    )
    .pipe(runPromise);

export const sendRequest = async (
  _: { mailaddress: string; error: string },
  payload: FormData,
) =>
  gen(function* () {
    const mailaddress = payload.get('mailaddress')?.toString();

    if (!mailaddress) return yield* failWithTag('no mailaddress');

    const client = yield* authClient();

    yield* tryPromise({
      try: () =>
        client.request<SendRequestMutation, SendRequestMutationVariables>(
          sendRequestMutation,
          { mailaddress },
        ),
      catch: () => tag('already sent'),
    });

    return {
      mailaddress,
      error: '',
    };
  })
    .pipe(
      catchTags({
        'no mailaddress': () =>
          succeed({
            mailaddress: '',
            error: 'メールアドレスを入力してください',
          }),
        'already sent': () =>
          succeed({
            mailaddress: '',
            error: 'このユーザーにはすでにリクエストを送っています',
          }),
      }),
    )
    .pipe(runPromise);

const getUserByMailaddressQuery = gql`
  query GetUserByMailaddress($mailaddress: String!) {
    getUserByMailaddress(mailaddress: $mailaddress) {
      mailaddress
      name
    }
  }
`;

const sendRequestMutation = gql`
  mutation SendRequest($mailaddress: String!) {
    sendRequest(mailaddress: $mailaddress)
  }
`;
