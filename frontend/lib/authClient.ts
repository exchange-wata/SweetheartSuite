import { GraphQLClient } from 'graphql-request';
import { cookies } from 'next/headers';

export const authClient = () => {
  const client = new GraphQLClient(process.env.BACKEND_URL);
  const authorization = cookies().get('authorization')?.value;

  if (!authorization) throw new Error('No authorization token found');
  return client.setHeaders({ authorization });
};
