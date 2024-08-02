/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ContentsPresenter = {
  __typename?: 'ContentsPresenter';
  content: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDone: Scalars['Boolean']['output'];
  listId: Scalars['String']['output'];
};

export type CouplePresenter = {
  __typename?: 'CouplePresenter';
  id: Scalars['String']['output'];
  userId1: Scalars['String']['output'];
  userId2: Scalars['String']['output'];
};

export type DeleteContentsResponse = {
  __typename?: 'DeleteContentsResponse';
  count: Scalars['Float']['output'];
};

export type ListPresenter = {
  __typename?: 'ListPresenter';
  coupleId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isArchived: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveList: ListPresenter;
  createContents: ContentsPresenter;
  createCouple?: Maybe<Scalars['String']['output']>;
  createList: ListPresenter;
  createTempUser: TempUserPresenter;
  createUser: UserPresenter;
  deleteContents: DeleteContentsResponse;
  sendRequest: Scalars['Boolean']['output'];
  setCompletedContents: ContentsPresenter;
  setIncompleteContents: ContentsPresenter;
  updateContents: ContentsPresenter;
  updateList: ListPresenter;
};


export type MutationArchiveListArgs = {
  listId: Scalars['String']['input'];
};


export type MutationCreateContentsArgs = {
  content: Scalars['String']['input'];
  listId: Scalars['String']['input'];
};


export type MutationCreateCoupleArgs = {
  isAccepted: Scalars['Boolean']['input'];
};


export type MutationCreateListArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateTempUserArgs = {
  mailaddress: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationDeleteContentsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationSendRequestArgs = {
  mailaddress: Scalars['String']['input'];
};


export type MutationSetCompletedContentsArgs = {
  id: Scalars['String']['input'];
};


export type MutationSetIncompleteContentsArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateContentsArgs = {
  content: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationUpdateListArgs = {
  listId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getContentsByListId: Array<ContentsPresenter>;
  getCouple: CouplePresenter;
  getLists: Array<ListPresenter>;
  getRequest: RequestPresenter;
  getUserByMailaddress: UserPresenter;
  login: Scalars['String']['output'];
};


export type QueryGetContentsByListIdArgs = {
  listId: Scalars['String']['input'];
};


export type QueryGetUserByMailaddressArgs = {
  mailaddress: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  mailaddress: Scalars['String']['input'];
};

export type RequestPresenter = {
  __typename?: 'RequestPresenter';
  fromUserId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  toUserId: Scalars['String']['output'];
  typeId: Scalars['Float']['output'];
};

export type TempUserPresenter = {
  __typename?: 'TempUserPresenter';
  id: Scalars['String']['output'];
  mailaddress: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type UserPresenter = {
  __typename?: 'UserPresenter';
  id: Scalars['String']['output'];
  mailaddress: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CreateContentsMutationVariables = Exact<{
  listId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateContentsMutation = { __typename?: 'Mutation', createContents: { __typename?: 'ContentsPresenter', id: string } };

export type SetCompletedContentsMutationVariables = Exact<{
  setCompletedContentsId: Scalars['String']['input'];
}>;


export type SetCompletedContentsMutation = { __typename?: 'Mutation', setCompletedContents: { __typename?: 'ContentsPresenter', id: string } };

export type SetIncompleteContentsMutationVariables = Exact<{
  setIncompleteContentsId: Scalars['String']['input'];
}>;


export type SetIncompleteContentsMutation = { __typename?: 'Mutation', setIncompleteContents: { __typename?: 'ContentsPresenter', id: string } };

export type GetListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListsQuery = { __typename?: 'Query', getLists: Array<{ __typename?: 'ListPresenter', id: string, name: string }> };

export type GetContentsByListIdQueryVariables = Exact<{
  listId: Scalars['String']['input'];
}>;


export type GetContentsByListIdQuery = { __typename?: 'Query', getContentsByListId: Array<{ __typename?: 'ContentsPresenter', id: string, content: string, isDone: boolean }> };

export type CreateListMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList: { __typename?: 'ListPresenter', id: string } };

export type GetUserByMailaddressQueryVariables = Exact<{
  mailaddress: Scalars['String']['input'];
}>;


export type GetUserByMailaddressQuery = { __typename?: 'Query', getUserByMailaddress: { __typename?: 'UserPresenter', mailaddress: string, name: string } };

export type SendRequestMutationVariables = Exact<{
  mailaddress: Scalars['String']['input'];
}>;


export type SendRequestMutation = { __typename?: 'Mutation', sendRequest: boolean };

export type CreateCoupleMutationVariables = Exact<{
  isAccepted: Scalars['Boolean']['input'];
}>;


export type CreateCoupleMutation = { __typename?: 'Mutation', createCouple?: string | null };

export type GetRequestQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRequestQuery = { __typename?: 'Query', getRequest: { __typename?: 'RequestPresenter', fromUserId: string } };

export type GetCoupleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoupleQuery = { __typename?: 'Query', getCouple: { __typename?: 'CouplePresenter', id: string } };

export type LoginQueryVariables = Exact<{
  mailaddress: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: string };

export type CreateTempUserMutationVariables = Exact<{
  mailaddress: Scalars['String']['input'];
}>;


export type CreateTempUserMutation = { __typename?: 'Mutation', createTempUser: { __typename?: 'TempUserPresenter', token: string } };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String']['input'];
  createUserToken2: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserPresenter', id: string } };


export const CreateContentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateContents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createContents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"listId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateContentsMutation, CreateContentsMutationVariables>;
export const SetCompletedContentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetCompletedContents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setCompletedContentsId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setCompletedContents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setCompletedContentsId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SetCompletedContentsMutation, SetCompletedContentsMutationVariables>;
export const SetIncompleteContentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetIncompleteContents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setIncompleteContentsId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setIncompleteContents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setIncompleteContentsId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SetIncompleteContentsMutation, SetIncompleteContentsMutationVariables>;
export const GetListsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetListsQuery, GetListsQueryVariables>;
export const GetContentsByListIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getContentsByListId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getContentsByListId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"listId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"isDone"}}]}}]}}]} as unknown as DocumentNode<GetContentsByListIdQuery, GetContentsByListIdQueryVariables>;
export const CreateListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateListMutation, CreateListMutationVariables>;
export const GetUserByMailaddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByMailaddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mailaddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByMailaddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mailaddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mailaddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mailaddress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUserByMailaddressQuery, GetUserByMailaddressQueryVariables>;
export const SendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mailaddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mailaddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mailaddress"}}}]}]}}]} as unknown as DocumentNode<SendRequestMutation, SendRequestMutationVariables>;
export const CreateCoupleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCouple"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAccepted"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCouple"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isAccepted"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAccepted"}}}]}]}}]} as unknown as DocumentNode<CreateCoupleMutation, CreateCoupleMutationVariables>;
export const GetRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromUserId"}}]}}]}}]} as unknown as DocumentNode<GetRequestQuery, GetRequestQueryVariables>;
export const GetCoupleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCouple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCouple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetCoupleQuery, GetCoupleQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mailaddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mailaddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mailaddress"}}}]}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const CreateTempUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTempUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mailaddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTempUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mailaddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mailaddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<CreateTempUserMutation, CreateTempUserMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserToken2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserToken2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;