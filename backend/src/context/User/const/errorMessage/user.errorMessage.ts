export const UserErrorMessage = {
  CREATE: 'can not create user',
  GET_USER_BY_MAILADDRESS: 'can not get user by mailaddress',
  FIND_BY_USER_ID: 'can not find user by user id',
} as const;

export type UserErrorMessage =
  (typeof UserErrorMessage)[keyof typeof UserErrorMessage];
