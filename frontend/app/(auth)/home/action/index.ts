'use server';

import { gql } from 'graphql-request';
import {
  CreateCoupleMutation,
  CreateCoupleMutationVariables,
  GetUserByMailaddressQuery,
  GetUserByMailaddressQueryVariables,
  SendRequestMutation,
  SendRequestMutationVariables,
} from '@/types/gql/graphql';
import { authClient } from '@/lib/authClient';
import {
  catchTags,
  flatMap,
  gen,
  runPromise,
  succeed,
  tryPromise,
} from 'effect/Effect';
import { failWithTag, tag } from '@/lib/Effect.lib';
import { pipe } from 'effect';

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

    const result = yield* tryPromise({
      try: () =>
        client.request<SendRequestMutation, SendRequestMutationVariables>(
          sendRequestMutation,
          { mailaddress },
        ),
      catch: () => tag('already sent'),
    });

    if (result.sendRequest === false)
      return {
        mailaddress,
        error: 'このユーザーにはすでにリクエストを送っています',
      };

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

export const accept = async () => {
  pipe(
    authClient(),
    flatMap((client) =>
      tryPromise(() =>
        client.request<CreateCoupleMutation, CreateCoupleMutationVariables>(
          createCoupleMutation,
          { isAccepted: true },
        ),
      ),
    ),
  ).pipe(runPromise);

  return true;
};

export const reject = async () => {
  pipe(
    authClient(),
    flatMap((client) =>
      tryPromise(() =>
        client.request<CreateCoupleMutation, CreateCoupleMutationVariables>(
          createCoupleMutation,
          { isAccepted: false },
        ),
      ),
    ),
  ).pipe(runPromise);

  return true;
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

const createCoupleMutation = gql`
  mutation CreateCouple($isAccepted: Boolean!) {
    createCouple(isAccepted: $isAccepted) {
      id
    }
  }
`;
