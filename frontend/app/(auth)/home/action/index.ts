'use server';

import { GraphQLClient, gql } from 'graphql-request';
import {
  GetUserByMailaddressQuery,
  GetUserByMailaddressQueryVariables,
  SendRequestMutation,
  SendRequestMutationVariables,
} from '@/types/gql/graphql';
import { AUTHORIZATION } from '@/app/api/auth/[...nextauth]/route';
import { cookies } from 'next/headers';

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
  const mailaddress = payload.get('mailaddress')?.toString();
  if (!mailaddress)
    return {
      mailaddress: '',
      error: 'メールアドレスを入力してください',
    };

  const client = new GraphQLClient(process.env.BACKEND_URL);
  const authorization = cookies().get(AUTHORIZATION)?.value;
  if (!authorization) throw new Error('Unauthorized');

  try {
    await client
      .setHeader(AUTHORIZATION, authorization)
      .request<SendRequestMutation, SendRequestMutationVariables>(
        sendRequestMutation,
        { mailaddress },
      );

    return {
      mailaddress,
      error: '',
    };
  } catch (e) {
    return {
      mailaddress: '',
      error: 'このユーザーにはすでにリクエストを送っています',
    };
  }
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
