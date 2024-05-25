'use server';

import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from '@/types/gql/graphql';
import { GraphQLClient, gql } from 'graphql-request';

export const action = async ({
  name,
  token,
}: {
  name: string;
  token: string;
}) => {
  const client = new GraphQLClient(process.env.BACKEND_URL);

  const {
    createUser: { id },
  } = await client.request<CreateUserMutation, CreateUserMutationVariables>(
    createUserMutation,
    { name, createUserToken2: token },
  );

  return { id };
};

const createUserMutation = gql`
  mutation CreateUser($name: String!, $createUserToken2: String!) {
    createUser(name: $name, token: $createUserToken2) {
      id
    }
  }
`;
