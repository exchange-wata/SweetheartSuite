'use server';

import { GraphQLClient, gql } from 'graphql-request';
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

export const findUser = async (_: State, payload: FormData) => {
  const mailaddress = payload.get('mailaddress')?.toString();
  if (!mailaddress)
    return {
      mailaddress: '',
      name: '',
      error: 'メールアドレスを入力してください',
    };

  const client = new GraphQLClient(process.env.BACKEND_URL);
  try {
    const { getUserByMailaddress } = await client.request<
      GetUserByMailaddressQuery,
      GetUserByMailaddressQueryVariables
    >(getUserByMailaddressQuery, { mailaddress });

    return {
      mailaddress: getUserByMailaddress.mailaddress,
      name: getUserByMailaddress.name,
      error: '',
    };
  } catch (e) {
    return {
      mailaddress: '',
      name: '',
      error: 'ユーザーが見つかりませんでした',
    };
  }
};

export const sendRequest = async (
  _: { mailaddress: string; error: string },
  payload: FormData,
) => {
  const result = gen(function* () {
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
  }).pipe(
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
  );

  return runPromise(result);
};

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
