/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateContents($listId: String!, $content: String!) {\n    createContents(listId: $listId, content: $content) {\n      id\n    }\n  }\n": types.CreateContentsDocument,
    "\n  mutation SetCompletedContents($setCompletedContentsId: String!) {\n    setCompletedContents(id: $setCompletedContentsId) {\n      id\n    }\n  }\n": types.SetCompletedContentsDocument,
    "\n  mutation SetIncompleteContents($setIncompleteContentsId: String!) {\n    setIncompleteContents(id: $setIncompleteContentsId) {\n      id\n    }\n  }\n": types.SetIncompleteContentsDocument,
    "\n  query GetLists {\n    getLists {\n      id\n      name\n    }\n  }\n": types.GetListsDocument,
    "\n  query getContentsByListId($listId: String!) {\n    getContentsByListId(listId: $listId) {\n      id\n      content\n      isDone\n    }\n  }\n": types.GetContentsByListIdDocument,
    "\n  mutation CreateList($name: String!) {\n    createList(name: $name) {\n      id\n    }\n  }\n": types.CreateListDocument,
    "\n  query GetUserByMailaddress($mailaddress: String!) {\n    getUserByMailaddress(mailaddress: $mailaddress) {\n      mailaddress\n      name\n    }\n  }\n": types.GetUserByMailaddressDocument,
    "\n  mutation SendRequest($mailaddress: String!) {\n    sendRequest(mailaddress: $mailaddress)\n  }\n": types.SendRequestDocument,
    "\n  mutation CreateCouple($isAccepted: Boolean!) {\n    createCouple(isAccepted: $isAccepted)\n  }\n": types.CreateCoupleDocument,
    "\n  query GetRequest {\n    getRequest {\n      fromUserId\n    }\n  }\n": types.GetRequestDocument,
    "\n  query GetCouple {\n    getCouple {\n      id\n    }\n  }\n": types.GetCoupleDocument,
    "\n  query Login($mailaddress: String!) {\n    login(mailaddress: $mailaddress)\n  }\n": types.LoginDocument,
    "\n  mutation CreateTempUser($mailaddress: String!) {\n    createTempUser(mailaddress: $mailaddress) {\n      token\n    }\n  }\n": types.CreateTempUserDocument,
    "\n  mutation CreateUser($name: String!, $createUserToken2: String!) {\n    createUser(name: $name, token: $createUserToken2) {\n      id\n    }\n  }\n": types.CreateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateContents($listId: String!, $content: String!) {\n    createContents(listId: $listId, content: $content) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateContents($listId: String!, $content: String!) {\n    createContents(listId: $listId, content: $content) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetCompletedContents($setCompletedContentsId: String!) {\n    setCompletedContents(id: $setCompletedContentsId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation SetCompletedContents($setCompletedContentsId: String!) {\n    setCompletedContents(id: $setCompletedContentsId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetIncompleteContents($setIncompleteContentsId: String!) {\n    setIncompleteContents(id: $setIncompleteContentsId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation SetIncompleteContents($setIncompleteContentsId: String!) {\n    setIncompleteContents(id: $setIncompleteContentsId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLists {\n    getLists {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetLists {\n    getLists {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getContentsByListId($listId: String!) {\n    getContentsByListId(listId: $listId) {\n      id\n      content\n      isDone\n    }\n  }\n"): (typeof documents)["\n  query getContentsByListId($listId: String!) {\n    getContentsByListId(listId: $listId) {\n      id\n      content\n      isDone\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateList($name: String!) {\n    createList(name: $name) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateList($name: String!) {\n    createList(name: $name) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserByMailaddress($mailaddress: String!) {\n    getUserByMailaddress(mailaddress: $mailaddress) {\n      mailaddress\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetUserByMailaddress($mailaddress: String!) {\n    getUserByMailaddress(mailaddress: $mailaddress) {\n      mailaddress\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendRequest($mailaddress: String!) {\n    sendRequest(mailaddress: $mailaddress)\n  }\n"): (typeof documents)["\n  mutation SendRequest($mailaddress: String!) {\n    sendRequest(mailaddress: $mailaddress)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCouple($isAccepted: Boolean!) {\n    createCouple(isAccepted: $isAccepted)\n  }\n"): (typeof documents)["\n  mutation CreateCouple($isAccepted: Boolean!) {\n    createCouple(isAccepted: $isAccepted)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRequest {\n    getRequest {\n      fromUserId\n    }\n  }\n"): (typeof documents)["\n  query GetRequest {\n    getRequest {\n      fromUserId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCouple {\n    getCouple {\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetCouple {\n    getCouple {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Login($mailaddress: String!) {\n    login(mailaddress: $mailaddress)\n  }\n"): (typeof documents)["\n  query Login($mailaddress: String!) {\n    login(mailaddress: $mailaddress)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTempUser($mailaddress: String!) {\n    createTempUser(mailaddress: $mailaddress) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTempUser($mailaddress: String!) {\n    createTempUser(mailaddress: $mailaddress) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($name: String!, $createUserToken2: String!) {\n    createUser(name: $name, token: $createUserToken2) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($name: String!, $createUserToken2: String!) {\n    createUser(name: $name, token: $createUserToken2) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;